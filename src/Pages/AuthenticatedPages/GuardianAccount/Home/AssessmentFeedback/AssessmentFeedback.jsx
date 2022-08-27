import React, {useState} from "react";
import cx from "classnames";
import styles from "./AssessmentFeedback.module.scss";
import {useNavigate} from "react-router-dom";
import TableComponent from "@/components/Table/Table";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import formatDate from "@/helpers/formatDate";
import { titleCase, initialsCase } from "@/helpers/textTransform";
import {assessmentData} from "@/helpers/sampleData";
import { Icon } from "@iconify/react";
import expandIcon from "@/assets/icons/expand-icon.svg";


const AssessmentFeedback = ({selectedWard}) => {
  const navigate = useNavigate();

  let getTableData = (data) => {
    let result =[];
    console.log(data);
    
    data  && data.map((item, index) =>{
      result.push({
        serialNumber: index + 1,
        status: item?.read_status && item?.read_status,
        imageUrl: item?.teacher?.avatar && item?.teacher?.avatar,
        teacherDetails: item?.teacher && item?.teacher,
        date: item?.created_at && formatDate(item?.created_at),
        feedback: item?.pivot?.feedback && titleCase(item?.pivot?.feedback),
        allData: item
      });
    });
    return result;
  };

  const columnsHeaderAssessment = [                
    {
      Header: () => (
        <div
          style={{
            minWidth: "1rem"
          }}
        />
      ),
      accessor: "status",
      Cell: (row) => {
        let status = row.cell.row.values.status;
        return <span>{status && status.toLowerCase() === "read" ? <Icon icon="akar-icons:circle-fill" color="#2ac769" width="12" height="12" /> : <Icon icon="akar-icons:circle-fill" color="#bdbdbd" width="12" height="12" />}</span>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "auto"
          }}
        />
      ),
      accessor: "imageUrl",
      Cell: (row) => {
        let imageUrl = row.cell.row.values.imageUrl;
        let allData = row.cell.row.original.allData;
        return <div>
          
          {imageUrl ? 
            <img style={{borderRadius: "50%", width: "3rem"}} src={imageUrl} alt="img" />
            :
            <span style={{ display: "inline-block", backgroundColor: "#D25B5D", color: "#fff", borderRadius: "50%", width: "3rem", height: "3rem", lineHeight: "3rem", fontSize: "1.25rem", textAlign: "center"}}>{initialsCase(`${allData?.teacher?.firstName} ${allData?.teacher?.lastName}`)}</span>
          }
        </div>;
      }
    },
    {
      Header: () => (
        <div />
      ),
      accessor: "teacherDetails",
      Cell: (row) => {
        let details = row.cell.row.values.teacherDetails;
        return <div  style={{width: "5rem"}}>
          <p style={{fontWeight: "500", color: "#4f4f4f"}}>{details?.firstName && titleCase(`${details?.firstName} ${details?.lastName}`)}</p>
          <p style={{fontWeight: "500", color: "#828282", fontSize: "14px"}}>{details?.subject}</p>
          
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
        return <div  style={{width: "10rem"}}>
          <p className={cx("flexRow-space-between")} ><span style={{fontWeight: "500", color: "#828282", fontSize: "14px",   whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "15rem", marginRight: "0.5rem"}}>{feedback}</span><span><img style={{cursor: "pointer"}} src={expandIcon} alt="" /></span></p>          
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
          <p style={{fontWeight: "500", color: "#BDBDBD", fontSize: "0.875rem"}}>{formatDate(date)}</p>
          
        </div>;
      }
    }
  ];

  return (
    <div className={cx(styles.assessmentFeedbackContainer)}>
      <div className={cx(styles.header, "flexRow-space-between")}>
        <h5>{selectedWard?.firstName && titleCase(titleCase(selectedWard?.firstName))}'s Assessment Feedback</h5>
        <small onClick={() => navigate("assessment-feedback")}>View all</small>
      </div>
      <div className={cx(styles.tableDiv)}>
        {<TableComponent showTableHeader={false} showPaginationNavigation={false} columnsHeader={columnsHeaderAssessment} tableData= {getTableData(selectedWard?.tasks.slice(0,5))} />}
      </div>
    </div>
  );
};

export default AssessmentFeedback;