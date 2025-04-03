/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Paths to all your components
  ],
  theme: {
    extend: {
      colors: {
        // Extend default colors with custom shades used in your project
        indigo: {
          50: '#eef2ff',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        blue: {
          500: '#3b82f6',
        },
        purple: {
          500: '#9333ea',
        },
        emerald: {
          500: '#10b981',
        },
        amber: {
          500: '#f59e0b',
        },
        gray: {
          600: '#4a5568',
          800: '#1a202c',
        },
      },
      screens: {
        // Define custom breakpoints for mobile, tablet, and desktop
        'xs': '480px', // Extra small devices (portrait phones)
        'sm': '640px', // Small devices (landscape phones, small tablets)
        'md': '768px', // Medium devices (tablets, small laptops)
        'lg': '1024px', // Large devices (desktops, large tablets)
        'xl': '1280px', // Extra large devices (large desktops)
        '2xl': '1536px', // 2X large devices (very large desktops)
      },
      spacing: {
        // Extend spacing for more granular control if needed
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
      },
      fontSize: {
        // Extend font sizes for better typography control
        'xs': '.75rem',
        'sm': '.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      boxShadow: {
        // Custom shadows for enhanced card effects
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      transitionDuration: {
        // Custom transition durations for smooth animations
        '400': '400ms',
      },
    },
  },
  plugins: [
    // Add Tailwind plugins (ensure these are installed)
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};