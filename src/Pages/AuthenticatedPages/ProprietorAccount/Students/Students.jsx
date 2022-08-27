import React, { useEffect, useState } from "react";
import cx from "classnames";
import styles from "./Students.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button/Button";

import TableComponent from "@/components/Table/Table";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
// import {allStudentsData} from "@/helpers/sampleData";

import UrgentInfoModal from "@/components/Modals/UrgentInfo/UrgentInfo";
import AddNewStudentModal from "@/components/Modals/AddNewStudent/AddNewStudent";
import ActivateNewSignUpModal from "@/components/Modals/ActivateNewSignUp/ActivateNewSignUp";
import ModifyStudentModal from "@/components/Modals/ModifyStudent/ModifyStudent";
import DeleteStudentModal from "@/components/Modals/DeleteStudent/DeleteStudent";
import { Icon } from "@iconify/react";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import { showModal } from "@/redux/ModalState/ModalSlice";
import generateColor from "@/helpers/generateColor";
import { initialsCase, titleCase } from "@/helpers/textTransform";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import useGetAllStudents from "@/utils/useGetAllStudents";


const Students = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);
  const loading = useSelector((state) => state.proprietor.loading);

  const allStudentsData = useGetAllStudents();

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
        >Student ID</div>
      ),
      accessor: "studentId",
      Cell: (row) => {
        let studentId = row.cell.row.values.studentId;
        return <div>
          <p style={{ color: "#4F4F4F" }}>{studentId}</p>
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
          <p style={{ color: "#4F4F4F" }}>{studentClass}</p>
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
        return <div style={{ width: "auto", display: "flex", gap: "0.25rem", alignItems: "center" }}>

          {parentImage ? <img style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%" }} src={parentImage} alt="img" /> : <p style={{ backgroundColor: generateColor(), whiteSpace: "nowrap", border: "1px solid #FF7E3F0D", borderRadius: "50%", fontSize: "1.25rem", width: "2.5rem", height: "2.5rem", lineHeight: "2.5rem", textAlign: "center" }}>{parentName && initialsCase(parentName)}</p>}
          <p style={{ color: "#4F4F4F" }}>{parentName}</p>
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
      accessor: "action",
      Cell: (row) => {
        let studentData = row.cell.row.original.allData;
        console.log(studentData);
        return <div>
          <Button onClick={() => navigate(`student-report/${studentData?.id}`, { state: { studentData: studentData } })} title="View Report" borderRadiusType="fullyRounded" textColor="#FF6A00" bgColor="#FF7E3F0D" bordercolor="#FF7E3F0D" hoverBg="#FF6A00" hoverColor="#fff" />
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
      accessor: "moreOptions",
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
              <DropdownItem style={{ color: "#828282" }} onClick={() => dispatch(showModal({ action: "show", type: "modifyStudent", modalData: data }))}><Icon icon="ep:edit" color="#828282" /> Edit Student</DropdownItem>
              <DropdownItem style={{ color: "#fb4e4e" }} onClick={() => dispatch(showModal({ action: "show", type: "deleteStudent", modalData: data }))}> <Icon icon="fluent:delete-20-regular" color="#fb4e4e" /> Delete Student</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>;
      }
    }
  ];

  let getTableData = (data) => {
    let result = [];

    Array.isArray(data) && data.map((item, index) => {
      result.push({
        serialNumber: index + 1,
        firstName: item?.firstName && titleCase(item?.firstName),
        lastName: item?.lastName && titleCase(item?.lastName),
        studentId: item?.sdid && item?.sdid,
        class: item?.student_class?.name && item?.student_class?.name,
        parentName: item?.parentName && item?.parentName,
        parentImage: item?.parentImage && item?.parentImage,
        parent: {
          parentName: item?.guardian?.firstName && `${item?.guardian?.firstName} ${item?.guardian?.lastName}`,
          parentImage: item?.guardian?.avatar && item?.guardian?.avatar
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
        <Button onClick={() => dispatch(showModal({ action: "show", type: "addNewStudent", modalData: { studentData: "", user: "proprietor" } }))} title="Add New Student" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" hoverColor="#000" />
      </div>

      <div className={cx(styles.body, "flexCol")}>

        <div className={cx(styles.tableSection)}>
          <h3 className={cx(styles.title)}>All Students</h3>
          {loading ? <TableSkeleton /> : <TableComponent loading={loading} columnsHeader={columnsHeaderAssessment} tableData={getTableData(allStudentsData)} showHeader={true} />}
        </div>

      </div>

      {modalState === "show" ? <Modal size={modalType === "addNewStudent" ? "lg" : "md"} show >{modalType === "urgentInfo" ? <UrgentInfoModal /> : modalType === "activateSignUp" ? <ActivateNewSignUpModal /> : modalType === "addNewStudent" ? <AddNewStudentModal /> : modalType === "modifyStudent" ? <ModifyStudentModal /> : modalType === "deleteStudent" ? <DeleteStudentModal /> : null}</Modal> : null}

    </div>
  );
};

export default Students;