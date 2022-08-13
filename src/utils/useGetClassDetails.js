const useGetClassDetails = () => {

  const classDetails = JSON.parse(localStorage.getItem("activeClassData"));
  return classDetails;
};

export default useGetClassDetails;