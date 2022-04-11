import React, {useState} from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./DashboardContainer.module.scss";

import SideBar from "../SideBar/SideBar";
import DashboardHeader from "../DashboardHeader/DashboardHeader";


const DashboardContainer = (props) => {
	const { children } = props;

	const [toggled, setToggled] = useState(false);
	const handleToggleSidebar = (value) => {
		setToggled(value); 
	};

	return (
		<div className={cx(styles.container, "flexRow", "")}>
			
			<div className={cx(styles.sidebar, "")}>
				<SideBar toggled={toggled} handleToggleSidebar={handleToggleSidebar} />
			</div>

			<div className={cx(styles.contentArea, "", "")}>
				<div className={cx(styles.header)}><DashboardHeader handleToggleSidebar={handleToggleSidebar} /></div>
				<div className={cx(styles.pageContent)}>{children}</div>
			</div>
			
		</div>
	);
};

DashboardContainer.propTypes = {
	children: PropTypes.element.isRequired
};

export default DashboardContainer;
