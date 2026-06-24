# IIT Bombay Techfest 2026 Portal — Overall Project Report

This report provides a comprehensive overview of the **IIT Bombay Techfest 2026 Web Portal** codebase, its architectural components, the technology stack, and the accessibility/readability enhancements implemented.

---

## 1. Project Directory Structure

Below is the directory structure of the project workspace:

```text
IIT Bombay Techfest/
├── .env.example              # Template for environment variables (Supabase keys)
├── .gitignore                # Git exclude list
├── eslint.config.js          # ESLint configuration
├── index.html                # Main entry HTML file (contains root viewport, font links)
├── keys.txt                  # Structural keys & telemetry variables
├── package.json              # App dependencies, scripts, and dev configuration
├── package-lock.json         # Package lock file
├── postcss.config.js         # PostCSS configuration for CSS compiling
├── tailwind.config.js        # Tailwind CSS v4 configurations & themes
├── vite.config.js            # Vite build configuration (uses roll-up plugins & server ports)
│
├── dist/                     # Optimized, minified production build bundle
│
├── public/                   # Static public assets (images, logos, fonts, metadata)
│   ├── llms.txt              # LLM-readable summary files
│   └── *.png                 # Logos & static icons
│
├── src/                      # React application source code
│   ├── App.css               # Core styles for animations & keyframes
│   ├── App.jsx               # Main router & theme provider
│   ├── index.css             # Global Tailwind styles, variables, & responsive queries
│   ├── main.jsx              # React mounting entrypoint
│   │
│   ├── assets/               # Media elements, audio resources, and layout icons
│   │
│   ├── components/           # Reusable UI components
│   │   ├── AnnouncementBanner.jsx  # Floating ticker banner at the top of the viewport
│   │   ├── BackgroundLayers.jsx    # Parallax background grid & ambient elements
│   │   ├── BootLoader.jsx          # Futuristic matrix boot screen sequence
│   │   ├── Countdown.jsx           # Generic time countdown widget
│   │   ├── CyberBot.jsx            # 3D interactive chatbot assistant helper
│   │   ├── CyborgHero.jsx          # Landing page headline container
│   │   ├── EventCountdownWidget.jsx# Time tracker for registration deadlines
│   │   ├── EvolutionPortal.jsx     # Cybernetic gateway landing card
│   │   ├── FloatingDrone.jsx       # 3D floating drone using React Three Fiber
│   │   ├── GlobalCursor.jsx        # Premium customized mouse pointer dot/ring
│   │   ├── HUD.jsx                 # Heads-up display panels
│   │   ├── HUDPanels.jsx           # Floating telemetry layouts
│   │   ├── HolographicNav.jsx      # Top navigation header bar & controls
│   │   ├── NeuralCanvas.jsx        # Animated matrix-rain background logic
│   │   ├── NotificationBell.jsx    # Live alerts dropdown menu
│   │   ├── PageLayout.jsx          # Wrapper containing sidebars, footer, & outlet
│   │   ├── ScrollToTop.jsx         # Action button to jump to top of scroll height
│   │   ├── SearchOverlay.jsx       # Quick filter page search panel (Ctrl+K)
│   │   ├── ShaderBackground.jsx    # GLSL custom canvas rendering
│   │   ├── SocialLinks.jsx         # Right sidebar communication links
│   │   ├── TF26Title.jsx           # Futuristic cyberpunk title widget
│   │   ├── TerminalConsole.jsx     # Embedded interactive console prompt
│   │   └── TransparentLogo.jsx     # Glowing branding SVG component
│   │
│   ├── pages/                # Individual routing pages
│   │   ├── About.jsx               # About the festival module
│   │   ├── Accommodation.jsx       # Booking portals & safety rules
│   │   ├── CampusMap.jsx           # Interactive vector map & landmark side-panel
│   │   ├── ComingSoon.jsx          # Locked modules placeholder countdown
│   │   ├── Competitions.jsx        # Competition grids & filtering selectors
│   │   ├── Contact.jsx             # General inquiry forms & map cards
│   │   ├── Dashboard.jsx           # Registrant profiles & registered events list
│   │   ├── Events.jsx              # Timeline events & details drawers
│   │   ├── Exhibitions.jsx         # Technical showcase pages & detail modals
│   │   ├── FAQ.jsx                 # Dynamic accordion lists
│   │   ├── Hackathon.jsx           # Neural Hackathon overview & registrations
│   │   ├── HallOfFame.jsx          # Historical records & technical achievements
│   │   ├── Home.jsx                # Main landing home modules
│   │   ├── Jobs.jsx                # Internships & opportunities lists
│   │   ├── Leaderboard.jsx         # Live rankings & participant grids
│   │   ├── Lectures.jsx            # Speaker details, profiles & schedules
│   │   ├── MediaGallery.jsx        # Photos, videos, & lightbox filters
│   │   ├── Merch.jsx               # Official t-shirts & collectibles list
│   │   ├── NotFound.jsx            # Error 404 handler page
│   │   ├── PrivacyPolicy.jsx       # Data handling rules & terms
│   │   ├── Quiz.jsx                # Daily science & technology challenges
│   │   ├── Register.jsx            # Dynamic registration checkout forms
│   │   ├── RoboLab.jsx             # Interactive hardware learning module
│   │   ├── Robowars.jsx            # Heavyweight combat bracket & timelines
│   │   ├── Schedule.jsx            # Event timelines & calendar items
│   │   ├── Sponsors.jsx            # Brand partners & category logos
│   │   ├── Store.jsx               # Shopping cart checkouts & summary panels
│   │   ├── Team.jsx                # Organizing committee member listings
│   │   ├── TerminalPage.jsx        # Fullscreen AI Core console prompt
│   │   ├── Timeline.jsx            # Interactive history tracker since 1998
│   │   ├── Winners.jsx             # Hall of Champions lists & prizes
│   │   └── Workshops.jsx           # Technical workshops & specification drawers
│   │
│   └── utils/                # Logic helper files
│       ├── socialIcons.jsx         # SVG wrappers for socials
│       ├── soundEffects.js         # Audio utility controls (hover, clicks, music)
│       └── supabaseAuth.js         # Supabase client authentication API calls
```

---

## 2. Core Architecture & Tech Stack

The application is built as a **Single Page Application (SPA)** with client-side routing, utilizing a modern, premium frontend tech stack:

1. **React 19 & React Router DOM v6**: Powers component state management, hook-based routing, dynamic route parameters, and stateful authentication gates.
2. **Three.js & React Three Fiber (R3F)**: Handles GPU-accelerated 3D graphics in the client, enabling the interactive floating drone mesh and cyborg orbit nodes.
3. **Framer Motion**: Controls high-performance, layout-correct page transitions, spring-loaded modals, specification drawers, and grid entry lists.
4. **Vite**: The build tool configuration leverages fast bundling, dynamic module splitting, and instant Hot Module Replacement (HMR) for development.
5. **Tailwind CSS v4 & Vanilla CSS**: Global styling rules, HSL theme custom variables (`--base`, `--sky`, `--plasma`, `--on-surface`, `--on-muted`), and customized layout classes (such as `.glass-panel`, `.bracket-tl`, and `.glitch-pulse`).
6. **Supabase & Mock Fallbacks**: Provides authentication telemetry and persistence for workshop registrations. If connection tokens are unavailable, a simulation framework defaults variables to mock data seamlessly.

---

## 3. Key Pages & Features

* **AI Terminal (`/terminal`)**: An interactive command console where users type commands (`help`, `events`, `competitions`, `telemetry`) to access information, complete with simulated matrix text effects.
* **Competitions & Workshops**: Dynamic registries sorted by domain with slide-down spec sheets, requirements, tool details, and interactive registration hooks.
* **Campus Map (`/map`)**: Interactive vector map with clickable pins, coordinate listings, local search filters, and terminal logs mapping routes across the IIT Bombay campus.
* **Robowars Module (`/robowars`)**: Visual tournament brackets detailing slot fights, participant countries, weight limits, and schedule timelines.
* **Daily Tech Quiz (`/quiz`)**: Gamified multiple-choice test offering points, progress bars, correct/incorrect feedback, and final score summary cards.
* **Organizing Committee (`/team`)**: Grid layout listing members, year levels, and branches, filtered by technical, design, outreach, operations, finance, and media departments.

---

## 4. Accessibility & UI Enhancements (WCAG Compliance)

Over **35 commits** were made to enhance portal usability, contrast, and layout responsiveness. The following upgrades ensure high readability under dark backgrounds:

### A. Typography Scale Improvements
* Upgraded the global body text base size to `16px` (up from `14px`).
* Enlarged heading clamp limits to scale beautifully up to `64px` on widescreen monitors.
* Standardized card descriptive texts, metadata elements, and button texts to range between `11px` (for labels) and `15px` / `18px` (for body copy).

### B. Contrast Optimization
* Replaced low-contrast opacities (e.g. `opacity: 0.3` / `0.4` or `rgba(189, 200, 209, 0.4)`) with high-contrast text color combinations (`#f1f5f9` / `#cbd5e1` or `rgba(241, 245, 249, 0.85)`).
* Brightened interactive indicators, countdown labels, and input focus states to comply with WCAG AA standard contrast ratios.

### C. Overlap Prevention & Responsive Layouts
* **Collapsible Desktop Navbar**: Shifted the mobile menu breakpoint in `index.css` to `1399px` (from `1023px`). Any viewport width below `1400px` collapses the 11 desktop links into the hamburger drawer to prevent overlaps.
* **Navbar Layout Flow**: Changed the `<nav>` container styling in `HolographicNav.jsx` to use flexbox flow (`flex: 1` with a centered alignment) instead of absolute positioning.
* **Responsive Link Padding**: Applied responsive CSS clamping to navigation link fonts and paddings:
  * `font-size: clamp(10px, 0.85vw, 13px)`
  * `padding: 6px clamp(2px, 0.35vw, 6px)`
  * `white-space: nowrap`
* **Announcement Banner Offset**: Dynamic parent state `bannerDismissed` in `PageLayout.jsx` adjusts the top offset of the fixed navbar, sidebars, and main content panel down by `36px` when the announcement banner is visible, shifting them back to `0px` smoothly when dismissed.

### D. 3D Drone Visibility Upgrades
* Core sphere, guards, and spotlight casings of the drone model were updated from dark gray (`#2e3a47`) to highly reflective metallic white/silver (`#f8fafc`).
* Blade colors were brightened to `#e2e8f0` to show rotation.
* Dynamic emissive glowing elements were added to body meshes to shine in the page's current active theme color against the dark backdrop.

---

## 5. Build & Validation Status

The codebase compiles and builds client assets cleanly. The production build output under Vite yields:
* **Bundled Chunks**: Modular code splitting separates third-party dependencies (Framer Motion, Supabase, React) from routing bundles.
* **Compilation Speed**: Compiles within `1.41s`.
* **Zero Compilation Errors**: Verified clean build via `npm run build`.
