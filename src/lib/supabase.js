import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fqowfwuhdpyewwgezsyt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxb3dmd3VoZHB5ZXd3Z2V6c3l0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNDE2ODcsImV4cCI6MjA2MDYxNzY4N30.C0EztBcnBbg8njnEXwEefQwEbwA4G55TsnSV_ekyaaQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)