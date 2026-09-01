require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase Client using environment keys[cite: 1, 2]
const supabase = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_ANON_KEY
);

console.log('Supabase client initialized successfully!');

// ==========================================
// 1. ADMIN DASHBOARD DATA ENDPOINT
// ==========================================
app.get('/api/admin/:tableName', async (req, res) => {
  try {
    const adminPassword = req.headers['x-admin-password'];
    
    if (adminPassword !== process.env.ADMIN_PASSWORD && adminPassword !== 'EvaRealty2026!') {
      return res.status(401).json({ error: 'Unauthorized access.' });
    }

    const { tableName } = req.params;
    const allowedTables = ['clients', 'lead_activity', 'leads'];
    
    if (!allowedTables.includes(tableName.toLowerCase())) {
      return res.status(400).json({ error: 'Invalid table name requested.' });
    }

    const { data, error } = await supabase
      .from(tableName)
      .select('*');

    if (error) throw error;
    
    return res.json({ success: true, leads: data });
  } catch (error) {
    console.error('Database fetch error:', error);
    return res.status(500).json({ error: 'Internal server database error.' });
  }
});

// ==========================================
// 2. CONTACT FORM / LEAD SUBMISSION ENDPOINT
// ==========================================
app.post('/api/leads', async (req, res) => {
  try {
    const { full_name, email, phone, message, source_feature } = req.body;

    if (!full_name || !email) {
      return res.status(400).json({ error: 'Full name and email are required fields.' });
    }

    const { data: leadData, error: leadError } = await supabase
      .from('leads')
      .insert([
        {
          full_name,
          email,
          phone: phone || null,
          lead_status: 'New',
          source_feature: source_feature || 'Contact Form',
          message: message || null
        }
      ])
      .select()
      .single();

    if (leadError) throw leadError;

    const { error: activityError } = await supabase
      .from('lead_activity')
      .insert([
        {
          lead_id: leadData.id,
          action_type: 'contact_form_submission',
          metadata: { full_name, email, phone, message, source_feature }
        }
      ]);

    if (activityError) {
      console.error('Warning: Failed to log lead activity:', activityError);
    }

    return res.status(201).json({ 
      success: true, 
      message: 'Lead saved successfully!', 
      data: leadData 
    });
  } catch (error) {
    console.error('Error saving lead:', error);
    return res.status(500).json({ error: 'Internal server error while saving lead.' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});