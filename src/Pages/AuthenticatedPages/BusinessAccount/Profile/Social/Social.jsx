import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./Social.module.scss";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";

const Social=()=>{
	return(
		<div className={cx(styles.container)}>
			<section className={cx(styles.socialWrapper)}>
				<div className={cx(styles.header, "flexRow")}>
					<h3>Link Social Media Account</h3>
					<div className={cx(styles.btnDiv)}>
						<Button title="Save Changes" borderRadiusType="lowRounded" textColor="#fff" bgColor="#D25B5D" />
					</div>
				</div>

				<div className={cx(styles.body, "row")}>
					<div className="col-md-4 col-xs-12"><InputField type="text" placeholder="Facebook" /></div>
					<div className="col-md-4 col-xs-12"><InputField type="text" placeholder="LinkedIn" /></div>
					<div className="col-md-4 col-xs-12"><InputField type="text" placeholder="Tiktok" /></div>
					<div className="col-md-4 col-xs-12"><InputField type="text" placeholder="Instagram" /></div>
					<div className="col-md-4 col-xs-12"><InputField type="text" placeholder="Twitter" /></div>
					<div className="col-md-4 col-xs-12"><InputField type="text" placeholder="Youtube" /></div>
				</div>


			</section>
		</div>
	);
};

export default Social;