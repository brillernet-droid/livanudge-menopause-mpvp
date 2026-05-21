/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        medical: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#2563eb",
          700: "#1d4ed8",
          900: "#0f172a"
        }
      },
      boxShadow: {
        soft: "0 16px 40px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};
