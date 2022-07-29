import React, {useEffect} from "react";
import cx from "classnames";
import styles from "./Parents.module.scss";

import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import ApprovedAccounts from "./ApprovedAccounts/ApprovedAccounts";
import RejectedAccounts from "./RejectedAccounts/RejectedAccounts";
import PendingAccounts from "./PendingAccounts/PendingAccounts";
import Tabs from "@/components/Tabs/TabsV2";
import Button from "@/components/Button/Button";
import { showModal } from "@/redux/ModalState/ModalSlice";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import InviteGuardianModal from "@/components/Modals/InviteGuardian/InviteGuardian";
import ActivateGuardianModal from "@/components/Modals/ActivateGuardian/ActivateGuardian";
import DeactivateGuardianModal from "@/components/Modals/DeactivateGuardian/DeactivateGuardian";
import RejectGuardianModal from "@/components/Modals/RejectGuardian/RejectGuardian";
import GuardianDetailsModal from "@/components/Modals/GuardianDetails/GuardianDetails";
import AddNewWardModal from "@/components/Modals/AddNewWard/AddNewWard";

import { getAllGuardians } from "@/redux/Proprietor/ProprietorSlice";



const Parents = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);

  useEffect(() => {
    dispatch(getAllGuardians());
  }, [dispatch]);

  const RenderApprovedAccounts = () => <ApprovedAccounts />;
  const RenderRejectedAccounts = () => <RejectedAccounts />;
  const RenderPendingAccounts = () => <PendingAccounts />;

  const tabsComponents = [
    { name: "Pending Accounts", component: RenderPendingAccounts },
    { name: "Approved Accounts", component: RenderApprovedAccounts },
    { name: "Rejected Accounts", component: RenderRejectedAccounts }
  ];

  return (
    <div className={cx(styles.parentsHomeContainer)}>
      <div className={cx(styles.heading, "flexRow-space-between")}>
        <h3 className={cx(styles.title)}>Parents</h3>
        <Button onClick={() => dispatch(showModal({action: "show", type: "inviteGuardian"}))} type title="Invite Parent" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" />
      </div>

      <Tabs centralise tabs={tabsComponents} />

      {modalState === "show" ? <Modal show >{modalType === "inviteGuardian" ? <InviteGuardianModal /> : modalType === "activateGuardian" ? <ActivateGuardianModal /> : modalType === "deactivateGuardian" ? <DeactivateGuardianModal /> : modalType === "guardianDetails" ? <GuardianDetailsModal /> : modalType === "rejectGuardian" ? <RejectGuardianModal /> : modalType === "addNewWard" ? <AddNewWardModal /> :   null}</Modal> : null}
    </div>
  );
};

export default Parents;