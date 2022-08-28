import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./Activities.module.scss";
import { showModal } from "@/redux/ModalState/ModalSlice";
import Tabs from "@/components/Tabs/TabsV2";
import Tests from "./Tests/Tests";
import Tasks from "./Tasks/Tasks";
import Assignments from "./Assignments/Assignments";
import { useNavigate } from "react-router-dom";


const Activities = ({selectedWard}) => {
  const navigate = useNavigate();
  const RenderTests = () => <Tests />;
  const RenderAssignments = () => <Assignments />;
  const RenderTasks = () => <Tasks currentTasks={Array.isArray(selectedWard?.pending_tasks) && selectedWard?.pending_tasks} />;

  const tabsComponents = [
    // { name: "Tests", component: RenderTests },
    // { name: "Assignments", component: RenderAssignments },
    { name: "Current Task(s)", component: RenderTasks }
  ];

  return (
    <div className={cx(styles.activitiesContainer)}>
      <div className={cx("flexRow-space-between", styles.heading)}>
        <h5>Activities</h5>
        <small onClick={() => navigate("/student/tasks")}>View All</small>
      </div>
      <div className={cx(styles.contentWrapper)}>
        <Tabs tabs={tabsComponents} />
      </div>
    </div>
  );
};

Activities.propTypes = {
  selectedWard: PropTypes.object
};

export default Activities;