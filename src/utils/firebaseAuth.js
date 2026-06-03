import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// Firebase configuration (using placeholder values if env is missing)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "mock-api-key-placeholder",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "cyborg-landing.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "cyborg-landing",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "cyborg-landing.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:000000000000:web:00000000000000"
};

let auth = null;
let googleProvider = null;
let isMock = false;

// Attempt to initialize Firebase, fallback to mock if config is empty or invalid
try {
  if (!import.meta.env.VITE_FIREBASE_API_KEY) {
    console.warn("Firebase credentials missing. Running in simulated Google Auth mode.");
    isMock = true;
  } else {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
  }
} catch (e) {
  console.error("Firebase failed to initialize. Reverting to mock login mode.", e);
  isMock = true;
}

export const loginWithGoogle = () => {
  if (isMock) {
    return new Promise((resolve) => {
      // Simulate Google Sign-In pop-up screen delay
      setTimeout(() => {
        const mockUser = {
          uid: `tf-mock-uid-${Math.floor(100000 + Math.random() * 900000)}`,
          displayName: 'Techfest Guest',
          email: 'guest.techfest@gmail.com',
          photoURL: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="%2300f2ff"/><text x="20" y="25" font-family="monospace" font-size="16" fill="black" text-anchor="middle" font-weight="bold">TG</text></svg>'
        };
        resolve(mockUser);
      }, 1000);
    });
  }

  return signInWithPopup(auth, googleProvider)
    .then((result) => result.user)
    .catch((error) => {
      console.error("Google Auth Popup error:", error);
      throw error;
    });
};

export const logoutUser = () => {
  if (isMock) {
    return Promise.resolve();
  }
  return signOut(auth);
};

export { isMock };
