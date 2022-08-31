import React, { useState } from "react";
import cx from "classnames";
import styles from "./AllClasses.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button/Button";

import TableComponent from "@/components/Table/Table";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import { titleCase } from "@/helpers/textTransform";
import { Icon } from "@iconify/react";
import AddClassModal from "@/components/Modals/AddClass/AddClass";
import EditClassModal from "@/components/Modals/EditClass/EditClass";
import DeleteClassModal from "@/components/Modals/DeleteClass/DeleteClass";
import ViewClassDetailsModal from "@/components/Modals/ViewClassDetails/ViewClassDetails";
import AssignTeacherToClassModal from "@/components/Modals/AssignTeacherToClass/AssignTeacherToClass";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import { showModal } from "@/redux/ModalState/ModalSlice";
import useGetAllClasses from "@/utils/useGetAllClasses";



const AllClasses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);
  const loading = useSelector((state) => state.proprietor.loading);

  const allClassesData = useGetAllClasses();

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
        return <span style={{ color: "#4F4F4F" }}>{serialNumber}</span>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            width: "5rem",
            color: "#747474",
            fontSize: "1rem"
          }}
        >Class</div>
      ),
      accessor: "class",
      Cell: (row) => {
        let schoolClass = row.cell.row.values.class;
        return <div style={{ color: "#4F4F4F" }} >
          {schoolClass}

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
        >Class Code</div>
      ),
      accessor: "code",
      Cell: (row) => {
        let code = row.cell.row.values.code;
        return <div style={{ color: "#4F4F4F" }} >
          {code}

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
        >Teacher Name</div>
      ),
      accessor: "teacher_name",
      Cell: (row) => {
        let teacher_name = row.cell.row.values.teacher_name;
        return <div style={{ color: "#4F4F4F" }}>
          {teacher_name}
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
            marginLeft: "1rem"
            // textAlign: "center"
          }}
        >Action</div>
      ),
      accessor: "action",
      Cell: (row) => {
        let data = row.cell.row.original.allData;
        return <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button onClick={() => dispatch(showModal({ action: "show", type: "editClass", modalData: data }))} title="Edit" borderRadiusType="fullyRounded" textColor="#FF6A00" bgColor="#FF7E3F0D" bordercolor="#FF7E3F" />

          {/* <Button onClick={() => dispatch(showModal({ action: "show", type: "viewClassDetails", modalData: data }))} title="View" borderRadiusType="fullyRounded" textColor="#FF6A00" bgColor="#FF7E3F0D" bordercolor="#FF7E3F" /> */}

        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            width: "auto",
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

        // return <div>
        //   <Icon onClick={() => dispatch(showModal({ action: "show", type: "deleteClass", modalData: data }))} style={{ cursor: "pointer" }} icon="ant-design:delete-filled" color="#d25b5d" />
        // </div>;

        return <div>
          <Dropdown className={cx(styles.dropdown)} isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle style={{ backgroundColor: "transparent" }} name="" className={cx(styles.dropdownToggler)}>
              <Icon style={{ cursor: "pointer" }} icon="bx:dots-vertical-rounded" color="black" />
            </DropdownToggle>
            <DropdownMenu className={cx(styles.dropdownMenuWrapper)}>
              <DropdownItem onClick={() => dispatch(showModal({ action: "show", type: "assignTeacherToClass", modalData: {data, category: "class"} }))}>Assign Class Teacher</DropdownItem>
              <DropdownItem onClick={() => dispatch(showModal({ action: "show", type: "viewClassDetails", modalData: data }))}>View Details</DropdownItem>
              <DropdownItem onClick={() => dispatch(showModal({ action: "show", type: "deleteClass", modalData: data }))}>Delete Class</DropdownItem>
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
        teacher_name: item?.teacher?.name && titleCase(item?.teacher?.name),
        action: "",
        class: item?.name && item?.name,
        code: item?.code && item?.code,
        allData: item
      });
    });
    return result;
  };

  return (
    <div className={cx(styles.allClassesHomeContainer)}>

      <div className={cx(styles.heading, "flexRow-space-between")}>
        <h3 className={cx(styles.title)}>Classes</h3>
        <Button onClick={() => dispatch(showModal({ action: "show", type: "addClass" }))} type title="Add Class" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" />
      </div>

      <div className={cx(styles.body, "flexCol")}>

        <div className={cx(styles.tableSection)}>
          <h3 className={cx(styles.title)}>All Classes</h3>
          {loading ? <TableSkeleton /> : <TableComponent loading={loading} columnsHeader={columnsHeader} tableData={getTableData(allClassesData)} />}
        </div>

      </div>

      {modalState === "show" ? <Modal show >{modalType === "addClass" ? <AddClassModal /> : modalType === "editClass" ? <EditClassModal /> : modalType === "deleteClass" ? <DeleteClassModal /> : modalType === "viewClassDetails" ? <ViewClassDetailsModal /> : modalType === "assignTeacherToClass" ? <AssignTeacherToClassModal /> : null}</Modal> : null}

    </div>
  );
};

export default AllClasses;