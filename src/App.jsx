/* Techfest 2026 — App.jsx — Lazy-loaded routes for optimal bundle splitting */
import { useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PageLayout from './components/PageLayout';
import GlobalCursor from './components/GlobalCursor';
import BootLoader from './components/BootLoader';

// Always eagerly load home + layout
import Home from './pages/Home';

// Lazy-load all other pages to split the 1.7MB bundle
const Events        = lazy(() => import('./pages/Events'));
const Competitions  = lazy(() => import('./pages/Competitions'));
const Workshops     = lazy(() => import('./pages/Workshops'));
const Accommodation = lazy(() => import('./pages/Accommodation'));
const Store         = lazy(() => import('./pages/Store'));
const About         = lazy(() => import('./pages/About'));
const Sponsors      = lazy(() => import('./pages/Sponsors'));
const Contact       = lazy(() => import('./pages/Contact'));
const TerminalPage  = lazy(() => import('./pages/TerminalPage'));
const Lectures      = lazy(() => import('./pages/Lectures'));
const Exhibitions   = lazy(() => import('./pages/Exhibitions'));
const Robowars      = lazy(() => import('./pages/Robowars'));
const RoboLab       = lazy(() => import('./pages/RoboLab'));
const ComingSoon    = lazy(() => import('./pages/ComingSoon'));
const Dashboard     = lazy(() => import('./pages/Dashboard'));
const CampusMap     = lazy(() => import('./pages/CampusMap'));
const Leaderboard   = lazy(() => import('./pages/Leaderboard'));
const Schedule      = lazy(() => import('./pages/Schedule'));
const Register      = lazy(() => import('./pages/Register'));
const FAQ           = lazy(() => import('./pages/FAQ'));
const Hackathon     = lazy(() => import('./pages/Hackathon'));
const Winners       = lazy(() => import('./pages/Winners'));
const Jobs          = lazy(() => import('./pages/Jobs'));
const Quiz          = lazy(() => import('./pages/Quiz'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const HallOfFame    = lazy(() => import('./pages/HallOfFame'));
const Team          = lazy(() => import('./pages/Team'));
const Timeline      = lazy(() => import('./pages/Timeline'));
const Merch         = lazy(() => import('./pages/Merch'));
const MediaGallery  = lazy(() => import('./pages/MediaGallery'));
const NotFound      = lazy(() => import('./pages/NotFound'));


// Minimal loader shown during code-split chunk fetch
function PageLoader() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '60vh', flexDirection: 'column', gap: '16px',
    }}>
      <div style={{
        width: '40px', height: '40px',
        border: '2px solid rgba(56,189,248,0.15)',
        borderTop: '2px solid var(--sky)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '9px',
        color: 'rgba(56,189,248,0.5)', letterSpacing: '0.3em',
      }}>
        LOADING MODULE...
      </span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function App() {
  const [booted, setBooted] = useState(() => {
    if (typeof window !== 'undefined') {
      try { return sessionStorage.getItem('tf_booted') === 'true'; }
      catch { return false; }
    }
    return false;
  });

  const handleBootComplete = () => {
    try { sessionStorage.setItem('tf_booted', 'true'); } catch {}
    setBooted(true);
  };

  return (
    <>
      <GlobalCursor />
      {!booted ? (
        <BootLoader onComplete={handleBootComplete} />
      ) : (
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<PageLayout />}>
              <Route index                element={<Home />} />
              <Route path="events"        element={<Events />} />
              <Route path="competitions"  element={<Competitions />} />
              <Route path="workshops"     element={<Workshops />} />
              <Route path="accommodation" element={<Accommodation />} />
              <Route path="store"         element={<Store />} />
              <Route path="about"         element={<About />} />
              <Route path="sponsors"      element={<Sponsors />} />
              <Route path="contact"       element={<Contact />} />
              <Route path="terminal"      element={<TerminalPage />} />
              <Route path="lectures"      element={<Lectures />} />
              <Route path="exhibitions"   element={<Exhibitions />} />
              <Route path="robowars"      element={<Robowars />} />
              <Route path="robolab"       element={<RoboLab />} />
              <Route path="comingsoon"    element={<ComingSoon />} />
              <Route path="dashboard"     element={<Dashboard />} />
              <Route path="map"           element={<CampusMap />} />
              <Route path="leaderboard"   element={<Leaderboard />} />
              <Route path="schedule"      element={<Schedule />} />
              <Route path="register"      element={<Register />} />
              <Route path="faq"           element={<FAQ />} />
              <Route path="hackathon"     element={<Hackathon />} />
              <Route path="winners"       element={<Winners />} />
              <Route path="jobs"          element={<Jobs />} />
              <Route path="quiz"          element={<Quiz />} />
              <Route path="privacy"       element={<PrivacyPolicy />} />
              <Route path="hall-of-fame"  element={<HallOfFame />} />
              <Route path="team"          element={<Team />} />
              <Route path="timeline"      element={<Timeline />} />
              <Route path="merch"         element={<Merch />} />
              <Route path="gallery"       element={<MediaGallery />} />
              <Route path="*"             element={<NotFound />} />

            </Route>
          </Routes>
        </Suspense>
      )}
    </>
  );
}
