import React, {useEffect, useState} from "react";
import cx from "classnames";
import styles from "./Home.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Button from "@/components/Button/Button";

import TableComponent from "@/components/Table/Table";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import { titleCase } from "@/helpers/textTransform";
import {newSignUpsData} from "@/helpers/sampleData";

import UrgentInfoModal from "@/components/Modals/UrgentInfo/UrgentInfo";
import ActivateNewSignUpModal from "@/components/Modals/ActivateNewSignUp/ActivateNewSignUp";

import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import { showModal } from "@/redux/ModalState/ModalSlice";
import classIcon from "@/assets/icons/class-icon-active.svg";
import studentIcon from "@/assets/icons/student-icon-active.svg";
import teacherIcon from "@/assets/icons/teacher-icon-active.svg";
import parentIcon from "@/assets/icons/parent-icon-active.svg";


const Home = () => {

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

  const cardData = [
    {
      title: "Students",
      value: "1500",
      icon: studentIcon
    },
    {
      title: "Parents",
      value: "1500",
      icon: parentIcon
    },
    {
      title: "Teachers",
      value: "100",
      icon: teacherIcon
    },
    {
      title: "Classes",
      value: "500",
      icon: classIcon
    }
  ];

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
        >Action</div>
      ),
      accessor: "action",
      Cell: (row) => {
        let action = row.cell.row.values.action;
        return <div>
          <Button onClick={() => dispatch(showModal({action: "show", type: "activateSignUp", modalData:"id"}))} title="Activate" borderRadiusType="fullyRounded" textColor="#FF6A00" bgColor="#FF7E3F0D" bordercolor="#FF7E3F0D" />
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
        action: ""
      });
    });
    return result;
  };
  
  return (
    <div className={cx(styles.dashboardHomeContainer)}>

      <div className={cx(styles.heading, "flexRow-space-between")}>
        <h3 className={cx(styles.title)}>Dashboard</h3>
        <Button onClick={() => dispatch(showModal({action: "show", type: "urgentInfo"}))} type title="Send Urgently" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" />
      </div>

      <div className={cx(styles.body, "flexCol")}> 
        <div className={cx(styles.summaryDiv, "flexRow")}>
          {cardData && cardData.map((data, index) => {
            return (
              <div className={cx(styles.card, "flexRow-space-between")} key={index}>
                <div className={cx(styles.leftSection, "flexCol")}>
                  <p>{data.title}</p>
                  <h3>{data.value}</h3>
                </div>
                <div className={cx(styles.rightSection)}>
                  <div className={cx(styles.cardIconDiv)}>
                    <img src={data.icon} alt="icon" />
                  </div>
                </div>
              </div>
            );
          }
          )}
        </div>

        <div className={cx(styles.tableSection)}>
          <h3 className={cx(styles.title)}>New SignUps</h3>
          {<TableComponent columnsHeader={columnsHeaderAssessment} tableData= {getTableData(newSignUpsData)} showHeader={true} />}
        </div>
     
      </div>              

      {modalState === "show" ? <Modal show >{modalType === "urgentInfo" ? <UrgentInfoModal /> : modalType === "activateSignUp" ? <ActivateNewSignUpModal /> :  null}</Modal> : null}
            
    </div>
  );
};

Home.propTypes = {
    
};

export default Home;