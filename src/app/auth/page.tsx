'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleEmailSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setLoading(false);
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Check your email for the login link!');
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) {
      setMessage(error.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <div style={{ maxWidth: '400px', width: '100%', padding: '2rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.5rem', color: '#333' }}>Sign In / Sign Up</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button
          onClick={handleEmailSignIn}
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Loading...' : 'Sign In with Email'}
        </button>
        <hr style={{ margin: '1.5rem 0', border: 'none', borderTop: '1px solid #ddd' }} />
        <button
          onClick={() => handleOAuthSignIn('google')}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#db4437',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            marginBottom: '0.5rem',
            cursor: 'pointer',
          }}
        >
          Sign In with Google
        </button>
        <button
          onClick={() => handleOAuthSignIn('github')}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Sign In with GitHub
        </button>
        {message && <p style={{ marginTop: '1rem', color: 'red', textAlign: 'center' }}>{message}</p>}
      </div>
    </div>
  );
}
