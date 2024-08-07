/** @type {import('tailwindcss').Config} */
import flowbitePlugin from "flowbite-react/tailwind";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbitePlugin.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbitePlugin.plugin()],
};
