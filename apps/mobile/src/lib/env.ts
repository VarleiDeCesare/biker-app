const requiredVars = {
  EXPO_PUBLIC_BACK_END_BASE_URL: process.env.EXPO_PUBLIC_BACK_END_BASE_URL,
  EXPO_PUBLIC_FRONT_END_BASE_URL: process.env.EXPO_PUBLIC_FRONT_END_BASE_URL,
  EXPO_PUBLIC_APP_NAME: process.env.EXPO_PUBLIC_FRONT_END_BASE_URL,
} as const;

for (const [key, value] of Object.entries(requiredVars)) {
  if (!value) {
    throw new Error(`Missing required env var: ${key}`);
  }
}

export const env = requiredVars as {
  [K in keyof typeof requiredVars]: string;
};
