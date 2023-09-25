import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://dnxpoudekrshjdjveteo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRueHBvdWRla3JzaGpkanZldGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ1MjQ3MjgsImV4cCI6MjAxMDEwMDcyOH0.AUgk_q11_NNHjSY_EHcKclB2m__pJaOqqRpnAPsDo-8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
