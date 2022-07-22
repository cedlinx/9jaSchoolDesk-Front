import React from "react";
import cx from "classnames";
import styles from "./Parents.module.scss";

import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import ApprovedAccounts from "./ApprovedAccounts/ApprovedAccounts";
import RejectedAccounts from "./RejectedAccounts/RejectedAccounts";
import PendingAccounts from "./PendingAccounts/PendingAccounts";
import Tabs from "@/components/Tabs/Tabs";
import Button from "@/components/Button/Button";
import { showModal } from "@/redux/ModalState/ModalSlice";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import InviteParentModal from "@/components/Modals/InviteParent/InviteParent";
import ActivateParentModal from "@/components/Modals/ActivateParent/ActivateParent";




const Parents = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);

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
        <h3 className={cx(styles.title)}>Dashboard</h3>
        <Button onClick={() => dispatch(showModal({action: "show", type: "inviteParent"}))} type title="Invite Parent" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" />
      </div>

      <Tabs centralise tabs={tabsComponents} />

      {modalState === "show" ? <Modal show >{modalType === "inviteParent" ? <InviteParentModal /> : modalType === "activateParent" ? <ActivateParentModal /> :   null}</Modal> : null}
    </div>
  );
};

export default Parents;