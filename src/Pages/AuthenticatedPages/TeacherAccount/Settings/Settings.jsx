import React, { useEffect } from "react";
import cx from "classnames";
import styles from "./Settings.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Subscriptions from "./Subscriptions/Subscriptions";
import Account from "./Account/Account";
import Password from "./Password/Password";
import PerformanceIndicator from "./PerformanceIndicator/PerformanceIndicator";
import Tabs from "@/components/Tabs/TabsV2";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import InviteParentModal from "@/components/Modals/InviteGuardian/InviteGuardian";
import ActivateParentModal from "@/components/Modals/ActivateGuardian/ActivateGuardian";
import AssignWardToParentModal from "@/components/Modals/AssignWardToParent/AssignWardToParent";
import AddPerformanceIndicatorByTeacherModal from "@/components/Modals/AddPerformanceIndicatorByTeacher/AddPerformanceIndicatorByTeacher";
import DeleteIndicatorModal from "@/components/Modals/DeleteKPIIndicator/DeleteKPIIndicator";
import ModifyKPIIndicatorModal from "@/components/Modals/ModifyKPIIndicator/ModifyKPIIndicator";
import KPIIndicatorDetailsModal from "@/components/Modals/KPIIndicatorDetails/KPIIndicatorDetails";
import UpdateProfileModal from "@/components/Modals/UpdateProfile/UpdateProfile";
import { viewKPIForClass, getDashboard, getTeacherDetails } from "@/redux/Teacher/TeacherSlice";
import useGetClassID from "@/utils/useGetClassID";


const Settings = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);
  const classID = useGetClassID();

  useEffect(() => {
    classID && dispatch(viewKPIForClass(classID));
    dispatch(getDashboard());
    dispatch(getTeacherDetails());
  }, [classID, dispatch]);

  // const RenderSubscriptions = () => <Subscriptions />;
  const RenderAccount = () => <Account />;
  const RenderPassword = () => <Password />;
  const RenderPerformanceIndicator = () => <PerformanceIndicator />;

  const tabsComponents = [
    // { name: "Subscriptions", component: RenderSubscriptions },
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

      {modalState === "show" && modalType === "inviteParent" && <Modal show >{<InviteParentModal />} </Modal>}
      {modalState === "show" && modalType === "activateParent" && <Modal show >{<ActivateParentModal />}</Modal>}
      {modalState === "show" && modalType === "assignWardToParent" && <Modal show >{<AssignWardToParentModal />}</Modal>}
      {modalState === "show" && modalType === "addPerformanceIndicator" && <Modal size="lg" show >{<AddPerformanceIndicatorByTeacherModal />}</Modal>}
      {modalState === "show" && modalType === "deleteIndicator" && <Modal show >{<DeleteIndicatorModal />}</Modal>}
      {modalState === "show" && modalType === "modifyKPIIndicator" && <Modal show >{<ModifyKPIIndicatorModal />}</Modal>}
      {modalState === "show" && modalType === "KPIIndicatorDetails" && <Modal show >{<KPIIndicatorDetailsModal />}</Modal>}
      {modalState === "show" && modalType === "updateProfile" && <Modal show >{<UpdateProfileModal />}</Modal>}



    </div>
  );
};

export default Settings;
