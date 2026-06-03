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

export default function App() {
  const [booted, setBooted] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('tf_booted') === 'true';
    }
    return false;
  });

  const handleBootComplete = () => {
    sessionStorage.setItem('tf_booted', 'true');
    setBooted(true);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!booted && (
          <motion.div
            key="bootloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{ position: 'fixed', inset: 0, zIndex: 99999 }}
          >
            <BootLoader onComplete={handleBootComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {booted && (
        <>
          <GlobalCursor />
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
            </Route>
          </Routes>
        </>
      )}
    </>
  );
}
