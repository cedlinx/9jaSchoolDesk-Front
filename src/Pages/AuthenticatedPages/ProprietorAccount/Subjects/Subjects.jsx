import React from "react";
import cx from "classnames";
import styles from "./Subjects.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button/Button";

import TableComponent from "@/components/Table/Table";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import { titleCase } from "@/helpers/textTransform";
import { Icon } from "@iconify/react";
import AddSubjectModal from "@/components/Modals/AddSubject/AddSubject";
import EditSubjectModal from "@/components/Modals/EditSubject/EditSubject";

import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import { showModal } from "@/redux/ModalState/ModalSlice";
import useGetAllSubjects from "@/utils/useGetAllSubjects";


const Subjects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);
  const loading = useSelector((state) => state.proprietor.loading);

  const allSubjectsData = useGetAllSubjects();

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
        >Subjects</div>
      ),
      accessor: "name",
      Cell: (row) => {
        let subject = row.cell.row.values.name;
        return <div style={{ color: "#4F4F4F" }} >
          {subject}

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
            // textAlign: "center"
          }}
        >Action</div>
      ),
      accessor: "action",
      Cell: (row) => {
        let data = row.cell.row.original.allData;

        return <div>
          <Icon onClick={() => dispatch(showModal({ action: "show", type: "editSubject", modalData: data }))} style={{ cursor: "pointer" }} icon="bi:pencil-square" color="rgba(5, 18, 27, 0.7490196078431373)" />
        </div>;
      }
    }

  ];

  let getTableData = (data) => {
    let result = [];

    Array.isArray(data) && data.map((item, index) => {
      result.push({
        serialNumber: index + 1,
        action: "",
        name: item?.subject && item?.subject,
        allData: item
      });
    });
    return result;
  };

  return (
    <div className={cx(styles.allSubjectsContainer)}>
      <div className={cx(styles.heading, "flexRow-space-between")}>
        <h3 className={cx(styles.title)}>Subjects</h3>
        <Button onClick={() => dispatch(showModal({ action: "show", type: "addSubject" }))} type title="Add Subject" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" />
      </div>

      <div className={cx(styles.body, "flexCol")}>

        <div className={cx(styles.tableSection)}>
          <h3 className={cx(styles.title)}>All Subjects</h3>
          {loading ? <TableSkeleton /> : <TableComponent loading={loading} columnsHeader={columnsHeader} tableData={getTableData(allSubjectsData)} />}
        </div>

      </div>

      {modalState === "show" ? <Modal show >{modalType === "addSubject" ? <AddSubjectModal /> : modalType === "editSubject" ? <EditSubjectModal /> : null}</Modal> : null}

    </div>
  );
};

export default Subjects;