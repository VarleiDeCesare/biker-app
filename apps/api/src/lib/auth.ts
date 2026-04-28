import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '../db';
import * as schema from '../db/schema';
import { openAPI } from 'better-auth/plugins';
import { expo } from '@better-auth/expo';

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [process.env.FRONT_END_BASE_URL ?? 'http://localhost:8081'],
  database: drizzleAdapter(db, { provider: 'pg', schema }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [openAPI(), expo()],
  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            redirectURI: `${process.env.BACK_END_BASE_URL ?? 'http://localhost:3333'}/api/auth/callback/google`,
            prompt: 'select_account',
          },
        }
      : {}),
  },
});

export type Auth = typeof auth;
