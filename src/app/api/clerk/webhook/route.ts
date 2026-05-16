import type { WebhookEvent } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import { headers } from 'next/headers';
import { Webhook } from 'svix';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: Request) {
  const payload = await req.text();
  const headersList = await headers();

  const svix_id = headersList.get('svix-id');
  const svix_timestamp = headersList.get('svix-timestamp');
  const svix_signature = headersList.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing headers', { status: 400 });
  }

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

  let event: WebhookEvent;

  try {
    event = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('❌ Webhook verification failed:', err);
    return new Response('Invalid signature', { status: 400 });
  }

  console.log('🔥 WEBHOOK EVENT:', event.type);

  // =========================
  // USER CREATED
  // =========================
  if (event.type === 'user.created') {
    const { id, email_addresses, first_name, last_name } = event.data;

    const email = email_addresses?.[0]?.email_address;

    const name = [first_name, last_name].filter(Boolean).join(' ') || null;

    const { data, error } = await supabase.from('users').upsert(
      {
        clerk_id: id,
        email,
        name,
        role: 'customer',
      },
      { onConflict: 'clerk_id' },
    );

    if (error) {
      console.error('❌ Supabase CREATE error:', error);
    } else {
      console.log('✅ User created:', data);
    }
  }

  // =========================
  // USER UPDATED
  // =========================
  if (event.type === 'user.updated') {
    const { id, email_addresses, first_name, last_name } = event.data;

    const email = email_addresses?.[0]?.email_address;

    const name = [first_name, last_name].filter(Boolean).join(' ') || null;

    const { data, error } = await supabase
      .from('users')
      .update({
        email,
        name,
      })
      .eq('clerk_id', id);

    if (error) {
      console.error('❌ Supabase UPDATE error:', error);
    } else {
      console.log('✏️ User updated:', data);
    }
  }

  // =========================
  // USER DELETED
  // =========================
  if (event.type === 'user.deleted') {
    const { id } = event.data;

    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('clerk_id', id);

    if (error) {
      console.error('❌ Supabase DELETE error:', error);
    } else {
      console.log('🗑️ User deleted:', data);
    }
  }

  return new Response('OK');
}
