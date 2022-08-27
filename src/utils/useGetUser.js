import { useLocation } from "react-router-dom";

const useGetUser = () => {
  const location = useLocation();
  return location.pathname.split("/")[1];
};

export default useGetUser;