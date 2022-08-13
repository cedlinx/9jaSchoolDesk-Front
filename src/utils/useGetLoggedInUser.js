const useGetLoggedInUser = () => {
  let user = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;
  return user;
};

export default useGetLoggedInUser;