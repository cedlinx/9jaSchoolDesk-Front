import React from "react";
import PropTypes from "prop-types";

import SideBar from "../SideBar2";

import "./layout.style.scss";

const DashboardLayout = ({
	dashBoardSideBarLinks,
	children,
	viewContainerStyle
}) => (
	<div className="dashboard">
		<div className="dashboard__sidebar">
			<SideBar routes={dashBoardSideBarLinks} />
		</div>
		<main className={`dashboard__main ${viewContainerStyle}`}>
			{children}
		</main>
	</div>
);

export default DashboardLayout;

DashboardLayout.propTypes = {
	children: PropTypes.node.isRequired,
	dashBoardSideBarLinks: PropTypes.arrayOf(PropTypes.object).isRequired,
	viewContainerStyle: PropTypes.string
};

DashboardLayout.defaultProps = {
	viewContainerStyle: ""
};
