import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./index.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import toggleOn from "@/assets/icons/toggleOn.svg";
import toggleOff from "@/assets/icons/toggleOff.svg";
import Tabs from "@/components/Tabs/Tabs.jsx";
import GeneralSettings from "./GeneralSettings/GeneralSettings";
import PaymentPlans from "./PaymentPlans/PaymentPlans";
import TermsAndConditions from "./TermsAndConditions/TermsAndConditions";
import PrivacyPolicy from "./PrivaryPolicy/PrivacyPolicy";

const Settings = props => {

	const RenderGeneralSettings = () => <GeneralSettings />;
	const RenderPaymentPlans = () => <PaymentPlans />;
	const RenderTermsAndConditions = () => <TermsAndConditions />;
	const RenderPrivacyPolicy = () => <PrivacyPolicy />;
	
	const tabsComponents = [
		{ name: "General Settings", component: RenderGeneralSettings },
		{ name: "Payment Plans", component: RenderPaymentPlans },
		{ name: "Terms And Conditions", component: RenderTermsAndConditions },
		{ name: "Privacy Policy", component: RenderPrivacyPolicy} 
	];


	return (
		<div className={cx(styles.container)}>

			<section className={cx(styles.tablistWrapper)}>
				<Tabs background="#FFFFFF" tabs={tabsComponents}/>
			</section>

		</div>
	);
};

Settings.propTypes = {
    
};

export default Settings;