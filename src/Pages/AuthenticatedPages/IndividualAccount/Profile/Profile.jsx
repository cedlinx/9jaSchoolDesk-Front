import React from "react";
import PropTypes from "prop-types";
import {useSelector, useDispatch} from "react-redux";
import cx from "classnames";
import styles from "./Profile.module.scss";
import Button from "@/components/Button/Button";
import Tabs from "@/components/Tabs/Tabs.jsx";
import AccountInformation from "../Profile/AccountInformation/AccountInformation";
import Notification from "../Profile/Notification/Notification";
import Security from "../Profile/Security/Security";
import Social from "../Profile/Social/Social";
import PaymentHistory from "./AllPayments/AllPayments";
import { titleCase } from "@/helpers/textTransform";

const Profile = () => {

	const dispatch = useDispatch();

	const userDetails = JSON.parse(localStorage.getItem("userDetails")).data;

	const RenderAccountInformation = () => <AccountInformation />;
	const RenderNotification = () => <Notification />;
	const RenderSecurity = () => <Security />;
	const RenderSocial = () => <Social />;
	const RenderPaymentHistory = () => <PaymentHistory />;
	
	const tabsComponents = [
		{ name: "Account Information", component: RenderAccountInformation },
		{ name: "Notification", component: RenderNotification },
		{ name: "Security", component: RenderSecurity },
		{ name: "Social", component: RenderSocial}, 
		{ name: "Payment History", component: RenderPaymentHistory }
	];


	return (
		<div className={cx(styles.container)}>

			<section className={cx(styles.pageHeader, "flexRow")}>
				<div className={cx(styles.nameDiv)}>
					<h3>{titleCase(userDetails.name)}</h3>
					<p>{userDetails.plan.name.toUpperCase()}</p>
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