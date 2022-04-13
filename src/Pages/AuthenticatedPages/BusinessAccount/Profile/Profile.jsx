import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./Profile.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import toggleOn from "@/assets/icons/toggleOn.svg";
import toggleOff from "@/assets/icons/toggleOff.svg";
import Tabs from "@/components/Tabs/Tabs.jsx";
import General from "./General/General";
import Notification from "../Profile/Notification/Notification";
import Security from "../Profile/Security/Security";
import Social from "../Profile/Social/Social";
import PaymentHistory from "../Profile/AllPayments/AllPayments";

const Profile = props => {

	const RenderGeneral = () => <General />;
	const RenderNotification = () => <Notification />;
	const RenderSecurity = () => <Security />;
	const RenderSocial = () => <Social />;
	const RenderPaymentHistory = () => <PaymentHistory />;
	
	const tabsComponents = [
		{ name: "General", component: RenderGeneral },
		{ name: "Notification", component: RenderNotification },
		{ name: "Security", component: RenderSecurity },
		{ name: "Social", component: RenderSocial}, 
		{ name: "Payment History", component: RenderPaymentHistory }
	];


	return (
		<div className={cx(styles.container)}>

			<section className={cx(styles.pageHeader, "flexRow")}>
				<div className={cx(styles.nameDiv)}>
					<h3>John Doe</h3>
					<p>PROFESSIONAL SUBSCRIBER</p>
				</div>
				<div className={cx(styles.btnDiv)}>
					<Button title="Change Profile" borderRadiusType="lowRounded" textColor="#D25B5D" bgColor="#fff" />
				</div>
				
			</section>

			<section className={cx(styles.tablistWrapper)}>
				<Tabs background="#FFFFFF" tabs={tabsComponents}/>
			</section>

		</div>
	);
};

Profile.propTypes = {
    
};

export default Profile;