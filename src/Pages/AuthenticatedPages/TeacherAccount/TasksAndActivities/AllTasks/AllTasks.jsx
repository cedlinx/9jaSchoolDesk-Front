import React from "react";
import TableComponent from "@/components/Table/Table";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import { titleCase } from "@/helpers/textTransform";
import {assessmentData} from "@/helpers/sampleData";
import { Icon } from "@iconify/react";



const AllTasks = () => {

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
    
  const columnsHeader = [                
    {
      Header: () => (
        <div
          style={{
            minWidth: "12.5rem"
          }}
        >Task</div>
      ),
      accessor: "task",
      Cell: (row) => {
        let task = row.cell.row.values.task;
        return <div>
          <p style={{fontWeight: "500", color: "#4F4F4F", fontSize: "1rem"}}>{titleCase(task)}</p>
              
        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "auto"
          }}
        >Category</div>
      ),
      accessor: "category",
      Cell: (row) => {
        let category = row.cell.row.values.category;
        return <div>
          <p style={{fontWeight: "500", color: "#4F4F4F", fontSize: "1rem"}}>{titleCase(category)}</p>
                
        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "10rem"
          }}
        >Assigned To</div>
      ),
      accessor: "assignedTo",
      Cell: (row) => {
        let assignedTo = row.cell.row.values.assignedTo;
        return <div>
          <img style={{borderRadius: "50%", width: "3rem", marginRight: "0.5rem"}} src={assignedTo?.imageUrl} alt="img" /><span style={{color: "#4F4F4F", fontSize: "1rem"}}>{assignedTo?.name}</span>
        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "5rem"
          }}
        >Due Date</div>
      ),
      accessor: "date",
      Cell: (row) => {
        let date = row.cell.row.values.date;
        return <div>
          <p style={{fontWeight: "500", color: "#4f4f4f", fontSize: "1rem"}}>{date}</p>
              
        </div>;
      }
    }
  ];
    
  let getTableData = (data) => {
    let result =[];
    
    data  && data.map((item, index) =>{
      result.push({
        serialNumber: index+1,
        category: item?.status && item?.status,
        imageUrl: item?.imageUrl && item?.imageUrl,
        assignedTo: item?.teacherDetails && {name: item?.teacherDetails?.name, imageUrl: item?.imageUrl},
        date: item?.date && shortenDate(item?.date),
        task: item?.description && titleCase(item?.description)
      });
    });
    return result;
  };
  
  return (
    <div>
      {<TableComponent columnsHeader={columnsHeader} tableData= {getTableData(assessmentData)} />}
    </div>
  );
};

export default AllTasks;