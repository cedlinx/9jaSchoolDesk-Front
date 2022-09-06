import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import cx from "classnames";
import styles from "./AssessmentFeedback.module.scss";
import TableComponent from "@/components/Table/Table";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import { initialsCase, titleCase } from "@/helpers/textTransform";
import { Icon } from "@iconify/react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import formatDate from "@/helpers/formatDate";
import DateRangeComp from "@/components/Dates/Range/Range";

import useGetStudentDashboard from "@/utils/useGetStudentDashboard";

import expandIcon from "@/assets/icons/expand-icon.svg";
import { showModal } from "@/redux/ModalState/ModalSlice";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import TaskDetailsModal from "@/components/Modals/TaskDetails/TaskDetails";


const AssessmentFeedback = () => {
  const dispatch = useDispatch();
  const studentData = useGetStudentDashboard();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);
  const loading = useSelector((state) => state.student.loading);


  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSearch, setShowSearch] = useState({
    subjectSearch: false,
    teacherSearch: false
  });
  const [dateRange, setDateRange] = useState(null);


  const handleRadioChange = (e) => {
    let value = e.target.value;
    
    if(value === "subject") {
      setShowSearch((prev) => ({...prev, subjectSearch: true, teacherSearch: false}));
    } else if(value === "teacher") {
      setShowSearch((prev) => ({...prev, subjectSearch: false, teacherSearch: true}));
    }
  };

  const toggle = () => {
    setDropdownOpen(prevState => !prevState);
    setShowSearch((prev) => ({...prev, subjectSearch: false, teacherSearch: false}));

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
      accessor: "status",
      Cell: (row) => {
        let status = row.cell.row.values.status;
        return <span>{status === "1" ? <Icon icon="akar-icons:circle-fill" color="#2ac769" width="12" height="12" /> : <Icon icon="akar-icons:circle-fill" color="#bdbdbd" width="12" height="12" />}</span>;
      }
    },
    {
      Header: () => (
        <div />
      ),
      accessor: "teacherDetails",
      Cell: (row) => {
        let teacherDetails = row.cell.row.values.teacherDetails;
        let subject = row.cell.row.original.allData.subject.subject;
        return <div  style={{width: "auto", display: "flex", gap: "0.5rem"}}>
          <div>
            {teacherDetails?.avatar ? 
              <img style={{borderRadius: "50%", width: "3rem"}} src={teacherDetails?.avatar} alt="img" />
              :
              <span style={{ display: "inline-block", backgroundColor: "#D25B5D", color: "#fff", borderRadius: "50%", width: "3rem", height: "3rem", lineHeight: "3rem", fontSize: "1.25rem", textAlign: "center"}}>{initialsCase(`${teacherDetails?.firstName ? teacherDetails.firstName : ""} ${teacherDetails?.lastName ? teacherDetails?.lastName : ""}`)}</span>
            }
          </div>
          <div>
            <p style={{fontWeight: "500", color: "#4f4f4f"}}>{teacherDetails?.firstName && titleCase(`${teacherDetails?.firstName} ${teacherDetails?.lastName}`)}</p>
            <p style={{fontWeight: "500", color: "#828282", fontSize: "14px"}}>{subject}</p>

          </div>
        </div>;
      }
    },
    {
      Header: () => (
        <div />
      ),
      accessor: "feedback",
      Cell: (row) => {
        let feedback = row.cell.row.values.feedback;
        let allData = row.cell.row.original.allData;

        return <div  style={{width: "auto"}}>
          <p className={cx("flexRow-space-between")} ><span style={{fontWeight: "500", color: "#000", fontSize: "1.125rem",   whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "auto", marginRight: "0.5rem"}}>{feedback}</span><span><img onClick={() => dispatch(showModal({action: "show", type: "taskDetails", modalData: allData}))} style={{cursor: "pointer"}} src={expandIcon} alt="" /></span></p>          
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
    }
  ];

  let getTableData = (data) => {
    let result =[];

    data  && data.map((item, index) =>{
      result.push({
        serialNumber: index+1,
        status: item?.status && item?.status,
        teacherDetails: item?.teacher && item?.teacher,
        date: item?.created_at && formatDate(item?.created_at),
        feedback: item?.pivot?.feedback && item?.pivot?.feedback,
        allData: item
      });
    });
    return result;
  };

  const dateValue = (date) => {
    setDateRange(date);
  };

  return (
    <div className={cx(styles.assessmentFeedbackContainer, "flexCol")}>
      <div className={cx(styles.header)}>
        <h5>Assessment Feedback</h5>
      </div>
      {loading ? <TableSkeleton /> : Array.isArray(studentData?.graded_tasks) && studentData?.graded_tasks.length > 0 ?
        <>
          <div className={cx(styles.filterSection, "flexRow")}>

            

            <DateRangeComp dateValue={dateValue} />

       
            <Dropdown className={cx(styles.dropdown)} isOpen={dropdownOpen} toggle={toggle} >
              <DropdownToggle  name="profile-toggler" className={cx(styles.dropdownToggler)}>
                <Icon icon="ant-design:plus-outlined" color="black" />Add Filter
              </DropdownToggle>
          
              <DropdownMenu className={cx(styles.dropdownMenuWrapper)}>

                <div className={cx(styles.radioDiv)}>
                  <span>Subject</span> <input name='taskFilter' type="radio" value="subject" onChange={(e)=>handleRadioChange(e)} />
                </div>
                {showSearch?.subjectSearch && <div className={cx(styles.searchDiv)}>
                  <input type="text" placeholder="Enter Subject" />
                  <button>OK</button>
                </div>}
                <div className={cx(styles.radioDiv)}>
                  <span>Teacher</span><input onChange={(e)=>handleRadioChange(e)} name='taskFilter' type="radio" value="teacher" />
                </div>
                {showSearch?.teacherSearch && <div className={cx(styles.searchDiv)}>
                  <input type="text" placeholder="Enter Teacher" />
                  <button>OK</button>
                </div>}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className={cx(styles.tableDiv)}>
            <TableComponent columnsHeader={columnsHeader} tableData= {getTableData(studentData?.graded_tasks)} /> 
          </div>
        </>
        : <div className={cx(styles.noDataDiv)}>
          <p>No Data Found</p>
        </div>
      }

      {modalState === "show" && modalType === "taskDetails" && <Modal show size="lg" ><TaskDetailsModal /> </Modal>}  
    </div>
  );
};

export default AssessmentFeedback;