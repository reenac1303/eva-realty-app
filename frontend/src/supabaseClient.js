import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://imxifvczzqfjqlavxkco.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlteGlmdmN6enFmanFsYXZ4a2NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2MjUxMzEsImV4cCI6MjEwMzIwMTEzMX0.4B_sPbkvGbW9IPZ2nR7G3YspBwYu8AXdnf8pj1Xw34M';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
