import React from "react";
import cx from "classnames";
import styles from "./NoticeBoard.module.scss";
import {useNavigate} from "react-router-dom";
import TableComponent from "@/components/Table/Table";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import formatDate from "@/helpers/formatDate";
import { titleCase } from "@/helpers/textTransform";
import {noticeboardData} from "@/helpers/sampleData";
import { Icon } from "@iconify/react";
import expandIcon from "@/assets/icons/expand-icon.svg";


const NoticeBoard = ({selectedWard}) => {
  const navigate = useNavigate();
  const notices = selectedWard?.notices;
  console.log(notices);


  let getTableData = (data) => {
    let result =[];
      
    data  && data.map((item, index) =>{
      result.push({
        serialNumber: index + 1,
        status: item?.status && item?.status,
        title: item?.title && item?.title,
        date: item?.date && formatDate(item?.date),
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
            width: "0.5rem"
          }}
        />
      ),
      accessor: "status",
      Cell: (row) => {
        let status = row.cell.row.values.status;
        return <span style={{width: "0.5rem"}}>{status && status.toLowerCase() === "read" ? <Icon icon="akar-icons:circle-fill" color="#2ac769" width="12" height="12" /> : <Icon icon="akar-icons:circle-fill" color="#bdbdbd" width="12" height="12" />}</span>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "15rem"
          }}
        />
      ),
      accessor: "title",
      Cell: (row) => {
        let title = row.cell.row.values.title;
        let allData = row.cell.row.original.allData;
        return <div  style={{width: "15rem"}}>
          <p style={{fontWeight: "500", color: "#4f4f4f", fontSize: "1.125rem"}}>{title}</p>
          <p style={{fontWeight: "500", color: "#828282", fontSize: "0.875rem"}}>{allData?.date}</p>
          
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
        {<TableComponent defaultPageSize="5" showTableHeader={false} showPaginationSummary={false} columnsHeader={columnsHeaderAssessment} tableData= {getTableData(noticeboardData)} />}
      </div>
    </div>
  );
};

export default NoticeBoard;