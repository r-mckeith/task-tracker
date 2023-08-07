import { useState, useEffect } from 'react';
import { supabase } from '../../api/SupabaseClient';
import { Session } from '@supabase/supabase-js';

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return session;
};