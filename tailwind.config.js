/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: '#00F5FF',
          purple: '#BF00FF',
          pink: '#FF006E',
          blue: '#0047FF',
          gold: '#FFD700',
        },
        void: {
          DEFAULT: '#020008',
          deep: '#050014',
          dark: '#0A0020',
          surface: '#0F0030',
        },
        glass: {
          bg: 'rgba(255, 255, 255, 0.03)',
          border: 'rgba(255, 255, 255, 0.08)',
        },
      },
      fontFamily: {
        display: ['Rajdhani', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
        accent: ['Noto Serif JP', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 0 20px #00F5FF, 0 0 60px rgba(0,245,255,0.3)',
        'neon-purple': '0 0 20px #BF00FF, 0 0 60px rgba(191,0,255,0.3)',
        'neon-pink': '0 0 20px #FF006E, 0 0 60px rgba(255,0,110,0.3)',
        'neon-gold': '0 0 20px #FFD700, 0 0 60px rgba(255,215,0,0.3)',
      },
      borderRadius: {
        cyber: '2px',
        card: '12px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'text-scramble': 'scramble 0.1s steps(1) infinite',
        'slide-in': 'slideIn 0.5s ease-out',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px #00F5FF, 0 0 30px rgba(0,245,255,0.3)' },
          '50%': { boxShadow: '0 0 25px #00F5FF, 0 0 60px rgba(0,245,255,0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scramble: {
          '0%': { opacity: '1' },
          '50%': { opacity: '0.8' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
