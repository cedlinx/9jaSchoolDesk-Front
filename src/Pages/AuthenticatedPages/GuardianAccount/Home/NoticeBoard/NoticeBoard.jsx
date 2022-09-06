import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./NoticeBoard.module.scss";
import TableComponent from "@/components/Table/Table";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import formatDate from "@/helpers/formatDate";
import { titleCase } from "@/helpers/textTransform";
import { Icon } from "@iconify/react";


const NoticeBoard = ({selectedWard}) => {
  const notices = selectedWard?.notices;

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
        {Array.isArray(notices) && notices.length > 0 ? <TableComponent defaultPageSize="5" showTableHeader={false} showPaginationSummary={false} columnsHeader={columnsHeaderAssessment} tableData= {getTableData(notices)} /> : <p className={cx(styles.emptyDataElement)}>You have no notiification at this time</p> }
      </div>
    </div>
  );
};

NoticeBoard.propTypes = {
  selectedWard: PropTypes.object
};

export default NoticeBoard;