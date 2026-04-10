import React from 'react';
import CymonicLogo from './CymonicLogo';
import { ArrowRight, Mic, Play, Settings, Download, Network, FileText, Sparkles } from 'lucide-react';

export default function Landing({ onGetStarted }) {
  const features = [
    {
      icon: <Mic size={24} />,
      title: "Voice-to-Text Dictation",
      desc: "Native Web Speech API allows you to dictate raw facts directly into the system.",
    },
    {
      icon: <Network size={24} />,
      title: "Multi-Agent Workflow",
      desc: "Llama-3 powered Researcher, Copywriter, and Editor agents working in sequence.",
    },
    {
      icon: <FileText size={24} />,
      title: "Omni-Channel Export",
      desc: "Simultaneously generate distinct, formatted assets for Blogs, Social, and Email.",
    },
    {
      icon: <Play size={24} />,
      title: "AI Audio Reader",
      desc: "Instantly convert generated markdown copy into synthesized speech for review.",
    },
    {
      icon: <Settings size={24} />,
      title: "SEO & Brand Injection",
      desc: "Strictly enforce targeted SEO keywords and internal metadata constraints.",
    },
    {
      icon: <Download size={24} />,
      title: "Asset Packaging",
      desc: "Bundle all approved campaign assets and the Fact-Sheet JSON into a .ZIP archive.",
    }
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden" style={{ backgroundColor: 'var(--bg-dark)' }}>
      
      {/* Background Mask */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 100% 0%, rgba(16, 185, 129, 0.4) 0%, transparent 60%)' }} />

      {/* Top Header */}
      <nav style={{ width: '100%', padding: '24px 40px', display: 'flex', justifyContent: 'space-between' }}>
        <CymonicLogo size="lg" />
      </nav>

      {/* Main Content */}
      <main style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Top Hero Section: Pure CSS Flex Split */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '48px', minHeight: '50vh', marginTop: '40px', marginBottom: '96px' }}>
          
          {/* Left Column: Heading & Button */}
          <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
            <h1 className="text-5xl lg:text-7xl font-outfit text-white font-bold mb-6 tracking-tight leading-[1.1]">
              Autonomous<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Marketing Factory</span>
            </h1>
            
            <p className="text-slate-400 text-lg lg:text-xl font-body mb-10 leading-relaxed max-w-lg">
              Inject raw facts. Configure voice vectors. Let the Multi-Agent engine forge professional blogs, social threads, and emails in seconds.
            </p>
            
            <button 
              onClick={onGetStarted}
              className="group relative flex flex-row items-center justify-center gap-3 font-bold text-lg text-white transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.5)] hover:-translate-y-1"
              style={{ 
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                color: 'white', 
                borderRadius: '8px',
                padding: '16px 32px',
                border: 'none',
                cursor: 'pointer',
                width: 'fit-content' // STRICTLY forces button not to stretch!
              }}
            >
              Ignite Factory Engine <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Column: Hero Image */}
          <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
            <img 
              src="/Screenshot_2026-04-10_155242-removebg-preview.png" 
              alt="AI Agent Collaborative Team" 
              style={{ width: '100%', maxWidth: '550px', borderRadius: '16px', animation: 'float 6s ease-in-out infinite' }}
            />
          </div>

        </div>

        {/* Bottom Section: 3 Boxes in a row */}
        <div style={{ width: '100%', textAlign: 'center', marginTop: '48px', marginBottom: '32px' }}>
          <span className="text-xs font-bold tracking-widest text-emerald-500 uppercase">Architecture Modules</span>
        </div>

        {/* 3-column pure CSS grid container */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', width: '100%', paddingBottom: '80px' }}>
          {features.map((opt, i) => (
            <div key={i} className="glass-panel hover:border-emerald-500/30 hover:bg-slate-800/80 transition-all fade-in" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', animationDelay: `${i * 0.1}s` }}>
               <div style={{ width: '48px', height: '48px', borderRadius: '8px', backgroundColor: 'rgba(16,185,129,0.1)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                 {opt.icon}
               </div>
               <h3 className="text-xl text-white font-bold mb-3">{opt.title}</h3>
               <p className="text-sm text-slate-400 leading-relaxed">{opt.desc}</p>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
