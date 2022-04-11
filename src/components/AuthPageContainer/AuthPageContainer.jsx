import React from "react";
import PropTypes from "prop-types";
import {Link, useNavigate} from "react-router-dom";
import cx from "classnames";
import styles from "./AuthPageContainer.module.scss";
import siteLogo from "@/assets/images/Logo.png";


const AuthPageContainer = (props) => {
	const { children } = props;
	const navigate = useNavigate();
	return (
		<div className={cx(styles.container, "flexCol")}>
			<div className={cx(styles.header, "flexRow")}>
				<img onClick={()=>navigate("/")} src={siteLogo} alt="logo" />
				<Link to="/">Back Home</Link>
			</div>
			<div>{children}</div>
		</div>
	);
};

AuthPageContainer.propTypes = {
	children: PropTypes.element.isRequired
};

export default AuthPageContainer;
