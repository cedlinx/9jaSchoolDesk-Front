import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import cx from "classnames";
import styles from "./Submissions.module.scss";
import TableComponent from "@/components/Table/Table";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import { titleCase } from "@/helpers/textTransform";
import {assessmentData} from "@/helpers/sampleData";
import { Icon } from "@iconify/react";
import Button from "@/components/Button/Button";
import { showModal } from "@/redux/ModalState/ModalSlice";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import SubmissionDetailsModal from "@/components/Modals/SubmissionDetails/SubmissionDetails";



const Submissions = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);
  const loading = useSelector((state) => state.guardian.loading);

  let formatDate=(value)=>{
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
            minWidth: "1rem"
          }}
        />
      ),
      accessor: "serialNumber",
      Cell: (row) => {
        let serialNumber = row.cell.row.values.serialNumber;
        return <span>{serialNumber}</span>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "auto"
          }}
        >Title</div>
      ),
      accessor: "title",
      Cell: (row) => {
        let title = row.cell.row.values.title;
        return <div style={{width: "10rem"}}>
          <span>{title}</span>
        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "auto"
          }}
        >Subject</div>
      ),
      accessor: "subject",
      Cell: (row) => {
        let subject = row.cell.row.values.subject;
        return <div  style={{width: "7.5rem"}}>
          <span>{subject}</span>
          
        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "15rem"
          }}
        >Feedback</div>
      ),
      accessor: "feedback",
      Cell: (row) => {
        let feedback = row.cell.row.values.feedback;
        return <div>
          <p style={{fontWeight: "500", color: "#828282", fontSize: "14px"}}>{feedback}</p>
        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "5rem"
          }}
        >Score</div>
      ),
      accessor: "score",
      Cell: (row) => {
        let score = row.cell.row.values.score;
        return <div  style={{width: "10rem"}}>
          <span>{score}</span>
          
        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "5rem"
          }}
        >Date </div>
      ),
      accessor: "date",
      Cell: (row) => {
        let date = row.cell.row.values.date;
        return <div>
          <p style={{fontWeight: "500", color: "#000", fontSize: "1rem"}}>{date}</p>
          
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
        />
      ),
      accessor: "allData",
      Cell: (row) => {
        let allData = row.cell.row.original.allData;
        return <div  style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Button onClick={() => dispatch(showModal({action: "show", type: "submissionDetails", modalData: allData }))} title="View Details" borderRadiusType="fullyRounded" textColor="#FF6A00" bgColor="#FF7E3F0D" bordercolor="#FF6A00" hoverColor="#fff" hoverBg="#ff6a00" />
        </div>;
      }
    }
  ];

  let getTableData = (data) => {
    let result =[];

    data  && data.map((item, index) =>{
      result.push({
        serialNumber: index+1,
        title: item?.title && item?.title,
        feedback: item?.feedback && item?.feedback,
        score: item?.score && item?.score,
        subject: item?.subject && item?.subject,
        status: item?.status && item?.status,
        type: item?.type && item?.type,
        date: item?.date && formatDate(item?.date),

        allData: item
      });
    });
    return result;
  };

  return (
    <div className={cx(styles.submissionsContainer, "flexCol")}>
      <div className={cx(styles.header)}>
        <h5>All Submissions</h5>
      </div>
      {/* <div className={cx(styles.filterSection, "flexRow")}>
        <input type="date" name="" id="" />
        <button>Filter</button>
      </div> */}
      {loading ? <TableSkeleton /> : <TableComponent columnsHeader={columnsHeader} tableData= {getTableData(assessmentData)} />}

      {modalType === "submissionDetails" && <Modal show size="lg" >{ <SubmissionDetailsModal />}</Modal> }
    </div>
  );
};

export default Submissions;