import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        hide: {
          "0%": { opacity: "1" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        show: {
          "0%": { opacity: "0" },
          "50%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        show2: {
          "0%": { opacity: "0", transform: "scale(1.5)" },
          // "25%": { opacity: "1" },
          "20%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        show3: {
          "0%": { opacity: "0", transform: "translateX(-80px)" },
          "20%": { opacity: "1", transform: "translateX(0px)" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
    },
    animation: {
      hide: "hide 10000ms ease-in-out",
      show: "show 4000ms ease-in-out",
      show2: "show2 7300ms ease-in-out",
      show3: "show3 7300ms ease-in-out",
    },
  },
  plugins: [],
} satisfies Config;
