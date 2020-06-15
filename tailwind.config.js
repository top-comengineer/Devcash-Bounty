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
      dtBackgroundQuaternary: "#2C2B3D",
      dtText: "#F2F1FF",
      dtSuccess: "#B1FFAA",
      dtDanger: "#FF8080",
      dtPending: "#FFDF80",
      dtOrange: "#F5841F",
      dtRed: "#FF4C2F",
      dtBlue: "#6DB2D8",
      // Light theme colors
      ltPrimary: "#675CFF",
      dtPrimaryLessSat: "#7066FF",
      ltSecondary: "#8850F8",
      ltBackground: "#F8F7FC",
      ltBackgroundSecondary: "#FFFFFF",
      ltBackgroundTertiary: "#F2F1FF",
      ltText: "#010014",
      ltTextLight: "#EEEEEE",
      ltSuccess: "#009966",
      ltDanger: "#990040",
      ltPending: "#CD8900",
      // Transparent
      transparent: "transparent",
      // Css variables
      primary: "var(--primary)",
      primaryLessSat: "var(--primaryLessSat)",
      secondary: "var(--secondary)",
      background: "var(--background)",
      backgroundSec: "var(--backgroundSec)",
      backgroundTer: "var(--backgroundTer)",
      backgroundQua: "var(--backgroundQua)",
      text: "var(--text)",
      success: "var(--success)",
      danger: "var(--danger)",
      pending: "var(--pending)",
      metamaskOrange: "var(--metamaskOrange)",
      authereumRed: "var(--authereumRed)",
      portisBlue: "var(--portisBlue)",
    },
    boxShadow: {
      none: "none",
      md: "0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06)",
      mdS: "0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .12)",
      mdSS: "0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .4)",
      lgL:
        "0 10px 15px -3px rgba(0, 0, 0, .05), 0 4px 6px -2px rgba(0, 0, 0, .025)",
      lg:
        "0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05)",
      lgD:
        "0 5px 15px 0px rgba(0, 0, 0, .08), 0 2px 6px 0px rgba(0, 0, 0, .04)",
      lgDL:
        "0 5px 15px 0px rgba(0, 0, 0, .05), 0 2px 6px 0px rgba(0, 0, 0, .025)",
      lgS:
        "0 10px 15px -3px rgba(0, 0, 0, .2), 0 4px 6px -2px rgba(0, 0, 0, .1)",
      lgSS:
        "0 10px 15px -3px rgba(0, 0, 0, .4), 0 4px 6px -2px rgba(0, 0, 0, .2)",
      lgDSS:
        "0 5px 15px 0px rgba(0, 0, 0, .4), 0 2px 6px 0px rgba(0, 0, 0, .2)",
      nlg:
        "0 -10px 15px -3px rgba(0, 0, 0, .1), 0 -4px 6px -2px rgba(0, 0, 0, .05)",
      nlgS:
        "0 -10px 15px -3px rgba(0, 0, 0, .2), 0 -4px 6px -2px rgba(0, 0, 0, .1)",
      nlgSS:
        "0 -10px 15px -3px rgba(0, 0, 0, .3), 0 -4px 6px -2px rgba(0, 0, 0, .15)",
      xl:
        "0 20px 25px -5px rgba(0, 0, 0, .1), 0 10px 10px -5px rgba(0, 0, 0, .04)",
      xlS:
        "0 20px 25px -5px rgba(0, 0, 0, .2), 0 10px 10px -5px rgba(0, 0, 0, .08)",
      xlSS:
        "0 20px 25px -5px rgba(0, 0, 0, .4), 0 10px 10px -5px rgba(0, 0, 0, .16)",
      xlDSS:
        "0 12px 35px -4px rgba(0, 0, 0, .4), 0 6px 15px -2px rgba(0, 0, 0, .16)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, .25)",
      "2xlS": "0 25px 50px -12px rgba(0, 0, 0, .4)",
      "4xl": "0 15px 100px -5px rgba(0, 0, 0, .35)",
      "4xlS": "0 15px 100px -5px rgba(0, 0, 0, .9)"
    },
    opacity: {
      "0": "0",
      "5": "0.05",
      "10": "0.1",
      "15": "0.15",
      "50": "0.5",
      "75": "0.75"
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
      "4xl": "2.5rem",
      "5xl": "4rem",
      "6xl": "5rem",
      full: "9999px"
    },
    extend: {
      spacing: {
        7: "1.75rem",
        72: "18rem",
        84: "21rem",
        96: "24rem",
        108: "27rem",
        120: "30rem",
        132: "33rem",
        144: "36rem",
        156: "39rem",
        168: "42rem"
      },
      scale: {
        107: "1.07",
        115: "1.15",
        120: "1.2"
      },
      transitionDuration: {
        "0": "0ms"
      },
      height: {
        px2: "2px"
      },
      width: {
        "36": "9rem",
        "44": "11rem",
        "1/7": "14.2857143%",
        "2/7": "28.5714286%",
        "3/7": "42.8571429%",
        "4/7": "57.1428571%",
        "5/7": "71.4285714%",
        "6/7": "85.7142857%",
        px2: "2px",
        px3: "3px"
      },
      maxWidth: {
        xxs: "16rem",
        xxxs: "12rem",
      },
      margin: {
        "1_5": "0.375rem",
        "14": "3.5rem",
      },
      padding: {
        "0_5": "0.125rem",
        "1_5": "0.375rem",
        "30": "7rem"
      },
      inset: {
        full: "100%",
        "1/2": "50%"
      },
      borderWidth: {
        "3": "3px"
      }
    }
  },
  variants: {
    scale: ["responsive", "hover", "focus"],
    width: ["responsive", "hover", "focus"],
    borderWidth: ["responsive", "hover", "focus"]
  },
  plugins: []
};
