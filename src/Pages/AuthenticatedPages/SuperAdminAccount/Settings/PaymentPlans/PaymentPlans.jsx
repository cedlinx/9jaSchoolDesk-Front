import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./PaymentPlans.module.scss";

const PaymentPlans=()=>{

	return(
		<div className={cx(styles.container)}>
			<section className={cx(styles.wrapper)}>
				<div className={cx(styles.header, "flexRow")}>
					<h3>Payment Plans</h3>
				</div>
			</section>
		</div>
	);
};

export default PaymentPlans;