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
        'sidebar-dark': '#101010',
        'headerbar-dark': '#202020',
        'account-info-dark': '#303030',
        'task-dark': '#353535',
        'showtask-button-dark': '#404040',
        'dialog-background-dark': '#454545',
        'text-dark': '#dddddd',
        'add-task-background-dark': '#454545',
        'login-form-background-dark': '#303030',
        'text-input-background-dark': 'black',
      }
    }
  },
  plugins: [],
};
export default config;
