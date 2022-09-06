import React, {useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./DashboardContainer.module.scss";

import DashboardHeader from "../DashboardHeader/DashboardHeader";
import GeneralSideBar from "@/components/SideBars/General/SideBar";
import ProprietorSideBar from "@/components/SideBars/Proprietor/SideBar";


const DashboardContainer = (props) => {
  const { children } = props;
  const location = useLocation();
  const rootPath = location.pathname.split("/")[1];
  const actualPath = location.pathname.split("/").pop();


  const [toggled, setToggled] = useState(false);
  const handleToggleSidebar = (value) => {
    setToggled(value); 
  };

  return (
    <div className={cx(styles.dashboardContainer, "flexCol")}>
			
      { rootPath !== "proprietor" ? 
        <div className={cx(styles.proprietorLayout, "flexRow")}>

          {rootPath === "teacher" && actualPath !== "profile" ? <div className={cx(styles.sidebar)}>
            <GeneralSideBar toggled={toggled} handleToggleSidebar={handleToggleSidebar} />
          </div> : null}
            
          <div className={cx(styles.contentArea, "flexCol")}>
            <div className={cx(styles.header)}><DashboardHeader handleToggleSidebar={handleToggleSidebar} /></div>
            <div className={cx(styles.pageContent)}>{children}</div>
          </div>          
        </div> 
        :
        <div className={cx(styles.proprietorLayout, "flexRow")}>
          <div className={cx(styles.sidebar)}>
            {/* <ProprietorSideBar toggled={toggled} handleToggleSidebar={handleToggleSidebar} /> */}
            <GeneralSideBar toggled={toggled} handleToggleSidebar={handleToggleSidebar} />

          </div>
       
          <div className={cx(styles.contentArea, "flexCol")}>
            <div className={cx(styles.header)}><DashboardHeader handleToggleSidebar={handleToggleSidebar} /></div>
            <div className={cx(styles.pageContent)}>{children}</div>
          </div>
        </div>
      }
			
    </div>
  );
};

DashboardContainer.propTypes = {
  children: PropTypes.element.isRequired
};

export default DashboardContainer;
