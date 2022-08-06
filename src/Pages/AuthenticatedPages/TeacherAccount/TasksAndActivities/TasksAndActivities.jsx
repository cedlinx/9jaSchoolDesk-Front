import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./TasksAndActivities.module.scss";
import Button from "@/components/Button/Button";
import { showModal } from "@/redux/ModalState/ModalSlice";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import AddTaskModal from "@/components/Modals/AddTask/AddTask";
import ModifyTaskModal from "@/components/Modals/ModifyTask/ModifyTask";
import DeleteTaskModal from "@/components/Modals/DeleteTask/DeleteTask";
import ChangeTaskStatusModal from "@/components/Modals/ChangeTaskStatus/ChangeTaskStatus";
import Tabs from "@/components/Tabs/TabsV2";
import AllTasks from "./AllTasks/AllTasks";
import Submissions from "./Submissions/Submissions";
import ViewSubmissionModal from "@/components/Modals/ViewSubmission/ViewSubmission";


const TasksAndActivities = () => {
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.modalState.type);
  const modalState = useSelector((state) => state.modalState.action);

  const RenderAllTasks = () => <AllTasks />;
  const RenderSubmissions = () => <Submissions />;

  const tabsComponents = [
    { name: "Tasks", component: RenderAllTasks },
    { name: "Submissions", component: RenderSubmissions }
  ];


  return (
    <div className={cx(styles.tasksAndActivitiesContainer)}>
      <div className={cx(styles.header, "flexRow")}>
        <h3 className={cx(styles.title)}>Activities</h3>
        <Button onClick={() => dispatch(showModal({ action: "show", type: "addTask" }))} title="Create Activity" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" />
      </div>

      <div className={cx(styles.body, "flexCol")}>
        <Tabs centralise tabs={tabsComponents} />
      </div>

      {modalType === "addTask" && <Modal size="lg" show > <AddTaskModal /></Modal>}
      {modalType === "modifyTask" && <Modal size="lg" show > <ModifyTaskModal /></Modal>}
      {modalType === "deleteTask" && <Modal size="md" show > <DeleteTaskModal /></Modal>}
      {modalType === "changeTaskStatus" && <Modal size="md" show > <ChangeTaskStatusModal /></Modal>}
      {modalType === "viewSubmission" && <Modal size="lg" show > <ViewSubmissionModal /></Modal>}

      {/* {modalState === "show" ? <Modal size="lg" show >{modalType === "addTask" ? <AddTaskModal /> : modalType === "modifyTask" ? <ModifyTaskModal /> : modalType === "deleteTask" ? <DeleteTaskModal /> : modalType === "changeTaskStatus" ? <ChangeTaskStatusModal /> : modalType === "viewSubmission" ? <ViewSubmissionModal /> : null}</Modal> : null} */}
    </div>
  );
};

export default TasksAndActivities;