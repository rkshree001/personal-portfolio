import { createClient, SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl: string = "https://ttzzzkcvuctveiqgyimf.supabase.co"
const supabaseAnonKey: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0enp6a2N2dWN0dmVpcWd5aW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMTE0NDYsImV4cCI6MjA3MTY4NzQ0Nn0.hasefB_bP6qOi_KUb6RT1J8v1oOsGvKOakLqMcscogw"

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)
