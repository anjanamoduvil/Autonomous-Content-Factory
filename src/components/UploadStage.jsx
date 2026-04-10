import React, { useState, useRef } from 'react';
import { Layers, FileText, Settings, Upload, Loader2, CheckSquare, Square, Search, AlignLeft, Mic, MicOff } from 'lucide-react';

const OUTPUT_OPTIONS = [
  { id: 'blog', label: 'Blog Post', desc: 'Long-form SEO article' },
  { id: 'social', label: 'X/Twitter Thread', desc: 'Viral thread' },
  { id: 'email', label: 'Newsletter', desc: 'Marketing copy' },
  { id: 'linkedin', label: 'LinkedIn Article', desc: 'Thought leadership' },
  { id: 'press', label: 'Press Release', desc: 'Official announcement' },
  { id: 'ad', label: 'Facebook Ad', desc: 'High-converting copy' }
];

export default function UploadStage({ onStart, isProcessing }) {
  const [text, setText] = useState('');
  const [tone, setTone] = useState('Professional & Trustworthy');
  const [audience, setAudience] = useState('');
  const [keywords, setKeywords] = useState('');
  const [verbosity, setVerbosity] = useState('Comprehensive');
  const [selectedOutputs, setSelectedOutputs] = useState(['blog', 'social', 'email']);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef(null);
  
  const handleDictation = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser doesn't support Voice Dictation.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    if (isRecording) {
      setIsRecording(false);
      // Wait, native speech api stops itself or needs a reference. 
      // For simplicity, we just toggle UI. Real app would store the ref.
      window.cymonicActiveRec?.stop();
      return;
    }

    setIsRecording(true);
    window.cymonicActiveRec = recognition;
    
    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + ' ';
        }
      }
      if (finalTranscript) {
        setText(prev => prev + finalTranscript);
      }
    };
    
    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);
    recognition.start();
  };

  const toggleOutput = (id) => {
    setSelectedOutputs(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !isProcessing && selectedOutputs.length > 0) {
      onStart({ 
        sourceText: text.trim(), 
        tone, 
        audience: audience.trim() || 'General Audience',
        keywords: keywords.trim(),
        verbosity,
        outputs: selectedOutputs
      });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      setText(evt.target.result);
    };
    reader.readAsText(file);
    e.target.value = null;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full fade-in">
      
      {/* LEFT COLUMN: Data Intake Engine */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="text-left mb-2">
          <h2 className="text-3xl mb-2 font-outfit text-white font-bold">Campaign Context</h2>
          <p className="text-slate-400 text-sm">Inject your raw facts and configure the brand voice algorithms.</p>
        </div>

        <form id="config-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="glass-panel p-6 flex flex-col gap-4 relative">
            <div className="flex flex-wrap justify-between items-center pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 className="text-xl font-bold text-white flex items-center gap-3"><FileText size={20} className="text-emerald-500" /> Source Material</h3>
              <div className="flex items-center gap-3 mt-4 sm:mt-0">
                <button type="button" onClick={handleDictation} className={`flex items-center gap-2 px-4 py-2 font-bold text-sm rounded-lg transition-all shadow-lg ${isRecording ? 'bg-red-500 text-white animate-pulse shadow-red-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'}`}>
                  {isRecording ? <MicOff size={16} /> : <Mic size={16} />} {isRecording ? 'Recording...' : 'Dictate'}
                </button>
                <button type="button" onClick={() => fileInputRef.current.click()} className="flex items-center gap-2 px-4 py-2 font-bold text-sm rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 transition-all shadow-lg shadow-emerald-500/10">
                  <Upload size={16} /> Upload (.md)
                </button>
                {/* STRICTLY HIDDEN NATIVE INPUT BOX */}
                <input type="file" accept=".txt,.md,.csv,.json" onChange={handleFileUpload} ref={fileInputRef} style={{ display: 'none' }} />
              </div>
            </div>
            <textarea 
              className="flex-1 w-full text-sm leading-relaxed text-white placeholder-slate-500 transition-all focus:ring-2 focus:ring-emerald-500/50"
              style={{ minHeight: '160px', padding: '20px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', outline: 'none' }}
              placeholder="Paste raw facts, dump an email chain, upload specs, or click dictate to speak directly..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={isProcessing}
            />
          </div>

          <div className="glass-panel p-6 flex flex-col gap-6">
            <h3 className="text-xl font-bold text-white pb-3 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <Settings size={20} className="text-emerald-500" /> Audience Parameters
            </h3>
            
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label className="text-xs font-bold tracking-widest uppercase text-slate-400 flex items-center gap-2">Tone Vector</label>
                <select value={tone} onChange={(e) => setTone(e.target.value)} disabled={isProcessing} className="text-sm cursor-pointer" style={{ padding: '14px 16px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', color: '#fff', outline: 'none' }}>
                  <option>Professional & Trustworthy</option>
                  <option>Bold & Disruptive</option>
                  <option>Conversational & Friendly</option>
                  <option>Highly Technical</option>
                </select>
              </div>
              <div style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label className="text-xs font-bold tracking-widest uppercase text-slate-400">Target Demographic</label>
                <input type="text" placeholder="e.g. C-Suite, Devs, Teens" value={audience} onChange={(e) => setAudience(e.target.value)} disabled={isProcessing} className="text-sm" style={{ padding: '14px 16px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', color: '#fff', outline: 'none' }} />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* RIGHT COLUMN: Output Matrix & Execution */}
      <div className="lg:w-[45%] flex flex-col gap-6">
         <div className="text-left mb-2">
            <h2 className="text-3xl mb-2 font-outfit text-white font-bold">Execution Targets</h2>
            <p className="text-slate-400 text-sm">Select massive formats and override AI parameters.</p>
        </div>

        {/* Feature Request: Advanced Modifiers */}
        <div className="glass-panel p-5 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest uppercase text-emerald-500 flex items-center gap-1"><Search size={10} /> SEO Keywords</label>
              <input type="text" placeholder="Comma separated..." value={keywords} onChange={(e) => setKeywords(e.target.value)} disabled={isProcessing} className="text-sm border-slate-700 bg-slate-900" />
          </div>
          <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest uppercase text-emerald-500 flex items-center gap-1"><AlignLeft size={10} /> Verbosity Index</label>
              <select value={verbosity} onChange={(e) => setVerbosity(e.target.value)} disabled={isProcessing} className="text-sm border-slate-700 bg-slate-900">
                <option>Concise & Direct (Short)</option>
                <option>Balanced</option>
                <option>Comprehensive (Long)</option>
              </select>
          </div>
        </div>

        <div className="glass-panel p-6 flex flex-col h-full gap-4">
           <h3 className="text-lg font-bold text-white border-b pb-3 border-slate-700 flex items-center gap-2"><Layers size={18} className="text-emerald-500" /> Asset Matrix</h3>
           
           <div className="grid grid-cols-2 gap-3 flex-1">
             {OUTPUT_OPTIONS.map((opt) => {
               const isSelected = selectedOutputs.includes(opt.id);
               return (
                 <div 
                   key={opt.id} onClick={() => !isProcessing && toggleOutput(opt.id)}
                   className={`p-3 rounded-lg border cursor-pointer transition-all flex flex-col items-start gap-1`}
                   style={{ borderColor: isSelected ? 'var(--accent-primary)' : 'var(--border-color)', background: isSelected ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-dark)' }}
                 >
                    <div className="flex justify-between w-full items-center mb-1">
                      <h4 className={`font-bold text-xs ${isSelected ? 'text-emerald-400' : 'text-slate-300'}`}>{opt.label}</h4>
                      <div style={{ color: isSelected ? 'var(--accent-primary)' : '#4B5563' }}>
                         {isSelected ? <CheckSquare size={14} /> : <Square size={14} />}
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight">{opt.desc}</p>
                 </div>
               )
             })}
          </div>

          <div className="pt-2 mt-auto">
            <button 
              type="submit" form="config-form"
              className="btn-primary w-full flex items-center justify-center gap-2 p-4 text-base rounded-lg shadow-lg hover:-translate-y-1"
              disabled={!text.trim() || isProcessing || selectedOutputs.length === 0}
            >
              {isProcessing ? <Loader2 size={20} className="animate-spin" /> : <Layers size={20} />}
              {isProcessing ? 'Initializing Agents...' : 'Ignite Factory Engine'}
            </button>
            {selectedOutputs.length === 0 && <p className="text-center text-red-500 text-xs mt-2 font-bold">Select target formats.</p>}
          </div>

        </div>
      </div>
    </div>
  );
}
