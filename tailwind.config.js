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
      'c-primary': "var(--c-primary)",
      'c-primary-05': "var(--c-primary-05)",
      'c-primary-15': "var(--c-primary-15)",
      'c-primary-25': "var(--c-primary-25)",
      'c-primary-35': "var(--c-primary-35)",
      'c-primary-less-sat': "var(--c-primary-less-sat)",
      'c-secondary': "var(--c-secondary)",
      'c-background': "var(--c-background)",
      'c-background-15': "var(--c-background-15)",
      'c-background-sec': "var(--c-background-sec)",
      'c-background-ter': "var(--c-background-ter)",
      'c-background-qua': "var(--c-background-qua)",
      'c-text': "var(--c-text)",
      'c-text-05': "var(--c-text-05)",
      'c-text-10': "var(--c-text-10)",
      'c-text-15': "var(--c-text-15)",
      'c-success': "var(--c-success)",
      'c-success-10': "var(--c-success-10)",
      'c-success-15': "var(--c-success-15)",
      'c-success-40': "var(--c-success-40)",
      'c-danger': "var(--c-danger)",
      'c-danger-10': "var(--c-danger-10)",
      'c-danger-15': "var(--c-danger-15)",
      'c-danger-40': "var(--c-danger-40)",
      'c-pending': "var(--c-pending)",
      'c-pending-10': "var(--c-pending-10)",
      'c-pending-15': "var(--c-pending-15)",
      'c-pending-40': "var(--c-pending-40)",
      'c-metamask': "var(--c-metamask)",
      'c-portis': "var(--c-portis)",
      'c-authereum': "var(--c-authereum)",
      'c-dark': "var(--c-dark)",
      'c-light': "var(--c-light)",
      'c-light-15': "var(--c-light-15)",
      'c-light-35': "var(--c-light-35)",
      'c-shdw-1': "var(--c-shdw-1)",
      'c-shdw-2': "var(--c-shdw-2)",
      'c-shdw-3': "var(--c-shdw-3)",
      'c-shdw-4': "var(--c-shdw-4)",
      'c-shdw-5': "var(--c-shdw-5)",
      'c-shdw-6': "var(--c-shdw-6)",
    },
    boxShadow: {
      none: "none",
      md: "0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06)",
      lg:
        "0 5px 15px 0px var(--c-shdw-3), 0 2px 6px 0px var(--c-shdw-2)",
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
        "0 10px 25px -3px var(--c-shdw-3), 0 2px 10px 0px var(--c-shdw-3)",
      xlS:
        "0 20px 25px -5px rgba(0, 0, 0, .2), 0 10px 10px -5px rgba(0, 0, 0, .08)",
      xlSS:
        "0 20px 25px -5px rgba(0, 0, 0, .4), 0 10px 10px -5px rgba(0, 0, 0, .16)",
      xlDSS:
        "0 12px 35px -4px rgba(0, 0, 0, .4), 0 6px 15px -2px rgba(0, 0, 0, .16)",
      "2xl": "0 25px 50px -12px var(--c-shdw-5)",
      "4xl": "0 15px 100px -5px var(--c-shdw-6)",
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
    maxHeight: {
      "full": '100%',
      "xs": '20rem',
      "sm": '24rem',
      "md": '28rem',
      "lg": '32rem',
      "xl": '36rem',
      "2xl": '42rem',
      "3xl": '48rem',
      "4xl": '56rem',
      "5xl": '64rem',
      "6xl": '72rem',
    },
    minWidth: {
      "xxxs": '12rem',
      "xxs": '16rem',
      "xs": '20rem',
      "sm": '24rem',
      "md": '28rem',
      "lg": '32rem',
      "xl": '36rem',
      "2xl": '42rem',
      "3xl": '48rem',
      "4xl": '56rem',
      "5xl": '64rem',
      "6xl": '72rem',
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
        md: "1.035",
        lg: "1.065",
        107: "1.07",
        115: "1.15",
        120: "1.2",
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
        "0_5": "0.125rem",
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
