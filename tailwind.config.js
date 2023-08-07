/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
    fontFamily: {
      custom: ['Inter', 'Nunito', 'sans-serif']
    }
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=emerald]"],
          "primary": "#51D28980",
          "secondary": "#0B666A",
          "accent": "#37474F",
          "neutral": "#97FEED",
          "base-200": "#DEEBE8",
          "base-300": "#37474F",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=forest]"],
          "primary": "#51D28980",
          "secondary": "#1DB990",
          "accent": "#37474F",
        },
        // "primary-focus": "#2C383F"
        mytheme: {

          "info": "#93e7fb",

          "success": "#81cfd1",

          "warning": "#efd7bb",

          "error": "#e58b8b",
        },
      },
    ],
  },
  plugins: [require("daisyui"), require('@tailwindcss/typography')],
}

