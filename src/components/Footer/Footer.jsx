import React from "react";
import cx from "classnames";
import styles from "./Footer.module.scss";
import Button from "../Button/Button";
import {useNavigate} from "react-router-dom";

import siteLogo from "@/assets/images/logo.png";
import logo1 from "@/assets/images/logo1.png";
import logo2 from "@/assets/images/logo2.png";
import logo3 from "@/assets/images/logo3.png";
import logo4 from "@/assets/images/logo4.png";
import woman from "@/assets/images/woman.png";
import woman2 from "@/assets/images/woman2.png";
import phone5 from "@/assets/images/phone5.png";
import appleStore from "@/assets/images/Apple Store Orange.png";
import googleStore from "@/assets/images/Google Play.png";

const Footer = () => {
	const navigate = useNavigate();

	return (
		<div className={cx("flexCol", styles.footerContainer)}>

			<div className={cx(styles.profileSummary)}>
				<div><img src={siteLogo} alt="site-logo" /></div>
				<p
					data-aos="fade-up"
					data-aos-delay="600"
					data-aos-duration="3300"
				>Become part of your child’s academic growth today with 9jaschoolDesk</p>
				{/* <p
					data-aos="fade-up"
					data-aos-delay="800"
					data-aos-duration="3300"
				>© 2020 Skydash. All rights reserved.</p> */}
			</div>
			<div className={cx(styles.productSection)}>
				<p className={cx(styles.header)}>Product</p>
				<ul>
					<li>Students</li>
					<li>Parents</li>
					<li>Teachers</li>
				</ul>
			</div>
			<div className={cx(styles.aboutSection)}>
				<p className={cx(styles.header)}>About</p>
				<ul>
					<li>The Team</li>
					<li>Features</li>
					<li>FAQ</li>
				</ul>
			</div>
			<div className={cx(styles.socialsSection)}>
				<p className={cx(styles.header)}>Socials</p>
				<ul>
					<li>Twitter</li>
					<li>LinkedIn</li>
					<li>Facebook</li>
				</ul>
			</div>
			<div className={cx(styles.contactSection)}>
				<p className={cx(styles.header)}>Contact Us</p>
				<p>info@9jaschooldesk.com</p>
				<p>+234 904 342 4455</p>
			</div>
		</div>
	);
};

export default Footer;
