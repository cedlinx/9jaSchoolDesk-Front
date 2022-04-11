import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./PageContainer.module.scss";


import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const PageContainer = (props) => {
	const { children, showHeader } = props;
	return (
		<div className={cx(styles.container, "flexCol")}>
			{showHeader && <div className={cx(styles.header)}><Header  /></div>}
			<div>{children}</div>
			<div className={cx(styles.footer)}><Footer  /></div>
		</div>
	);
};

PageContainer.defaultProps = {
	showHeader : true
};

PageContainer.propTypes = {
	children: PropTypes.element.isRequired,
	showHeader: PropTypes.string
};

export default PageContainer;
