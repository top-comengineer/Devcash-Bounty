/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    colors: {
      // Dark theme colors
      dtPrimary: "#675CFF",
      dtPrimaryLessSat: "#7066FF",
      dtSecondary: "#8850F8",
      dtBackground: "#010014",
      dtBackgroundSecondary: "#181726",
      dtBackgroundTertiary: "#222133",
      dtText: "#F2F1FF",
      dtSuccess: "#B1FFAA",
      dtDanger: "#FF8080",
      dtPending: "#FFDF80",
      // Light theme colors
      ltPrimary: "#675CFF",
      dtPrimaryLessSat: "#7066FF",
      ltSecondary: "#8850F8",
      ltBackground: "#F8F7FC",
      ltBackgroundSecondary: "#FFFFFF",
      ltBackgroundTertiary: "#FFFFFF",
      ltText: "#010014",
      ltSuccess: "#009966",
      ltDanger: "#990040",
      ltPending: "#CD8900"
    },
    boxShadow: {
      md:
        " 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06)",
      lg:
        " 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05)",
      xl:
        " 0 20px 25px -5px rgba(0, 0, 0, .1), 0 10px 10px -5px rgba(0, 0, 0, .04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, .25)",
      xlS:
        " 0 20px 25px -5px rgba(0, 0, 0, .4), 0 10px 10px -5px rgba(0, 0, 0, .2)"
    },
    opacity: {
      "5": "0.05",
      "10": "0.1"
    },
    borderRadius: {
      none: "0",
      sm: "0.125rem",
      default: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      "2xl": "1rem",
      "3xl": "1.5rem",
      "4xl": "3rem",
      "5xl": "6rem",
      full: "9999px"
    },
    extend: {
      spacing: {
        7: "1.75rem",
        72: "18rem",
        84: "21rem",
        96: "24rem"
      },
      width: {
        "1/7": "14.2857143%",

        "2/7": "28.5714286%",

        "3/7": "42.8571429%",

        "4/7": "57.1428571%",

        "5/7": "71.4285714%",

        "6/7": "85.7142857%"
      }
    }
  },
  variants: {},
  plugins: []
};
