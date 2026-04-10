import React, { useState, useRef } from 'react';
import { FileText, Settings, Upload, Loader2, CheckSquare, Square, Layers } from 'lucide-react';

const OUTPUT_OPTIONS = [
  { id: 'blog', label: 'Blog Post', desc: 'Long-form SEO optimized article' },
  { id: 'social', label: 'X/Twitter Thread', desc: 'Bite-sized viral thread' },
  { id: 'email', label: 'Email Newsletter', desc: 'Direct marketing copy' },
  { id: 'linkedin', label: 'LinkedIn Article', desc: 'Professional thought leadership' },
  { id: 'press', label: 'Press Release', desc: 'Official media announcement' },
  { id: 'ad', label: 'Facebook Ad Copy', desc: 'High-converting ad variants' }
];

export default function UploadStage({ onStart, isProcessing }) {
  const [text, setText] = useState('');
  const [tone, setTone] = useState('Professional & Trustworthy');
  const [audience, setAudience] = useState('');
  const [selectedOutputs, setSelectedOutputs] = useState(['blog', 'social', 'email']);
  const fileInputRef = useRef(null);

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
    e.target.value = null; // reset input
  };

  return (
    <div className="glass-panel p-8 md:p-10 flex flex-col gap-8 fade-in">
      <div className="text-center mb-4">
        <h2 className="text-3xl mb-3 font-outfit text-white font-bold">Campaign Configuration</h2>
        <p className="text-slate-400 text-lg">Define your inputs and select exactly what assets you want to generate.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-10 relative">
        
        {/* Step 1: Source */}
        <section className="flex flex-col gap-4">
          <div className="flex justify-between items-end border-b pb-2" style={{ borderColor: 'var(--border-color)' }}>
            <div>
               <h3 className="text-lg font-bold text-white">1. Source Material</h3>
               <p className="text-xs text-slate-400 mt-1">Upload a document or paste context below.</p>
            </div>
            
            <div>
              <input type="file" accept=".txt,.md,.csv,.json" onChange={handleFileUpload} ref={fileInputRef} style={{ display: 'none' }} />
              <button type="button" onClick={() => fileInputRef.current.click()} className="btn-secondary flex items-center gap-2 px-4 py-2 text-sm rounded-lg">
                <Upload size={16} /> Upload File (.txt, .md)
              </button>
            </div>
          </div>
          <textarea 
            className="flex-1 min-h-[160px] text-base leading-relaxed"
            placeholder="e.g. Cymonic is launching a new AI pipeline platform that reduces API costs by 40%..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isProcessing}
            style={{ resize: 'vertical' }}
          />
        </section>

        {/* Step 2: Settings */}
        <section className="flex flex-col gap-4">
          <div className="border-b pb-2" style={{ borderColor: 'var(--border-color)' }}>
             <h3 className="text-lg font-bold text-white">2. Brand Voice</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-widest uppercase text-slate-400">Campaign Tone</label>
              <select value={tone} onChange={(e) => setTone(e.target.value)} disabled={isProcessing}>
                <option value="Professional & Trustworthy">Professional & Trustworthy</option>
                <option value="Bold & Disruptive">Bold & Disruptive</option>
                <option value="Conversational & Friendly">Conversational & Friendly</option>
                <option value="Urgent & Exciting">Urgent & Exciting</option>
                <option value="Highly Technical/Academic">Highly Technical/Academic</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-widest uppercase text-slate-400">Target Audience</label>
              <input 
                type="text" 
                placeholder="e.g. Software Engineers, C-Suite Execs" 
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                disabled={isProcessing}
              />
            </div>
          </div>
        </section>

        {/* Step 3: Desired Outputs */}
        <section className="flex flex-col gap-4">
          <div className="border-b pb-2" style={{ borderColor: 'var(--border-color)' }}>
             <h3 className="text-lg font-bold text-white">3. Generation Targets</h3>
             <p className="text-xs text-slate-400 mt-1">Select all formats you want the AI hive to create.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
             {OUTPUT_OPTIONS.map((opt) => {
               const isSelected = selectedOutputs.includes(opt.id);
               return (
                 <div 
                   key={opt.id}
                   onClick={() => !isProcessing && toggleOutput(opt.id)}
                   className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3`}
                   style={{ 
                      borderColor: isSelected ? 'var(--accent-primary)' : 'var(--border-color)', 
                      background: isSelected ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-dark)'
                   }}
                 >
                    <div className="mt-0.5" style={{ color: isSelected ? 'var(--accent-primary)' : '#4B5563' }}>
                       {isSelected ? <CheckSquare size={18} /> : <Square size={18} />}
                    </div>
                    <div>
                       <h4 className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-slate-300'}`}>{opt.label}</h4>
                       <p className={`text-xs mt-1 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`}>{opt.desc}</p>
                    </div>
                 </div>
               )
             })}
          </div>
        </section>
        
        <div className="pt-4">
          <button 
            type="submit" 
            className="btn-primary w-full flex items-center justify-center gap-2 p-5 text-lg rounded-xl shadow-lg hover:-translate-y-1"
            disabled={!text.trim() || isProcessing || selectedOutputs.length === 0}
          >
            {isProcessing ? <Loader2 size={24} className="animate-spin" /> : <Layers size={24} />}
            {isProcessing ? 'Initializing Agents...' : 'Initialize Factory Engine'}
          </button>
          {selectedOutputs.length === 0 && <p className="text-center text-red-400 text-sm mt-3">Please select at least one generation target.</p>}
        </div>
      </form>
    </div>
  );
}
