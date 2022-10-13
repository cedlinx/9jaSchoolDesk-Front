import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./Activities.module.scss";
import { showModal } from "@/redux/ModalState/ModalSlice";
import Tabs from "@/components/Tabs/TabsV2";
import CompletedTasks from "./CompletedTasks/CompletedTasks";
import PendingTasks from "./PendingTasks/PendingTasks";
import AllTasks from "./AllTasks/AllTasks";
import { useNavigate } from "react-router-dom";


const Activities = ({selectedWard}) => {
  const navigate = useNavigate();
  const RenderCompletedTasks = () => <CompletedTasks completedTasks={Array.isArray(selectedWard?.completed_tasks) && selectedWard?.completed_tasks} />;
  const RenderAllTasks = () => <AllTasks allTasks={Array.isArray(selectedWard?.current_tasks) && selectedWard?.current_tasks} />;
  const RenderPendingTasks = () => <PendingTasks pendingTasks={Array.isArray(selectedWard?.pending_tasks) && selectedWard?.pending_tasks} />;

  const tabsComponents = [
    { name: "Pending Task(s)", component: RenderPendingTasks, path: "pending-tasks" },
    { name: "Completed Task(s)", component: RenderCompletedTasks, path: "completed-tasks" },
    { name: "All Task(s)", component: RenderAllTasks, path: "all-tasks" }
  ];

  return (
    <div className={cx(styles.activitiesContainer)}>
      <div className={cx("flexRow", styles.heading)}>
        <h5>Activities</h5>
        {/* <small onClick={() => navigate("/student/tasks")}>View All</small> */}
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