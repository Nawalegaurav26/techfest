import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home as HomeIcon, Calendar, Handshake, ShoppingBag, MessageCircle, Phone,
  Volume2, VolumeX, Compass, Terminal
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

// Import separate full-page components
import Home from '../pages/Home';
import Competitions from '../pages/Competitions';
import Events from '../pages/Events';
import Workshops from '../pages/Workshops';
import Accommodation from '../pages/Accommodation';
import Store from '../pages/Store';
import About from '../pages/About';
import Sponsors from '../pages/Sponsors';
import Contact from '../pages/Contact';
import TerminalPage from '../pages/TerminalPage';
import { loginWithGoogle, logoutUser } from '../utils/supabaseAuth';

export default function HUD({ activeSection, setActiveSection, soundEnabled, setSoundEnabled }) {
  const [cart, setCart] = useState([]);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  const handleSignIn = async () => {
    soundEffects.playClick();
    setAuthLoading(true);
    try {
      const loggedUser = await loginWithGoogle();
      setUser(loggedUser);
      soundEffects.playSuccess();
    } catch (error) {
      soundEffects.playError();
      console.error("Login failed", error);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    soundEffects.playClick();
    try {
      await logoutUser();
      setUser(null);
      soundEffects.playSuccess();
    } catch (error) {
      soundEffects.playError();
      console.error("Signout failed", error);
    }
  };
  
  // Accommodation Booking State
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({ name: '', category: 'student', podType: 'capsule' });
  const [bookingTicket, setBookingTicket] = useState(null);

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    window.__soundEnabled = newState;
    
    // Control procedural soundtrack
    if (newState) {
      soundEffects.startBackgroundMusic();
      setTimeout(() => {
        soundEffects.playSuccess();
      }, 50);
    } else {
      soundEffects.stopBackgroundMusic();
    }
  };

  const handleNavClick = (section) => {
    soundEffects.playTransition();
    setActiveSection(section);
    setCheckoutSuccess(false);
  };

  // Quick register logic
  const quickRegister = (eventName) => {
    if (registeredEvents.includes(eventName)) {
      soundEffects.playError();
      return;
    }
    soundEffects.playSuccess();
    setRegisteredEvents(prev => [...prev, eventName]);
  };

  const renderActivePage = () => {
    switch (activeSection) {
      case 'home':
        return <Home onEnter={() => handleNavClick('events')} />;
      case 'competitions':
        return (
          <Competitions 
            registeredEvents={registeredEvents} 
            onQuickRegister={quickRegister} 
          />
        );
      case 'events':
        return <Events onInquire={() => handleNavClick('contact')} />;
      case 'workshops':
        return (
          <Workshops 
            registeredEvents={registeredEvents} 
            onQuickRegister={quickRegister} 
          />
        );
      case 'accommodation':
        return (
          <Accommodation 
            bookingStep={bookingStep}
            setBookingStep={setBookingStep}
            bookingData={bookingData}
            setBookingData={setBookingData}
            bookingTicket={bookingTicket}
            setBookingTicket={setBookingTicket}
          />
        );
      case 'store':
        return (
          <Store 
            cart={cart}
            setCart={setCart}
            checkoutSuccess={checkoutSuccess}
            setCheckoutSuccess={setCheckoutSuccess}
          />
        );
      case 'about':
        return <About />;
      case 'sponsors':
        return <Sponsors />;
      case 'contact':
        return <Contact />;
      case 'terminal':
        return <TerminalPage />;
      default:
        return <Home onEnter={() => handleNavClick('events')} />;
    }
  };

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between">
      
      {/* Navbar (Top) */}
      <nav className="w-full flex justify-between items-center px-8 py-6 pointer-events-auto bg-gradient-to-b from-black/80 to-transparent">
        {/* Left: Brand Icon */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
          <div className="h-8 md:h-10 relative filter drop-shadow-[0_0_8px_rgba(0,242,255,0.6)]">
            <img 
              src="/icon.svg" 
              alt="Techfest Logo" 
              className="h-full object-contain" 
            />
          </div>
        </div>

        {/* Middle: Links */}
        <div className="hidden md:flex gap-12">
          {[
            { label: 'ACCOMMODATION', id: 'accommodation' },
            { label: 'WORKSHOPS', id: 'workshops' },
            { label: 'COMPETITIONS', id: 'competitions' }
          ].map((item, i) => (
            <motion.button 
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className={`text-xs font-mono tracking-[0.2em] transition-all duration-300 ${
                activeSection === item.id 
                  ? 'text-primary font-bold scale-105 border-b border-primary/50 pb-1' 
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              {item.label}
            </motion.button>
          ))}
        </div>

        {/* Right: Audio control & Sign In */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex items-center gap-6"
        >
          {/* Audio toggle */}
          <button 
            onClick={toggleSound}
            className={`p-2 border transition-all duration-300 ${
              soundEnabled 
                ? 'border-primary text-primary bg-primary/10 shadow-[0_0_8px_rgba(0,242,255,0.2)]' 
                : 'border-white/20 text-white/50 hover:border-white/50'
            }`}
            title={soundEnabled ? "Mute interface sounds" : "Enable interface sounds"}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {user ? (
            <div className="flex items-center gap-3 font-mono">
              <div className="hidden sm:flex flex-col text-right text-[8px] leading-tight">
                <span className="text-white font-bold tracking-wider">{user.displayName.toUpperCase()}</span>
                <span className="text-primary/70">SYNCED_</span>
              </div>
              <img 
                src={user.photoURL} 
                alt="Avatar" 
                className="w-7 h-7 rounded-none border border-primary/40 shadow-[0_0_6px_rgba(0,242,255,0.2)]" 
              />
              <button 
                onClick={handleSignOut}
                className="px-3 py-1 border border-red-500/30 text-red-400 text-[8px] font-mono hover:bg-red-500/10 transition-colors duration-200"
              >
                DISCONNECT
              </button>
            </div>
          ) : (
            <button 
              onClick={handleSignIn}
              disabled={authLoading}
              className="px-6 py-2 border border-primary/50 text-primary text-xs font-mono tracking-widest hover:bg-primary/10 transition-colors duration-300 disabled:opacity-50"
            >
              {authLoading ? 'CONNECTING...' : 'SIGN IN'}
            </button>
          )}
        </motion.div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 relative flex items-center justify-between w-full px-8 overflow-hidden">
        
        {/* Left Sidebar (Navigation) - responsive floating bottom bar on mobile */}
        <div className="flex flex-row md:flex-col gap-3 md:gap-6 pointer-events-auto bg-black/80 md:bg-black/30 p-3 md:p-4 rounded-none border border-white/5 backdrop-blur-md md:backdrop-blur-sm relative z-20 fixed bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:static md:bottom-auto md:left-auto">
          {/* HUD Corner Brackets */}
          <div className="bracket-tl" />
          <div className="bracket-tr" />
          <div className="bracket-bl" />
          <div className="bracket-br" />
          {[
            { icon: <HomeIcon size={18} />, label: 'HOME', id: 'home' },
            { icon: <Calendar size={18} />, label: 'EVENTS', id: 'events' },
            { icon: <Terminal size={18} />, label: 'AI TERMINAL', id: 'terminal' },
            { icon: <Compass size={18} />, label: 'ABOUT US', id: 'about' },
            { icon: <Handshake size={18} />, label: 'SPONSORS', id: 'sponsors' },
            { icon: <ShoppingBag size={18} />, label: 'STORE', id: 'store' },
            { icon: <MessageCircle size={18} />, label: 'CONTACT', id: 'contact' },
          ].map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`group flex items-center gap-4 p-2 transition-all duration-300 rounded-none border ${
                activeSection === item.id
                  ? 'border-primary/40 text-primary bg-primary/5'
                  : 'border-transparent text-text-secondary hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="w-5 flex justify-center">{item.icon}</div>
              <span className="text-[10px] font-mono tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-14 whitespace-nowrap bg-black/85 border border-white/10 px-3 py-1 rounded-none backdrop-blur-md">
                {item.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Center Canvas UI Layer (Dashboard overlays) - bottom padding for mobile bottom bar */}
        <div className="flex-1 max-w-4xl mx-auto h-[78%] flex items-center justify-center z-10 pointer-events-auto px-4 md:px-10 pb-20 md:pb-0">
          <AnimatePresence mode="wait">
            {renderActivePage()}
          </AnimatePresence>
        </div>

        {/* Right Sidebar (Socials) - hidden on mobile */}
        <div className="hidden md:flex flex-col gap-6 pointer-events-auto bg-black/30 p-4 rounded-none border border-white/5 backdrop-blur-sm relative z-20">
          {/* HUD Corner Brackets */}
          <div className="bracket-tl" />
          <div className="bracket-tr" />
          <div className="bracket-bl" />
          <div className="bracket-br" />
          {[
            { icon: <div className="text-[9px] font-bold text-center">IG</div>, href: 'https://instagram.com/techfest_iitbombay' },
            { icon: <div className="text-[9px] font-bold text-center">LN</div>, href: 'https://linkedin.com/company/techfest-iit-bombay' },
            { icon: <div className="text-[9px] font-bold text-center">YT</div>, href: 'https://youtube.com/user/techfestiitbombay' },
            { icon: <div className="text-[9px] font-bold text-center">X</div>, href: 'https://twitter.com/techfest_iitb' },
            { icon: <MessageCircle size={16} />, href: '#' }, // Discord
            { icon: <Phone size={16} />, href: '#' } // WhatsApp
          ].map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onMouseEnter={() => soundEffects.playHover()}
              className="text-gray-500 hover:text-white transition-colors duration-300 p-1"
            >
              {item.icon}
            </motion.a>
          ))}
        </div>

      </div>

      {/* Footer System Console */}
      <footer className="w-full px-8 py-4 pointer-events-auto bg-gradient-to-t from-black/85 to-transparent flex justify-between items-center text-[8px] font-mono text-gray-600 select-none">
        <div>TECHFEST IIT BOMBAY 2026-27 // INTEGRATION DIVISION // CORE VER 5.1.0</div>
        <div className="flex gap-4">
          <span className="text-primary font-bold animate-pulse">GRID OPERATIONAL // LINK STABLE</span>
          <span>LATENCY: 42ms</span>
        </div>
      </footer>
      
    </div>
  );
}
