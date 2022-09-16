import React from "react";
import errorIcon from "@/assets/icons/404-error.svg";
import Button from "@/components/Button/Button";
import { useNavigate } from "react-router-dom";
import "./Page404.scss";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/Auth/AuthSlice";


const Page404 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    navigate("/");
    dispatch(logout());
  };

  return (
    <section className="error-page-container">
      <div className="error-card">
        <div>
          <img src={errorIcon} alt="404" />
        </div>
        <div className="error-text">
					We are sorry, but the page you requested is temporarily unavailable, had its
					name changed, has been removed or doesn’t exist.
        </div>
        <div>
          <Button onClick={() => handleClick()} title="Go To The Homepage" textColor="#FFF" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#D25B5D" />
        </div>
      </div>
    </section>
  );
};

export default Page404;