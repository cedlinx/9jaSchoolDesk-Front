import React from "react";
import cx from "classnames";
import styles from "./Settings.module.scss";

import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import Subscriptions from "./Subscriptions/Subscriptions";
import Account from "./Account/Account";
import Password from "./Password/Password";
import PerformanceIndicator from "./PerformanceIndicator/PerformanceIndicator";
import Tabs from "@/components/Tabs/TabsV2";
import Button from "@/components/Button/Button";
import { showModal } from "@/redux/ModalState/ModalSlice";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import InviteParentModal from "@/components/Modals/InviteParent/InviteParent";
import ActivateParentModal from "@/components/Modals/ActivateParent/ActivateParent";
import AddNewWardModal from "@/components/Modals/AddNewWard/AddNewWard";
import AddPerformanceIndicatorModal from "@/components/Modals/AddPerformanceIndicator/AddPerformanceIndicator";

const Settings = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);

  const RenderSubscriptions = () => <Subscriptions />;
  const RenderAccount = () => <Account />;
  const RenderPassword = () => <Password />;
  const RenderPerformanceIndicator = () => <PerformanceIndicator />;

  const tabsComponents = [
    { name: "Subscriptions", component: RenderSubscriptions },
    { name: "Account", component: RenderAccount },
    { name: "Password", component: RenderPassword },
    { name: "Perfornance Indicator", component: RenderPerformanceIndicator }
  ];


  return (
    <div className={cx(styles.settingsContainer)}>
      <div className={cx(styles.heading, "flexRow-space-between")}>
        <h3 className={cx(styles.title)}>Settings</h3>
      </div>

      <Tabs centralise tabs={tabsComponents} />

      {modalState === "show" ? <Modal show >{modalType === "inviteParent" ? <InviteParentModal /> : modalType === "activateParent" ? <ActivateParentModal /> : modalType === "addNewWard" ? <AddNewWardModal /> : modalType === "addPerformanceIndicator" ? <AddPerformanceIndicatorModal /> :   null}</Modal> : null}
    </div>
  );
};

export default Settings;