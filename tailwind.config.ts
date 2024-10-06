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
        'hover-background': '#888888',

        'background-light': '#ffffff',
        'headerbar-light': '#ffffff',
        'sidemenu-background-light': '#e0e0e0',
        'account-info-background-light': '#d0d0d0',
        'menu-item-background-light': '#d0d0d0',
        'task-background-light': '#c0c0c0',
        'showtask-button-background-light': '#c0c0c0',
        'dialog-background-light': '#ffffff',
        'text-light': '#222222',
        'add-task-background-light': '#b8b8b8',
        'login-form-background-light': '#d0d0d0',
        'text-input-background-light': '#ffffff',

        'background-dark': '#000000',
        'headerbar-dark': '#000000',
        'sidemenu-background-dark': '#101010',
        'account-info-background-dark': '#202020',
        'menu-item-background-dark': '#202020',
        'task-background-dark': '#303030',
        'showtask-button-background-dark': '#303030',
        'dialog-background-dark': '#000000',
        'text-dark': '#dddddd',
        'add-task-background-dark': '#484848',
        'login-form-background-dark': '#202020',
        'text-input-background-dark': '#000000',
      }
    }
  },
  plugins: [],
};
export default config;
