import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, Settings, Upload } from 'lucide-react';

export default function UploadStage({ onStart }) {
  const [text, setText] = useState('');
  const [tone, setTone] = useState('Professional & Trustworthy');
  const [audience, setAudience] = useState('');
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onStart({ 
        sourceText: text.trim(), 
        tone, 
        audience: audience.trim() || 'General Audience' 
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
    <div className="glass-panel p-8 fade-in w-full max-w-2xl mx-auto mt-8 flex flex-col gap-6">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div style={{ background: 'rgba(37, 99, 235, 0.1)', padding: '16px', borderRadius: '50%' }}>
            <UploadCloud size={48} color="var(--accent-blue)" />
          </div>
        </div>
        <h2 className="text-xl mb-2">Provide Source Material</h2>
        <p className="text-muted text-sm">
          Upload a document or paste your text below. Cymonic AI agents will transform it into a full marketing campaign.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* Upload Button */}
        <div className="flex justify-end">
          <input 
            type="file" 
            accept=".txt,.md,.csv,.json"
            onChange={handleFileUpload} 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
          />
          <button 
            type="button" 
            onClick={() => fileInputRef.current.click()}
            className="btn-secondary flex items-center justify-center gap-2 px-4 py-2 text-sm"
          >
            <Upload size={16} />
            Upload File (.txt, .md)
          </button>
        </div>

        <textarea 
          rows={8} 
          placeholder="e.g. Cymonic is launching a new AI-powered widget that saves 20 hours a week..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ resize: 'vertical' }}
        />

        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium flex items-center gap-2 text-muted"><Settings size={14} /> Campaign Tone</label>
            <select 
              value={tone} 
              onChange={(e) => setTone(e.target.value)}
              className="p-3"
              style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none' }}
            >
              <option value="Professional & Trustworthy">Professional & Trustworthy</option>
              <option value="Bold & Disruptive">Bold & Disruptive</option>
              <option value="Conversational & Friendly">Conversational & Friendly</option>
              <option value="Urgent & Exciting">Urgent & Exciting</option>
              <option value="Highly Technical/Academic">Highly Technical/Academic</option>
            </select>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium flex items-center gap-2 text-muted"><Settings size={14} /> Target Audience</label>
            <input 
              type="text" 
              placeholder="e.g. C-Suite Execs, Students" 
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="p-3"
              style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none' }}
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          className="btn-primary flex items-center justify-center gap-2 p-4 text-xl mt-4"
          disabled={!text.trim()}
        >
          <FileText size={20} />
          Start the Cymonic Factory
        </button>
      </form>
    </div>
  );
}
