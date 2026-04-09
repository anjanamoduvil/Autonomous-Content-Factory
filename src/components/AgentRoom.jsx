import React, { useState, useEffect, useRef } from 'react';
import { Bot, FileWarning, Search, Feather, ShieldCheck } from 'lucide-react';
import { processCampaign } from '../services/agentCoordinator';

export default function AgentRoom({ config, onComplete }) {
  const [logs, setLogs] = useState([]);
  const [activeAgent, setActiveAgent] = useState('Researcher');
  const scrollRef = useRef(null);

  useEffect(() => {
    // Start the process immediately when Room mounts
    processCampaign(config, (msgData) => {
      setLogs((prev) => [...prev, msgData]);
      if (msgData.state === 'thinking') {
        setActiveAgent(msgData.agent);
      } else if (msgData.state === 'done') {
        setActiveAgent(null);
      }
    }, onComplete);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const AgentIcon = ({ name, icon: Icon, active, color }) => (
    <div className={`flex flex-col items-center gap-2 agent-neon ${active ? 'active' : ''}`} style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-panel)' }}>
      <div style={{ background: color, padding: '12px', borderRadius: '50%', opacity: active ? 1 : 0.5, transition: 'all 0.3s' }}>
        <Icon size={32} color="#fff" />
      </div>
      <span className="font-semibold text-sm">{name}</span>
      {active && (
        <div className="typing-indicator text-xs mt-1">
          <span className="text-muted"></span><span className="text-muted"></span><span className="text-muted"></span>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full flex-1 flex flex-col gap-6 fade-in h-full">
      <h2 className="text-xl font-bold">The Agent Room</h2>
      
      {/* Visual Agent representations */}
      <div className="grid grid-cols-3 gap-6">
        <AgentIcon name="Fact-Checker" icon={Search} active={activeAgent === 'Researcher'} color="var(--accent-blue)" />
        <AgentIcon name="Copywriter" icon={Feather} active={activeAgent === 'Copywriter'} color="var(--accent-purple)" />
        <AgentIcon name="Editor-in-Chief" icon={ShieldCheck} active={activeAgent === 'Editor'} color="var(--accent-green)" />
      </div>

      {/* Live Chat / Log Feed */}
      <div className="glass-panel flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <h3 className="font-semibold flex items-center gap-2 text-sm"><Bot size={16} /> Live Collaboration Feed</h3>
        </div>
        <div className="p-4 overflow-y-auto flex-1 flex flex-col gap-4" ref={scrollRef}>
          {logs.map((log, i) => (
            <div key={i} className="flex gap-3 fade-in">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" 
                  style={{ background: log.type === 'error' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.1)' }}>
                {log.type === 'error' ? <FileWarning size={14} color="#ef4444" /> : <Bot size={14} />}
              </div>
              <div>
                <span className="text-xs font-bold text-muted block mb-1">{log.agent}</span>
                <div className="p-3 text-sm rounded-lg" style={{ background: log.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)' }}>
                  {log.msg}
                </div>
              </div>
            </div>
          ))}
          {logs.length === 0 && <p className="text-muted text-sm text-center">Initializing agents...</p>}
        </div>
      </div>
    </div>
  );
}
