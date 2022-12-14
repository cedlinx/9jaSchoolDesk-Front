import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import cx from "classnames";
import styles from "./Tasks.module.scss";
import TableComponent from "@/components/Table/Table";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import Tabs from "@/components/Tabs/TabsV2";

import { titleCase } from "@/helpers/textTransform";
import {assessmentData} from "@/helpers/sampleData";
import { Icon } from "@iconify/react";
import { showModal } from "@/redux/ModalState/ModalSlice";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import TaskDetailsModal from "@/components/Modals/TaskDetails/TaskDetails";

import { getStudentTasks } from "@/redux/Student/StudentSlice";
// import useGetSelectedWard from "@/utils/useGetSelectedWard";
import useGetStudentDashboard from "@/utils/useGetStudentDashboard";
import useGetSelectedWard from "@/utils/useGetSelectedWard";


import Submitted from "./Submitted/Submitted";
import Overdue from "./Overdue/Overdue";
import Active from "./Active/Active";
import All from "./All/All";

const Tasks = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);
  const loading = useSelector((state) => state.student.loading);
  const studentData = useGetStudentDashboard();

  const RenderAll = () => <All allTasks={Array.isArray(studentData?.current_tasks) && studentData.current_tasks} />;
  const RenderActive = () => <Active currentTasks={Array.isArray(studentData?.pending_tasks) && studentData.pending_tasks} />;
  const RenderSubmitted = () => <Submitted submittedTasks={Array.isArray(studentData?.completed_tasks) && studentData.completed_tasks} />;
  const RenderOverdue = () => <Overdue overdueTasks={Array.isArray(studentData?.overdue_tasks) && studentData.overdue_tasks} />;

  const tabsComponents = [
    { name: "All", component: RenderAll, path: "all-tasks" },
    { name: "Active", component: RenderActive, path: "active-tasks" },
    { name: "Submitted", component: RenderSubmitted, path: "submitted-tasks" },
    { name: "Overdue", component: RenderOverdue, path: "overdue-tasks" }
  ];

  return (
    <div className={cx(styles.tasksContainer, "flexCol")}>
      <div className={cx(styles.header)}>
        <h5>Tasks</h5>
      </div>
      {/* <div className={cx(styles.filterSection, "flexRow")}>
        <input type="date" name="" id="" />
        <button>Filter</button>
      </div> */}
      <div style={{height: "100%", width: "100%"}}>
        {loading ? <TableSkeleton /> : <Tabs centralise tabs={tabsComponents} />}
      </div>

    

      {modalState === "show" && modalType === "taskDetails" && <Modal show size="lg" >{ <TaskDetailsModal />}</Modal> }
    </div>
  );
};

export default Tasks;