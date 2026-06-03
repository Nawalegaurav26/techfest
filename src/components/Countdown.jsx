import { useState, useEffect } from 'react';

export default function Countdown({ targetDate }) {
  const calcTime = () => {
    const diff = Math.max(0, new Date(targetDate) - new Date());
    return {
      days:  Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      mins:  Math.floor((diff / (1000 * 60)) % 60),
      secs:  Math.floor((diff / 1000) % 60),
    };
  };

  const [time, setTime] = useState(calcTime);

  useEffect(() => {
    const t = setInterval(() => setTime(calcTime()), 1000);
    return () => clearInterval(t);
  }, [targetDate]);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      {[
        { val: time.days,  lbl: 'DAYS' },
        { val: time.hours, lbl: 'HRS' },
        { val: time.mins,  lbl: 'MINS' },
        { val: time.secs,  lbl: 'SECS' },
      ].map((item, i) => (
        <div key={item.lbl} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div className="countdown-digit">
            <span className="num">{pad(item.val)}</span>
            <span className="lbl">{item.lbl}</span>
          </div>
          {i < 3 && <span className="countdown-sep">:</span>}
        </div>
      ))}
    </div>
  );
}
