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

			<div className={cx(styles.topSection)}>
				<h1>Brands</h1>
				<div className={cx(styles.partnersLogosDiv)}>
					<img data-aos="flip-right" src={logo1}alt="" /><img data-aos="flip-right" src={logo2} alt="" /><img data-aos="flip-right" src={logo3} alt="" /><img data-aos="flip-right" src={logo4} alt="" />
				</div>
		
			</div>

			<div className={cx(styles.appStoreDiv, "flexRow", "row")}>
				
				
				<div className={cx(styles.appStoreContent,  "col-md-6")}>
					<h2>App is available for free on Google Play & App Store</h2>
					<p className="main-caption">Intrinsicly predominate multimedia based leadership skills whereas long-term high-impact niche markets.</p>

					<div className={cx(styles.appStoreBtnDiv, "flexRow")}>
						<a href="#">
							<img src={appleStore} alt="apple-store" />
						</a>
						<a href="#">
							<img src={googleStore} alt="google-store" />
						</a>
					</div>

				</div>

				<div className={cx(styles.imageDiv, "col-md-6")}><img src={phone5} alt="" /></div>

			</div>

			<div className={cx(styles.lastSection)}>

				<div className={cx(styles.profileSummary)}>
					<div><img src={siteLogo} alt="site-logo" /></div>
					<p
						data-aos="fade-up"
						data-aos-delay="600"
						data-aos-duration="3300"
					>Skydah is a Central Switching System where all items can be registered and store information for Authentication, Verification and Validation purpose. This engine will connect all relevant players as far as securing of items is concerned.</p>
					<p
						data-aos="fade-up"
						data-aos-delay="800"
						data-aos-duration="3300"
					>© 2020 Skydash. All rights reserved.</p>
				</div>
				<div className={cx(styles.informationLinks)}>
					<h3>INFORMATION</h3>
					<ul>
						<li>Terms and Conditions</li>
						<li>Privacy Policy</li>
						<li>FAQ</li>
						<li>Pricing</li>
						<li>Contact</li>
					</ul>
				</div>
				<div className={cx(styles.contactDetails)}>
					<h3>LET'S TALK</h3>
					<p>Lagos Nigeria Office <br />
					63, Akowonjo Road, Akowonjo- Lagos <br />
					Lagos, Nigeria</p>
					<p>09026507900, 08032499776, 08066829665</p>
					<p>info@skydah.com</p>
					<p>www.skydah.com</p>
				</div>
			</div>

		</div>
	);
};

export default Footer;
