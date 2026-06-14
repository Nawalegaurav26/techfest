import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import PageLayout from './components/PageLayout';
import GlobalCursor from './components/GlobalCursor';
import BootLoader from './components/BootLoader';
import Home from './pages/Home';
import Events from './pages/Events';
import Competitions from './pages/Competitions';
import Workshops from './pages/Workshops';
import Accommodation from './pages/Accommodation';
import Store from './pages/Store';
import About from './pages/About';
import Sponsors from './pages/Sponsors';
import Contact from './pages/Contact';
import TerminalPage from './pages/TerminalPage';
import Lectures from './pages/Lectures';
import Exhibitions from './pages/Exhibitions';
import Robowars from './pages/Robowars';
import RoboLab from './pages/RoboLab';
import ComingSoon from './pages/ComingSoon';
import NotFound from './pages/NotFound';

export default function App() {
  const [booted, setBooted] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        return sessionStorage.getItem('tf_booted') === 'true';
      } catch (e) {
        return false;
      }
    }
    return false;
  });

  const handleBootComplete = () => {
    try {
      sessionStorage.setItem('tf_booted', 'true');
    } catch (e) {}
    setBooted(true);
  };

  return (
    <>
      <GlobalCursor />
      {!booted ? (
        <BootLoader onComplete={handleBootComplete} />
      ) : (
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<Home />} />
            <Route path="events"       element={<Events />} />
            <Route path="competitions" element={<Competitions />} />
            <Route path="workshops"    element={<Workshops />} />
            <Route path="accommodation" element={<Accommodation />} />
            <Route path="store"        element={<Store />} />
            <Route path="about"        element={<About />} />
            <Route path="sponsors"     element={<Sponsors />} />
            <Route path="contact"      element={<Contact />} />
            <Route path="terminal"     element={<TerminalPage />} />
            {/* New navbar routes */}
            <Route path="lectures"     element={<Lectures />} />
            <Route path="exhibitions"  element={<Exhibitions />} />
            <Route path="robowars"     element={<Robowars />} />
            <Route path="robolab"      element={<RoboLab />} />
            <Route path="comingsoon"   element={<ComingSoon />} />
            <Route path="*"            element={<NotFound />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

