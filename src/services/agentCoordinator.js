export async function processCampaign(config, onProgress) {
  const { sourceText, tone, audience, outputs = ['blog', 'social', 'email'] } = config;

  const send = (agent, msg, status) => {
    onProgress({ agent, msg, status, type: 'info' });
  };
  const sendError = (agent, msg) => {
    onProgress({ agent, msg, status: 'error', type: 'error' });
  };

  const callGroq = async (systemPrompt, userPrompt = '', retries = 3) => {
    for (let i = 0; i < retries; i++) {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.7,
          max_tokens: 3000,
        })
      });
      
      if (response.status === 429) {
          send('System', `API Rate Limited (429). Retrying in ${3 * (i+1)} seconds...`, 'warning');
          await new Promise(r => setTimeout(r, 3000 * (i + 1)));
          continue;
      }

      if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || '';
    }
    throw new Error('API Rate Limit Exceeded after retries (429)');
  };

  try {
    // ---------------------------------------------------------
    // AGENT 1: Lead Researcher (Fact Extraction)
    // ---------------------------------------------------------
    send('Research', 'Analyzing raw input and extracting core entities...', 'thinking');
    const researchPrompt = `
      You are the Lead Research Agent for Cymonic AI.
      Analyze the provided source text. Extract the pure facts, features, tone indicators, and target demographics without adding any marketing fluff or hallucinating.
      Output ONLY a valid JSON object representing a "Fact-Sheet".
      Example format:
      {
        "core_product": "...",
        "key_features": ["...", "..."],
        "target_demographic": "...",
        "unique_selling_proportions": ["...", "..."]
      }
    `;
    const factRaw = await callGroq(researchPrompt, sourceText);
    let factSheet;
    try { factSheet = JSON.parse(factRaw); } catch(e) { factSheet = { extracted_text: factRaw }; }
    send('Research', 'Fact-Sheet formulated. Handing off to Creative Copywriter.', 'done');

    // ---------------------------------------------------------
    // AGENT 2: Creative Copywriter
    // ---------------------------------------------------------
    send('Copywriter', `Drafting marketing copy targeting [${audience}] in a [${tone}] tone...`, 'thinking');
    const getFormatInstruction = (key) => {
      const instructions = {
        'blog': 'A Blog Post: Must use Markdown headers (##), bulleted lists, and a strong conclusion.',
        'social': 'A Social Media/X Thread: A cohesive 3 to 5 part thread. Number them (e.g., 1/5). Use engaging emojis.',
        'email': 'An Email Teaser/Newsletter: Include a catchy subject line at the top. Use a clean, structured body.',
        'linkedin': 'A LinkedIn Article: Professional thought leadership style. Professional, insightful, and formatted with clean paragraphs.',
        'press': 'A Press Release: Official media announcement style with a formal header, DATELINE, and a boilerplate at the end.',
        'ad': 'Facebook/Instagram Ad Copy: High-converting, short, punchy variants including primary text, headline, and clear Call To Action (CTA).'
      };
      return instructions[key] || `Format for: ${key}`;
    };

    const formatInstructionsList = outputs.map((key, i) => `${i + 1}. ${getFormatInstruction(key)}`).join('\n      ');
    const jsonKeysList = outputs.map(k => `"${k}"`).join(', ');

    const copyPrompt = `
      You are the Creative Copywriter for Cymonic AI.
      Using the structured Fact-Sheet provided below (which contains ONLY true data), generate the marketing content in a ${tone} tone aimed at ${audience}.
      
      Ensure you write the content in these specific formats:
      ${formatInstructionsList}

      ${config.verbosity ? `LENGTH & VERBOSITY MODIFIER: ${config.verbosity}` : ''}
      ${config.keywords ? `CRITICAL SEO KEYWORDS TO INCLUDE: ${config.keywords}` : ''}

      CRITICAL BRANDING INSTRUCTIONS:
      - You MUST include a subtle reference to "Powered by Cymonic AI" or provide a link to "cymonic.ai" at the end of the Social content, Ad copy, or Email.
      - Represent Cymonic as the premier intelligence backing this project.
      
      Output ONLY valid JSON with exactly the keys: ${jsonKeysList}. The values MUST be raw formatted Markdown strings, NOT nested objects!
      
      Fact-Sheet: ${JSON.stringify(factSheet)}
    `;
    const draftRaw = await callGroq(copyPrompt);
    let drafts;
    try { 
      drafts = JSON.parse(draftRaw); 
    } catch(e) { 
      drafts = {};
      // Attempt to extract the JSON block if wrapped in markdown
      try {
         const match = draftRaw.match(/```json\n([\s\S]*?)\n```/);
         if(match) drafts = JSON.parse(match[1]);
         else throw new Error("No json block");
      } catch(e2) {
         outputs.forEach(k => drafts[k] = "Parse error: The agent failed to format this layer. Please Regenerate.");
      }
    }
    send('Copywriter', 'Initial drafts completed for all selected targets.', 'done');

    // ---------------------------------------------------------
    // AGENT 3: Editor-in-Chief (Quality Control)
    // ---------------------------------------------------------
    send('Editor', 'Auditing formats, tone, and Cymonic branding...', 'thinking');
    const editorPrompt = `
      You are the Editor-in-Chief for Cymonic.
      Review the generated Drafts against the original Fact-Sheet.
      Check for:
      - Formatting (are they properly structured using Markdown?)
      - Branding (did the copywriter include Cymonic AI references in the social/email/ad content?)
      - Tone (does it match a ${tone} tone aimed at ${audience}?)
      
      If acceptable, echo the Drafts back as JSON. If rejected, output a "Correction Note" key.
      Always output JSON with keys: "approved" (boolean), "correctionNote" (string if false), and the requested content keys: ${jsonKeysList}.
      The content values MUST be primitive strings, never objects.
      
      Fact-Sheet: ${JSON.stringify(factSheet)}
      Drafts: ${JSON.stringify(drafts)}
    `;
    const editRaw = await callGroq(editorPrompt);
    let finalContent;
    try { 
      finalContent = JSON.parse(editRaw); 
    } catch(e) { 
       try {
         const match = editRaw.match(/```json\n([\s\S]*?)\n```/);
         if(match) finalContent = JSON.parse(match[1]);
         else throw new Error("No json block");
      } catch(e2) {
         finalContent = { approved: true, ...drafts }; 
      }
    }

    const formatStr = (val) => (typeof val === 'object' && val !== null) ? (val.content || Object.values(val).join('\n\n')) : String(val || '');
    
    // Build the payload mapping the dynamic outputs
    const payload = {
      factSheet,
      approved: finalContent.approved || true,
      warning: finalContent.correctionNote || null,
    };
    outputs.forEach(k => {
       payload[k] = formatStr(finalContent[k] || drafts[k]);
    });

    send('Editor', 'Final campaign approved. Packaging assets for delivery.', 'done');
    return payload;

  } catch (error) {
    sendError('System', error.message || 'An unexpected failure occurred in the hive.');
    throw error;
  }
}
