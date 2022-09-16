import React from "react";
import unAuthorizedIcon from "@/assets/images/unauthorized.jpg";
import Button from "@/components/Button/Button";
import { useNavigate, Link } from "react-router-dom";
import "./UnAuthorizedPage.scss";
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
        <div className="error-image-div">
          <img src={unAuthorizedIcon} alt="404" />
        </div>
        {/* <div className="error-text">
          We are sorry, you do not have the rights to access this page. Kindly verify the url or <Link onClick={() => localStorage.clear()} to="/contact" >contact us by clicking this link</Link> .
        </div> */}
        <div className="error-text">
          We are sorry, you do not have the rights to access this page. Kindly verify the url or contact an administrator .
        </div>
        <div>
          <Button onClick={() => handleClick()} title="Go To The Homepage" textColor="#FFF" borderRadiusType="lowRounded" bordercolor="2C0085" bgColor="#D25B5D" />
        </div>
      </div>
    </section>
  );
};

export default Page404;