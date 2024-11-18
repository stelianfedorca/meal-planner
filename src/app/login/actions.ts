'use server';

import { createClient } from '@/config/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  console.log('hello world');
  const supabase = await createClient();

  console.log('formData: ', formData);

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  console.log('error: ', error);
  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/account');
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    if (error.status === 422) {
      console.log('The account is already registered');
    } else {
      redirect('/error');
    }
  }

  revalidatePath('/', 'layout');
  redirect('/account');
}
