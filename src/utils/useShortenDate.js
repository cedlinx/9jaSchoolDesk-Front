const useShortenDate=(value)=>{
  let date = new Date(value);
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  };
  let dateValue = date.toLocaleDateString("en-US", options);
  return `${dateValue}`;
};

export default useShortenDate;

