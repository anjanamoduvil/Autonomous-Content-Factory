import React, { useState } from 'react';
import UploadStage from './components/UploadStage';
import AgentRoom from './components/AgentRoom';
import FinalReview from './components/FinalReview';
import './index.css';

function App() {
  const [stage, setStage] = useState('upload'); // 'upload', 'processing', 'review'
  const [config, setConfig] = useState({ sourceText: '', tone: '', audience: '' });
  const [campaignData, setCampaignData] = useState(null);

  const handleStartProcessing = (options) => {
    setConfig(options);
    setStage('processing');
  };

  const handleProcessingComplete = (data) => {
    setCampaignData(data);
    setStage('review');
  };

  const handleReset = () => {
    setStage('upload');
    setConfig({ sourceText: '', tone: '', audience: '' });
    setCampaignData(null);
  };

  return (
    <div className="container h-screen flex flex-col items-center py-8">
      <header className="w-full flex justify-between items-center mb-8 fade-in">
        <div>
          <h1 className="text-2xl" style={{ margin: 0, background: 'linear-gradient(to right, #2563eb, #9333ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
            Cymonic Autonomous Content Factory
          </h1>
          <p className="text-muted text-sm mt-1">Multi-Agent AI Marketing Campaign Builder by Cymonic AI</p>
        </div>
        {stage !== 'upload' && (
          <button className="btn-secondary text-sm" onClick={handleReset}>
            Start Over
          </button>
        )}
      </header>

      <main className="w-full flex-1 flex flex-col mb-8">
        {stage === 'upload' && <UploadStage onStart={handleStartProcessing} />}
        {stage === 'processing' && <AgentRoom config={config} onComplete={handleProcessingComplete} />}
        {stage === 'review' && <FinalReview campaignData={campaignData} sourceText={config.sourceText} onRegenerate={() => setStage('processing')} />}
      </main>

      <footer className="w-full text-center text-muted text-xs py-4 fade-in">
        Powered by <a href="https://cymonic.ai/" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>Cymonic.ai Intelligence</a>
      </footer>
    </div>
  );
}

export default App;
