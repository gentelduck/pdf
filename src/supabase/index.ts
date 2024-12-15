// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

// Your Supabase URL and API Key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Initialize Supabase Client
export const supabase = createClient(supabaseUrl, supabaseKey);
