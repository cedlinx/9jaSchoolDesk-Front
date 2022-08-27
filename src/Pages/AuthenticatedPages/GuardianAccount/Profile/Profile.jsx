import React from "react";
import cx from "classnames";
import styles from "./Profile.module.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./react-tabs.css";

import Account from "./Account/Account";
import Password from "./Password/Password";
import Notifications from "./Notifications/Notifications";


const Profile = () => {

  return (
    <div className={cx(styles.profileContainer, "flexCol")}>
      <div className={cx(styles.header, styles.mainHeader)}>
        <h3 className="text-center">Profile</h3>
      </div>
      <hr />

      <div className={cx(styles.body)}>
        <Tabs className={cx(styles.tabContainer, "row")}>
          <TabList className={cx(styles.tabList, "col-sm-3")}>
            <Tab>
              <p>Account</p>
            </Tab>
            <Tab>
              <p>Notification</p>
            </Tab>
            <Tab>
              <p>Password</p>
            </Tab>
            {/* <Tab>
              <p>Subscription</p>
            </Tab> */}
           
          </TabList>

          <div className={cx(styles.tabPanelContainer, "flexCol", "col-sm-9")}>
            <TabPanel>
              <Account />
            </TabPanel>
            <TabPanel>
              <Notifications />
            </TabPanel>
            <TabPanel>
              <Password />
            </TabPanel>
            <TabPanel>
              <div className={cx(styles.panelContent, "flexCol")}>
                {/* <PricingModule /> */}
              </div>
            </TabPanel>
          </div>
          
        </Tabs>
      </div>
      
    </div>
  );
};

export default Profile;