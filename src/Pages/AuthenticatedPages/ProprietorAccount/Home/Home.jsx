import React, { useEffect, useState } from "react";
import cx from "classnames";
import styles from "./Home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button/Button";
import { Icon } from "@iconify/react";
import TableComponent from "@/components/Table/Table";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import { titleCase } from "@/helpers/textTransform";
// import {newSignUpsData} from "@/helpers/sampleData";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import UrgentInfoModal from "@/components/Modals/UrgentInfo/UrgentInfo";
import ActivateNewSignUpModal from "@/components/Modals/ActivateNewSignUp/ActivateNewSignUp";
import ActivateGuardianModal from "@/components/Modals/ActivateGuardian/ActivateGuardian";
import DeactivateGuardianModal from "@/components/Modals/DeactivateGuardian/DeactivateGuardian";
import RejectGuardianModal from "@/components/Modals/RejectGuardian/RejectGuardian";
import GuardianDetailsModal from "@/components/Modals/GuardianDetails/GuardianDetails";
import NoInstitutionModal from "@/components/Modals/NoInstitution/NoInstitution";
import AddInstitutionModal from "@/components/Modals/AddInstitution/AddInstitution";


import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import { showModal } from "@/redux/ModalState/ModalSlice";
import classIcon from "@/assets/icons/class-icon-active.svg";
import studentIcon from "@/assets/icons/student-icon-active.svg";
import teacherIcon from "@/assets/icons/teacher-icon-active.svg";
import parentIcon from "@/assets/icons/parent-icon-active.svg";
import { getDashboard, getNewGuardianSignups, getProfile } from "@/redux/Proprietor/ProprietorSlice";


const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);
  const dashboardData = useSelector((state) => state.proprietor.getDashboardData);
  const newSignUpsData = useSelector((state) => state?.proprietor?.getNewGuardianSignupsData?.new_signups);
  const loading = useSelector((state) => state.proprietor.loading);
  const newSignUpLoading = useSelector((state) => state?.proprietor?.getNewGuardianSignupsData?.success);

  console.log(dashboardData);
  console.log(newSignUpsData);

  useEffect(() => {
    dispatch(getDashboard());
    dispatch(getNewGuardianSignups());
    // dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    dashboardData?.proprietor?.institutions.length === 0 && dispatch(showModal({action: "show", type: "noInstitution"}));
  }, [dashboardData?.proprietor?.institutions.length, dispatch]);

  const cardData = [
    {
      title: "Students",
      value: dashboardData?.total_students,
      icon: studentIcon,
      bgColor: "#f2f4f4"
    },
    {
      title: "Parents",
      value: dashboardData?.total_parents,
      icon: parentIcon,
      bgColor: "#f2f4f4"
    },
    {
      title: "Teachers",
      value: dashboardData?.total_teachers,
      icon: teacherIcon,
      bgColor: "#f2f4f4"
    },
    {
      title: "Classes",
      value: dashboardData?.total_classes,
      icon: classIcon,
      bgColor: "#f2f4f4"
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
        return <span style={{ color: "#4F4F4F" }}>{serialNumber}</span>;
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
        return <div style={{ color: "#4F4F4F" }}>
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
        return <div style={{ color: "#4F4F4F" }} >
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
        return <div style={{ width: "15rem" }}>
          <p style={{ color: "#4F4F4F" }}>{email}</p>
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
        >Status</div>
      ),
      accessor: "status",
      Cell: (row) => {
        let status = row.cell.row.values.status;
        return <div>
          <p style={{ color: status === "Active" ? "green" : status === "Suspended" ? "orange" : "tomato" }}>{status}</p>
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
        />
      ),
      accessor: "action",
      Cell: (row) => {
        const [dropdownOpen, setDropdownOpen] = useState(false);

        const toggle = () => {
          setDropdownOpen(prevState => !prevState);
        };

        let data = row.cell.row.original.allData;

        return <div>
          <Dropdown className={cx(styles.dropdown)} isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle style={{ backgroundColor: "transparent" }} name="" className={cx(styles.dropdownToggler)}>
              <Icon style={{ cursor: "pointer" }} icon="bx:dots-vertical-rounded" color="black" />
            </DropdownToggle>
            <DropdownMenu className={cx(styles.dropdownMenuWrapper)}>
              <DropdownItem onClick={() => dispatch(showModal({ action: "show", type: "activateGuardian", modalData: data }))}>Activate Guardian</DropdownItem>
              <DropdownItem onClick={() => dispatch(showModal({ action: "show", type: "deactivateGuardian", modalData: data }))}>Deactivate Guardian</DropdownItem>
              <DropdownItem onClick={() => dispatch(showModal({ action: "show", type: "rejectGuardian", modalData: data }))}>Reject Application</DropdownItem>
              <DropdownItem onClick={() => dispatch(showModal({ action: "show", type: "guardianDetails", modalData: data }))}>View Details</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>;
      }
    }
  ];

  let getTableData = (data) => {
    let result = [];

    data && data.map((item, index) => {
      result.push({
        serialNumber: index + 1,
        firstName: item?.firstName && titleCase(item?.firstName),
        lastName: item?.lastName && titleCase(item?.lastName),
        email: item?.email && item?.email,
        allData: item,
        status: item?.pivot?.status && titleCase(item?.pivot?.status),
        action: ""
      });
    });
    return result;
  };

  return (
    <div className={cx(styles.dashboardHomeContainer)}>

      <div className={cx(styles.heading, "flexRow-space-between")}>
        <h3 className={cx(styles.title)}>Dashboard</h3>
        <Button onClick={() => dispatch(showModal({ action: "show", type: "urgentInfo" }))} type title="Send Urgently" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" />
      </div>

      <div className={cx(styles.body, "flexCol")}>
        <div className={cx(styles.summaryDiv, "flexRow")}>
          {cardData && cardData.map((data, index) => {
            return (
              <div style={{ backgroundColor: data.bgColor }} className={cx(styles.card, "flexRow-space-between")} key={index}>
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
          { !newSignUpLoading ? <TableSkeleton /> :  
            <TableComponent loading={loading} columnsHeader={columnsHeaderAssessment} tableData={getTableData(newSignUpsData)} showHeader={true} />}
        </div>

      </div>

      {modalState === "show" ? <Modal show >{modalType === "urgentInfo" ? <UrgentInfoModal /> : modalType === "activateSignUp" ? <ActivateNewSignUpModal /> : modalType === "activateGuardian" ? <ActivateGuardianModal /> : modalType === "deactivateGuardian" ? <DeactivateGuardianModal /> : modalType === "guardianDetails" ? <GuardianDetailsModal /> : modalType === "rejectGuardian" ? <RejectGuardianModal /> : modalType === "noInstitution" ? <NoInstitutionModal /> : modalType === "addInstitution" ? <AddInstitutionModal /> : null}</Modal> : null}

    </div>
  );
};

export default Home;