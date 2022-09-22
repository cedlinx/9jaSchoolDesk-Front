import React from "react";
import {useDispatch, useSelector} from "react-redux";
import cx from "classnames";
import styles from "./Profile.module.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./react-tabs.css";

import Account from "./Account/Account";
import Password from "./Password/Password";
import Works from "./Works/Works";
import SubmissionDetailsModal from "@/components/Modals/SubmissionDetails/SubmissionDetails";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import { showModal } from "@/redux/ModalState/ModalSlice";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";

const Profile = () => {

  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);
  const loading = useSelector((state) => state.student.loading);


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
            {/* <Tab>
              <p>Password</p>
            </Tab> */}
            <Tab>
              <p>Your Works</p>
            </Tab>
           
          </TabList>

          <div className={cx(styles.tabPanelContainer, "col-sm-9")}>
            <TabPanel>
              {<Account />}
            </TabPanel>
            {/* <TabPanel>
              <Password />
            </TabPanel> */}
            <TabPanel>
              <Works />
            </TabPanel>
          </div>
        </Tabs>
      </div>

      {modalState === "show" && modalType === "submissionDetails" && <Modal show ><SubmissionDetailsModal /></Modal>}
      
    </div>
  );
};

export default Profile;