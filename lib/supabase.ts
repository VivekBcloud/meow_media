import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://cshhlpsxxvoyacgyjyqd.supabase.co";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY as string);

export default supabase;