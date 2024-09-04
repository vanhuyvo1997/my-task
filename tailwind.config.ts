import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'selector',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./tailwind.config.ts"
  ],
  theme: {
    extend: {
      colors: {
        'hover-background': '#475569',

        'background-light': '#c2cfce',
        'headerbar-light': 'white',

        'background-dark': '#000000',
        'headerbar-dark': '#000000',
        'sidebar-dark': '#101010',
        'account-info-dark': '#202020',
        'task-dark': '#303030',
        'showtask-button-dark': '#303030',
        'dialog-background-dark': '#404040',
        'text-dark': '#dddddd',
        'add-task-background-dark': '#454545',
        'login-form-background-dark': '#202020',
        'text-input-background-dark': '#000000',
      }
    }
  },
  plugins: [],
};
export default config;
