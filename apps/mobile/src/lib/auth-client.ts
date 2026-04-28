import { createAuthClient } from 'better-auth/react';
import { expoClient } from '@better-auth/expo/client';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { env } from './env';

export const authClient = createAuthClient({
  baseURL: env.EXPO_PUBLIC_BACK_END_BASE_URL || 'http://localhost:3333',
  plugins: [
    expoClient({
      scheme: env.EXPO_PUBLIC_APP_NAME || 'biker-app',
      storagePrefix: env.EXPO_PUBLIC_APP_NAME || 'biker-app',
      storage: SecureStore,
    }),
  ],
});

export const handleGoogleLogin = async () => {
  const { error } = await authClient.signIn.social({
    provider: 'google',
    callbackURL:
      `${env.EXPO_PUBLIC_FRONT_END_BASE_URL}/dashboard` || 'http://localhost:8081/dashboard',
  });
  if (error) {
    throw new Error(error.message);
  }
};

export const handleLogout = async (redirectTo?: string) => {
  await authClient.signOut();

  if (redirectTo) {
    router.replace(redirectTo);
  }
};
