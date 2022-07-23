import React from "react";
import cx from "classnames";
import styles from "./AllClasses.module.scss";

import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Button from "@/components/Button/Button";

import TableComponent from "@/components/Table/Table";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import { titleCase } from "@/helpers/textTransform";
import {allClassesData} from "@/helpers/sampleData";
import { Icon } from "@iconify/react";
import AddClassModal from "@/components/Modals/AddClass/AddClass";
import EditClassModal from "@/components/Modals/EditClass/EditClass";

import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import { showModal } from "@/redux/ModalState/ModalSlice";

const AllClasses = () => {
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
        >Class</div>
      ),
      accessor: "class",
      Cell: (row) => {
        let schoolClass = row.cell.row.values.class;
        return <div style={{ color: "#4F4F4F"}} >
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
        >Teacher Name</div>
      ),
      accessor: "teacherName",
      Cell: (row) => {
        let teacherName = row.cell.row.values.teacherName;
        return <div style={{ color: "#4F4F4F"}}>
          {teacherName}
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
        >No. of Students</div>
      ),
      accessor: "numberOfStudents",
      Cell: (row) => {
        let numberOfStudents = row.cell.row.values.numberOfStudents;
        return <div >
          <p style={{ color: "#4F4F4F"}}>{numberOfStudents}</p>         
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
        >Action</div>
      ),
      accessor: "action",
      Cell: (row) => {
        return <div>
          <Button onClick={() => dispatch(showModal({action: "show", type: "editClass", modalData:{id: "id"}}))} title =  "Edit" borderRadiusType="fullyRounded" textColor="#FF6A00" bgColor="#FF7E3F0D" bordercolor="#FF7E3F0D" />
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
      accessor: "delete",
      Cell: (row) => {
        return <div>
          <Icon style={{cursor: "pointer"}} icon="ant-design:delete-filled" color="#d25b5d" />
        </div>;
      }
    }
  ];

  let getTableData = (data) => {
    let result =[];

    data  && data.map((item, index) =>{
      result.push({
        serialNumber: index+1,
        teacherName: item?.teacherName && titleCase(item?.teacherName),
        action: "",
        class: item?.class && item?.class,
        numberOfStudents: item?.numberOfStudents && item?.numberOfStudents
      });
    });
    return result;
  };
  
  return (
    <div className={cx(styles.allClassesHomeContainer)}>

      <div className={cx(styles.heading, "flexRow-space-between")}>
        <h3 className={cx(styles.title)}>Classes</h3>
        <Button onClick={() => dispatch(showModal({action: "show", type: "addClass"}))} type title="Add Class" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" />
      </div>

      <div className={cx(styles.body, "flexCol")}> 

        <div className={cx(styles.tableSection)}>
          <h3 className={cx(styles.title)}>All Classes</h3>
          {<TableComponent columnsHeader={columnsHeader} tableData= {getTableData(allClassesData)} />}
        </div>
     
      </div>              

      {modalState === "show" ? <Modal show >{modalType === "addClass" ? <AddClassModal /> : modalType === "editClass" ? <EditClassModal /> :  null}</Modal> : null}
            
    </div>
  );
};

export default AllClasses;