import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Download, Monitor, Smartphone, RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function FinalReview({ campaignData, sourceText, onRegenerate }) {
  const [deviceView, setDeviceView] = useState('desktop');

  const handleExport = async () => {
    const zip = new JSZip();
    zip.file('01_Blog_Post.md', campaignData.blog || 'No blog data');
    zip.file('02_Social_Thread.txt', campaignData.social || 'No social data');
    zip.file('03_Email_Teaser.txt', campaignData.email || 'No email data');
    
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'Campaign_Kit.zip');
  };

  return (
    <div className="w-full h-full flex gap-6 fade-in overflow-hidden">
      {/* Left panel: Source text (read-only) */}
      <div className="glass-panel w-1/3 flex flex-col p-6 overflow-hidden">
        <h3 className="font-semibold mb-4 text-muted">Original Source</h3>
        <div className="flex-1 overflow-y-auto text-sm bg-black/20 p-4 rounded-lg" style={{ whiteSpace: 'pre-wrap' }}>
          {sourceText}
        </div>
      </div>

      {/* Right panel: Final output */}
      <div className="glass-panel w-2/3 flex flex-col overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center bg-black/20" style={{ borderColor: 'var(--border-color)' }}>
          <h3 className="font-semibold flex items-center gap-2">
            Final Campaign Assets
            {campaignData.warning && <AlertTriangle size={16} color="#ef4444" title={campaignData.warning} />}
          </h3>
          <div className="flex gap-2">
            <button className={`p-2 rounded-md ${deviceView === 'desktop' ? 'bg-white/10' : ''}`} onClick={() => setDeviceView('desktop')} title="Desktop View">
              <Monitor size={16} />
            </button>
            <button className={`p-2 rounded-md ${deviceView === 'mobile' ? 'bg-white/10' : ''}`} onClick={() => setDeviceView('mobile')} title="Mobile View">
              <Smartphone size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto w-full flex flex-col gap-8">
          <div className={`mx-auto transition-all duration-300 ${deviceView === 'mobile' ? 'max-w-sm' : 'w-full'}`}>
            
            <section className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-accent-blue font-bold tracking-wide text-xs uppercase" style={{ color: 'var(--accent-blue)' }}>Blog Post</h4>
                <div className="flex gap-2">
                  <button className="text-xs flex items-center gap-1 text-muted hover:text-white"><RefreshCw size={12} /> Regenerate</button>
                </div>
              </div>
              <div className="bg-black/30 p-4 rounded-lg text-sm leading-relaxed" style={{ whiteSpace: 'pre-wrap' }}>
                {campaignData.blog}
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-accent-purple font-bold tracking-wide text-xs uppercase" style={{ color: 'var(--accent-purple)' }}>Social Thread</h4>
              </div>
              <div className="bg-black/30 p-4 rounded-lg text-sm leading-relaxed" style={{ whiteSpace: 'pre-wrap', borderLeft: '4px solid var(--accent-purple)' }}>
                {campaignData.social}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-accent-green font-bold tracking-wide text-xs uppercase" style={{ color: 'var(--accent-green)' }}>Email Teaser</h4>
              </div>
              <div className="bg-black/30 p-4 rounded-lg text-sm leading-relaxed" style={{ whiteSpace: 'pre-wrap' }}>
                {campaignData.email}
              </div>
            </section>

          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t flex justify-end gap-3 bg-black/20" style={{ borderColor: 'var(--border-color)' }}>
          <button className="btn-secondary flex items-center gap-2" onClick={onRegenerate}>
            <RefreshCw size={16} /> Discard & Rethink
          </button>
          <button className="btn-primary flex items-center gap-2" onClick={handleExport}>
            <Download size={16} /> Download Campaign Kit (.zip)
          </button>
        </div>
      </div>
    </div>
  );
}
