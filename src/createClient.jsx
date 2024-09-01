import {createClient} from '@supabase/supabase-js';

const apiUrl = 'https://fmukzziakpiqcokuxmkp.supabase.co';
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtdWt6emlha3BpcWNva3V4bWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2Mzk0NDAsImV4cCI6MjA0MDIxNTQ0MH0.9h9qy4cQ0woTq8oKDQk7S79v-5Duryj20Dfx_3Wqs-I';

export const supabase = createClient(apiUrl,apiKey);