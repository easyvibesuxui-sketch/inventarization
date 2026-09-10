/** Reads an env var, failing loudly at the call site instead of silently sending `undefined`. */
function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing environment variable ${name}. Copy .env.example to .env.local and fill it in.`,
    );
  }
  return value;
}

export const supabaseUrl = () => required('NEXT_PUBLIC_SUPABASE_URL');
export const supabaseAnonKey = () => required('NEXT_PUBLIC_SUPABASE_ANON_KEY');
export const anthropicApiKey = () => required('ANTHROPIC_API_KEY');
