import { supabase } from './supabaseClient';

/**
 * Tracks user activity and logs it to Supabase.
 * Automatically generates and stores a persistent anonymous session ID in localStorage.
 * 
 * @param {string} actionType - The action being performed (e.g., 'filter_neighborhood', 'interacted_with_staging_slider')
 * @param {Object} metadata - Additional details about the action (e.g., area name, staging style)
 */
export async function trackUserActivity(actionType, metadata = {}) {
  try {
    // 1. Get or create a persistent anonymous session ID
    let sessionId = localStorage.getItem('visitor_session_id');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem('visitor_session_id', sessionId);
    }

    // 2. Insert the activity row into Supabase lead_activity table
    const { error } = await supabase.from('lead_activity').insert({
      session_id: sessionId,
      action_type: actionType,
      metadata: metadata,
    });

    if (error) {
      console.error('Supabase tracking error:', error.message);
    }
  } catch (err) {
    console.error('Failed to track user activity:', err);
  }
}