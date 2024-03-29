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
          "10%": { opacity: "0", transform: "translateX(-80px)" },
          "20%": { opacity: "1", transform: "translateX(0px)" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        float: {
          "0%": { transform: "translateY(20px)" },
          "50%": { transform: "translateY(-20px)" },
          "100%": { transform: "translateY(20px)" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-100%)" },
          "90%": { opacity: "0", transform: "translateX(-100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideLeft: {
          "0%": { opacity: "0", transform: "translateX(100%)" },
          "95%": { opacity: "0", transform: "translateX(100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideOut: {
          "0%": { opacity: "1", transform: "translateX(0)" },
          "100%": { opacity: "0", transform: "translateX(100%)" },
        },
        bgcolorChange: {
          "0%": { backgroundColor: "rgb(192 132 252 / 0.5)" },
          "25%": { backgroundColor: "rgb(96 165 250 / 0.5)" },
          "50%": { backgroundColor: "rgb(248 113 113 / 0.5)" },
          "100%": { backgroundColor: "rgb(192 132 252 / 0.5)" },
        },
        popUp: {
          "0%": { opacity: "0", transform: "translateY(100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
    animation: {
      hide: "hide 10000ms ease-in-out",
      show: "show 4000ms ease-in-out",
      show2: "show2 7300ms ease-in-out",
      show3: "show3 7300ms ease-in-out",
      float: "float 2000ms ease-in-out infinite",
      slideRight: "slideRight 7000ms ease-in-out",
      slideLeft: "slideLeft 7000ms ease-in-out",
      slideIn: "slideIn 500ms ease-in-out",
      slideOut: "slideOut 500ms ease-in-out",
      bgcolorChange: "bgcolorChange 10000ms ease-in-out infinite",
      popUp: "popUp 500ms ease-in-out",
    },
  },
  plugins: [],
} satisfies Config;
