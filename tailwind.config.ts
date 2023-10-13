import type { Config } from 'tailwindcss';

export default {
  mode: 'jit',
  content: ['./src/**/*.{vue, html}'],
  theme: {
    fontFamily: {
      mono: ['Intel One Mono', 'monospace'],
    },
  },
  plugins: [],
} satisfies Config;
