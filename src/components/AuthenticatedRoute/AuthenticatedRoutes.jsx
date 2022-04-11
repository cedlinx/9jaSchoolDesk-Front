import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
// import AuthorizedRoute from "../AuthorizedRoute";
import {Role} from "@/constants/constants";
import { isAuthenticated, decodeToken, getToken, isExpired } from "@/utils/auth";
import { Navigate, useLocation } from "react-router-dom";

const AuthenticatedRoute = ({ children, roles }) => {
	
	let location = useLocation();
	const checkIsAuthenticated = isAuthenticated();
	const userDetails = JSON.parse(localStorage.getItem("loginData"))?.logged_in_user;
	const token = getToken();

	isExpired(token) && <Navigate to="/login" state={{ from: location }} />;
	
	const userHasRequiredRole = userDetails && roles.includes(userDetails?.group?.name) ? true : false;

	if (!checkIsAuthenticated) {
		return <Navigate to="/login" state={{ from: location }} />;
	}

	if(checkIsAuthenticated && !userHasRequiredRole){
		return <Navigate to="/unauthorized-page" state={{ from: location }} />;
	}

	return children;
};

export default AuthenticatedRoute;
