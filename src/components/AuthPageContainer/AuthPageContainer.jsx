import React from "react";
import PropTypes from "prop-types";
import {Link, useNavigate} from "react-router-dom";
import cx from "classnames";
import styles from "./AuthPageContainer.module.scss";
import siteLogo from "@/assets/images/logo.png";
import MenuBar from "@/components/MenuBar/MenuBar";
import TopDivWave from "@/components/WaveSvg/TopDivWave";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/Auth/AuthSlice";

const AuthPageContainer = (props) => {
  const { showTopDivWave = true, children } = props;
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleClick = () => {
    navigate("/");
    dispatch(logout());
  };

  return (
    <div className={cx(styles.authPageContainer, "flexCol")}>
      {/* <MenuBar /> */}
      <div className={cx(styles.header, "flexRow-fully-centered")}>
        <img src={siteLogo} onClick={() => handleClick()} alt="" />
      </div>
      <div className={cx(styles.childrenContainer)}>
        {showTopDivWave && <TopDivWave />}
        {children}
      </div>
    </div>
  );
};

AuthPageContainer.propTypes = {
  // children: PropTypes.element.isRequired
};

export default AuthPageContainer;
