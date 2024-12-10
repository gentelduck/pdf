// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

// Your Supabase URL and API Key
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

// Initialize Supabase Client
export const supabase = createClient(supabaseUrl, supabaseKey);
