import React from "react";
import cx from "classnames";
import styles from "./NoticeBoard.module.scss";
import {useNavigate} from "react-router-dom";
import TableComponent from "@/components/Table/Table";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import shortenDate from "@/helpers/shortenDate";
import { titleCase } from "@/helpers/textTransform";
import {assessmentData} from "@/helpers/sampleData";
import { Icon } from "@iconify/react";
import expandIcon from "@/assets/icons/expand-icon.svg";

const NoticeBoard = () => {
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
  
      accessor: "status",
      Cell: (row) => {
        let status = row.cell.row.values.status;
        return <span>{status.toLowerCase() === "read" ? <Icon icon="akar-icons:circle-fill" color="#2ac769" width="12" height="12" /> : <Icon icon="akar-icons:circle-fill" color="#bdbdbd" width="12" height="12" />}</span>;
      }
    },
    {
      Header: () => (
        <div />
      ),
      accessor: "teacherDetails",
      Cell: (row) => {
        let details = row.cell.row.values.teacherDetails;
        return <div>
          <p style={{fontWeight: "500", color: "#4f4f4f"}}>{titleCase(details.name)}</p>
          <p style={{fontWeight: "500", color: "#828282", fontSize: "14px"}}>{titleCase(details.subject)}</p>
          
        </div>;
      }
    }
  ];

  return (
    <div className={cx(styles.noticeBoardContainer)}>
      <div className={cx(styles.header, "flexRow-space-between")}>
        <h5>Notice Board</h5>             
      </div>
      <div className={cx(styles.tableDiv)}>
        {<TableComponent columnsHeader={columnsHeaderAssessment} tableData= {getTableData(assessmentData)} />}
      </div>
    </div>
  );
};

export default NoticeBoard;