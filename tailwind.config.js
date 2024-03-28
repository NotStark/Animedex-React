/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--color-primary) / <alpha-value>)",
        secondary: 'hsl(var(--color-secondary) / <alpha-value>)',
        textColor: 'hsl(var(--color-text) / <alpha-value>)',
        backgroundColor: 'hsl(var(--color-background) / <alpha-value>)',
        skeleton: 'hsl(var(--color-skeleton) / <alpha-value>)',
      }
    },
  },
  plugins: [],
}

