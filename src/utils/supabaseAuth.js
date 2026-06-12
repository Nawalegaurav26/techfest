import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isMock = !supabase;

if (isMock) {
  console.warn("Supabase credentials missing (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY). Running in simulated Supabase Auth mode.");
}

// Normalizes Supabase user metadata structure to match the existing UI interface
export const normalizeUser = (supabaseUser) => {
  if (!supabaseUser) return null;
  return {
    uid: supabaseUser.id,
    displayName: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'GUEST',
    email: supabaseUser.email,
    photoURL: supabaseUser.user_metadata?.avatar_url || supabaseUser.user_metadata?.picture || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="%2300f2ff"/><text x="20" y="25" font-family="monospace" font-size="16" fill="black" text-anchor="middle" font-weight="bold">TG</text></svg>'
  };
};

export const loginWithGoogle = async () => {
  if (isMock) {
    return new Promise((resolve) => {
      // Simulate OAuth redirect delay
      setTimeout(() => {
        const mockUser = {
          uid: `tf-supabase-mock-uid-${Math.floor(100000 + Math.random() * 900000)}`,
          displayName: 'Cyborg Guest (Supabase)',
          email: 'guest.supabase@techfest.in',
          photoURL: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="%2338bdf8"/><text x="20" y="25" font-family="monospace" font-size="16" fill="black" text-anchor="middle" font-weight="bold">SB</text></svg>'
        };
        resolve(mockUser);
      }, 800);
    });
  }

  // Start Supabase Google OAuth sign in
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin
    }
  });

  if (error) throw error;
  return normalizeUser(data.user);
};

export const loginWithGithub = async () => {
  if (isMock) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          uid: `tf-supabase-mock-github-${Math.floor(100000 + Math.random() * 900000)}`,
          displayName: 'GitHub Operator (Simulated)',
          email: 'github.operator@techfest.in',
          photoURL: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="%2322c55e"/><text x="20" y="25" font-family="monospace" font-size="16" fill="black" text-anchor="middle" font-weight="bold">GH</text></svg>'
        };
        resolve(mockUser);
      }, 800);
    });
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: window.location.origin
    }
  });

  if (error) throw error;
  return normalizeUser(data.user);
};

export const loginWithEmailPassword = async (email, password, isSignUp = false) => {
  if (isMock) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (password.length < 6) {
          reject(new Error("Password validation failure: Minimum 6 characters required."));
          return;
        }
        const mockUser = {
          uid: `tf-supabase-mock-email-${Math.floor(100000 + Math.random() * 900000)}`,
          displayName: email.split('@')[0].toUpperCase(),
          email: email,
          photoURL: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="%23d946ef"/><text x="20" y="25" font-family="monospace" font-size="16" fill="black" text-anchor="middle" font-weight="bold">EM</text></svg>'
        };
        resolve(mockUser);
      }, 1000);
    });
  }

  if (isSignUp) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return normalizeUser(data.user);
  } else {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return normalizeUser(data.user);
  }
};

export const loginWithMagicLink = async (email) => {
  if (isMock) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: "OTP Link dispatched to email." });
      }, 1000);
    });
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window.location.origin,
    }
  });

  if (error) throw error;
  return { message: "OTP Link dispatched to email." };
};

export const logoutUser = async () => {
  if (isMock) {
    return Promise.resolve();
  }
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Set up listener to capture redirects and session updates
export const subscribeToAuthChanges = (callback) => {
  if (isMock) {
    callback(null);
    return () => {};
  }

  // Load initial session
  supabase.auth.getSession().then(({ data: { session } }) => {
    callback(normalizeUser(session?.user || null));
  });

  // Listen for login/logout state transitions
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(normalizeUser(session?.user || null));
  });

  return () => {
    subscription.unsubscribe();
  };
};
