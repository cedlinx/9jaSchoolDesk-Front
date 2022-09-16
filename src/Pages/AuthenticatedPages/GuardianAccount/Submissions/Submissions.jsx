import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import cx from "classnames";
import styles from "./Submissions.module.scss";
import TableComponent from "@/components/Table/Table";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import { titleCase } from "@/helpers/textTransform";
import { Icon } from "@iconify/react";
import Button from "@/components/Button/Button";
import { showModal } from "@/redux/ModalState/ModalSlice";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import SubmissionDetailsModal from "@/components/Modals/SubmissionDetails/SubmissionDetails";
import useGetSelectedWard from "@/utils/useGetSelectedWard";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import formatDate from "@/helpers/formatDate";
import DateRangeComp from "@/components/Dates/Range/Range";

const Submissions = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);
  const loading = useSelector((state) => state.guardian.loading);
  const selectedWard = useGetSelectedWard();

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
        return <div style={{minWidth: "10rem"}}>
          <span>{title}</span>
        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "auto",
            fontSize: "1rem"
          }}
        >Subject</div>
      ),
      accessor: "subject",
      Cell: (row) => {
        let subject = row.cell.row.values.subject;
        return <div>
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
          <p style={{fontWeight: "500", color: "#000"}}>{feedback}</p>
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
        return <div  style={{width: "auto"}}>
          <span>{score}</span>
          
        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            width: "auto"
          }}
        >Date </div>
      ),
      accessor: "due_date",
      Cell: (row) => {
        let due_date = row.cell.row.values.due_date;
        return <div>
          <p style={{fontWeight: "500", color: "#000"}}>{due_date}</p>
          
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
        title: item?.name && item?.name,
        feedback: item?.pivot?.feedback && item?.pivot?.feedback,
        score: item?.pivot?.score && item?.pivot?.score * 1,
        subject: item?.subject?.subject && titleCase(item?.subject?.subject),
        type: item?.type && titleCase(item?.type),
        due_date: item?.due_date && formatDate(item?.due_date),
        allData: item
      });
    });
    return result;
  };

  const dateValue = (date) => {
    setDateRange(date);
  };

  return (
    <div className={cx(styles.submissionsContainer, "flexCol")}>
      <div className={cx(styles.header)}>
        <h5>All Submissions</h5>
      </div>

      {loading ? <TableSkeleton /> : Array.isArray(selectedWard?.graded_tasks) && selectedWard?.graded_tasks.length > 0 ?
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
            <TableComponent columnsHeader={columnsHeader} tableData= {getTableData(selectedWard?.graded_tasks)} /> 
          </div>
        </>
        : <div className={cx(styles.noDataDiv)}>
          <p>There is currently no submitted task</p>
        </div>
      }

      {modalType === "submissionDetails" && <Modal show size="lg" >{ <SubmissionDetailsModal />}</Modal> }
    </div>
  );
};

export default Submissions;