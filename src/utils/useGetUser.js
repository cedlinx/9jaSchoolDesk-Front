import { useLocation } from "react-router-dom";

const useGetUser = () => {
  const location = useLocation();
  console.log(location.pathname.split("/"));
  return location.pathname.split("/")[1];
};

export default useGetUser;