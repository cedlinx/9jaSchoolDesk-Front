import React from "react";
import cx from "classnames";
import styles from "./AssessmentFeedback.module.scss";
import {useNavigate} from "react-router-dom";
import TableComponent from "@/components/Table/Table";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import shortenDate from "@/helpers/shortenDate";
import { titleCase } from "@/helpers/textTransform";
import {assessmentData} from "@/helpers/sampleData";
import { Icon } from "@iconify/react";
import expandIcon from "@/assets/icons/expand-icon.svg";


const AssessmentFeedback = () => {
  const navigate = useNavigate();

  let getTableData = (data) => {
    let result =[];
    
    data  && data.map((item, index) =>{
      result.push({
        serialNumber: index + 1,
        status: item?.status && item?.status,
        imageUrl: item?.imageUrl && item?.imageUrl,
        teacherDetails: item?.teacherDetails && item?.teacherDetails,
        date: item?.date && shortenDate(item?.date),
        description: item?.description && titleCase(item?.description),
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
        return <span>{status.toLowerCase() === "read" ? <Icon icon="akar-icons:circle-fill" color="#2ac769" width="12" height="12" /> : <Icon icon="akar-icons:circle-fill" color="#bdbdbd" width="12" height="12" />}</span>;
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
        return <div>
          <img style={{borderRadius: "50%", width: "3rem"}} src={imageUrl} alt="img" />
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
        return <div  style={{width: "7rem"}}>
          <p style={{fontWeight: "500", color: "#4f4f4f"}}>{titleCase(details.name)}</p>
          <p style={{fontWeight: "500", color: "#828282", fontSize: "14px"}}>{titleCase(details.subject)}</p>
          
        </div>;
      }
    },
    {
      Header: () => (
        <div />
      ),
      accessor: "description",
      Cell: (row) => {
        let description = row.cell.row.values.description;
        return <div  style={{width: "15rem"}}>
          <p className={cx("flexRow-space-between")} ><span style={{fontWeight: "500", color: "#828282", fontSize: "14px",   whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "15rem", marginRight: "0.5rem"}}>{description}</span><span><img style={{cursor: "pointer"}} src={expandIcon} alt="" /></span></p>          
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
          <p style={{fontWeight: "500", color: "#BDBDBD", fontSize: "12px"}}>{date}</p>
          
        </div>;
      }
    }
  ];

  return (
    <div className={cx(styles.assessmentFeedbackContainer)}>
      <div className={cx(styles.header, "flexRow-space-between")}>
        <h5>Assessment Feedback</h5>
        <small onClick={() => navigate("assessment-feedback")}>View all</small>
      </div>
      <div className={cx(styles.tableDiv)}>
        {<TableComponent columnsHeader={columnsHeaderAssessment} tableData= {getTableData(assessmentData)} />}
      </div>
    </div>
  );
};

export default AssessmentFeedback;