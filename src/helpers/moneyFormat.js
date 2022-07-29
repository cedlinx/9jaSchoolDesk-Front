export const moneyFormat = (num) => {
  if(num === 0){
    return "0.00";
  }
  else {
    let formattedNum = ((num * 100) / 100).toFixed(2);
    const numParts = formattedNum?.toString().split(".");
    numParts[0] = numParts[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return numParts.join(".");
  }
};
