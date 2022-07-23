import React from "react";

import TableComponent from "@/components/Table/Table";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import { titleCase } from "@/helpers/textTransform";
import {newSignUpsData} from "@/helpers/sampleData";


const RejectedAccounts = () => {
  
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
        >First Name </div>
      ),
      accessor: "firstName",
      Cell: (row) => {
        let firstName = row.cell.row.values.firstName;
        return <div style={{ color: "#4F4F4F"}}>
          {firstName}
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
        >Last Name </div>
      ),
      accessor: "lastName",
      Cell: (row) => {
        let lastName = row.cell.row.values.lastName;
        return <div style={{ color: "#4F4F4F"}} >
          {lastName}
            
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
        >Email</div>
      ),
      accessor: "email",
      Cell: (row) => {
        let email = row.cell.row.values.email;
        return <div  style={{width: "15rem"}}>
          <p style={{ color: "#4F4F4F"}}>{email}</p>         
        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            width: "auto",
            color: "#747474",
            fontSize: "1rem",
            textAlign: "center"
          }}
        >Status</div>
      ),
      accessor: "status",
      Cell: (row) => {
        let status = row.cell.row.values.status;
        return <div  style={{ display: "flex", justifyContent: "center" }}>
          <span style={{color: "tomato"}} >{status || "Rejected"}</span>
        </div>;
      }
    }
  ];
  
  let getTableData = (data) => {
    let result =[];
  
    data  && data.map((item, index) =>{
      result.push({
        serialNumber: index+1,
        firstName: item?.firstName && titleCase(item?.firstName),
        lastName: item?.lastName && titleCase(item?.lastName),
        email: item?.email && item?.email,
        action: "",
        status: ""
      });
    });
    return result;
  };
      
  return (
    <TableComponent columnsHeader={columnsHeader} tableData= {getTableData(newSignUpsData)} showHeader={true}/>                
  );
};

export default RejectedAccounts;