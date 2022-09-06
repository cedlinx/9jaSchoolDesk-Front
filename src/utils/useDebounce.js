const useDebounce = (func, wait) => {
  let timeout;
  return function(...args) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
};
  
// const useDebounce =((cb, delay = 2000)=>{
  
//   let timeout;
    
//   return (...args) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       cb(...args);
//     }, delay);
//   };
// });
  
export default useDebounce;
  
  