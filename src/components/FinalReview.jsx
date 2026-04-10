import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Download, RefreshCcw, Layout, FileJson, Copy, Check, Play, Square } from 'lucide-react';

const OUTPUT_LABELS = {
  blog: 'Blog Post',
  social: 'Social Thread',
  email: 'Email Teaser',
  linkedin: 'LinkedIn Article',
  press: 'Press Release',
  ad: 'Ad Copy'
};

export default function FinalReview({ campaignData, sourceText, onRegenerate }) {
  const generatedKeys = Object.keys(campaignData).filter(k => !['factSheet', 'warning', 'approved'].includes(k));
  
  const [activeTab, setActiveTab] = useState('content');
  const [activeOutput, setActiveOutput] = useState(generatedKeys[0] || '');
  const [isDownloading, setIsDownloading] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);
  const [playingKey, setPlayingKey] = useState(null);

  useEffect(() => {
    if (!generatedKeys.includes(activeOutput) && generatedKeys.length > 0) {
      setActiveOutput(generatedKeys[0]);
    }
  }, [campaignData, activeOutput, generatedKeys]);

  const handleExport = async () => {
    setIsDownloading(true);
    const zip = new JSZip();
    
    zip.file("1_Source_Material.txt", sourceText);
    
    if (campaignData.factSheet) {
      zip.file("2_AI_Fact_Sheet.json", JSON.stringify(campaignData.factSheet, null, 2));
    }
    
    generatedKeys.forEach((key) => {
       zip.file(`3_${key.toUpperCase()}_Copy.md`, campaignData[key]);
    });

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "cymonic_campaign_assets.zip");
    setIsDownloading(false);
  };

  const handleCopy = async (key, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleTTS = (key, text) => {
    if (playingKey === key) {
      window.speechSynthesis.cancel();
      setPlayingKey(null);
      return;
    }
    
    window.speechSynthesis.cancel(); // kill any active speech
    
    const utterance = new SpeechSynthesisUtterance(text.replace(/[#*`_[\]]/g, ''));
    utterance.onend = () => setPlayingKey(null);
    utterance.onerror = () => setPlayingKey(null);
    
    setPlayingKey(key);
    window.speechSynthesis.speak(utterance);
  };

  const ContentCard = ({ title, contentKey }) => {
    const rawContent = campaignData[contentKey];
    if (!rawContent) return null;

    return (
      <div className="glass-panel p-8 mb-8 fade-in relative">
        <div className="flex justify-between items-center mb-6 border-b pb-4" style={{ borderColor: 'var(--border-color)' }}>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleTTS(contentKey, rawContent)}
              className={`flex items-center gap-2 text-xs py-1 px-3 rounded-md transition-all ${playingKey === contentKey ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'hover:bg-slate-700 text-slate-300'}`}
              style={{ border: playingKey === contentKey ? undefined : '1px solid var(--border-color)', background: playingKey === contentKey ? undefined : 'var(--bg-dark)', cursor: 'pointer' }}
            >
              {playingKey === contentKey ? <><Square size={14}/> Stop</> : <><Play size={14}/> Read</>}
            </button>
            <button 
              onClick={() => handleCopy(contentKey, rawContent)}
              className="flex items-center gap-2 text-xs py-1 px-3 rounded-md transition-all hover:bg-slate-700 text-slate-300"
              style={{ border: '1px solid var(--border-color)', background: 'var(--bg-dark)', cursor: 'pointer' }}
            >
              {copiedKey === contentKey ? <><Check size={14} color="var(--accent-primary)"/> Copied!</> : <><Copy size={14}/> Copy</>}
            </button>
          </div>
        </div>
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{rawContent}</ReactMarkdown>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex-1 flex flex-col fade-in h-full gap-6">
      
      {campaignData.warning && (
        <div className="p-4 rounded-lg flex items-center gap-3 fade-in" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#fca5a5' }}>
          <span className="text-sm"><strong>Editor Note:</strong> {campaignData.warning}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex justify-between items-end border-b pb-4" style={{ borderColor: 'var(--border-color)' }}>
        <div className="flex gap-4">
          <button 
            className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-all ${activeTab === 'content' ? 'text-white font-bold' : 'text-slate-500 hover:text-slate-300'}`}
            style={{ borderColor: activeTab === 'content' ? 'var(--accent-primary)' : 'transparent', background: 'transparent' }}
            onClick={() => setActiveTab('content')}
          >
            <Layout size={18} /> Developed Campaigns
          </button>
          <button 
            className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-all ${activeTab === 'truth' ? 'text-white font-bold' : 'text-slate-500 hover:text-slate-300'}`}
            style={{ borderColor: activeTab === 'truth' ? 'var(--accent-primary)' : 'transparent', background: 'transparent' }}
            onClick={() => setActiveTab('truth')}
          >
            <FileJson size={18} /> Source of Truth
          </button>
        </div>
        
        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2" onClick={onRegenerate}>
            <RefreshCcw size={16} /> Regenerate
          </button>
          <button className="btn-primary flex items-center gap-2" onClick={handleExport} disabled={isDownloading}>
            <Download size={16} /> {isDownloading ? 'Packaging...' : 'Download Kit (.zip)'}
          </button>
        </div>
      </div>

      <div className="flex gap-6 flex-1 min-h-0 overflow-hidden w-full">
        <div className="flex-1 max-w-5xl mx-auto w-full h-full flex flex-col">
          {activeTab === 'content' && (
            <div className="fade-in flex flex-col h-full w-full">
              {/* Dynamic Output Sub-Tabs */}
              <div className="flex gap-2 mb-6 p-1 rounded-lg border flex-wrap" style={{ background: 'var(--bg-dark)', width: 'fit-content', borderColor: 'var(--border-color)' }}>
                {generatedKeys.map(key => (
                  <button 
                    key={key}
                    className={`px-4 py-2 rounded-md text-sm transition-all ${activeOutput === key ? 'bg-slate-700 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-white'}`}
                    style={{ background: activeOutput === key ? 'var(--bg-sidebar)' : 'transparent', border: activeOutput === key ? '1px solid var(--border-color)' : '1px solid transparent' }}
                    onClick={() => setActiveOutput(key)}
                  >
                    {OUTPUT_LABELS[key] || key}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar pb-12 pr-4">
                {activeOutput && <ContentCard title={OUTPUT_LABELS[activeOutput] || activeOutput} contentKey={activeOutput} />}
              </div>
            </div>
          )}

          {activeTab === 'truth' && (
            <div className="fade-in pb-12 w-full flex flex-col h-full overflow-hidden">
               <div className="mb-4 shrink-0">
                <h3 className="text-xl mb-2 font-bold text-white">AI Extracted Fact-Sheet</h3>
                <p className="text-slate-400 text-sm border-l-4 pl-3" style={{ borderColor: 'var(--accent-primary)' }}>
                  This structured JSON data was generated autonomously by the <strong>Lead Research Agent</strong> and provided to the Creative Copywriter to guarantee zero hallucinations and maintain brand consistency.
                </p>
              </div>
              <div className="glass-panel p-6 overflow-auto custom-scrollbar relative flex-1">
                <button 
                  onClick={() => handleCopy('factSheet', JSON.stringify(campaignData.factSheet, null, 2))}
                  className="absolute top-4 right-4 flex items-center gap-2 text-xs py-1 px-3 rounded-md transition-all hover:bg-slate-700 text-slate-300"
                  style={{ border: '1px solid var(--border-color)', background: 'var(--bg-dark)', cursor: 'pointer', zIndex: 10 }}
                >
                   {copiedKey === 'factSheet' ? <><Check size={14} color="var(--accent-primary)"/> Copied!</> : <><Copy size={14}/> Copy</>}
                </button>
                <pre className="text-sm font-mono" style={{ color: '#E5E7EB' }}>
                  {campaignData.factSheet 
                    ? JSON.stringify(campaignData.factSheet, null, 2) 
                    : "No structured data available."}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
