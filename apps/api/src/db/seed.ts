import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { db } from '.';
import { user } from './schema/auth';
import { auth } from '../lib/auth';

const SEED_USER = {
  name: 'Dev User',
  email: 'dev@bikerapp.com',
  password: 'password123',
};

const seed = async () => {
  const existing = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.email, SEED_USER.email))
    .limit(1);

  if (existing.length > 0) {
    return;
  }

  const response = await auth.api.signUpEmail({ body: SEED_USER });
  console.log('Seed user created:', response.user.email);
};

seed()
  .then(() => process.exit(0))
  .catch((err: unknown) => {
    console.error('Seed failed:', err);
    process.exit(1);
  });
