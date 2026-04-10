import React, { useEffect, useState, useRef } from 'react';
import { processCampaign } from '../services/agentCoordinator.js';
import { Bot, CheckCircle2, ChevronRight, FileWarning } from 'lucide-react';

export default function AgentRoom({ config, onComplete }) {
  const [logs, setLogs] = useState([]);
  const [agentsFinished, setAgentsFinished] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    
    setLogs([{ agent: 'System', msg: 'Factory Engine ignited. Delegating campaign parameters...', status: 'info', type: 'system' }]);

    const run = async () => {
      try {
        const finalData = await processCampaign(config, (log) => {
          if (isMounted) setLogs(prev => [...prev, log]);
        });
        
        if (isMounted) {
          setAgentsFinished(true);
          setTimeout(() => onComplete(finalData), 1500);
        }
      } catch (err) {
        if (isMounted) {
          setLogs(prev => [...prev, { agent: 'Error', msg: 'The hive failed to compile the request.', status: 'error', type: 'error' }]);
        }
      }
    };
    run();
    return () => { isMounted = false; };
  }, [config, onComplete]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center fade-in">
      
      {/* Visual Status Ring */}
      <div className="relative w-32 h-32 mb-10 flex items-center justify-center">
        {!agentsFinished ? (
          <>
            {/* Dark elegant dual spinners */}
            <div className="absolute inset-0 rounded-full border-t-2 border-emerald-500 animate-spin-slow" style={{ opacity: 0.8 }}></div>
            <div className="absolute inset-2 rounded-full border-b-2 border-emerald-300 animate-spin-reverse-slow" style={{ opacity: 0.5 }}></div>
            <div className="bg-slate-800 rounded-full w-20 h-20 flex items-center justify-center shadow-lg border border-slate-700">
               <Bot size={32} color="var(--accent-primary)" />
            </div>
          </>
        ) : (
          <div className="bg-emerald-500 rounded-full w-24 h-24 flex items-center justify-center shadow-lg fade-in">
            <CheckCircle2 size={48} color="white" />
          </div>
        )}
      </div>

      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl flex flex-col" style={{ height: '400px' }}>
        <div className="bg-slate-800 p-4 border-b border-slate-700 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 opacity-80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 opacity-80"></div>
          <span className="ml-3 text-xs font-bold text-slate-400 tracking-wider">CYMONIC HIVE FEED</span>
        </div>
        
        <div className="p-4 overflow-y-auto flex-1 flex flex-col gap-4 custom-scrollbar" ref={scrollRef}>
          {logs.map((log, i) => (
            <div key={i} className="flex gap-3 fade-in">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm" 
                  style={{ background: log.type === 'error' ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)' }}>
                {log.type === 'error' ? <FileWarning size={14} color="#ef4444" /> : <Bot size={14} color="var(--accent-primary)" />}
              </div>
              <div className="flex-1">
                <span className="text-xs font-bold text-slate-400 block mb-1">{log.agent}</span>
                <div className="p-3 text-sm rounded-lg text-slate-300" style={{ background: log.type === 'error' ? 'rgba(239,68,68,0.1)' : 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}>
                  {log.msg}
                </div>
              </div>
            </div>
          ))}
          {!agentsFinished && (
            <div className="flex gap-3 fade-in mt-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)'}}>
                <Bot size={14} color="var(--text-muted)" />
              </div>
              <div className="flex items-center">
                <span className="text-xs text-slate-500 flex items-center gap-2 typing-indicator">
                  Processing <span></span><span></span><span></span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
