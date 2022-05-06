import React from "react";
import cx from "classnames";
import styles from "./Footer.module.scss";
import Button from "../Button/Button";
import {useNavigate} from "react-router-dom";

import siteLogo from "@/assets/images/logo.png";
import twitterLogo from "@/assets/icons/twitter.svg";
import facebookLogo from "@/assets/icons/facebook.svg";
import linkedinLogo from "@/assets/icons/linkedin.svg";


const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className={cx("flexCol", styles.footerContainer)}>

      <div className={cx(styles.profileSummary)}>
        <div>
          <img src={siteLogo} alt="site-logo" />
        </div>
        <p >Become part of your child’s academic growth today with 9jaschoolDesk</p>
        <p >© 2020 9jaSchoolDesk. All rights reserved.</p>
      </div>
      <div className={cx(styles.productSection)}>
        <p className={cx(styles.header)}>Product</p>
        <ul>
          <li onClick={() => navigate("#")}>Students</li>
          <li onClick={() => navigate("#")}>Parents</li>
          <li onClick={() => navigate("#")}>Teachers</li>
        </ul>
      </div>
      <div className={cx(styles.aboutSection)}>
        <p className={cx(styles.header)}>About</p>
        <ul>
          <li onClick={() => navigate("#")}>The Team</li>
          <li onClick={() => navigate("#")}>Features</li>
          <li onClick={() => navigate("#")}>FAQs</li>
        </ul>
      </div>
      <div className={cx(styles.socialsSection)}>
        <p className={cx(styles.header)}>Socials</p>
        <ul>
          <li onClick={() => navigate("#")}> <span><img src={twitterLogo} alt="icon" /></span><span>Twitter</span>  </li>
          <li onClick={() => navigate("#")}><span><img src={linkedinLogo} alt="icon" /></span><span>LinkedIn</span> </li>
          <li onClick={() => navigate("#")}><span><img src={facebookLogo} alt="icon" /></span><span>Facebook</span> </li>
        </ul>
      </div>
      <div className={cx(styles.contactSection)}>
        <p className={cx(styles.header)}>Contact Us</p>
        <ul>

          <li>info@9jaschooldesk.com</li>
          <li>+234 904 342 4455</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
