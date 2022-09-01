import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import AuthorizedRoute from "../AuthorizedRoute";
import { Role } from "@/constants/constants";
import { isAuthenticated, decodeToken, getToken, isExpired } from "@/utils/auth";
import { Navigate, useLocation, useParams } from "react-router-dom";
import useGetUser from "@/utils/useGetUser";


const AuthenticatedRoute = ({ children, roles }) => {

  let location = useLocation();
  const checkIsAuthenticated = isAuthenticated();
  const params = useParams();
  const user = params?.user;
  
  // // Temporary Student Access
  // const tempStudent = useGetUser();
  // if(tempStudent === "student"){
  //   return children;
  // }
    
  const token = getToken();
  const userDetails = JSON.parse(localStorage.getItem("userData"));

  isExpired(token) && <Navigate to={`/login/${user}`} state={{ from: location }} />;

  const userHasRequiredRole = userDetails && roles.includes(userDetails?.role) ? true : false;

  const isOTPVerified = userDetails?.hasverifiedotp === 1 ? true : false;



  if (!checkIsAuthenticated) {
    return <Navigate to={`/login/${user}`} state={{ from: location }} />;
  }

  if (checkIsAuthenticated && !userHasRequiredRole) {
    return <Navigate to="/unauthorized-page" state={{ from: location }} />;
  }

  if (checkIsAuthenticated && !isOTPVerified) {
    localStorage.clear();
    return <Navigate to={`/login/${user}`} state={{ from: location }} />;
  }

  return children;
};

export default AuthenticatedRoute;
