import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { isAllowedCurrency } from '../_shared/currencies.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...corsHeaders } })

// business_currency is protected by RLS (profiles_owner_update), so pros change it here.
serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  try {
    const token = (req.headers.get('Authorization') ?? '').replace('Bearer ', '')
    if (!token) return json({ error: 'Unauthorized' }, 401)

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) return json({ error: 'Unauthorized' }, 401)

    const { currency } = await req.json().catch(() => ({})) as { currency?: string }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('business_country')
      .eq('id', user.id)
      .single()
    if (profileError || !profile) return json({ error: 'Profile not found' }, 404)

    if (!isAllowedCurrency(profile.business_country, currency)) {
      return json({ error: 'This currency is not available for your business country.' }, 400)
    }

    const value = currency!.toLowerCase()
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ business_currency: value })
      .eq('id', user.id)
    if (updateError) return json({ error: 'Could not save the currency.' }, 500)

    return json({ business_currency: value })
  } catch (err) {
    console.error('update-business-currency:', err)
    return json({ error: 'Internal server error' }, 500)
  }
})
