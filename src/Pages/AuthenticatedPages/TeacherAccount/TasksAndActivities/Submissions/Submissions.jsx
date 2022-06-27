import React from "react";
import TableComponent from "@/components/Table/Table";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import { titleCase } from "@/helpers/textTransform";
import {assessmentData} from "@/helpers/sampleData";
import {useDispatch, useSelector} from "react-redux";
import { Icon } from "@iconify/react";
import singleSubmissionIcon from "@/assets/icons/single-submission-icon.svg";
import multiSubmissionIcon from "@/assets/icons/multi-submission-icon.svg";
import Button from "@/components/Button/Button";
import { showModal } from "@/redux/ModalState/ModalSlice";



const Submissions = () => {

  const dispatch = useDispatch();

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
            minWidth: "auto"
          }}
        >Task</div>
      ),
      accessor: "task",
      Cell: (row) => {
        let task = row.cell.row.values.task;
        return <div>
          <p style={{fontWeight: "500", color: "#828282", fontSize: "14px"}}>{titleCase(task)}</p>
              
        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "auto"
          }}
        >Assigned To</div>
      ),
      accessor: "assignedTo",
      Cell: (row) => {
        let assignedTo = row.cell.row.values.assignedTo;
        return <div>
          <img style={{borderRadius: "50%", width: "3rem"}} src={assignedTo?.imageUrl} alt="img" /><span>{assignedTo?.name}</span>
        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "15rem"
          }}
        >Submission</div>
      ),
      accessor: "submission",
      Cell: (row) => {
        let submission = row.cell.row.values.submission;
        return <div>
          <img style={{borderRadius: "50%", width: "3rem"}} src={multiSubmissionIcon} alt="img" /><span>{submission?.subject}</span>
        </div>;
      }
    },
 
    {
      Header: () => (
        <div
          style={{
            minWidth: "5rem"
          }}
        >Date Submitted</div>
      ),
      accessor: "date",
      Cell: (row) => {
        let date = row.cell.row.values.date;
        return <div>
          <p style={{fontWeight: "500", color: "#BDBDBD", fontSize: "12px"}}>{date}</p>
              
        </div>;
      }
    },

    {
      Header: () => (
        <div
          style={{
            minWidth: "5rem"
          }}
        >Action</div>
      ),
      accessor: "action",
      Cell: (row) => {
        let rowData = row.cell.row.values;
        return <div>
          <Button onClick={()=>dispatch(showModal({action: "show", type:"viewSubmission", modalData: rowData}))} title="View" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
                
        </div>;
      }
    }
  ];
    
  let getTableData = (data) => {
    let result =[];
    
    data  && data.map((item, index) =>{
      result.push({
        serialNumber: index+1,
        category: item?.status && item?.status,
        imageUrl: item?.imageUrl && item?.imageUrl,
        assignedTo: item?.teacherDetails && {name: item?.teacherDetails?.name, subject: item?.teacherDetails?.subject, imageUrl: item?.imageUrl},
        submission: item?.teacherDetails && {name: item?.teacherDetails?.name, subject: item?.teacherDetails?.subject, imageUrl: item?.imageUrl},
        date: item?.date && shortenDate(item?.date),
        task: item?.description && titleCase(item?.description),
        action: ""
      });
    });
    return result;
  };

  return (
    <div>
      {<TableComponent columnsHeader={columnsHeader} tableData= {getTableData(assessmentData)} />}
    </div>
  );
};

export default Submissions;