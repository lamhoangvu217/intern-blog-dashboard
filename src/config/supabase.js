import { createClient } from "@supabase/supabase-js";
const supabase = createClient(import.meta.env.VITE_SUPABASE_AUTH_URL, import.meta.env.VITE_SUPABASE_API_KEY);
export { supabase }