import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import {useNavigate} from "react-router-dom";
import styles from "./TasksAndActivities.module.scss";
import Button from "@/components/Button/Button";
import { showModal } from "@/redux/ModalState/modalState.action";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import CreateActivityModal from "@/components/Modals/CreateActivity/CreateActivity";
import Tabs from "@/components/Tabs/Tabs";
import AllTasks from "./AllTasks/AllTasks";
import Submissions from "./Submissions/Submissions";
import ViewSubmissionModal from "@/components/Modals/ViewSubmission/ViewSubmission";


const TasksAndActivities = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.modalState.type);
  const modalState = useSelector((state) => state.modalState.action);

  const RenderAllTasks = () => <AllTasks />;
  const RenderSubmissions = () => <Submissions />;
  

  const tabsComponents = [
    { name: "All", component: RenderAllTasks },
    { name: "Submissions", component: RenderSubmissions }
  ];




  return (
    <div className={cx(styles.tasksAndActivitiesContainer)}>
      <div className={cx(styles.header, "flexRow")}>
        <h5>Activities</h5>
        <Button  onClick={()=> dispatch(showModal({action: "show", type:"createActivity"}))} title="Create Activity" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" />
      </div>

      <div className={cx(styles.body, "flexCol")}>
        <Tabs centralise tabs={tabsComponents} />
      </div>
      
      {modalState === "show" ? <Modal show >{modalType === "createActivity" ?<CreateActivityModal /> : modalType === "viewSubmission" ?<ViewSubmissionModal /> :  null}</Modal> : null}
    </div>
  );
};

export default TasksAndActivities;