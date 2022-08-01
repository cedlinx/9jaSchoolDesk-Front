import React, {useEffect} from "react";
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
import InviteParentModal from "@/components/Modals/InviteGuardian/InviteGuardian";
import ActivateParentModal from "@/components/Modals/ActivateGuardian/ActivateGuardian";
import AssignWardToParentModal from "@/components/Modals/AssignWardToParent/AssignWardToParent";
import AddPerformanceIndicatorModal from "@/components/Modals/AddPerformanceIndicator/AddPerformanceIndicator";
import DeleteIndicatorModal from "@/components/Modals/DeleteKPIIndicator/DeleteKPIIndicator";
import ModifyKPIIndicatorModal from "@/components/Modals/ModifyKPIIndicator/ModifyKPIIndicator";
import KPIIndicatorDetailsModal from "@/components/Modals/KPIIndicatorDetails/KPIIndicatorDetails";
import { getAllKPIs, getDashboard } from "@/redux/Proprietor/ProprietorSlice";



const Settings = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);

  useEffect(() => {
    dispatch(getAllKPIs());
    dispatch(getDashboard());
  }, [dispatch]);

  const RenderSubscriptions = () => <Subscriptions />;
  const RenderAccount = () => <Account />;
  const RenderPassword = () => <Password />;
  const RenderPerformanceIndicator = () => <PerformanceIndicator />;

  const tabsComponents = [
    { name: "Subscriptions", component: RenderSubscriptions },
    { name: "Account", component: RenderAccount },
    { name: "Password", component: RenderPassword },
    { name: "Performance Indicator", component: RenderPerformanceIndicator }
  ];


  return (
    <div className={cx(styles.settingsContainer)}>
      <div className={cx(styles.heading, "flexRow-space-between")}>
        <h3 className={cx(styles.title)}>Settings</h3>
      </div>

      <Tabs centralise tabs={tabsComponents} />

      {modalState === "show" ? <Modal show >{modalType === "inviteParent" ? <InviteParentModal /> : modalType === "activateParent" ? <ActivateParentModal /> : modalType === "assignWardToParent" ? <AssignWardToParentModal /> : modalType === "addPerformanceIndicator" ? <AddPerformanceIndicatorModal /> : modalType === "deleteIndicator" ? <DeleteIndicatorModal /> : modalType === "modifyKPIIndicator" ? <ModifyKPIIndicatorModal /> : modalType === "KPIIndicatorDetails" ? <KPIIndicatorDetailsModal /> :  null}</Modal> : null}
    </div>
  );
};

export default Settings;
