import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./PrivacyPolicy.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";

const PrivacyPolicy =()=>{
	return(
		<div className={cx(styles.container)}>
			<section className={cx(styles.wrapper)}>
				<div className={cx(styles.header, "flexRow")}>
					<h3>Privacy Policy</h3>
				</div>
			</section>
		</div>
	);
};

export default PrivacyPolicy;