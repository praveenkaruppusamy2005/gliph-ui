import React, { useState, useEffect, useRef, useCallback } from 'react';

/* =====================================================================
 * Google Sign-In — REAL, via Firebase Auth (see src/firebase.js)
 * ===================================================================== */
import { auth, googleProvider } from './firebase';
import { signInWithPopup, signOut as fbSignOut } from 'firebase/auth';

const API_BASE = import.meta.env.DEV
  ? ''
  : (import.meta.env.VITE_API_BASE_URL || 'https://firebird-seven.vercel.app');

function useAuth() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sv_user') || 'null'); } catch { return null; }
  });
  const signIn  = (u) => { localStorage.setItem('sv_user', JSON.stringify(u)); setUser(u); };
  const signOut = ()  => { localStorage.removeItem('sv_user'); setUser(null); };
  return { user, signIn, signOut };
}

function readLocalCodes() {
  try { return JSON.parse(localStorage.getItem('sv_codes') || '[]'); } catch { return []; }
}

function rememberCode(entry) {
  if (!entry?.key) return;
  const list = readLocalCodes().filter(c => c.key !== entry.key);
  list.unshift({ key: entry.key, expires: entry.expires, created: entry.created || Date.now(), trial: !!entry.trial });
  localStorage.setItem('sv_codes', JSON.stringify(list.slice(0, 24)));
}

function authErrorText(e) {
  const code = e?.code || '';
  if (code.includes('popup-closed-by-user') || code.includes('cancelled-popup-request'))
    return 'Sign-in window was closed — press the button again.';
  if (code.includes('unauthorized-domain'))
    return 'This domain is not authorized in Firebase — add it under Authentication → Settings → Authorized domains.';
  if (code.includes('operation-not-allowed') || code.includes('configuration-not-found'))
    return 'Google sign-in is not enabled in your Firebase console yet → Authentication → Sign-in method → enable Google.';
  if (code.includes('network'))
    return 'Network problem reaching Google — check your connection.';
  if (code.includes('popup-blocked'))
    return 'Your browser blocked the popup — allow popups for this site and retry.';
  return e?.message || 'Sign-in failed — try again.';
}

/* ---------- icons ---------- */

const I = ({ d, size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const Gk = {
  shield: ['M12 3 L20 6 V11 C20 16.5 16.5 20 12 21.5 C7.5 20 4 16.5 4 11 V6 Z'],
  eye: ['M2 12 C5 6.5 9 4.5 12 4.5 C15 4.5 19 6.5 22 12 C19 17.5 15 19.5 12 19.5 C9 19.5 5 17.5 2 12 Z'],
  camera: ['M4 8 H9 L11 5.5 H13 L15 8 H20 V18 H4 Z', 'M12 10.5 a3 3 0 1 0 0 5 a3 3 0 1 0 0 -5'],
  focus: ['M4 4 H20 V20 H4 Z', 'M12 9 a3 3 0 1 0 0 6 a3 3 0 1 0 0 -6'],
  dock: ['M5 4 H19 V20 H5 Z', 'M19 8 H22', 'M19 12 H22'],
  timer: ['M12 21 a8 8 0 1 0 0 -16 a8 8 0 1 0 0 16', 'M12 9 V12.5 L14.5 14', 'M9 2.5 H15'],
  key: ['M15 9 a4 4 0 1 0 0 6 a4 4 0 1 0 0 -6', 'M12.5 13.5 L4 22', 'M7 18.5 H9', 'M9 16.5 H 11'],
  check: ['M4 12.5 L9.5 18 L20 6'],
  download: ['M12 4 V15', 'M7 10.5 L12 15 L17 10.5', 'M4 19.5 H20'],
  lock: ['M6.5 10.5 H17.5 V20 H6.5 Z', 'M9 10.5 V7.5 a3 3 0 0 1 6 0 V10.5'],
  bolt: ['M13 2 L5 13 H11 L10 22 L19 9.5 H12.5 Z'],
  pin: ['M12 21 C7 15.5 5 12 5 9.5 a7 7 0 1 1 14 0 C19 12 17 15.5 12 21 Z'],
  phone: ['M6.5 2 H17.5 V22 H6.5 Z', 'M12 18 a0.5 0.5 0 1 0 0 1 a0.5 0.5 0 1 0 0 -1'],
  typing: ['M2 5 H22 V19 H2 Z', 'M6 8 H18', 'M6 12 H18', 'M8 16 H16'],
  vanish: ['M2 12 s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z', 'M12 9 a3 3 0 1 0 0 6 a3 3 0 1 0 0 -6', 'M3 3 l18 18'],
  corner: ['M3 11 V3 H11', 'M3 3 L21 21'],
  power: ['M18.36 6.64 a9 9 0 1 1 -12.73 0', 'M12 2 V12'],
  drag: ['M5 9 l7-7 7 7', 'M5 15 l7 7 7-7', 'M12 2 v20'],
  clear: ['M18 6 L6 18', 'M6 6 l12 12'],
  external: ['M18 13 v6 a2 2 0 0 1 -2 2 H5 a2 2 0 0 1 -2 -2 V8 a2 2 0 0 1 2 -2 h6', 'M15 3 h6 v6', 'M10 14 L21 3'],
};

const Check = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d={Gk.check[0]} />
  </svg>
);

const GoogleG = () => (
  <svg width="20" height="20" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    <path fill="none" d="M0 0h48v48H0z"/>
  </svg>
);

/* ---------- countdown ---------- */

function useCountdown(expires) {
  const [left, setLeft] = useState(expires ? Math.max(0, expires - Date.now()) : 0);
  useEffect(() => {
    if (!expires) return;
    const t = setInterval(() => setLeft(Math.max(0, expires - Date.now())), 1000);
    return () => clearInterval(t);
  }, [expires]);
  return left;
}

function fmt(ms) {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  return `${h}h ${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}m ${String(s % 60).padStart(2, '0')}s`;
}

/* ==================================================================== */
/* GUIDED PREVIEW — the real app screenshot with spotlight coach marks. */
/* Each step dims the image and rings the exact control being taught,   */
/* exactly like the in-app guide.                                       */
/* ==================================================================== */

const PREVIEW_STEPS = [
  { t: 'This is firebird',
    b: 'A real screenshot of the app browsing Google. Snipping Tool, OBS and screen-share all see black where this window sits — you are looking at pixels only you can see.',
    r: null },
  { t: 'The ⋮ menu',
    b: 'All account actions live here: remaining license time, Log out and Uninstall. Press it anytime — a black card drops down on the spot.',
    r: { x: 3, y: 2.0, w: 9, h: 7.0 } },
  { t: 'Back / forward',
    b: 'Standard browser navigation, < and >. Works on every site you open.',
    r: { x: 11.8, y: 2.0, w: 18.5, h: 7.0 } },
  { t: 'Address pill',
    b: 'Type any address and press Enter. The ✕ clears it instantly. The app never steals focus from your real browser — you can be typing in Chrome while this loads.',
    r: { x: 40.5, y: 2.0, w: 34, h: 7.0 } },
  { t: 'Type without focus',
    b: 'The ⌨ inside the pill types text straight into the page\u2019s fields — chat boxes, forms, anything — while your caret and focus stay in Chrome.',
    r: { x: 67.8, y: 2.0, w: 7, h: 7.0 } },
  { t: 'Screenshot dock',
    b: 'The ▭ chevron slides out a strip of every screenshot at the right edge. Hover a tile for ✕, drag one out to keep it.',
    r: { x: 77, y: 2.0, w: 7.5, h: 7.0 } },
  { t: 'One-tap capture',
    b: 'The 📷 snaps a full screenshot straight into the dock — never onto your clipboard, never visible to anything recording the screen.',
    r: { x: 89.3, y: 2.0, w: 8.7, h: 7.0 } },
  { t: 'Vanish instantly',
    b: 'Two ways to disappear: park the cursor in your screen’s top-left corner, or press Shift+Space. Both toggle hide and unhide.',
    r: null,
    vanish: true },
];

function GuidedPreview() {
  const [idx, setIdx] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [arrow, setArrow] = React.useState(null);
  const stageRef = React.useRef(null);
  const copyRef = React.useRef(null);
  const holeRef = React.useRef(null);
  const shotRef = React.useRef(null);
  const step = PREVIEW_STEPS[idx];
  const last = idx === PREVIEW_STEPS.length - 1;

  // autoplay — hover pauses, dots/next restart it
  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx(i => (i + 1) % PREVIEW_STEPS.length), 6200);
    return () => clearInterval(t);
  }, [paused, idx]);

  // draw the curly arrow from the copy card to the spotlighted control
  React.useLayoutEffect(() => {
    setArrow(null);
    const measure = () => {
      const stage = stageRef.current, copy = copyRef.current, hole = holeRef.current, shot = shotRef.current;
      if (!stage || !copy || !hole || !shot) { setArrow(null); return; }
      const s = stage.getBoundingClientRect();
      const c = copy.getBoundingClientRect();
      const h = hole.getBoundingClientRect();
      const imgLeft = shot.getBoundingClientRect().left - s.left;
      const holeLeft = h.left - s.left;
      // left-edge targets: land just inside the spotlight instead of outside the frame
      const endX = holeLeft - imgLeft < 26 ? holeLeft + 5 : holeLeft - 18;
      setArrow({
        startX: c.right - s.left + 12,
        startY: c.top - s.top + 58,
        endX,
        endY: h.top - s.top + h.height / 2,
      });
    };
    const settle = setTimeout(measure, 560); // after the hole finishes gliding
    const ro = new ResizeObserver(measure);
    if (stageRef.current) ro.observe(stageRef.current);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(settle);
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [idx]);

  const next = () => setIdx(i => (i + 1) % PREVIEW_STEPS.length);

  let arrowPath = null;
  if (arrow) {
    const dx = arrow.endX - arrow.startX;
    const dy = arrow.endY - arrow.startY;
    const c1x = arrow.startX + Math.max(52, dx * 0.55);
    const c1y = arrow.startY + dy * 0.12;
    const c2x = arrow.endX - Math.max(34, dx * 0.3);
    const c2y = arrow.endY - dy * 0.12;
    arrowPath = `M ${arrow.startX} ${arrow.startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${arrow.endX} ${arrow.endY}`;
  }

  return (
    <div
      ref={stageRef}
      className={'gp-wrap' + (paused ? ' gp-paused' : '')}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="gp-copy" ref={copyRef} key={idx}>
        <div className="gp-meta">
          <span className="gp-stepno">{String(idx + 1).padStart(2, '0')}</span>
          <span className="gp-count">/ {String(PREVIEW_STEPS.length).padStart(2, '0')}</span>
        </div>
        <h3>{step.t}</h3>
        <p>{step.b}</p>
        <div className="gp-foot">
          <button className="gp-next" onClick={next}>
            {last ? 'Replay ↻' : 'Next →'}
          </button>
          <div className="gp-dots">
            {PREVIEW_STEPS.map((_, i) => (
              <span
                key={i === idx ? 'on-' + idx : 'd-' + i}
                className={'gp-dot' + (i === idx ? ' on' : '')}
                onClick={() => setIdx(i)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="gp-frame">
        <div className="gp-stage">
          {step.vanish && (
            <>
              <span className="gp-screen-corner" aria-hidden="true" />
              <div className="gp-screen-chip">
                <b>Screen’s top-left</b>
                <span>hide / unhide</span>
              </div>
            </>
          )}
          <div className="gp-shot" ref={shotRef}>
            <img src="/app-preview.png" alt="firebird app browsing Google" draggable={false} onClick={next} />
            <div className={'gp-yard' + (step.r ? ' has-hole' : '')} onClick={next} />
            {step.r && (
              <div
                ref={holeRef}
                className="gp-hole"
                style={{ left: `${step.r.x}%`, top: `${step.r.y}%`, width: `${step.r.w}%`, height: `${step.r.h}%` }}
              />
            )}
            {step.vanish && (
              <div className="gp-vanish" aria-hidden="true">
                <div className="gp-vanish-chip gp-vanish-keys">
                  <span className="gp-key">Shift</span>
                  <span className="gp-plus">+</span>
                  <span className="gp-key">Space</span>
                  <span className="gp-vanish-note">hide / unhide</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {arrowPath && (
        <svg className="gp-arrow" aria-hidden="true">
          <defs>
            <marker id="gpArrow" viewBox="0 0 10 10" refX="8.4" refY="5"
                    markerWidth="13" markerHeight="13" markerUnits="userSpaceOnUse"
                    orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 Z" fill="#0d1117" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
            </marker>
          </defs>
          <path d={arrowPath} fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" opacity="0.96" />
          <path d={arrowPath} fill="none" stroke="#0d1117" strokeWidth="2.6" strokeLinecap="round" markerEnd="url(#gpArrow)" />
          {arrow && <circle cx={arrow.startX} cy={arrow.startY} r="3.2" fill="#0d1117" stroke="#fff" strokeWidth="2" />}
        </svg>
      )}
    </div>
  );
}


/* ==================================================================== */
/* ROOT — router between normal site and /payment-return landing page   */
/* ==================================================================== */

export default function App() {
  const { user, signIn, signOut } = useAuth();
  const [view, setView] = useState(() => new URLSearchParams(window.location.search).has('plan') ? 'pricing' : 'home');

  // If the user came back from UPI redirect, show the payment status page
  if (window.location.pathname.includes('payment-return') ||
      new URLSearchParams(window.location.search).has('order_id')) {
    return <PaymentReturn />;
  }

  if (!user) return <LoginGate onSignedIn={signIn} />;
  return <Site user={user} signOut={signOut} view={view} setView={setView} />;
}

/* ==================================================================== */
/* PAYMENT RETURN — polls /api/check-order until SUCCESS / FAILED       */
/* Shown when UPI Gateway redirects back to /?order_id=SWV-...          */
/* ==================================================================== */

function PaymentReturn() {
  const params  = new URLSearchParams(window.location.search);
  const orderId = params.get('order_id');
  const paymentId = params.get('payment_id');
  const [status,  setStatus]  = useState('POLLING'); // POLLING | SUCCESS | FAILED | ERROR
  const [keyData, setKeyData] = useState(null);       // { key, expires }
  const [copied,  setCopied]  = useState(false);
  const left = useCountdown(keyData?.expires);

  useEffect(() => {
    if (!orderId) { setStatus('ERROR'); return; }

    let attempts = 0;
    const maxAttempts = 24; // 2 minutes at 5s intervals

    async function poll() {
      try {
        const r  = await fetch(`${API_BASE}/api/check-order`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order_id: orderId, payment_id: paymentId }),
        });
        const d  = await r.json();

        if (d.status === 'SUCCESS') {
          setKeyData({ key: d.key, expires: d.expires });
          rememberCode({ key: d.key, expires: d.expires, created: Date.now() });
          setStatus('SUCCESS');
          return;
        }
        if (d.status === 'FAILED') {
          setStatus('FAILED');
          return;
        }
        // still PENDING
        attempts++;
        if (attempts >= maxAttempts) { setStatus('ERROR'); return; }
        setTimeout(poll, 5000);
      } catch {
        attempts++;
        if (attempts >= maxAttempts) { setStatus('ERROR'); return; }
        setTimeout(poll, 5000);
      }
    }

    poll();
  }, [orderId, paymentId]);

  const copy = () => {
    if (!keyData) return;
    navigator.clipboard.writeText(keyData.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const codeSuffix = keyData ? keyData.key.replace('SWVW-', '') : '';

  return (
    <div className="gate hero-bg" style={{ flexDirection: 'column', gap: 0 }}>
      <div className="gate-grid" />
      <div className="gate-inner" style={{ maxWidth: 560 }}>

        {status === 'POLLING' && (
          <>
            <div className="gate-brand">
              <span className="mark big">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="2.6" fill="#fff" stroke="none" />
                  <path d="M4 21 L20 3" />
                </svg>
              </span>
              <h1 className="gate-title" style={{ fontSize: 28, letterSpacing: 4 }}>VERIFYING PAYMENT</h1>
            </div>
            <p className="gate-tag" style={{ marginTop: 16 }}>Waiting for payment confirmation…</p>
            <div className="spinner" style={{ margin: '32px auto' }} />
            <p className="gate-fine">This usually takes 5–15 seconds. Keep this tab open.</p>
          </>
        )}

        {status === 'SUCCESS' && keyData && (
          <>
            <div className="gate-brand">
              <span className="mark big" style={{ background: '#000' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12.5 L9.5 18 L20 6" />
                </svg>
              </span>
              <h1 className="gate-title" style={{ fontSize: 26, letterSpacing: 3 }}>PAYMENT SUCCESSFUL</h1>
            </div>
            <p className="gate-tag" style={{ marginTop: 10 }}>Your activation code is ready ↓</p>

            <div className="code-big" style={{ marginTop: 30, width: '100%', maxWidth: 420, textAlign: 'center' }}>
              <div className="codebig-row">
                <span className="codebig-prefix">SWVW</span>
                <span className="codebig-digits">{codeSuffix}</span>
              </div>
              <div className="codebig-row" style={{ marginTop: 18, justifyContent: 'center', gap: 14 }}>
                <span className="codebig-count">{fmt(left)} left</span>
                <button className="copybtn-big" onClick={copy}>{copied ? 'copied ✓' : 'copy code'}</button>
              </div>
              <p className="finestrong" style={{ marginTop: 14, textAlign: 'center' }}>Valid until <b>{new Date(keyData.expires).toLocaleString()}</b></p>
              <p className="fine" style={{ marginTop: 6, textAlign: 'center' }}>Launch app → enter code → ACTIVATE → browse</p>
            </div>

            <a href="/" className="ghostbtn" style={{ marginTop: 24, borderRadius: 999 }}>← Back to site</a>
          </>
        )}

        {status === 'FAILED' && (
          <>
            <div className="gate-brand">
              <span
                className="mark big"
                style={{ background: '#cf222e', WebkitMask: 'none', mask: 'none', borderRadius: '50%' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="#fff" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M7 7 L17 17 M17 7 L7 17" />
                </svg>
              </span>
              <h1 className="gate-title" style={{ fontSize: 26, letterSpacing: 2 }}>PAYMENT NOT COMPLETED</h1>
            </div>
            <p className="gate-tag" style={{ marginTop: 12 }}>
              No activation code was created. You can return to checkout and try again.
            </p>
            <p className="gate-fine" style={{ textAlign: 'center' }}>
              If money was deducted, please wait for your bank to update the payment status and contact support with order ID:
              <br />
              <b>{orderId}</b>
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 24 }}>
              <a href="/?plan=day" className="fillbtn big">Try payment again</a>
              <a href="/" className="ghostbtn big">Back to site</a>
            </div>
          </>
        )}

        {status === 'ERROR' && (
          <>
            <h1 className="gate-title" style={{ fontSize: 26 }}>TIMED OUT</h1>
            <p className="gate-tag" style={{ marginTop: 12 }}>Could not confirm payment after 2 minutes.</p>
            <p className="gate-fine">If your UPI was deducted, contact support with order ID: <b>{orderId}</b></p>
            <a href="/" className="ghostbtn" style={{ marginTop: 28, borderRadius: 999 }}>← Back to site</a>
          </>
        )}

      </div>
      <div className="gate-foot">
        <span>SECUREVIEW © 2026</span>
        <span>WINDOWS 10/11 · 64-BIT</span>
      </div>
    </div>
  );
}

/* ==================================================================== */
/* LOGIN GATE                                                            */
/* ==================================================================== */

function LoginGate({ onSignedIn }) {
  const [busy, setBusy] = useState(false);
  const [err,  setErr]  = useState('');

  const start = async () => {
    setBusy(true);
    setErr('');
    try {
      const r = await signInWithPopup(auth, googleProvider);
      onSignedIn({
        uid:   r.user.uid,
        name:  r.user.displayName || (r.user.email || '').split('@')[0],
        email: r.user.email,
        photo: r.user.photoURL,
        real:  true,
      });
    } catch (e) {
      setErr(authErrorText(e));
    }
    setBusy(false);
  };

  return (
    <div className="gate hero-bg">
      <div className="gate-inner">
        <div className="gate-brand">
          <div className="gate-icon">
            <img src="/app-logo.png" alt="firebird" className="gate-logo" />
          </div>
          <h1 className="gate-title">Sign in to firebird</h1>
        </div>
        <p className="gate-tag">
          the browser that cannot be captured —<br />
          sign in to choose a pass and pay with UPI
        </p>
        <div className="gate-ctas">
          <button className="gatebtn gbtn" onClick={start} disabled={busy}>
            <GoogleG /> {busy ? 'connecting…' : 'Continue with Google'}
          </button>
        </div>
        {err && <p className="gate-error">{err}</p>}
        <p className="gate-fine">Windows 10/11 · 64-bit</p>
      </div>
      <div className="gate-foot">
        <span>SECUREVIEW © 2026</span>
        <span>WINDOWS 10/11 · 64-BIT</span>
      </div>
    </div>
  );
}

/* ==================================================================== */
/* AVATAR                                                               */
/* ==================================================================== */

function Ava({ user, sm }) {
  const initial = (user.name || user.email || '?')[0].toUpperCase();
  return sm ? (
    <span className="avatar sm">{user.photo ? <img src={user.photo} alt="" referrerPolicy="no-referrer" /> : initial}</span>
  ) : (
    <span className="avatar">{user.photo ? <img src={user.photo} alt="" referrerPolicy="no-referrer" /> : initial}</span>
  );
}

function ProfileMenu({ user, signOut }) {
  const [open, setOpen] = useState(false);
  const [codes, setCodes] = useState(() => readLocalCodes());
  const box = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const local = readLocalCodes();
      setCodes(local);
      if (!user?.email) return;
      try {
        const r = await fetch(`${API_BASE}/api/my-codes?email=` + encodeURIComponent(user.email));
        const d = await r.json();
        if (cancelled || !d.ok) return;
        const remote = d.codes || [];
        remote.forEach(rememberCode);
        const merged = {};
        [...readLocalCodes(), ...remote].forEach(c => { if (c?.key) merged[c.key] = { ...merged[c.key], ...c }; });
        setCodes(Object.values(merged).sort((a, b) => (b.created || 0) - (a.created || 0)));
      } catch { /* keep local */ }
    }
    load();
    return () => { cancelled = true; };
  }, [user?.email, open]);

  const copy = async (key) => {
    try { await navigator.clipboard.writeText(key); } catch { /* ignore */ }
  };

  const active = codes.filter(c => c.expires && c.expires > Date.now());
  const past = codes.filter(c => !c.expires || c.expires <= Date.now());

  return (
    <div className={'prof' + (open ? ' open' : '')} ref={box}>
      <button className="prof-btn" onClick={() => setOpen(v => !v)} aria-label="Account">
        <Ava user={user} />
        {active.length > 0 && <i className="prof-dot" />}
      </button>
      {open && (
        <div className="prof-card">
          <div className="prof-who">
            <Ava user={user} />
            <div>
              <b>{user.name || user.email}</b>
              {user.email && user.name && <i>{user.email}</i>}
            </div>
          </div>
          <div className="prof-label">Your codes</div>
          {codes.length === 0 && (
            <p className="prof-empty">No activation codes are linked to this account.</p>
          )}
          {active.map(c => (
            <button type="button" className="prof-code" key={c.key} onClick={() => copy(c.key)}>
              <span>
                <strong>{c.key}</strong>
                <em>{fmt(c.expires - Date.now())} left</em>
              </span>
              <span className="prof-copy">copy</span>
            </button>
          ))}
          {past.slice(0, 4).map(c => (
            <div className="prof-code dead" key={c.key}>
              <span>
                <strong>{c.key}</strong>
                <em>Expired</em>
              </span>
            </div>
          ))}
          <button className="prof-out" onClick={signOut}>Sign out</button>
        </div>
      )}
    </div>
  );
}

/* ==================================================================== */
/* SITE — renders only when signed in                                   */
/* ==================================================================== */

function Site({ user, signOut, view, setView }) {
  // navbar turns solid once the page scrolls
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const doSignOut = async () => {
    try { await fbSignOut(auth); } catch { /* local sign-out regardless */ }
    signOut();
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setScrolled(false);
  }, [view]);

  return (
    <div className="site">
      {/* ANNOUNCEMENT BAR */}
      <div className="annbar">
        <span className="ann-new">New</span>
        <a href="#features">See why we're sorry <span className="ann-arrow">→</span></a>
      </div>

      {/* NAV */}
      <nav className={'nav' + (scrolled ? ' nav--solid' : '')}>
          <div className="nav-left">
            <button className="logo" onClick={() => setView('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <img src="/app-logo.png" alt="" className="wm-mark" />
              firebird
            </button>
            <div className="navlinks">
              <button onClick={() => setView('home')} className={view === 'home' ? 'active' : ''}>Home</button>
              <button onClick={() => setView('pricing')} className={view === 'pricing' ? 'active' : ''}>Pricing</button>
              <button onClick={() => setView('guide')} className={view === 'guide' ? 'active' : ''}>How to use</button>
            </div>
          </div>
          <div className="nav-right">
            <ProfileMenu user={user} signOut={doSignOut} />
            <a className="ghostbtn" href="/SecureWebView-Setup.exe">Download</a>
            {view !== 'pricing' && <button className="fillbtn" onClick={() => setView('pricing')}>Get a code →</button>}
          </div>
      </nav>

      <div key={view} className="view-fade">
        {view === 'home' ? (
          <HomePage setView={setView} />
        ) : view === 'guide' ? (
          <GuidePage setView={setView} />
        ) : (
          <PricingPage user={user} signOut={doSignOut} />
        )}
      </div>

            {/* FOOTER - HackerRank style: links on top of landscape */}
      <footer className="foot-hr">
        <div className="foot-hr-landscape">
          <img src="/footer-landscape.jpg" alt="landscape" />
        </div>
        <div className="foot-hr-links">
          <div className="container">
            <div className="foot-hr-cols">
              <div className="foot-hr-col">
                <div className="foot-hr-col-head">Product</div>
                <button onClick={() => setView('home')} className="foot-hr-link">Features</button>
                <button onClick={() => setView('home')} className="foot-hr-link">How it works</button>
                <button onClick={() => setView('guide')} className="foot-hr-link">App guide</button>
                <a href="/SecureWebView-Setup.exe" className="foot-hr-link">Download</a>
              </div>
              <div className="foot-hr-col">
                <div className="foot-hr-col-head">Get started</div>
                <button onClick={() => setView('pricing')} className="foot-hr-link">Pricing</button>
                <button className="foot-hr-link" onClick={() => { window.history.replaceState({}, "", "/?plan=day"); setView("pricing"); }}>Pay ₹210 / day</button>
              </div>
              <div className="foot-hr-col">
                <div className="foot-hr-col-head">Support</div>
                <button onClick={() => setView('home')} className="foot-hr-link">FAQ</button>
                <a href="mailto:support@secureview.app" className="foot-hr-link">Contact</a>
              </div>
            </div>
          </div>
        </div>
        <div className="foot-hr-bar">
          <span>2026 firebird - All rights reserved.</span>
          <span className="foot-hr-bar-right">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </span>
        </div>
      </footer>
    </div>
  );
}

function HomePage({ setView }) {
  return (
    <>
      <div id="top" />
      {/* HERO — centered pastel, HackerRank exact */}
      <header className="hero hero-bg">
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="hero-title">Browse for the unseen era</h1>
          <p className="hero-p1">
            Every meeting, recording and screen-share now sees your whole desktop,<br />
            but one window doesn't have to be part of it.
          </p>
          <div className="hero-ctas">
            <button className="fillbtn big" onClick={() => setView('pricing')}>Get a code →</button>
          </div>
        </div>
      </header>

      {/* SPLIT PANELS — For Companies / For Builders */}
      <section id="features" className="split">
        <div className="container">
          <div className="split-grid">
            <article className="panel panel-a">
              <span className="panel-badge">
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#93d8aa" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 5.5h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7l-4 3v-11a2 2 0 0 1 2-2z" opacity=".55" />
                  <path d="M9 3.5h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
                </svg>
              </span>
              <div className="panel-body">
                <div className="panel-rows">
                  <div className="prow">
                    <div>
                      <b>Capture-proof core</b>
                      <p>Excluded from every capture pipeline on Windows. The screen-grab APIs physically skip the window.</p>
                    </div>
                  </div>
                  <div className="prow">
                    <div>
                      <b>Child-proofed</b>
                      <p>The WebView's native child window is protected too — no hole leaks the page.</p>
                    </div>
                  </div>
                  <div className="prow">
                    <div>
                      <b>Private screenshot dock</b>
                      <p>Snap anything into a floating strip beside the window. Stored in temp, wiped on exit.</p>
                    </div>
                  </div>
                </div>
                <h3>Unseen by every<br />capture tool</h3>
              </div>
            </article>

            <article className="panel panel-b">
              <span className="panel-badge">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c3c3c3" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 14v-3a8 8 0 0 1 16 0v3" />
                  <rect x="2.6" y="13.2" width="4" height="7" rx="1.6" />
                  <rect x="17.4" y="13.2" width="4" height="7" rx="1.6" />
                </svg>
              </span>

              <div className="panel-body">
                <div className="panel-rows">
                  <div className="prow">
                    <div>
                      <b>Never steals focus</b>
                      <p>Click anywhere — Chrome keeps its caret. Type only when you say so.</p>
                    </div>
                  </div>
                  <div className="prow">
                    <div>
                      <b>Vanishing act</b>
                      <p>Shift+Space or park the cursor top-left — the app is gone. No taskbar, no tray.</p>
                    </div>
                  </div>
                  <div className="prow">
                    <div>
                      <b>Self-contained</b>
                      <p>One .exe, no installer hoops. Windows 10/11, 64-bit, works offline.</p>
                    </div>
                  </div>
                </div>
                <h3>Lighter than<br />a browser tab</h3>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how">
        <div className="container">
          <div className="sechead">
            <h2>How it works</h2>
            <p>From payment to invisible browsing in under two minutes.</p>
          </div>
          <div className="steps">
            <div className="step">
              <span className="num">01</span>
              <div><b>Buy a code</b><p>Continue with Google, pay via UPI, and receive an activation code for your chosen pass.</p></div>
            </div>
            <div className="step">
              <span className="num">02</span>
              <div><b>Paste it in</b><p>The app asks for the code on launch. Activation locks it to your machine — first device wins.</p></div>
            </div>
            <div className="step">
              <span className="num">03</span>
              <div><b>Browse freely</b><p>Use it until tomorrow, this exact time. Done for the day? ⏻ Logout frees the key for another device.</p></div>
            </div>
          </div>
          <div className="how-cta">
            <button className="ghostbtn" onClick={() => setView('guide')}>See the full app guide →</button>
          </div>
        </div>
      </section>

            {/* SHORTCUTS & CONTROLS — Chroma-style 3-col grid */}
      <section id="shortcuts" className="controls-section">
        <div className="container">
          <div className="sechead">
            <h2>Controls &amp; Power moves</h2>
            <p>Master the unseen browser with these quick shortcuts.</p>
          </div>
          <div className="ctrl-grid">
            <div className="ctrl-cell">
              <div className="ctrl-cell-label">CAPTURE-TYPING</div>
              <div className="ctrl-cell-title">Type without focus</div>
              <div className="ctrl-cell-desc">Click the keyboard icon inside the address pill, then just type. Press again (or Shift+Space) to release. Your caret in Chrome never moves.</div>
              <div className="ctrl-cell-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M6 8h12M6 12h12M8 16h8"/></svg></div>
            </div>
            <div className="ctrl-cell">
              <div className="ctrl-cell-label">VANISH</div>
              <div className="ctrl-cell-title">Vanish instantly</div>
              <div className="ctrl-cell-desc">Shift+Space hides the whole app. Press again to bring it back. Works even mid-typing. No taskbar flicker.</div>
              <div className="ctrl-cell-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12c3-5.5 7-7.5 10-7.5s7 2 10 7.5c-3 5.5-7 7.5-10 7.5S5 17.5 2 12Z"/><circle cx="12" cy="12" r="3"/><line x1="3" y1="3" x2="21" y2="21"/></svg></div>
            </div>
            <div className="ctrl-cell">
              <div className="ctrl-cell-label">QUICK CORNER</div>
              <div className="ctrl-cell-title">Quick corner</div>
              <div className="ctrl-cell-desc">Park the cursor in the screen's very top-left corner to toggle visibility — no keypress needed.</div>
              <div className="ctrl-cell-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11V3h8M3 3l18 18"/></svg></div>
            </div>
            <div className="ctrl-cell">
              <div className="ctrl-cell-label">SCREENSHOT DOCK</div>
              <div className="ctrl-cell-title">Private screenshot dock</div>
              <div className="ctrl-cell-desc">The chevron slides out a strip of every screenshot. Hover a tile for X to delete, drag one out to keep it. Wiped on exit.</div>
              <div className="ctrl-cell-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6.2 2h7.6c.45 0 .85.23 1.07.6L16 4.5h1.2c.7 0 1.3.6 1.3 1.3v10.4c0 .7-.6 1.3-1.3 1.3H2.8c-.7 0-1.3-.6-1.3-1.3V5.8c0-.7.6-1.3 1.3-1.3H4L5.13 2.6C5.35 2.23 5.75 2 6.2 2Z"/><circle cx="10" cy="10" r="3"/></svg></div>
            </div>
            <div className="ctrl-cell">
              <div className="ctrl-cell-label">LOGOUT & HANDOVER</div>
              <div className="ctrl-cell-title">Logout &amp; handover</div>
              <div className="ctrl-cell-desc">Press the power button in the menu — your device slot frees instantly while the code keeps its remaining hours.</div>
              <div className="ctrl-cell-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg></div>
            </div>
            <div className="ctrl-cell">
              <div className="ctrl-cell-label">MOVE</div>
              <div className="ctrl-cell-title">Drag to move</div>
              <div className="ctrl-cell-desc">Grab the empty toolbar space to reposition the window anywhere on screen. The screenshot dock slides with it.</div>
              <div className="ctrl-cell-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h14v16H5Z"/><path d="M19 8h3M19 12h3M5 8H2M5 12H2"/></svg></div>
            </div>
            <div className="ctrl-cell">
              <div className="ctrl-cell-label">CLEAR FIELDS</div>
              <div className="ctrl-cell-title">Clear fields</div>
              <div className="ctrl-cell-desc">The X inside the address pill wipes the URL and clears the focused text field on the page at once.</div>
              <div className="ctrl-cell-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg></div>
            </div>
            <div className="ctrl-cell">
              <div className="ctrl-cell-label">CONTAINED LINKS</div>
              <div className="ctrl-cell-title">Links never escape</div>
              <div className="ctrl-cell-desc">Popups and target=_blank open inside the app — nothing lands in an unprotected, recordable window.</div>
              <div className="ctrl-cell-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13 5 18V11M21 12a9 9 0 1 0-9 9"/></svg></div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="container">
          <div className="sechead">
            <h2>FAQ</h2>
            <p>Answers to common questions about firebird.</p>
          </div>
          <div className="faq">
            {[
              { q: "What exactly can't see the app?", a: "OBS, Discord screen-share, Zoom, Meet, Teams, Snipping Tool, Win+Shift+S, PrintScreen, capture extensions — all receive a black frame where firebird sits." },
              { q: "What happens after 24 hours?", a: "The code expires and the app returns to the activation screen. Purchase a new day pass to continue." },
              { q: "Can someone reuse my code on another PC?", a: "Not while it's active on yours. The code binds to the first device that activates it. ⏻ Logout releases the binding so another device can take the slot — but only one device holds it at any time." },
              { q: "What if I paid but didn't get my code?", a: "Return to the payment confirmation page or contact support with your order ID." },
              { q: "Does the app stop working without internet?", a: "Your activated session keeps its local expiry, so browsing continues while offline. Re-activation after a restart needs the license server online." },
              { q: "Which Windows versions are supported?", a: "Windows 10 and 11, 64-bit. One self-contained exe — no other installs needed." },
              { q: "Which browsers can I use for the website?", a: "The website works with modern versions of Chrome, Brave, Microsoft Edge and Firefox. The firebird desktop app is separate and runs on Windows 10/11." },
            ].map(({ q, a }) => (
              <div className="faqitem" key={q}>
                <div className="faqq">{q} <span style={{color:'var(--ink3)'}}>+</span></div>
                <div className="faqa">{a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function GuidePage({ setView }) {
  return (
    <div className="guide-page">
      <header className="guide-hero">
        <div className="container">
          <div className="guide-kicker">App guide</div>
          <h1>How to use the app</h1>
          <p>Eight steps, straight from a real in-app screenshot. It plays itself — hover to pause, tap a dot to jump.</p>
        </div>
      </header>

      <section id="tour" className="tour guide-tour">
        <div className="container">
          <GuidedPreview />
        </div>
      </section>

      <section id="guide" className="guide-walk">
        <div className="container">
          <div className="sechead">
            <h2>Complete walkthrough</h2>
            <p>Every step from download to day two. Nothing skipped.</p>
          </div>

          <div className="guide-full">
            {[
              { n: '01', ic: Gk.download, t: 'Download & install', b: 'Click Download anywhere on this site (SecureWebView-Setup.exe). Double-click it — no admin/UAC needed, creates a desktop shortcut. One self-contained exe, nothing else to install.' },
              { n: '02', ic: Gk.bolt, t: 'Launch it', b: 'Open firebird. The first thing you see is the activation screen asking for a 5-character code such as X5P86 (or the full SWVW-X5P86), with your device tag at the bottom. That\'s exactly right — the app stays locked until a valid code is in.' },
              { n: '03', ic: Gk.key, t: 'Get a code', b: 'Choose a day pass, complete payment through PhonePe UPI, and copy your activation code.' },
              { n: '04', ic: Gk.lock, t: 'Activate', b: 'In the app, type X5P86 or the full SWVW-X5P86, press ACTIVATE. It verifies online, locks the code to this PC, and the browser opens. One-time setup — about a minute.' },
              { n: '05', ic: Gk.eye, t: 'Use it all day', b: 'Browse like normal. Any screenshot, recording or share attempt captures black where firebird sits. Extra: ⌨ type without losing focus, Shift+Space hide everything, frame button snaps shots into the floating dock.' },
              { n: '06', ic: Gk.timer, t: 'Day two / handover', b: 'The code expires after its valid period and the app returns to the activation screen. Press ⏻ Logout to release the device slot.' },
            ].map((f) => (
              <article className="fstep" key={f.n}>
                <span className="fnum">{f.n}</span>
                <b>{f.t}</b>
                <p>{f.b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="guide-cta">
        <a className="fillbtn big" href="/SecureWebView-Setup.exe">Download for Windows</a>
        <button className="ghostbtn" onClick={() => setView('pricing')}>Get a code →</button>
      </div>
    </div>
  );
}

function PricingPage({ user, signOut }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [methods, setMethods] = useState({
    phonepe: true,
    dayPrice: 210,
  });

  useEffect(() => {
    let alive = true;
    fetch(`${API_BASE}/api/payment-methods`)
      .then(r => r.json())
      .then(d => {
        if (!alive || !d?.ok) return;
        setMethods(m => ({
          ...m,
          phonepe: !!d.phonepe,
          dayPrice: Number(d.day_price_inr) || m.dayPrice,
        }));
      })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  async function startCheckout() {
    setBusy(true);
    setError('');
    try {
      const r = await fetch(`${API_BASE}/api/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mobile: '9999999999',
          email: user.email || '',
          plan: 'day',
        }),
      });
      const d = await r.json();
      if (d.ok && d.payment_url) {
        window.location.href = d.payment_url;
        return;
      }
      setError(d.error || 'Could not create the payment order. Please try again.');
    } catch {
      setError('License server unreachable. Please try again later.');
    } finally {
      setBusy(false);
    }
  }

  const price = methods.dayPrice;

  return (
    <div className="px-shell">
      <div className="px-shell-bg" aria-hidden="true">
        <img src="/footer-landscape.jpg" alt="" />
      </div>
      <div className="px-page">
        <div className="px-left">
          <div className="px-price">₹{price}<span>/day</span></div>
          <p className="px-tagline">
            Full day of unseen browsing. Invisible to screen-capture tools on Windows.
          </p>
          <ul className="px-feats">
            {[
              'Access for 24 hours',
              'Locked to one device — release anytime via logout',
              'Instant activation code after payment',
              'One-time payment',
            ].map(feature => (
              <li key={feature}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00c853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12.5L9.5 18L20 6" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
          <div className="px-divider" />
          <div className="px-how">
            <div className="px-how-head">How it works</div>
            {[
              ['1', `Pay ₹${price}`, 'Secure UPI checkout'],
              ['2', 'Get code', 'Code appears after confirmation'],
              ['3', 'Activate', 'Enter it in the firebird app'],
            ].map(([number, title, detail]) => (
              <div className="px-step" key={number}>
                <span className="px-step-n">{number}</span>
                <b>{title}</b>
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-right">
          <div className="px-right-kicker">Secure checkout</div>
          <div className="px-who">
            <Ava user={user} />
            <div className="px-who-meta">
              <b>{user.name || user.email}</b>
              {user.email && user.name && <i>{user.email}</i>}
            </div>
            <button className="px-signout" onClick={signOut}>sign out</button>
          </div>
          <div className="px-divider" />
          <div className="px-summary">
            <div><span>Daily pass</span><b>₹{price}</b></div>
            <div className="px-summary-total"><span>Total due</span><b>₹{price}</b></div>
          </div>
          {methods.phonepe ? (
            <button className="px-pay-btn" onClick={startCheckout} disabled={busy}>
              {busy ? (
                <><div className="px-spinner" /><span>Opening PhonePe checkout…</span></>
              ) : (
                <><span>Pay ₹{price} via UPI</span><span className="px-arrow">→</span></>
              )}
            </button>
          ) : (
            <p className="px-error">PhonePe payments are temporarily unavailable. Please try again later.</p>
          )}
          {error && <p className="px-error">{error}</p>}
          <div className="px-trust">
            <span>UPI</span><span>GPay</span><span>PhonePe</span><span>Paytm</span>
          </div>
          <p className="px-fine">Instant activation · One-time payment · No auto-renewal</p>
        </div>
      </div>
    </div>
  );
}
