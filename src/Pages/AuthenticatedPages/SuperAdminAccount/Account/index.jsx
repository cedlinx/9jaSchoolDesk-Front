import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import {useSelector, useDispatch} from "react-redux";

import styles from "./index.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import toggleOn from "@/assets/icons/toggleOn.svg";
import toggleOff from "@/assets/icons/toggleOff.svg";
import Tabs from "@/components/Tabs/Tabs.jsx";
import General from "./General/General";
import ManageUsers from "./ManageUsers";
import Security from "./Security/Security";
import Social from "./Social/Social";
import PaymentHistory from "./AllPayments/AllPayments";
import { titleCase } from "@/helpers/textTransform";

const Account = () => {

	const dispatch = useDispatch();

	const userDetails = JSON.parse(localStorage.getItem("userDetails")).data;

	const RenderGeneral = () => <General />;
	const RenderManageUsers = () => <ManageUsers />;
	const RenderSecurity = () => <Security />;
	const RenderSocial = () => <Social />;
	const RenderPaymentHistory = () => <PaymentHistory />;
	
	const tabsComponents = [
		{ name: "General", component: RenderGeneral },
		{ name: "Manage Users", component: RenderManageUsers },
		{ name: "Security", component: RenderSecurity },
		{ name: "Social", component: RenderSocial}, 
		{ name: "Payment History", component: RenderPaymentHistory }
	];


	return (
		<div className={cx(styles.container)}>

			<section className={cx(styles.pageHeader, "flexRow")}>
				<div className={cx(styles.nameDiv)}>
					<h3>{titleCase(userDetails.name)}</h3>
					<p>{userDetails.group.name.toUpperCase()}</p>
				</div>
				<div className={cx(styles.btnDiv)}>
					<Button title="Change Profile" borderRadiusType="lowRounded" textColor="#2C0085" bgColor="#fff" />
				</div>
				
			</section>

			<section className={cx(styles.tablistWrapper)}>
				<Tabs background="#FFFFFF" tabs={tabsComponents}/>
			</section>

		</div>
	);
};

Account.propTypes = {
    
};

export default Account;