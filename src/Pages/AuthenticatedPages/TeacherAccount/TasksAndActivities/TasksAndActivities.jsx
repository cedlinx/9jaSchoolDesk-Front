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
import AssignTaskModal from "@/components/Modals/AssignTask/AssignTask";
import ViewSubmissionsModal from "@/components/Modals/ViewSubmission/ViewSubmission";
import useGetClassID from "@/utils/useGetClassID";


const TasksAndActivities = () => {
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.modalState.type);
  const modalState = useSelector((state) => state.modalState.action);
  const classID = useGetClassID();

  const RenderAllTasks = () => <AllTasks />;
  const RenderSubmissions = () => <Submissions />;

  const tabsComponents = [
    { name: "Tasks", component: RenderAllTasks }
    // { name: "Submissions", component: RenderSubmissions }
  ];


  return (
    <div className={cx(styles.tasksAndActivitiesContainer)}>
      <div className={cx(styles.header, "flexRow")}>
        <h3 className={cx(styles.title)}>Activities</h3>
        {classID && <Button onClick={() => dispatch(showModal({ action: "show", type: "addTask" }))} title="Create Activity" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" />}
      </div>

      {
        classID ?
          <div className={cx(styles.body, "flexCol")}>
            <AllTasks />
          </div> :
          <div className={cx(styles.noDataDiv)}>
            <p>You have no class assigned to you. You can only create Tasks when you have at least one (1) class assigned to you. Kindly contact your administrator.</p>
          </div>
      }
    

      {modalType === "addTask" && <Modal size="lg" show > <AddTaskModal /></Modal>}
      {modalType === "modifyTask" && <Modal size="lg" show > <ModifyTaskModal /></Modal>}
      {modalType === "deleteTask" && <Modal size="md" show > <DeleteTaskModal /></Modal>}
      {modalType === "changeTaskStatus" && <Modal size="md" show > <ChangeTaskStatusModal /></Modal>}
      {modalType === "assignTask" && <Modal size="md" show > <AssignTaskModal /></Modal>}
      {modalType === "viewSubmissions" && <Modal size="lg" show > <ViewSubmissionsModal /></Modal>}

    </div>
  );
};

export default TasksAndActivities;