import React from "react";
import PropTypes from "prop-types";
import {Link, useNavigate} from "react-router-dom";
import cx from "classnames";
import styles from "./AuthPageContainer.module.scss";
import siteLogo from "@/assets/images/Logo.png";
import MenuBar from "@/components/MenuBar/MenuBar";

const AuthPageContainer = (props) => {
	const { children } = props;
	const navigate = useNavigate();
	return (
		<div className={cx(styles.container, "flexCol")}>
			<MenuBar />
			<div>{children}</div>
		</div>
	);
};

AuthPageContainer.propTypes = {
	children: PropTypes.element.isRequired
};

export default AuthPageContainer;
