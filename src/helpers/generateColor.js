const generateColor = () => {
  // const letters = "123456789ABCDEF";
  // let color = "#";
  // for (let i = 0; i < 6; i++) {
  //   color += letters[Math.floor(Math.random() * 16)];
  // }
  // // return color;

  // // validate hex string
  // let hex = String(color).replace(/[^0-9a-f]/gi, "");
  // if (hex.length < 6) {
  //   hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  // }
  // let lum = -0.1;

  // // convert to decimal and change luminosity
  // let rgb = "#", c, i;
  // for (i = 0; i < 3; i++) {
  //   c = parseInt(hex.substr(i*2,2), 16);
  //   c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
  //   rgb += ("00"+c).substr(c.length);
  // }

  // return rgb;

  // const red = Math.floor(Math.random() * 256/2);
  // const green = Math.floor(Math.random() * 256/2);
  // const blue = Math.floor(Math.random() * 256/2);
  // return "rgb(" + red + ", " + green + ", " + blue + ")";

  const red = Math.floor((1 + Math.random()) * 256/2);
  const green = Math.floor((1 + Math.random()) * 256/2);
  const blue = Math.floor((1 + Math.random()) * 256/2);
  return "rgb(" + red + ", " + green + ", " + blue + ")";
};
  
export default generateColor;