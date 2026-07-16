import { isSupabaseConfigured, supabase } from './supabase';

export async function getCurrentUser() {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) return null;

  return data.user ?? null;
}

export function listenToAuthChanges(onChange) {
  if (!isSupabaseConfigured) return () => {};

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    onChange(session?.user ?? null);
  });

  return () => subscription.unsubscribe();
}

export async function sendLoginCode(email) {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase 还没有配置，暂时不能登录。');
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
  });

  if (error) throw error;
}

export async function verifyLoginCode(email, token) {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase 还没有配置，暂时不能登录。');
  }

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'email',
  });

  if (error) throw error;

  return data.user ?? null;
}

export async function signOut() {
  if (!isSupabaseConfigured) return;

  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function loadUserPreferences(userId) {
  if (!isSupabaseConfigured || !userId) return null;

  const { data, error } = await supabase
    .from('user_preferences')
    .select('selections')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw error;

  return data?.selections ?? null;
}

export async function saveUserPreferences(userId, selections) {
  if (!isSupabaseConfigured || !userId) {
    throw new Error('请先登录，再保存偏好。');
  }

  const { error } = await supabase.from('user_preferences').upsert(
    {
      user_id: userId,
      selections,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' },
  );

  if (error) throw error;
}
