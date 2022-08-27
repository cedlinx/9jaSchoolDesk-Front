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
import Button from "@/components/Button/Button";
import { showModal } from "@/redux/ModalState/ModalSlice";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import TaskDetailsModal from "@/components/Modals/TaskDetails/TaskDetails";

import { getWardTasks } from "@/redux/Guardian/GuardianSlice";
import useGetSelectedWard from "@/utils/useGetSelectedWard";


import Submitted from "./Submitted/Submitted";
import Due from "./Due/Due";
import Active from "./Active/Active";

const Tasks = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);
  const loading = useSelector((state) => state.guardian.loading);
  const selectedWard = useGetSelectedWard();

  useEffect(() => {
    selectedWard?.id && dispatch(getWardTasks({student_id: selectedWard?.id}));
  }, [dispatch, selectedWard?.id]);

  const RenderActive = () => <Active />;
  const RenderSubmitted = () => <Submitted />;
  const RenderDue = () => <Due />;

  const tabsComponents = [
    { name: "Active", component: RenderActive },
    { name: "Submitted", component: RenderSubmitted },
    { name: "Due", component: RenderDue }
  ];

  return (
    <div className={cx(styles.tasksContainer, "flexCol")}>
      <div className={cx(styles.header)}>
        <h5>All Tasks</h5>
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