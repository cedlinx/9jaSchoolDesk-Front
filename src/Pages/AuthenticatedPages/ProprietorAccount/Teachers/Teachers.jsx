import React from "react";
import cx from "classnames";
import styles from "./Teachers.module.scss";

import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Button from "@/components/Button/Button";

import TableComponent from "@/components/Table/Table";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import { titleCase } from "@/helpers/textTransform";
import {allTeachersData} from "@/helpers/sampleData";
import { Icon } from "@iconify/react";
import AddTeacherModal from "@/components/Modals/AddTeacher/AddTeacher";
import AssignToClassModal from "@/components/Modals/AssignToClass/AssignToClass";
import TeacherStatusModal from "@/components/Modals/TeacherStatus/TeacherStatus";

import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import { showModal } from "@/redux/ModalState/ModalSlice";
import addIcon from "@/assets/icons/add-icon-2.svg";

const Teachers = () => {
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

  const columnsHeader = [                
    {
      Header: () => (
        <div
          style={{
            width: "1.5rem",
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
            width: "7.5rem",
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
            width: "7.5rem",
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
            minWidth: "12rem",
            color: "#747474",
            fontSize: "1rem"
          }}
        >Subject Taught</div>
      ),
      accessor: "subjectTaught",
      Cell: (row) => {
        let subjectTaught = row.cell.row.values.subjectTaught;
        return <div  style={{width: "10rem", display: "flex", flexWrap: "wrap"}}>
          {subjectTaught && subjectTaught.map((subject, index) => {
            return <p key={index} style={{ color: "#4F4F4F"}}>{subject}, &nbsp;</p>;
          }
          )}        
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
        >Class Taught</div>
      ),
      accessor: "classTaught",
      Cell: (row) => {
        let classTaught = row.cell.row.values.classTaught;
        return <div  style={{width: "15rem", display: "flex", alignItems: "center", flexWrap: "nowrap", gap: "1rem"}}>
          <div style={{display: "flex", flexWrap: "wrap"}}>
            {classTaught && classTaught.map((classTaught, index) => {
              return <p key={index} style={{ color: "#4F4F4F"}}>{classTaught},&nbsp;</p>;
            }
            )} 
          </div>      
          
          <div><img onClick={() => dispatch(showModal({action: "show", type: "assignToClass", modalData:"id"}))} style={{cursor: "pointer"}} src={addIcon} alt="img" /></div>
     
        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "auto",
            color: "#747474",
            fontSize: "1rem",
            textAlign: "center"
          }}
        >Action</div>
      ),
      accessor: "status",
      Cell: (row) => {
        let status = row.cell.row.values.status;
        return <div>
          <Button onClick={() => dispatch(showModal({action: "show", type: status && status.toLowerCase() === "active" ? "deactivateTeacher" : "activateTeacher", modalData:{id: "id", action: status && status.toLowerCase() === "active" ? "Deactivate" : "Activate"}}))} title = {status && status.toLowerCase() === "active" ? "Deactivate" : "Activate"} borderRadiusType="fullyRounded" textColor="#FF6A00" bgColor="#FF7E3F0D" bordercolor="#FF7E3F0D" />
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
        subjectTaught: item?.subjectTaught && item?.subjectTaught,
        classTaught: item?.classTaught && item?.classTaught,
        status: item?.status && item?.status

      });
    });
    return result;
  };
  
  return (
    <div className={cx(styles.teachersHomeContainer)}>

      <div className={cx(styles.heading, "flexRow-space-between")}>
        <h3 className={cx(styles.title)}>Teachers</h3>
        <Button onClick={() => dispatch(showModal({action: "show", type: "addTeacher"}))} type title="Add Teacher" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" />
      </div>

      <div className={cx(styles.body, "flexCol")}> 

        <div className={cx(styles.tableSection)}>
          <h3 className={cx(styles.title)}>All Teachers</h3>
          {<TableComponent columnsHeader={columnsHeader} tableData= {getTableData(allTeachersData)} showHeader={true} />}
        </div>
     
      </div>              

      {modalState === "show" ? <Modal size={modalType==="addTeacher" ? "lg" : "md"} show >{modalType === "addTeacher" ? <AddTeacherModal /> : modalType === "assignToClass" ? <AssignToClassModal /> : modalType === "deactivateTeacher" || modalType === "activateTeacher" ? <TeacherStatusModal /> :  null}</Modal> : null}
            
    </div>
  );
};

export default Teachers;