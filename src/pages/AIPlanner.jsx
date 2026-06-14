import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, RefreshCw } from 'lucide-react';
import { AI_PROMPTS } from '../data';

const SYSTEM_PROMPT = (subjects, tasks) => `You are StudyMate AI, a friendly and highly effective personalized study planner assistant.

The student's current subjects:
${subjects.map(s => `- ${s.name}: ${s.progress}% complete, exam on ${s.examDate}, avg score ${s.avgScore}%, ${s.hoursWeek}h/week`).join('\n')}

Pending tasks: ${tasks.filter(t => !t.done).length} tasks remaining (${tasks.filter(t => !t.done).map(t => t.title).join(', ')})

Your role:
- Build personalized study plans and schedules
- Identify weak areas and give targeted advice
- Suggest revision strategies (Pomodoro, spaced repetition, active recall)
- Give motivational, concise guidance
- Always be practical and specific to their subjects

Keep responses under 180 words. Use plain text with occasional emoji. Be warm, direct, and encouraging.`;

export default function AIPlanner({ subjects, tasks }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi! I'm your AI study planner!\n\nI can see you have ${subjects.length} subjects and ${tasks.filter(t => !t.done).length} pending tasks. Your nearest exam is ${[...subjects].sort((a,b) => new Date(a.examDate)-new Date(b.examDate))[0]?.name} — let's make sure you're ready!\n\nWhat do you need help with?`,
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;
    setInput('');
    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const apiMessages = newMessages.map(m => ({ role: m.role, content: m.content }));
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          system: SYSTEM_PROMPT(subjects, tasks),
          messages: apiMessages,
        }),
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      const reply = data.content?.map(c => c.text || '').join('').trim();
      setMessages(prev => [...prev, { role: 'assistant', content: reply || "I'm having trouble connecting. Please try again!" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Hmm, I couldn't reach the AI right now. Check your connection and try again!" }]);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setMessages([{ role: 'assistant', content: `Hi again! I'm your AI study planner. What would you like to work on?` }]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <Sparkles size={14}/>
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#F1F5FF' }}>StudyMate AI</div>
            <div style={{ fontSize: 11, color: '#22C55E', display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E' }}/>
              Powered by Claude
            </div>
          </div>
        </div>
        <button onClick={reset} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#94A3B8', fontSize: 12, cursor: 'pointer' }}>
          <RefreshCw size={13}/> New chat
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 12, display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0, maxHeight: 'calc(100vh - 340px)' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: m.role === 'assistant' ? 'linear-gradient(135deg,#6366F1,#8B5CF6)' : '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#fff' }}>
              {m.role === 'assistant' ? <Sparkles size={12}/> : <User size={12}/>}
            </div>
            <div style={{ padding: '10px 14px', borderRadius: m.role === 'assistant' ? '4px 12px 12px 12px' : '12px 4px 12px 12px', fontSize: 13, lineHeight: 1.65, background: m.role === 'assistant' ? 'rgba(255,255,255,0.05)' : '#6366F1', color: m.role === 'assistant' ? '#CBD5E1' : '#fff', maxWidth: '80%' }}>
              {m.content.split('\n').map((line, j) => (<span key={j}>{line}{j < m.content.split('\n').length - 1 && <br/>}</span>))}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#6366F1,#8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <Sparkles size={12}/>
            </div>
            <div style={{ padding: '12px 16px', borderRadius: '4px 12px 12px 12px', background: 'rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#64748B', animation: 'dotBounce 0.9s infinite', animationDelay: `${i*0.2}s` }}/>
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {messages.length <= 2 && !loading && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: '#475569', marginBottom: 8 }}>Suggested questions</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {AI_PROMPTS.map((p, i) => (
              <button key={i} onClick={() => send(p)} style={{ fontSize: 12, padding: '5px 12px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: '#94A3B8', cursor: 'pointer' }}>{p}</button>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <input
          style={{ flex: 1, padding: '10px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#F1F5FF', fontSize: 13, outline: 'none', fontFamily: 'inherit' }}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
          placeholder="Ask anything about your study plan..."
          disabled={loading}
        />
        <button onClick={() => send()} disabled={loading || !input.trim()} style={{ width: 40, height: 40, borderRadius: 10, background: '#6366F1', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, opacity: loading || !input.trim() ? 0.5 : 1 }}>
          <Send size={15}/>
        </button>
      </div>
      <style>{`@keyframes dotBounce { 0%,60%,100% { transform:translateY(0); } 30% { transform:translateY(-5px); } }`}</style>
    </div>
  );
}
