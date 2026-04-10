import React, { useState } from 'react';
import Landing from './components/Landing';
import UploadStage from './components/UploadStage';
import AgentRoom from './components/AgentRoom';
import FinalReview from './components/FinalReview';
import { Layers } from 'lucide-react';
import './index.css';

function App() {
  const [stage, setStage] = useState('landing'); // 'landing', 'config', 'processing', 'review'
  const [config, setConfig] = useState({ sourceText: '', tone: '', audience: '', outputs: [] });
  const [campaignData, setCampaignData] = useState(null);

  const handleStartProcessing = (options) => {
    setConfig(options);
    setCampaignData(null);
    setStage('processing');
  };

  const handleProcessingComplete = (data) => {
    setCampaignData(data);
    setStage('review');
  };

  return (
    <div className="w-full flex flex-col min-h-screen" style={{ backgroundColor: 'var(--bg-dark)' }}>
      
      {/* Global Header */}
      {stage !== 'landing' && (
        <header className="w-full border-b px-8 py-4 flex justify-between items-center z-20 shrink-0 shadow-sm fade-in" style={{ backgroundColor: 'var(--bg-sidebar)', borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setStage('landing')}>
            <div className="p-2 rounded-lg" style={{ background: 'rgba(16, 185, 129, 0.1)'}}>
              <Layers size={22} color="var(--accent-primary)" />
            </div>
            <div>
              <h1 className="text-xl font-outfit text-white" style={{ margin: 0, lineHeight: 1 }}>Cymonic</h1>
              <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Content Factory</span>
            </div>
          </div>
          
          {/* Stepper */}
          <div className="hidden md:flex items-center gap-4 text-sm font-semibold">
            <span className={stage === 'config' ? 'text-white' : 'text-slate-500'}>1. Configure</span>
            <span className="text-slate-600">-----</span>
            <span className={stage === 'processing' ? 'text-white' : 'text-slate-500'}>2. Generate</span>
            <span className="text-slate-600">-----</span>
            <span className={stage === 'review' ? 'text-white' : 'text-slate-500'}>3. Publish</span>
          </div>
        </header>
      )}

      {/* Main Wizard Canvas */}
      <main className="flex-1 relative z-0 flex flex-col">
        
        {stage === 'landing' && <Landing onGetStarted={() => setStage('config')} />}

        {stage === 'config' && (
          <div className="w-full p-6 md:p-12 mb-12">
            <div className="max-w-4xl mx-auto w-full fade-in">
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
