import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./TermsAndConditions.module.scss";
import toggleOn from "@/assets/icons/toggleOn.svg";
import toggleOff from "@/assets/icons/toggleOff.svg";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";

const TermsAndConditions=()=>{
	return(
		<div className={cx(styles.container)}>
			<section className={cx(styles.wrapper)}>
				<div className={cx(styles.header, "flexRow")}>
					<h3>Terms and Conditions</h3>
				</div>
			</section>
		</div>
	);
};

export default TermsAndConditions;