import React from "react";

import {useDispatch, useSelector} from "react-redux";

import Button from "@/components/Button/Button";
import TableComponent from "@/components/Table/Table";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import { titleCase } from "@/helpers/textTransform";
import {approvedParentsData} from "@/helpers/sampleData";
import { showModal } from "@/redux/ModalState/ModalSlice";

const ApprovedAccounts = () => {
  const dispatch = useDispatch();

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
            minWidth: "auto",
            color: "#747474",
            fontSize: "1rem"
          }}
        >Ward</div>
      ),
      accessor: "wards",
      Cell: (row) => {
        let wards = row.cell.row.values.wards;
        return <div  style={{width: "15rem"}}>
          {wards && wards.map((ward, index) =>{
            return <img style={{width: "3rem", height: "3rem", borderRadius: "50%", padding: "0.25rem", marginLeft: "-0.625rem", backgroundColor:"white", cursor: "pointer"}} key={index} src={ward} alt="img" />;
          })}      
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
        >Action</div>
      ),
      accessor: "action",
      Cell: (row) => {
        let action = row.cell.row.values.action;
        return <div  style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={() => dispatch(showModal({action: "show", type: "addNewWard", modalData:"id"}))} title="Add New Ward +" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#FF7E3F0D" bordercolor="#FF7E3F0D" />
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
        wards: item?.wards && item?.wards
      });
    });
    return result;
  };
      
  return (
    <TableComponent columnsHeader={columnsHeader} tableData= {getTableData(approvedParentsData)} showHeader={true}/>                
  );
};

export default ApprovedAccounts;