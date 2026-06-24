/* Techfest 2026 — Telemetry Log 22 // EVENT REGISTRATION FLOW */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { soundEffects } from '../utils/soundEffects';

const EVENTS_LIST = [
  { id: 'ev1',  name: 'ROBOWAR SIGMA',        category: 'COMPETITION',  prize: '₹3,00,000', maxTeam: 4, deadline: 'Dec 10',  slots: '64 slots', color: '#ff2d55' },
  { id: 'ev2',  name: 'CODE BREACH',          category: 'HACKATHON',   prize: '₹1,00,000', maxTeam: 3, deadline: 'Dec 12',  slots: '120 slots', color: '#00f2ff' },
  { id: 'ev3',  name: 'DRONE WARS',           category: 'COMPETITION',  prize: '₹80,000',  maxTeam: 2, deadline: 'Dec 15',  slots: '32 slots', color: '#a855f7' },
  { id: 'ev4',  name: 'AI DESIGN JAM',        category: 'WORKSHOP',     prize: '₹40,000',  maxTeam: 2, deadline: 'Dec 18',  slots: '60 slots', color: '#00f5c4' },
  { id: 'ev5',  name: 'CIRCUIT WIZARDS',      category: 'COMPETITION',  prize: '₹60,000',  maxTeam: 3, deadline: 'Dec 14',  slots: '48 slots', color: '#ff8c00' },
  { id: 'ev6',  name: 'BRIDGE BUILDER',       category: 'COMPETITION',  prize: '₹50,000',  maxTeam: 4, deadline: 'Dec 20',  slots: '80 slots', color: '#6ee7b7' },
  { id: 'ev7',  name: 'STOCK MARKET SIM',     category: 'WORKSHOP',     prize: '₹30,000',  maxTeam: 1, deadline: 'Dec 22',  slots: '200 slots', color: '#fbbf24' },
  { id: 'ev8',  name: 'QUANTUM LOCK',         category: 'COMPETITION',  prize: '₹45,000',  maxTeam: 2, deadline: 'Dec 16',  slots: '24 slots', color: '#a855f7' },
];

const STEPS = ['SELECT EVENT', 'TEAM SETUP', 'DETAILS', 'CONFIRM'];

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  fontFamily: 'var(--font-mono)',
  fontSize: '14px',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.25)',
  color: '#fff',
  outline: 'none',
  borderRadius: '0px',
  transition: 'border-color 0.2s',
};

function StepIndicator({ current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px', gap: '0px' }}>
      {STEPS.map((step, i) => {
        const done   = i < current;
        const active = i === current;
        return (
          <div key={step} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '28px', height: '28px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `1px solid ${active ? 'var(--sky)' : done ? 'var(--green)' : 'rgba(255,255,255,0.15)'}`,
                background: active ? 'rgba(56,189,248,0.15)' : done ? 'rgba(0,245,196,0.12)' : 'transparent',
                fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700,
                color: active ? 'var(--sky)' : done ? 'var(--green)' : 'rgba(189,200,209,0.3)',
                transition: 'all 0.3s',
              }}>
                {done ? '✓' : i + 1}
              </div>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '7px', letterSpacing: '0.1em',
                color: active ? 'var(--sky)' : done ? 'var(--green)' : 'rgba(189,200,209,0.3)',
                whiteSpace: 'nowrap',
              }}>
                {step}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{
                flex: 1, height: '1px', margin: '0 8px', marginTop: '-20px',
                background: done ? 'var(--green)' : 'rgba(255,255,255,0.1)',
                transition: 'background 0.3s',
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep]               = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [catFilter, setCatFilter]     = useState('ALL');
  const [teamName, setTeamName]       = useState('');
  const [members, setMembers]         = useState([{ name: '', email: '', role: '' }]);
  const [details, setDetails]         = useState({ institution: '', phone: '', city: '', referral: '' });
  const [submitted, setSubmitted]     = useState(false);
  const [loading, setLoading]         = useState(false);
  const [refState, setRefState]       = useState('idle'); // idle, validating, success, error
  const [refLogs, setRefLogs]         = useState([]);

  const handleVerifyReferral = async () => {
    if (!details.referral.trim()) return;
    setRefState('validating');
    setRefLogs([]);
    soundEffects.playClick?.();

    const logs = [
      '[SYS] INITIALIZING CRYPTO INTERRUPT...',
      `[SYS] CAPTURED SIGNATURE: "${details.referral.toUpperCase()}"`,
      '[SYS] DECRYPTING ENCRYPTION HASH...',
      '[SYS] COMPARING WITH CENTRAL DATA NODES...'
    ];

    for (let i = 0; i < logs.length; i++) {
      setRefLogs(prev => [...prev, logs[i]]);
      await new Promise(r => setTimeout(r, 250));
    }

    const pattern = /^TF26-[A-Z0-9]{4,6}$/i;
    const isValid = pattern.test(details.referral.trim());

    if (isValid) {
      setRefLogs(prev => [...prev, '[SYS] STATUS: REFERRAL SIGNATURE VALIDATED', '[SYS] NOTE: 10% DISCOUNT TRACE APPLIED.']);
      setRefState('success');
    } else {
      setRefLogs(prev => [...prev, '[SYS] ERROR: CRYPTO SIGNATURE INVALID', '[SYS] REASON: HASH VERIFICATION REFUSED.']);
      setRefState('error');
    }
  };

  const categories = ['ALL', ...new Set(EVENTS_LIST.map(e => e.category))];
  const filteredEvents = catFilter === 'ALL' ? EVENTS_LIST : EVENTS_LIST.filter(e => e.category === catFilter);

  const addMember = () => {
    if (members.length < (selectedEvent?.maxTeam || 4)) {
      setMembers([...members, { name: '', email: '', role: '' }]);
    }
  };
  const removeMember = (i) => setMembers(members.filter((_, idx) => idx !== i));
  const updateMember = (i, field, val) => {
    const updated = [...members];
    updated[i] = { ...updated[i], [field]: val };
    setMembers(updated);
  };

  const handleSubmit = async () => {
    soundEffects.playClick?.();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
  };

  const canProceedStep1 = !!selectedEvent;
  const canProceedStep2 = teamName.trim().length > 2 && members.every(m => m.name && m.email);
  const canProceedStep3 = details.institution && details.phone && (details.referral.trim() === '' || refState === 'success');

  if (submitted) {
    return (
      <div className="page-section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          style={{
            textAlign: 'center', padding: '48px', maxWidth: '480px',
            border: '1px solid rgba(0,245,196,0.3)',
            background: 'rgba(0,245,196,0.05)',
            position: 'relative',
          }}
        >
          <div className="bracket-tl" style={{ borderColor: 'var(--green)' }} />
          <div className="bracket-tr" style={{ borderColor: 'var(--green)' }} />
          <div className="bracket-bl" style={{ borderColor: 'var(--green)' }} />
          <div className="bracket-br" style={{ borderColor: 'var(--green)' }} />
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚡</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--green)', letterSpacing: '0.3em', marginBottom: '8px' }}>
            REGISTRATION CONFIRMED
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            TEAM <span style={{ color: 'var(--green)' }}>{teamName.toUpperCase()}</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(189,200,209,0.7)', lineHeight: 1.7, marginBottom: '24px' }}>
            Your team has been registered for <strong style={{ color: '#fff' }}>{selectedEvent?.name}</strong>.
            A confirmation will be transmitted to all member contact nodes.
          </p>
          <div style={{
            padding: '12px', marginBottom: '24px',
            border: '1px dashed rgba(0,245,196,0.3)',
            background: 'rgba(0,0,0,0.3)',
            fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--green)', letterSpacing: '0.15em',
          }}>
            REF# TF26-{selectedEvent?.id?.toUpperCase()}-{Math.floor(Math.random() * 90000) + 10000}
          </div>
          <button
            className="btn-primary"
            onClick={() => navigate('/events')}
            style={{ margin: '0 auto' }}
          >
            <span className="btn-tl" /><span className="btn-br" />
            BROWSE MORE EVENTS
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-section" style={{ paddingBottom: '80px', minHeight: '90vh' }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="section-overline" style={{ marginBottom: '12px' }}>MODULE 14 // ENLISTMENT PROTOCOL</div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 5vw, 56px)',
          fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '12px',
        }}>
          EVENT <span style={{ color: 'var(--sky)', textShadow: '0 0 20px rgba(56,189,248,0.4)' }}>REGISTRATION</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'rgba(241,245,249,0.9)', maxWidth: '640px', lineHeight: 1.7, marginBottom: '32px' }}>
          Choose your event, assemble your team, and submit your enlistment. All registrations processed through the secure Techfest gateway.
        </p>
      </motion.div>

      <StepIndicator current={step} />

      <AnimatePresence mode="wait">

        {/* ── STEP 0: SELECT EVENT ── */}
        {step === 0 && (
          <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => { soundEffects.playClick?.(); setCatFilter(c); }}
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em',
                    padding: '6px 14px', cursor: 'pointer', borderRadius: '0px',
                    border: `1px solid ${catFilter === c ? 'var(--sky)' : 'rgba(255,255,255,0.25)'}`,
                    background: catFilter === c ? 'rgba(56,189,248,0.1)' : 'transparent',
                    color: catFilter === c ? 'var(--sky)' : '#cbd5e1',
                    transition: 'all 0.2s',
                  }}
                >
                  {c}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
              {filteredEvents.map(evt => {
                const sel = selectedEvent?.id === evt.id;
                return (
                  <motion.div
                    key={evt.id}
                    whileHover={{ y: -2 }}
                    onClick={() => { soundEffects.playClick?.(); setSelectedEvent(evt); }}
                    style={{
                      padding: '20px', cursor: 'pointer',
                      border: `1px solid ${sel ? evt.color : evt.color + '44'}`,
                      background: sel ? `${evt.color}14` : 'rgba(14,14,18,0.8)',
                      position: 'relative',
                      boxShadow: sel ? `0 0 20px ${evt.color}22` : 'none',
                      transition: 'all 0.25s',
                    }}
                  >
                    {sel && (
                      <div style={{
                        position: 'absolute', top: '10px', right: '10px',
                        width: '16px', height: '16px', background: evt.color,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '9px', color: '#000', fontWeight: 800,
                      }}>✓</div>
                    )}
                    <div style={{
                      display: 'inline-block', padding: '2px 8px', marginBottom: '12px',
                      border: `1px solid ${evt.color}55`, background: `${evt.color}11`,
                      fontFamily: 'var(--font-mono)', fontSize: '11px', color: evt.color, letterSpacing: '0.2em',
                    }}>
                      {evt.category}
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
                      {evt.name}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <div className="readout-row"><span className="readout-label">PRIZE</span><span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#fbbf24', fontWeight: 700 }}>{evt.prize}</span></div>
                      <div className="readout-row"><span className="readout-label">TEAM SIZE</span><span className="readout-val">1–{evt.maxTeam} members</span></div>
                      <div className="readout-row"><span className="readout-label">DEADLINE</span><span className="readout-val" style={{ color: '#ff8c00' }}>{evt.deadline}</span></div>
                      <div className="readout-row"><span className="readout-label">SLOTS</span><span className="readout-val">{evt.slots}</span></div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                className="btn-primary"
                onClick={() => { if (canProceedStep1) { soundEffects.playClick?.(); setStep(1); } }}
                style={{ opacity: canProceedStep1 ? 1 : 0.4, cursor: canProceedStep1 ? 'pointer' : 'not-allowed' }}
              >
                <span className="btn-tl" /><span className="btn-br" />
                NEXT: TEAM SETUP →
              </button>
            </div>
          </motion.div>
        )}

        {/* ── STEP 1: TEAM SETUP ── */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            style={{ maxWidth: '640px' }}
          >
            <div style={{
              padding: '16px', marginBottom: '24px',
              border: `1px solid ${selectedEvent?.color}44`,
              background: `${selectedEvent?.color}08`,
              fontFamily: 'var(--font-mono)', fontSize: '10px', color: selectedEvent?.color,
            }}>
              SELECTED: {selectedEvent?.name} — PRIZE: {selectedEvent?.prize} — MAX TEAM: {selectedEvent?.maxTeam}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'rgba(226,232,240,0.8)', letterSpacing: '0.2em', display: 'block', marginBottom: '8px' }}>
                TEAM DESIGNATION *
              </label>
              <input
                style={inputStyle}
                placeholder="e.g. TEAM NEXUS"
                value={teamName}
                onChange={e => setTeamName(e.target.value.toUpperCase())}
                onFocus={e => e.target.style.borderColor = 'var(--sky)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'rgba(226,232,240,0.8)', letterSpacing: '0.2em', marginBottom: '12px' }}>
              TEAM MEMBERS ({members.length}/{selectedEvent?.maxTeam})
            </div>

            {members.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: '16px', marginBottom: '12px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.02)',
                  position: 'relative',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#38bdf8', letterSpacing: '0.2em', marginBottom: '12px' }}>
                  {i === 0 ? 'TEAM LEADER' : `MEMBER ${i + 1}`}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                  <div>
                    <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(226,232,240,0.7)', display: 'block', marginBottom: '6px' }}>FULL NAME *</label>
                    <input style={inputStyle} placeholder="Name" value={m.name} onChange={e => updateMember(i, 'name', e.target.value)}
                      onFocus={e => e.target.style.borderColor = 'var(--sky)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(226,232,240,0.7)', display: 'block', marginBottom: '6px' }}>EMAIL *</label>
                    <input style={inputStyle} type="email" placeholder="email@example.com" value={m.email} onChange={e => updateMember(i, 'email', e.target.value)}
                      onFocus={e => e.target.style.borderColor = 'var(--sky)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                  </div>
                </div>
                <input style={inputStyle} placeholder="Role (e.g. Mechanical Lead, Software Dev)" value={m.role} onChange={e => updateMember(i, 'role', e.target.value)}
                  onFocus={e => e.target.style.borderColor = 'var(--sky)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                {i > 0 && (
                  <button onClick={() => removeMember(i)} style={{
                    position: 'absolute', top: '12px', right: '12px',
                    background: 'rgba(255,45,85,0.1)', border: '1px solid rgba(255,45,85,0.3)',
                    color: '#ff2d55', width: '24px', height: '24px',
                    fontSize: '12px', cursor: 'pointer',
                  }}>✕</button>
                )}
              </motion.div>
            ))}

            {members.length < selectedEvent?.maxTeam && (
              <button
                onClick={addMember}
                style={{
                  width: '100%', padding: '10px',
                  border: '1px dashed rgba(56,189,248,0.3)',
                  background: 'transparent', color: 'var(--sky)',
                  fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.2em',
                  cursor: 'pointer', marginBottom: '24px', transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(56,189,248,0.05)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                + ADD TEAM MEMBER
              </button>
            )}

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button className="hud-btn" onClick={() => setStep(0)} style={{ padding: '0 20px' }}><span>← BACK</span></button>
              <button className="btn-primary"
                onClick={() => { if (canProceedStep2) { soundEffects.playClick?.(); setStep(2); } }}
                style={{ opacity: canProceedStep2 ? 1 : 0.4, cursor: canProceedStep2 ? 'pointer' : 'not-allowed' }}
              >
                <span className="btn-tl" /><span className="btn-br" />
                NEXT: DETAILS →
              </button>
            </div>
          </motion.div>
        )}

        {/* ── STEP 2: DETAILS ── */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            style={{ maxWidth: '560px' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              {[
                { key: 'institution', label: 'INSTITUTION / COLLEGE *', placeholder: 'IIT Bombay' },
                { key: 'phone',       label: 'CONTACT NODE (PHONE) *',  placeholder: '+91 9876543210', type: 'tel' },
                { key: 'city',        label: 'CITY',                    placeholder: 'Mumbai' },
              ].map(({ key, label, placeholder, type }) => (
                <div key={key}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(226,232,240,0.7)', letterSpacing: '0.15em', display: 'block', marginBottom: '6px' }}>
                    {label}
                  </label>
                  <input
                    style={inputStyle} type={type || 'text'} placeholder={placeholder}
                    value={details[key]}
                    onChange={e => setDetails(d => ({ ...d, [key]: e.target.value }))}
                    onFocus={e => e.target.style.borderColor = 'var(--sky)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(226,232,240,0.7)', letterSpacing: '0.15em', display: 'block', marginBottom: '6px' }}>
                  REFERRAL CODE (OPTIONAL)
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    style={{ ...inputStyle, flex: 1 }}
                    type="text"
                    placeholder="TF26-XXXX"
                    value={details.referral}
                    onChange={e => {
                      setDetails(d => ({ ...d, referral: e.target.value }));
                      setRefState('idle');
                      setRefLogs([]);
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--sky)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                  {details.referral.trim() && (
                    <button
                      type="button"
                      onClick={handleVerifyReferral}
                      disabled={refState === 'validating'}
                      style={{
                        padding: '0 16px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        background: refState === 'success' ? 'rgba(0,245,196,0.15)' : refState === 'error' ? 'rgba(255,45,85,0.15)' : 'rgba(56,189,248,0.15)',
                        border: `1px solid ${refState === 'success' ? 'var(--green)' : refState === 'error' ? 'var(--plasma)' : 'var(--sky)'}`,
                        color: refState === 'success' ? 'var(--green)' : refState === 'error' ? 'var(--plasma)' : 'var(--sky)',
                        cursor: refState === 'validating' ? 'not-allowed' : 'pointer',
                        transition: 'all 0.25s',
                        height: '38px',
                        borderRadius: '0px',
                      }}
                    >
                      {refState === 'validating' ? 'VERIFYING...' : refState === 'success' ? 'VERIFIED' : refState === 'error' ? 'FAILED' : 'VERIFY KEY'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {refLogs.length > 0 && (
              <div style={{
                padding: '12px',
                marginBottom: '16px',
                background: 'rgba(0,0,0,0.4)',
                border: `1px solid ${refState === 'success' ? 'rgba(0,245,196,0.25)' : refState === 'error' ? 'rgba(255,45,85,0.25)' : 'rgba(56,189,248,0.25)'}`,
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                color: refState === 'success' ? 'var(--green)' : refState === 'error' ? 'var(--plasma)' : 'var(--sky)',
                maxHeight: '120px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}>
                {refLogs.map((log, i) => (
                  <div key={i} style={{ lineBreak: 'anywhere' }}>{log}</div>
                ))}
              </div>
            )}

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', cursor: 'pointer' }}>
              <div style={{ width: '16px', height: '16px', border: '1px solid rgba(56,189,248,0.4)', background: 'rgba(56,189,248,0.1)', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'rgba(226,232,240,0.85)', lineHeight: 1.5 }}>
                I agree to Techfest 2026 participation terms and code of conduct.
              </span>
            </label>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button className="hud-btn" onClick={() => setStep(1)} style={{ padding: '0 20px' }}><span>← BACK</span></button>
              <button className="btn-primary"
                onClick={() => { if (canProceedStep3) { soundEffects.playClick?.(); setStep(3); } }}
                style={{ opacity: canProceedStep3 ? 1 : 0.4, cursor: canProceedStep3 ? 'pointer' : 'not-allowed' }}
              >
                <span className="btn-tl" /><span className="btn-br" />
                REVIEW →
              </button>
            </div>
          </motion.div>
        )}

        {/* ── STEP 3: CONFIRM ── */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            style={{ maxWidth: '560px' }}
          >
            <div style={{
              padding: '24px', marginBottom: '20px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(14,14,18,0.9)',
              position: 'relative',
            }}>
              <div className="bracket-tl" /><div className="bracket-tr" /><div className="bracket-bl" /><div className="bracket-br" />
              <div className="hud-header" style={{ marginBottom: '16px' }}><span>REGISTRATION SUMMARY</span><span>REVIEW</span></div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className="readout-row"><span className="readout-label">EVENT</span><span className="readout-val" style={{ color: selectedEvent?.color }}>{selectedEvent?.name}</span></div>
                <div className="readout-row"><span className="readout-label">CATEGORY</span><span className="readout-val">{selectedEvent?.category}</span></div>
                <div className="readout-row"><span className="readout-label">TEAM NAME</span><span className="readout-val" style={{ color: 'var(--sky)' }}>{teamName}</span></div>
                <div className="readout-row"><span className="readout-label">MEMBERS</span><span className="readout-val">{members.length}</span></div>
                <div className="readout-row"><span className="readout-label">INSTITUTION</span><span className="readout-val">{details.institution}</span></div>
                <div className="readout-row"><span className="readout-label">CONTACT</span><span className="readout-val">{details.phone}</span></div>
                {details.city && <div className="readout-row"><span className="readout-label">CITY</span><span className="readout-val">{details.city}</span></div>}
              </div>

              <div style={{ borderTop: '1px dashed rgba(255,255,255,0.08)', marginTop: '16px', paddingTop: '16px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(226, 232, 240, 0.65)', marginBottom: '10px', letterSpacing: '0.15em' }}>TEAM ROSTER</div>
                {members.map((m, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '8px 12px', marginBottom: '6px',
                    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                  }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#fff', fontWeight: 700 }}>{m.name}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(226, 232, 240, 0.65)' }}>{m.email}</div>
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '11px', color: i === 0 ? 'var(--sky)' : '#cbd5e1',
                      padding: '2px 6px', border: `1px solid ${i === 0 ? 'rgba(56,189,248,0.3)' : 'rgba(255,255,255,0.08)'}`,
                    }}>
                      {i === 0 ? 'LEADER' : m.role || 'MEMBER'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button className="hud-btn" onClick={() => setStep(2)} style={{ padding: '0 20px' }}><span>← BACK</span></button>
              <button
                className="btn-primary"
                onClick={handleSubmit}
                style={{ minWidth: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <span className="btn-tl" /><span className="btn-br" />
                {loading ? (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em' }}>
                    PROCESSING...
                  </span>
                ) : 'CONFIRM REGISTRATION'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
