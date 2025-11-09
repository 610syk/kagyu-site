/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans JP", "ui-sans-serif", "system-ui"],
        display: ["Marcellus", "serif"], // 見出し用
      },
      colors: {
        mist: "#f2fbf9",           // ごく淡いミント
        haze: "#eef7ff",           // ごく淡い水色
        glass: "rgba(255,255,255,0.55)",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.06)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
