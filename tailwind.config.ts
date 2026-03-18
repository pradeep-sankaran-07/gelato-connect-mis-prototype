import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Gelato Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        // GNX Neutral scale
        'neutral-5': '#f7f7f7',
        'neutral-10': '#f2f2f2',
        'neutral-20': '#e6e6e6',
        'neutral-30': '#d4d4d4',
        'neutral-40': '#bdbdbd',
        'neutral-50': '#999999',
        'neutral-60': '#8a8a8a',
        'neutral-70': '#6b6b6b',
        'neutral-80': '#525252',
        'neutral-90': '#383838',
        'neutral-100': '#212121',
        // GNX Primary (Purple)
        'primary-5': '#f4e8fa',
        'primary-10': '#ebddf1',
        'primary-30': '#d7bce2',
        'primary-50': '#cfa3e1',
        'primary-70': '#9c77ac',
        'primary-90': '#542c65',
        // GNX Info (Blue)
        'info-10': '#eaf4ff',
        'info-20': '#d5ebff',
        'info-50': '#91d0ff',
        'info-70': '#007cb4',
        'info-90': '#00527c',
        // GNX Success (Green)
        'success-10': '#cdfee1',
        'success-20': '#b4fed2',
        'success-50': '#2ed389',
        'success-70': '#29845a',
        'success-90': '#0c5132',
        // GNX Caution (Yellow)
        'caution-10': '#fff8db',
        'caution-20': '#fff4bf',
        'caution-50': '#ffe600',
        'caution-70': '#998a00',
        'caution-90': '#4f4700',
        // GNX Warning (Orange)
        'warning-10': '#fff1e3',
        'warning-20': '#ffe4c6',
        'warning-50': '#ffb800',
        'warning-70': '#956f00',
        'warning-90': '#5e4200',
        // GNX Critical (Red)
        'critical-5': '#ffefeb',
        'critical-10': '#fee9e8',
        'critical-20': '#fedad9',
        'critical-50': '#fd817a',
        'critical-60': '#ef4d2f',
        'critical-70': '#e51c00',
        'critical-90': '#8e1f0b',
        // Surface
        'surface-dark': '#212121',
        // Sidebar accents
        'sidebar-accent-estimates': '#B39DDB',
        'sidebar-accent-orders': '#FF788F',
        'sidebar-accent-production': '#FFD966',
        'sidebar-accent-logistics': '#6BC4E8',
        'sidebar-accent-inventory': '#ffb800',
        'sidebar-accent-finance': '#2ed389',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        pill: '999px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
