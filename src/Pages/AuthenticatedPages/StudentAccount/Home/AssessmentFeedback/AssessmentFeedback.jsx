import React, {useState} from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { useDispatch } from "react-redux";
import styles from "./AssessmentFeedback.module.scss";
import {useNavigate} from "react-router-dom";
import TableComponent from "@/components/Table/Table";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import formatDate from "@/helpers/formatDate";
import { titleCase, initialsCase } from "@/helpers/textTransform";
import expandIcon from "@/assets/icons/expand-icon.svg";
import { showModal } from "@/redux/ModalState/ModalSlice";


const AssessmentFeedback = ({tasksData}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let getTableData = (data) => {
    let result =[];
    
    data  && data.map((item, index) =>{
      result.push({
        serialNumber: index + 1,
        teacherDetails: item?.teacher && item?.teacher,
        date: item?.created_at && formatDate(item?.created_at),
        feedback: item?.pivot?.feedback && item?.pivot?.feedback,
        allData: item
      });
    });
    return result;
  };

  const columnsHeaderAssessment = [                   
    {
      Header: () => (
        <div />
      ),
      accessor: "teacherDetails",
      Cell: (row) => {
        let teacherDetails = row.cell.row.values.teacherDetails;
        let subject = row.cell.row.original.allData.subject.subject;
        return <div  style={{width: "12.5rem", display: "flex", gap: "0.5rem"}}>
          <div>
            {teacherDetails?.avatar ? 
              <img style={{borderRadius: "50%", width: "3rem", height: "3rem"}} src={teacherDetails?.avatar} alt="img" />
              :
              <span style={{ display: "inline-block", backgroundColor: "#D25B5D", color: "#fff", borderRadius: "50%", width: "3rem", height: "3rem", lineHeight: "3rem", fontSize: "1.25rem", textAlign: "center"}}>{initialsCase(`${teacherDetails?.firstName ? teacherDetails.firstName : ""} ${teacherDetails?.lastName ? teacherDetails?.lastName : ""}`)}</span>
            }
          </div>
          <div>
            <p style={{fontWeight: "500", color: "#4f4f4f"}}>{teacherDetails?.firstName && titleCase(`${teacherDetails?.firstName} ${teacherDetails?.lastName}`)}</p>
            <p style={{fontWeight: "500", color: "#828282", fontSize: "14px"}}>{subject}</p>

          </div>
        </div>;
      }
    },
    {
      Header: () => (
        <div />
      ),
      accessor: "feedback",
      Cell: (row) => {
        let feedback = row.cell.row.values.feedback;
        let allData = row.cell.row.original.allData;

        return <div  style={{width: "auto"}}>
          <p className={cx("flexRow-space-between")} ><span style={{fontWeight: "500", color: "#828282", fontSize: "1rem",   whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%", marginRight: "0.5rem"}}>{feedback}</span><span><img onClick={() => dispatch(showModal({action: "show", type: "taskDetails", modalData: allData}))} style={{cursor: "pointer"}} src={expandIcon} alt="" /></span></p>          
        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "5rem"
          }}
        />
      ),
      accessor: "date",
      Cell: (row) => {
        let date = row.cell.row.values.date;
        return <div>
          <p style={{fontWeight: "500", color: "#000", fontSize: "0.875rem", textAlign: "center"}}>{formatDate(date)}</p>
          
        </div>;
      }
    }
  ];

  return (
    <div className={cx(styles.assessmentFeedbackContainer, "flexCol")}>
      <div className={cx(styles.header, "flexRow-space-between")}>
        <h5>Assessment Feedback</h5>
        <small onClick={() => navigate("/student/assessment-feedback")}>View all</small>
      </div>
      <div className={cx(styles.tableDiv)}>
        {/* {Array.isArray(tasksData?.graded_tasks) && tasksData?.graded_tasks.length > 0 ? <TableComponent showTableHeader={false} showPaginationNavigation={false} columnsHeader={columnsHeaderAssessment} tableData= {getTableData(tasksData?.graded_tasks.slice(0,5))} emptyDataText="You currently have no feedback" /> : <p className={cx(styles.emptyDataElement)}>You currently have no feedback</p>} */}
        {Array.isArray(tasksData?.graded_tasks) && <TableComponent showTableHeader={false} showPaginationNavigation={false} columnsHeader={columnsHeaderAssessment} tableData= {getTableData(tasksData?.graded_tasks.slice(0,5))} emptyDataText="You currently have no feedback" />}
      </div>
    </div>
  );
};

AssessmentFeedback.propTypes = {
  tasksData: PropTypes.object
};

export default AssessmentFeedback;