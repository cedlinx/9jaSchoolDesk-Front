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

import useGetStudentDashboard from "@/utils/useGetStudentDashboard";
import useGetSelectedWard from "@/utils/useGetSelectedWard";
import { getDashboard, getWardTasks } from "@/redux/Guardian/GuardianSlice";


import Submitted from "./Submitted/Submitted";
import Overdue from "./Overdue/Overdue";
import Active from "./Active/Active";
import All from "./All/All";

const Tasks = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);
  const loading = useSelector((state) => state.student.loading);
  const selectedWard = useGetSelectedWard();
  const tasksData = useSelector((state) => state.guardian.getWardTasksData.task);

  console.log(selectedWard);
  console.log(tasksData);

  useEffect(() => {
    dispatch(getWardTasks({student_id: selectedWard?.id}));
  }, [dispatch, selectedWard?.id]);

  const RenderAll = () => <All allTasks={Array.isArray(tasksData?.current_tasks) && tasksData.current_tasks} />;
  const RenderActive = () => <Active currentTasks={Array.isArray(tasksData?.pending_tasks) && tasksData.pending_tasks} />;
  const RenderSubmitted = () => <Submitted submittedTasks={Array.isArray(tasksData?.submitted_tasks) && tasksData.submitted_tasks} />;
  const RenderOverdue = () => <Overdue overdueTasks={Array.isArray(tasksData?.overdue_tasks) && tasksData.overdue_tasks} />;

  const tabsComponents = [
    { name: "All", component: RenderAll },
    { name: "Active", component: RenderActive },
    { name: "Submitted", component: RenderSubmitted },
    { name: "Overdue", component: RenderOverdue }
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

      {loading ? <TableSkeleton /> : <Tabs centralise tabs={tabsComponents} />}

      {modalState === "show" && modalType === "taskDetails" && <Modal show size="lg" >{ <TaskDetailsModal />}</Modal> }
    </div>
  );
};

export default Tasks;