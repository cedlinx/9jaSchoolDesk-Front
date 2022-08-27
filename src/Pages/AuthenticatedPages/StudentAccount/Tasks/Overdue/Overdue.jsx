import React from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import { Icon } from "@iconify/react";
import Button from "@/components/Button/Button";
import TableComponent from "@/components/Table/Table";
// import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import { titleCase } from "@/helpers/textTransform";
import { showModal } from "@/redux/ModalState/ModalSlice";
import formatDate from "@/helpers/formatDate";


const Overdue = ({overdueTasks}) => {

  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.student?.loading);
  console.log(overdueTasks);

  const columnsHeader = [                
    {
      Header: () => (
        <div
          style={{
            minWidth: "1rem",
            color: "#747474",
            fontSize: "1rem"
          }}
        >
          S/No</div>
      ),
      accessor: "serialNumber",
      Cell: (row) => {
        let serialNumber = row.cell.row.values.serialNumber;
        return <span style={{ color: "#4F4F4F"}}>{serialNumber}</span>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "auto",
            color: "#747474",
            fontSize: "1rem"
          }}
        >Name</div>
      ),
      accessor: "name",
      Cell: (row) => {
        let name = row.cell.row.values.name;
        return <div style={{ color: "#4F4F4F"}}>
          {name}
        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "auto",
            color: "#747474",
            fontSize: "1rem"
          }}
        >Subject</div>
      ),
      accessor: "subject",
      Cell: (row) => {
        let subject = row.cell.row.values.subject;
        return <div style={{ color: "#4F4F4F"}} >
          {subject}
          
        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "auto",
            color: "#747474",
            fontSize: "1rem"
          }}
        >Type</div>
      ),
      accessor: "type",
      Cell: (row) => {
        let type = row.cell.row.values.type;
        return <div style={{ color: "#4F4F4F"}} >
          {type}
            
        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "auto",
            color: "#747474",
            fontSize: "1rem"
          }}
        >Due Date</div>
      ),
      accessor: "due_date",
      Cell: (row) => {
        let due_date = row.cell.row.values.due_date;
        return <div  style={{width: "15rem"}}>
          <p style={{ color: "#4F4F4F"}}>{due_date}</p>         
        </div>;
      }
    }
    // {
    //   Header: () => (
    //     <div
    //       style={{
    //         width: "auto",
    //         color: "#747474",
    //         fontSize: "1rem",
    //         textAlign: "center"
    //       }}
    //     />
    //   ),
    //   accessor: "action",
    //   Cell: (row) => {
    //     let allData = row.cell.row.original.allData;
    //     return <div  style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
    //       <Button onClick={() => dispatch(showModal({action: "show", type: "taskDetails", modalData: allData }))} title="View" borderRadiusType="fullyRounded" textColor="#FF6A00" bgColor="#FF7E3F0D" bordercolor="#FF6A00" hoverColor="#fff" hoverBg="#ff6a00" />
    //     </div>;
    //   }
    // }

  ];

  let getTableData = (data) => {
    let result =[];

    Array.isArray(data)  && data.map((item, index) =>{
      result.push({
        serialNumber: index+1,
        name: item?.name && titleCase(item?.name),
        subject: item?.subject?.subject && titleCase(item?.subject?.subject),
        type: item?.type && titleCase(item?.type),
        due_date: item?.due_date && formatDate(item?.due_date),
        action: "",
        allData: item
      });
    });
    return result;
  };
    
  return (
    <>
      {overdueTasks.length > 0 ? <TableComponent loading={loading} columnsHeader={columnsHeader} tableData= {getTableData(overdueTasks)} showHeader={true}/> : <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
        :
        <p style={{color: "#747474", fontSize: "1.5rem"}}>No Overdue Task</p>
      </div>}
    </>
  );
};

Overdue.propTypes = {
  overdueTasks: PropTypes.array
};

export default Overdue;