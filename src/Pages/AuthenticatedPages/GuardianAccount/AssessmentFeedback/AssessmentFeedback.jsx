import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import cx from "classnames";
import styles from "./AssessmentFeedback.module.scss";
import TableComponent from "@/components/Table/Table";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import { titleCase } from "@/helpers/textTransform";
import {assessmentData} from "@/helpers/sampleData";
import { Icon } from "@iconify/react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import formatDate from "@/helpers/formatDate";
import DateRangeComp from "@/components/Dates/Range/Range";

import { DateRangePicker } from "rsuite";



const AssessmentFeedback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        return <span>{status.toLowerCase() === "read" ? <Icon icon="akar-icons:circle-fill" color="#2ac769" width="12" height="12" /> : <Icon icon="akar-icons:circle-fill" color="#bdbdbd" width="12" height="12" />}</span>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "auto"
          }}
        >Teacher</div>
      ),
      accessor: "imageUrl",
      Cell: (row) => {
        let imageUrl = row.cell.row.values.imageUrl;
        return <div>
          <img style={{borderRadius: "50%", width: "3rem"}} src={imageUrl} alt="img" />
        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "auto"
          }}
        />
      ),
      accessor: "teacherDetails",
      Cell: (row) => {
        let details = row.cell.row.values.teacherDetails;
        return <div  style={{width: "10rem"}}>
          <p style={{fontWeight: "500", color: "#4f4f4f"}}>{titleCase(details.name)}</p>
          <p style={{fontWeight: "500", color: "#828282", fontSize: "14px"}}>{titleCase(details.subject)}</p>
          
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
      accessor: "description",
      Cell: (row) => {
        let description = row.cell.row.values.description;
        return <div>
          <p style={{fontWeight: "500", color: "#828282", fontSize: "14px"}}>{titleCase(description)}</p>
          
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
          <p style={{fontWeight: "500", color: "#BDBDBD", fontSize: "12px"}}>{date}</p>
          
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
        imageUrl: item?.imageUrl && item?.imageUrl,
        teacherDetails: item?.teacherDetails && item?.teacherDetails,
        date: item?.date && formatDate(item?.date),
        description: item?.description && titleCase(item?.description)
      });
    });
    return result;
  };

  console.log(dateRange);
  const dateValue = (date) => {
    setDateRange(date);
  };

  const onChange = (date) => {
    console.log(date);
  };

  return (
    <div className={cx(styles.assessmentFeedbackContainer, "flexCol")}>
      <div className={cx(styles.header)}>
        <h5>Assessment Feedback</h5>
      </div>
      <div className={cx(styles.filterSection, "flexRow")}>

        <DateRangePicker placeholder="Select Date Range" onChange={onChange} />

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
      {<TableComponent columnsHeader={columnsHeader} tableData= {getTableData(assessmentData)} />}
    </div>
  );
};

export default AssessmentFeedback;