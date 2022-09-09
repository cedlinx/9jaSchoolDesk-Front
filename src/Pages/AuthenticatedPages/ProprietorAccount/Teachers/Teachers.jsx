import React, { useEffect, useState } from "react";
import cx from "classnames";
import styles from "./Teachers.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button/Button";

import TableComponent from "@/components/Table/Table";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import { titleCase } from "@/helpers/textTransform";
import { Icon } from "@iconify/react";
import AddTeacherModal from "@/components/Modals/AddTeacher/AddTeacher";
import AssignTeacherToClassModal from "@/components/Modals/AssignTeacherToClass/AssignTeacherToClass";
import AssignSubjectsToTeacherModal from "@/components/Modals/AssignSubjectsToTeacher/AssignSubjectsToTeacher";
import TeacherStatusModal from "@/components/Modals/TeacherStatus/TeacherStatus";
import DeleteTeacherModal from "@/components/Modals/DeleteTeacher/DeleteTeacher";
import ModifyTeacherModal from "@/components/Modals/ModifyTeacher/ModifyTeacher";
import ViewTeacherDetailsModal from "@/components/Modals/ViewTeacherDetails/ViewTeacherDetails";

import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import { showModal } from "@/redux/ModalState/ModalSlice";
import expandIcon from "@/assets/icons/expand-icon.svg";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import useGetAllTeachers from "@/utils/useGetAllTeachers";
import formatArrayList from "@/helpers/formatArrayList";


const Teachers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);
  const loading = useSelector((state) => state.proprietor.loading);

  const allTeachersData = useGetAllTeachers();

  const columnsHeader = [
    {
      Header: () => (
        <div
          style={{
            width: "2rem",
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
            width: "10rem",
            color: "#747474",
            fontSize: "1rem"
          }}
        >Name </div>
      ),
      accessor: "name",
      Cell: (row) => {
        let name = row.cell.row.values.name;
        return <div style={{ color: "#4F4F4F" }}>
          {name && titleCase(name)}
        </div>;
      }
    },
    // {
    //   Header: () => (
    //     <div
    //       style={{
    //         width: "7.5rem",
    //         color: "#747474",
    //         fontSize: "1rem"
    //       }}
    //     >First Name </div>
    //   ),
    //   accessor: "firstName",
    //   Cell: (row) => {
    //     let firstName = row.cell.row.values.firstName;
    //     return <div style={{ color: "#4F4F4F"}}>
    //       {firstName}
    //     </div>;
    //   }
    // },
    // {
    //   Header: () => (
    //     <div
    //       style={{
    //         width: "7.5rem",
    //         color: "#747474",
    //         fontSize: "1rem"
    //       }}
    //     >Last Name </div>
    //   ),
    //   accessor: "lastName",
    //   Cell: (row) => {
    //     let lastName = row.cell.row.values.lastName;
    //     return <div style={{ color: "#4F4F4F"}} >
    //       {lastName}

    //     </div>;
    //   }
    // },
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
        >Phone</div>
      ),
      accessor: "phone",
      Cell: (row) => {
        let phone = row.cell.row.values.phone;
        return <div  >
          <p style={{ color: "#4F4F4F" }}>{phone}</p>
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
        >Subject(s) Taught</div>
      ),
      accessor: "subjectTaught",
      Cell: (row) => {
        let subjectTaught = row.cell.row.values.subjectTaught;
        let data = row.cell.row.original.allData;
        
        return <div style={{ width: "auto" }}>
          <p style={{ color: "#4F4F4F", display: "flex", justifyContent: "space-between"}}>
            <span style={{ width: "15rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{subjectTaught}</span>
            <span>
              {subjectTaught.includes(",") && <img style={{cursor: "pointer" }} onClick={() => dispatch(showModal({ action: "show", type: "viewTeacherDetails", modalData: data }))} src={expandIcon} alt="icon" /> }
            </span>
          </p>
        </div>;
      }
    },
    // {
    //   Header: () => (
    //     <div
    //       style={{
    //         width: "7.5rem",
    //         color: "#747474",
    //         fontSize: "1rem"
    //       }}
    //     >Class Assigned</div>
    //   ),
    //   accessor: "classAssigned",
    //   Cell: (row) => {
    //     let classAssigned = row.cell.row.values.classAssigned;
    //     let allData = row.cell.row.original.allData;
    //     return <div style={{ width: "", display: "flex", alignItems: "center", flexWrap: "nowrap", gap: "1rem" }}>
    //       <div style={{ display: "flex", flexWrap: "wrap" }}>
    //         {/* {classTaught && classTaught.map((classTaught, index) => {
    //           return <p key={index} style={{ color: "#4F4F4F"}}>{classTaught},&nbsp;</p>;
    //         }
    //         )}  */}
    //         <p style={{ color: "#4F4F4F" }}>{classAssigned}&nbsp;</p>
    //       </div>

    //       <div><img onClick={() => dispatch(showModal({ action: "show", type: "assignTeacherToClass", modalData: allData }))} style={{ cursor: "pointer" }} src={addIcon} alt="img" /></div>

    //     </div>;
    //   }
    // },
    // {
    //   Header: () => (
    //     <div
    //       style={{
    //         minWidth: "auto",
    //         color: "#747474",
    //         fontSize: "1rem",
    //         textAlign: "center"
    //       }}
    //     >Action</div>
    //   ),
    //   accessor: "status",
    //   Cell: (row) => {
    //     let status = row.cell.row.values.status;
    //     return <div>
    //       <Button onClick={() => dispatch(showModal({action: "show", type: status && status.toLowerCase() === "active" ? "deactivateTeacher" : "activateTeacher", modalData:{id: "id", action: status && status.toLowerCase() === "active" ? "Deactivate" : "Activate"}}))} title = {status && status.toLowerCase() === "active" ? "Deactivate" : "Activate"} borderRadiusType="fullyRounded" textColor="#FF6A00" bgColor="#FF7E3F0D" bordercolor="#FF7E3F0D" />
    //     </div>;
    //   }
    // },
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
              <DropdownItem style={{ color: "#828282" }} onClick={() => dispatch(showModal({ action: "show", type: "viewTeacherDetails", modalData: data }))}><Icon icon="carbon:view" color="#828282" /> View Details</DropdownItem>
              <DropdownItem style={{ color: "#828282" }} onClick={() => dispatch(showModal({ action: "show", type: "assignSubjectsToTeacher", modalData: data }))}><Icon icon="ep:edit" color="#828282" /> Assign Subject(s)</DropdownItem>
              <DropdownItem style={{ color: "#828282" }} onClick={() => dispatch(showModal({ action: "show", type: "assignTeacherToClass", modalData: {data, category: "teacher"} }))}><Icon icon="ep:edit" color="#828282" /> Assign As Class Teacher</DropdownItem>
              {/* <DropdownItem style={{ color: "#828282" }} onClick={() => dispatch(showModal({ action: "show", type: "modifyTeacher", modalData: data }))}><Icon icon="ep:edit" color="#828282" /> Edit Account</DropdownItem> */}
              <DropdownItem style={{ color: "#fb4e4e" }} onClick={() => dispatch(showModal({ action: "show", type: "deleteTeacher", modalData: data }))}> <Icon icon="fluent:delete-20-regular" color="#fb4e4e" /> Delete Account</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>;
      }
    }
  ];

  const getSubjectList = (data) => {
    let subjectList = [];
    data?.forEach((subject) => {
      subjectList.push(subject.subject);
    });
    return formatArrayList(subjectList);
  };

  let getTableData = (data) => {
    let result = [];
    Array.isArray(data) && data.map((item, index) => {
      result.push({
        serialNumber: index + 1,
        name: `${item?.firstName && titleCase(item?.firstName)} ${item?.lastName && titleCase(item?.lastName)}`,
        lastName: item?.lastName && titleCase(item?.lastName),
        email: item?.email && item?.email,
        action: "",
        subjectTaught: item?.subjects && getSubjectList(item?.subjects),
        classAssigned: item?.class?.name && item?.class?.name,
        status: item?.status && item?.status,
        phone: item?.phone && item?.phone,
        allData: item

      });
    });
    return result;
  };

  return (
    <div className={cx(styles.teachersHomeContainer)}>

      <div className={cx(styles.heading, "flexRow-space-between")}>
        <h3 className={cx(styles.title)}>Teachers</h3>
        <Button onClick={() => dispatch(showModal({ action: "show", type: "addTeacher" }))} type title="Add Teacher" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" />
      </div>

      <div className={cx(styles.body, "flexCol")}>

        <div className={cx(styles.tableSection)}>
          {/* <h3 className={cx(styles.title)}>All Teachers</h3> */}
          {loading ? <TableSkeleton /> : <TableComponent loading={loading} columnsHeader={columnsHeader} tableData={getTableData(allTeachersData)} showHeader={true} showPagination={true} />}
        </div>

      </div>

      {modalState === "show" ? <Modal size={modalType === "addTeacher" ? "lg" : "md"} show >{modalType === "addTeacher" ? <AddTeacherModal /> : modalType === "modifyTeacher" ? <ModifyTeacherModal /> : modalType === "viewTeacherDetails" ? <ViewTeacherDetailsModal /> : modalType === "assignSubjectsToTeacher" ? <AssignSubjectsToTeacherModal /> : modalType === "deleteTeacher" ? <DeleteTeacherModal /> : modalType === "assignTeacherToClass" ? <AssignTeacherToClassModal /> : modalType === "deactivateTeacher" || modalType === "activateTeacher" ? <TeacherStatusModal /> : null}</Modal> : null}

    </div>
  );
};

export default Teachers;