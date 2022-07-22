import React from "react";
import cx from "classnames";
import TableComponent from "@/components/Table/Table";
import { titleCase } from "@/helpers/textTransform";
import {assessmentData} from "@/helpers/sampleData";
import { Icon } from "@iconify/react";
import expandIcon from "@/assets/icons/expand-icon.svg";

const Tests = () => {

  const columnsHeaderActivities = [                
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
        return <span>{status.toLowerCase() === "read" ? <Icon icon="akar-icons:circle-fill" color="#2ac769" width="12" height="12" /> : <Icon icon="akar-icons:circle-fill" color="#bdbdbd" width="12" height="12" />}</span>;
      }
    },
    {
      Header: () => (
        <div style={{fontSize: "0.875rem"}}>Tasks</div>
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
            minWidth: "3.5rem", fontSize: "0.875rem"
          }}
        >Due Date</div>
      ),
      accessor: "date",
      Cell: (row) => {
        let date = row.cell.row.values.date;
        return <div>
          <p style={{fontWeight: "500", color: "#BDBDBD", fontSize: "12px"}}>{date}</p>
              
        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "5rem", fontSize: "0.875rem"
          }}
        >Action</div>
      ),
      accessor: "action",
      Cell: (row) => {
        let date = row.cell.row.values.date;
        return <div>
          <button style={{backgroundColor: "#2AC769", borderRadius: "1rem", color: "#fff", border: "none", fontSize: "0.75rem", padding: "0.5rem 1rem", cursor: "pointer"}} onClick={()=>dispatch(showModal({ action: "show", type: "submitAssessment" }))}>
                Submit
          </button>
              
        </div>;
      }
    }
  ];

  let shortenDate=(value)=>{
    let date = new Date(value);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    };
    let dateValue = date.toLocaleDateString("en-US", options);
    return `${dateValue}`;
  };

  let getTableData = (data) => {
    let result =[];

    data  && data.map((item, index) =>{
      result.push({
        serialNumber: index+1,
        status: item?.status && item?.status,
        imageUrl: item?.imageUrl && item?.imageUrl,
        teacherDetails: item?.teacherDetails && item?.teacherDetails,
        date: item?.date && shortenDate(item?.date),
        description: item?.description && titleCase(item?.description)
      });
    });
    return result;
  };

  return (
    <TableComponent columnsHeader={columnsHeaderActivities} tableData= {getTableData(assessmentData)} />
  );
};

export default Tests;