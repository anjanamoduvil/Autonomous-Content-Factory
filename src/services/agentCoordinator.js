export async function processCampaign({ sourceText, tone, audience }, onMessage, onComplete) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  const modelUrl = 'https://api.groq.com/openai/v1/chat/completions';
  const modelName = 'llama-3.3-70b-versatile'; 

  const send = (agent, msg, state) => onMessage({ agent, msg, state });

  const callGroq = async (prompt) => {
    const response = await fetch(modelUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: modelName,
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" }
      })
    });
    
    if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
    }
    const data = await response.json();
    return data.choices[0].message.content;
  };

  try {
    // ---------------------------------------------------------
    // AGENT 1: Lead Research & Fact-Check
    // ---------------------------------------------------------
    send('Researcher', 'Analyzing source document and extracting core facts...', 'thinking');
    const researchPrompt = `
      You are the Lead Research & Fact-Check Agent. 
      Extract the "Truth" from the following raw text. 
      Identify the core product features, technical specs, and target audience. 
      Create a structured Fact-Sheet (JSON format) representing the "Source of Truth".
      Output ONLY valid JSON with keys: "features", "specs", "audience", "ambiguities".
      
      Raw Text: ${sourceText}
    `;
    const resRaw = await callGroq(researchPrompt);
    let factSheet;
    try { factSheet = JSON.parse(resRaw); } catch(e) { factSheet = { raw: resRaw }; }
    send('Researcher', 'Fact-sheet extracted and verified.', 'done');

    // ---------------------------------------------------------
    // AGENT 2: Creative Copywriter
    // ---------------------------------------------------------
    send('Copywriter', `Drafting multi-format content for [${audience}] in a [${tone}] tone...`, 'thinking');
    const writerPrompt = `
      You are the elite Creative Copywriter for Cymonic AI (https://cymonic.ai/).
      Using the following strict Fact-Sheet, write marketing campaign content.
      
      TARGET AUDIENCE: ${audience}
      BRAND TONE: ${tone}

      Ensure you write the content in these 3 formats:
      1. A Blog Post: Must use Markdown headers (##), bulleted lists for readability, and a strong conclusion.
      2. A Social Media Thread: A cohesive 3 to 5 part thread. Number them (e.g., 1/5). Use engaging emojis.
      3. An Email Teaser: Include a catchy subject line at the top. Use a clean, structured body.

      CRITICAL BRANDING INSTRUCTIONS:
      - You MUST include a subtle reference to "Powered by Cymonic AI" or provide a link to "cymonic.ai" at the end of the Social Thread and the Email.
      - Represent Cymonic as the premier intelligence backing this project.
      
      Output ONLY valid JSON with exactly the keys: "blog", "social", "email". The values MUST be raw formatted strings, NOT nested objects!
      
      Fact-Sheet: ${JSON.stringify(factSheet)}
    `;
    const draftRaw = await callGroq(writerPrompt);
    let drafts;
    try { drafts = JSON.parse(draftRaw); } catch(e) { drafts = { blog: draftRaw, social: "Parse error", email: "" }; }
    send('Copywriter', 'First drafts completed with Cymonic branding.', 'done');

    // ---------------------------------------------------------
    // AGENT 3: Editor-in-Chief (Quality Control)
    // ---------------------------------------------------------
    send('Editor', 'Auditing drafts for formatting, tone, and Cymonic branding...', 'thinking');
    const editorPrompt = `
      You are the Editor-in-Chief for Cymonic.
      Review the generated Drafts against the original Fact-Sheet.
      Check for:
      - Formatting (is the blog post properly structured using Markdown?)
      - Branding (did the copywriter include Cymonic AI references in the social thread and email?)
      - Tone (does it match a ${tone} tone aimed at ${audience}?)
      
      If acceptable, echo the Drafts back as JSON. If rejected, output a "Correction Note" key.
      Always output JSON with keys: "approved" (boolean), "correctionNote" (string if false), "blog", "social", "email". The content values MUST be primitive strings, never objects.
      
      Fact-Sheet: ${JSON.stringify(factSheet)}
      Drafts: ${JSON.stringify(drafts)}
    `;
    const editRaw = await callGroq(editorPrompt);
    let finalContent;
    try { finalContent = JSON.parse(editRaw); } catch(e) { finalContent = { approved: true, blog: editRaw, social: drafts.social, email: drafts.email }; }

    const formatStr = (val) => (typeof val === 'object' && val !== null) ? (val.content || Object.values(val).join('\n\n')) : String(val || '');
    const finalResult = { 
      ...drafts, 
      ...finalContent, 
      blog: formatStr(finalContent.blog || drafts.blog), 
      social: formatStr(finalContent.social || drafts.social), 
      email: formatStr(finalContent.email || drafts.email) 
    };

    if (finalContent.approved) {
      send('Editor', 'Drafts approved! Cymonic Campaign kit is ready.', 'done');
      onComplete(finalResult);
    } else {
      send('Editor', `Draft Rejected. Correction needed: ${finalContent.correctionNote}`, 'error');
      // For demo simplicity, we still show the output
      onComplete({ ...finalResult, warning: finalContent.correctionNote || 'Corrections requested by Editor' });
    }

  } catch (error) {
    console.error(error);
    send('System', `An error occurred: ${error.message}`, 'error');
  }
}
