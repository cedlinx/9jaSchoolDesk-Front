import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./Security.module.scss";
import toggleOn from "@/assets/icons/toggleOn.svg";
import toggleOff from "@/assets/icons/toggleOff.svg";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";

const Security=()=>{
	return(
		<div className={cx(styles.container)}>
			<section className={cx(styles.securityWrapper)}>

				<div className={cx(styles.header, "flexRow")}>
					<h3>Account Security</h3>
					<div className={cx(styles.btnDiv)}>
						<Button title="Change Password" borderRadiusType="lowRounded" textColor="#fff" bgColor="#D25B5D" />
					</div>
				</div>

				<div className={cx(styles.body, "row")}>
					<div className="col-md-4 col-xs-12"><InputField type="password" placeholder="First" /></div>
					<div className="col-md-4 col-xs-12"><InputField type="text" placeholder="Select Question" /></div>
					<div className="col-md-4 col-xs-12"><InputField type="text" placeholder="Email Address" /></div>
				</div>

				<div className={cx(styles.itemWrapper)}>
					<div className={cx(styles.item)}><p>Enable 2 Factor Authorization</p></div>
					<div className={cx(styles.togglerDiv)}><img src={toggleOn} alt="toggler" /></div>
				</div>
			</section>
		</div>
	);
};

export default Security;