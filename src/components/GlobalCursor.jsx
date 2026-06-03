import { useEffect, useRef } from 'react';

export default function GlobalCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const trailsRef = useRef([]);
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const onMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      inner.style.left = `${e.clientX}px`;
      inner.style.top = `${e.clientY}px`;
      spawnTrail(e.clientX, e.clientY);
    };

    const animate = () => {
      const { x: tx, y: ty } = targetRef.current;
      posRef.current.x += (tx - posRef.current.x) * 0.12;
      posRef.current.y += (ty - posRef.current.y) * 0.12;
      outer.style.left = `${posRef.current.x - 20}px`;
      outer.style.top = `${posRef.current.y - 20}px`;
      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnterBtn = () => {
      outer.style.width = '56px';
      outer.style.height = '56px';
      outer.style.background = 'radial-gradient(circle, rgba(56,189,248,0.25) 0%, transparent 70%)';
      outer.style.borderColor = 'rgba(56,189,248,0.8)';
    };
    const onLeaveBtn = () => {
      outer.style.width = '36px';
      outer.style.height = '36px';
      outer.style.background = 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)';
      outer.style.borderColor = 'rgba(56,189,248,0.5)';
    };

    const attachHoverListeners = () => {
      document.querySelectorAll('a, button, .nav-capsule, .holo-card, .cyber-btn').forEach(el => {
        el.addEventListener('mouseenter', onEnterBtn);
        el.addEventListener('mouseleave', onLeaveBtn);
      });
    };

    window.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(animate);

    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    attachHoverListeners();

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  const spawnTrail = (x, y) => {
    const trail = document.createElement('div');
    trail.style.cssText = `
      position: fixed;
      left: ${x - 3}px;
      top: ${y - 3}px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(56,189,248,0.8), transparent);
      pointer-events: none;
      z-index: 999998;
      transition: all 0.5s ease;
    `;
    document.body.appendChild(trail);
    trailsRef.current.push(trail);

    requestAnimationFrame(() => {
      trail.style.transform = `scale(0)`;
      trail.style.opacity = '0';
    });

    setTimeout(() => {
      trail.remove();
      trailsRef.current = trailsRef.current.filter(t => t !== trail);
    }, 600);
  };

  return (
    <>
      <div
        ref={outerRef}
        className="cursor-outer"
        style={{ left: -100, top: -100 }}
      />
      <div
        ref={innerRef}
        className="cursor-inner"
        style={{ left: -100, top: -100 }}
      />
    </>
  );
}
