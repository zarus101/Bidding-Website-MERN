
const withMT = require("@material-tailwind/react/utils/withMT");


module.exports =withMT({
  content: ["./src/**/**/**.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
     
      },
      backgroundImage: {
        'loginImg': 'url("./biddings__assests/images/bg1.png")',
        'buyerImg': 'url("./biddings__assests/images/buyer.png")'
      },
      

      screens: {
        "2xl": { max: "1535px" },
        xl: { max: "1279px" },
        lg: { max: "1023px" },
        md: { max: "800px" },
        mobile: { max: "512px" },
      },
      boxShadow: {
      },
    },
  },
  variants: {},
  plugins: [],
});
