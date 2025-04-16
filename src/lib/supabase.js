import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zspvjlnobpuiyirqogws.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzcHZqbG5vYnB1aXlpcnFvZ3dzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2ODQ4ODMsImV4cCI6MjA2MDI2MDg4M30.OTx0jPZfSX9FtFndntWTh6dCB-FiNGINuxBAaScEVqA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)