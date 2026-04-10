import React from 'react';
import { Layers, ArrowRight, Zap, Shield, FileText } from 'lucide-react';

export default function Landing({ onGetStarted }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center fade-in overflow-y-auto pt-16 pb-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        {/* Hero Section */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-emerald-400 text-sm font-bold mb-8" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
          <Zap size={16} /> V8 Dark Pattern
        </div>
        
        <h1 className="text-5xl md:text-6xl font-outfit text-white mb-6 leading-tight">
          The <span className="text-emerald-500">Autonomous</span> Content Factory
        </h1>
        
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Powered by Cymonic AI. Upload your raw facts, select your target audience, and let our multi-agent hive dynamically generate infinite marketing assets in seconds.
        </p>

        <button 
          onClick={onGetStarted}
          className="btn-primary text-xl px-10 py-5 rounded-xl shadow-lg flex items-center justify-center gap-3 mx-auto hover:-translate-y-1 transition-transform"
        >
          Get Started <ArrowRight size={24} />
        </button>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 text-left">
          <div className="glass-panel p-6 shadow-sm">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
              <Layers size={24} />
            </div>
            <h3 className="text-xl mb-2 font-bold text-white">Multi-Agent Hive</h3>
            <p className="text-slate-400 text-sm leading-relaxed">An entire suite of specialized AI agents working together (Researchers, Copywriters, Editors) to ensure perfect output format.</p>
          </div>

          <div className="glass-panel p-6 shadow-sm">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-primary)' }}>
              <Shield size={24} />
            </div>
            <h3 className="text-xl mb-2 font-bold text-white">Zero Hallucination</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Our advanced Fact-Sheet architecture extracts pure data from your sources, forcing creative agents to adhere strictly to truth.</p>
          </div>

          <div className="glass-panel p-6 shadow-sm">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
              <FileText size={24} />
            </div>
            <h3 className="text-xl mb-2 font-bold text-white">Dynamic Publishing</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Instantly reformat raw data into Blogs, Press Releases, LinkedIn Articles, and Email Threads all at the exact same time.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
