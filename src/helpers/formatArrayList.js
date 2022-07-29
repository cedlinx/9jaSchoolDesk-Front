const formatArrayList =(data)=>{
  let result = "";
  data.forEach((item, index) => {
    result += `${item}`;
    if (index !== data.length - 1) {
      result += ", ";
    }
  }
  );
  return result;
};
  
export default formatArrayList;