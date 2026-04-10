import React, { useState, useEffect } from 'react';
import Landing from './components/Landing';
import UploadStage from './components/UploadStage';
import AgentRoom from './components/AgentRoom';
import FinalReview from './components/FinalReview';
import { Layers, RefreshCcw } from 'lucide-react';
import CymonicLogo from './components/CymonicLogo';
import './index.css';

function App() {
  // Force route to Landing on hard refresh, but keep forms cached
  const [stage, setStage] = useState('landing');
  
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('cymonic_config');
    return saved ? JSON.parse(saved) : { sourceText: '', tone: '', audience: '', outputs: [] };
  });
  
  const [campaignData, setCampaignData] = useState(() => {
    const saved = localStorage.getItem('cymonic_campaign');
    return saved ? JSON.parse(saved) : null;
  });

  // Sync state cleanly to storage
  useEffect(() => {
    localStorage.setItem('cymonic_stage', stage);
    localStorage.setItem('cymonic_config', JSON.stringify(config));
    if (campaignData) {
      localStorage.setItem('cymonic_campaign', JSON.stringify(campaignData));
    } else {
      localStorage.removeItem('cymonic_campaign');
    }
  }, [stage, config, campaignData]);

  const handleStartProcessing = (options) => {
    setConfig(options);
    setCampaignData(null);
    setStage('processing');
  };

  const handleProcessingComplete = (data) => {
    setCampaignData(data);
    setStage('review');
  };

  // Give users a way to wipe the cache fully
  const handleReset = () => {
    localStorage.clear();
    setCampaignData(null);
    setConfig({ sourceText: '', tone: '', audience: '', outputs: [] });
    setStage('config');
  };

  return (
    <div className="w-full flex flex-col min-h-screen" style={{ backgroundColor: 'var(--bg-dark)' }}>
      
      {/* Global Header */}
      {stage !== 'landing' && (
        <header className="w-full border-b px-8 py-4 flex justify-between items-center z-20 shrink-0 shadow-sm fade-in" style={{ backgroundColor: 'var(--bg-sidebar)', borderColor: 'var(--border-color)' }}>
          <div className="flex items-center cursor-pointer" onClick={() => setStage('landing')}>
            <CymonicLogo size="sm" hideText={false} />
            <div className="h-6 border-l border-slate-600 mx-4"></div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mt-1">Content Factory</span>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Visual Node Stepper */}
            <div className="hidden md:flex items-center gap-3 text-xs font-bold">
              <div className={`flex items-center gap-2 ${stage === 'config' ? 'text-emerald-400' : 'text-slate-500'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${stage === 'config' ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>1</div>
                <span>Configure</span>
              </div>
              <div className="w-8 h-px bg-slate-700"></div>
              
              <div className={`flex items-center gap-2 ${stage === 'processing' ? 'text-emerald-400' : 'text-slate-500'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${stage === 'processing' ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>2</div>
                <span>Generate</span>
              </div>
              <div className="w-8 h-px bg-slate-700"></div>

              <div className={`flex items-center gap-2 ${stage === 'review' ? 'text-emerald-400' : 'text-slate-500'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${stage === 'review' ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>3</div>
                <span>Publish</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              <button onClick={() => setStage('landing')} className="flex items-center justify-center p-2 rounded-full text-slate-500 hover:text-emerald-400 hover:bg-slate-800 transition-all" title="Return to Home">
                <Layers size={18} />
              </button>
              <button onClick={handleReset} className="flex items-center justify-center p-2 rounded-full text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-all" title="Hard Reset Memory">
                <RefreshCcw size={18} />
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Main Wizard Canvas */}
      <main className="flex-1 relative z-0 flex flex-col">
        
        {stage === 'landing' && <Landing onGetStarted={() => setStage('config')} />}

        {stage === 'config' && (
          <div className="w-full p-6 md:p-12 mb-12">
            <div className="max-w-7xl mx-auto w-full fade-in">
              <UploadStage onStart={handleStartProcessing} isProcessing={false} />
            </div>
          </div>
        )}

        {stage === 'processing' && (
          <div className="w-full p-6 md:p-12 h-screen max-h-screen">
            <div className="max-w-5xl mx-auto w-full h-full fade-in flex flex-col">
              <AgentRoom config={config} onComplete={handleProcessingComplete} />
            </div>
          </div>
        )}

        {stage === 'review' && (
          <div className="w-full p-6 md:p-12 h-full">
            <div className="max-w-6xl mx-auto w-full h-full flex flex-col pb-12">
               <FinalReview campaignData={campaignData} sourceText={config.sourceText} onRegenerate={() => setStage('processing')} />
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;
