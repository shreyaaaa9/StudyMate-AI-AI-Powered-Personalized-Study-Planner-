import React from 'react';
import { CalendarDays } from 'lucide-react';
import { SUBJECT_COLORS } from '../data';
import { daysUntil, formatDate, urgencyColor } from '../utils/helpers';

export default function Exams({ subjects }) {
  const sorted = [...subjects].sort((a, b) => new Date(a.examDate) - new Date(b.examDate));
  const tips = {
    urgent: ['Do a full mock exam today', 'Review all formulas once more', 'Sleep 8h before exam day', 'Stop new topics — consolidate'],
    soon: ['Complete remaining topics', 'Start timed practice tests', 'Build your formula sheet', 'Review past mistakes'],
    ok: ['Keep steady daily progress', 'Cover all syllabus topics', 'Build strong foundations', 'Practice active recall'],
  };
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 20 }}>
        {sorted.map(s => {
          const days = daysUntil(s.examDate);
          const col = SUBJECT_COLORS[s.name] || { main: '#6366F1' };
          const urg = urgencyColor(days);
          const urgKey = days <= 10 ? 'urgent' : days <= 21 ? 'soon' : 'ok';
          return (
            <div key={s.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '16px 18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#F1F5FF', marginBottom: 3 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: '#64748B', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <CalendarDays size={11}/> {formatDate(s.examDate)}
                  </div>
                </div>
                <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, fontWeight: 700, background: urg.bg, color: urg.text }}>{days <= 0 ? 'Today!' : `${days}d left`}</span>
              </div>
              <div style={{ textAlign: 'center', padding: '12px 0', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: 14 }}>
                <div style={{ fontSize: 48, fontWeight: 800, color: col.main, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>{Math.max(0, days)}</div>
                <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>days remaining</div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 11, color: '#64748B' }}>Syllabus coverage</span>
                  <span style={{ fontSize: 12, color: col.main, fontWeight: 600 }}>{s.progress}%</span>
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${s.progress}%`, background: col.main, borderRadius: 4, transition: 'width 0.6s' }} />
                </div>
              </div>
              <div style={{ fontSize: 11, color: '#64748B', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {urgKey === 'urgent' ? '⚡ Urgent tips' : urgKey === 'soon' ? '📋 Prep tips' : '📚 Study tips'}
              </div>
              {tips[urgKey].map((tip, i) => (
                <div key={i} style={{ display: 'flex', gap: 7, alignItems: 'flex-start', marginBottom: 6 }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: col.main, marginTop: 5, flexShrink: 0 }} />
                  <div style={{ fontSize: 12, color: '#94A3B8' }}>{tip}</div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '16px 20px' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#94A3B8', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.6px' }}>Exam timeline</div>
        <div style={{ position: 'relative', paddingLeft: 24 }}>
          <div style={{ position: 'absolute', left: 7, top: 8, bottom: 8, width: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }} />
          {sorted.map((s, i) => {
            const days = daysUntil(s.examDate);
            const col = SUBJECT_COLORS[s.name] || { main: '#6366F1' };
            const urg = urgencyColor(days);
            return (
              <div key={s.id} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: i < sorted.length - 1 ? 20 : 0, position: 'relative' }}>
                <div style={{ position: 'absolute', left: -20, top: 3, width: 10, height: 10, borderRadius: '50%', background: col.main, border: '2px solid #0B0F1A', zIndex: 1 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#E2E8F0' }}>{s.name}</div>
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 10, background: urg.bg, color: urg.text, fontWeight: 600 }}>{days}d</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>{formatDate(s.examDate)} · {s.progress}% ready</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
