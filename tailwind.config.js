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
      dtSecondary: "#8850F8",
      dtBackground: "#010014",
      dtBackgroundLighter: "#181726",
      dtBackgroundLightest: "#222133",
      dtText: "#F2F1FF",
      dtSuccess: "#B1FFAA",
      dtDanger: "#FF8080",
      dtPending: "#FFDF80",
      // Light theme colors
      ltPrimary: "#675CFF",
      ltSecondary: "#8850F8",
      ltBackground: "#F8F7FC",
      ltBackgroundLighter: "#181726",
      ltBackgroundLightest: "#222133",
      ltText: "#010014",
      ltSuccess: "#B1FFAA",
      ltDanger: "#FF8080",
      ltPending: "#FFDF80"
    },
    borderRadius: {
      none: "0",
      sm: "0.125rem",
      default: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      xl2: "1rem",
      xl3: "1.5rem",
      xl4: "3rem",
      xl5: "6rem",
      full: "9999px"
    },
    extend: {
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem"
      }
    }
  },
  variants: {},
  plugins: []
};
