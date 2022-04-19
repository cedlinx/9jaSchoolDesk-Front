import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./SignUp.module.scss";
import Tabs from "@/components/Tabs/Tabs.jsx";
import AuthPageContainer from "@/components/AuthPageContainer/AuthPageContainer";
import School from "./School/School";
import Church from "./Church/Church";
import Mosque from "./Mosque/Mosque";

const SignUp = () => {

	const RenderSchool = () => <School />;
	const RenderChurch = () => <Church />;
	const RenderMosque = () => <Mosque />;
	
	
	const tabsComponents = [
		{ name: "School", component: RenderSchool },
		{ name: "Church", component: RenderChurch },
		{ name: "Mosque", component: RenderMosque }
	];

	return (
		<AuthPageContainer showTopDivWave={false}>
			<section className={cx(styles.signUpContainer)}>
				<div className={cx(styles.tablistWrapper, "flexCol")}>
					<Tabs centralise={true} background="#FFFFFF" tabs={tabsComponents}/>
				</div>
			</section>
			
		</AuthPageContainer>
	);
};

SignUp.propTypes = {
	title: PropTypes.string
};

export default SignUp;