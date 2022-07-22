import React, {useEffect, useState} from "react";
import cx from "classnames";
import styles from "./Students.module.scss";

import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Button from "@/components/Button/Button";

import TableComponent from "@/components/Table/Table";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import { titleCase } from "@/helpers/textTransform";
import {allStudentsData} from "@/helpers/sampleData";

import UrgentInfoModal from "@/components/Modals/UrgentInfo/UrgentInfo";
import AddStudentModal from "@/components/Modals/AddStudent/AddStudent";
import ActivateNewSignUpModal from "@/components/Modals/ActivateNewSignUp/ActivateNewSignUp";
import { Icon } from "@iconify/react";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import { showModal } from "@/redux/ModalState/ModalSlice";


const Students = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);
  
  
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
  
  const columnsHeaderAssessment = [                
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
        >Student ID</div>
      ),
      accessor: "studentId",
      Cell: (row) => {
        let studentId = row.cell.row.values.studentId;
        return <div>
          <p style={{ color: "#4F4F4F"}}>{studentId}</p>         
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
        >Class</div>
      ),
      accessor: "class",
      Cell: (row) => {
        let studentClass = row.cell.row.values.class;
        return <div>
          <p style={{ color: "#4F4F4F"}}>{studentClass}</p>         
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
        >Parent</div>
      ),
      accessor: "parent",
      Cell: (row) => {
        let parentName = row.cell.row.values.parent.parentName;
        let parentImage = row.cell.row.values.parent.parentImage;
        return <div  style={{width: "auto", display: "flex", gap: "0.25rem", alignItems: "center"}}>
          <img style={{width: "2.5rem", height: "2.5rem", borderRadius: "50%"}} src={parentImage} alt="img" />
          <p style={{ color: "#4F4F4F"}}>{parentName}</p>         
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
        >Action</div>
      ),
      accessor: "action",
      Cell: (row) => {
        let studentData = row.cell.row.original.allData;
        console.log(studentData);
        return <div>
          <Button onClick={() => navigate(`student-report/${studentData?.studentId}`, {state:{studentData: studentData}})} title="View Report" borderRadiusType="fullyRounded" textColor="#FF6A00" bgColor="#FF7E3F0D" bordercolor="#FF7E3F0D" />
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
        >Action</div>
      ),
      accessor: "moreOptions",
      Cell: () => {
        return <div>
          <Icon style={{cursor: "pointer"}} icon="bx:dots-vertical-rounded" />
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
        studentId: item?.studentId && item?.studentId,
        class: item?.class && item?.class,
        parentName: item?.parentName && item?.parentName,
        parentImage: item?.parentImage && item?.parentImage,
        parent: {
          parentName: item?.parentName && item?.parentName,
          parentImage: item?.parentImage && item?.parentImage
        },
        allData: item,
        moreOption: "",
        action: ""
      });
    });
    return result;
  };

  return (
    <div className={cx(styles.studentHomeContainer)}>

      <div className={cx(styles.heading, "flexRow-space-between")}>
        <h3 className={cx(styles.title)}>Student</h3>
        <Button onClick={() => dispatch(showModal({action: "show", type: "addStudent", modalData: {studentData: "", user: "proprietor"}}))} title="Add Student" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" />
      </div>

      <div className={cx(styles.body, "flexCol")}> 

        <div className={cx(styles.tableSection)}>
          <h3 className={cx(styles.title)}>All Students</h3>
          {<TableComponent columnsHeader={columnsHeaderAssessment} tableData= {getTableData(allStudentsData)} showHeader={true} />}
        </div>
     
      </div>              

      {modalState === "show" ? <Modal show >{modalType === "urgentInfo" ? <UrgentInfoModal /> : modalType === "activateSignUp" ? <ActivateNewSignUpModal /> :  modalType === "addStudent" ? <AddStudentModal /> :  null}</Modal> : null}
            
    </div>
  );
};

export default Students;