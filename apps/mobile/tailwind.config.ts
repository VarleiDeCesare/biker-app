import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#0D0D0D',
        foreground: '#F5F5F5',
        primary: {
          DEFAULT: '#FF4D00',
          foreground: '#FFFFFF',
          soft: '#FF8C42',
        },
        surface: {
          DEFAULT: '#1A1A1A',
          raised: '#242424',
        },
        muted: {
          DEFAULT: '#2A2A2A',
          foreground: '#888888',
        },
        divider: '#2A2A2A',
        border: '#2A2A2A',
        destructive: {
          DEFAULT: '#E74C3C',
          foreground: '#FFFFFF',
        },
        success: {
          DEFAULT: '#2ECC71',
          foreground: '#FFFFFF',
        },
        warning: {
          DEFAULT: '#FF8C42',
          foreground: '#0D0D0D',
        },
        card: {
          DEFAULT: '#1A1A1A',
          foreground: '#F5F5F5',
        },
      },
      borderRadius: {
        lg: '16px',
        md: '8px',
        sm: '4px',
        xl: '24px',
        '2xl': '32px',
      },
      fontFamily: {
        sans: ['Inter_400Regular', 'System'],
        mono: ['JetBrainsMono_400Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
