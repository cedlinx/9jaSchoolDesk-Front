import React, {useState, useEffect} from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import styles from "./TeacherRating.module.scss";
import TableComponent from "@/components/Table/Table";
import {initialsCase, titleCase} from "@/helpers/textTransform";
import StarRating from "@/components/StarRating";
import { showModal } from "@/redux/ModalState/ModalSlice";


const TeacherRating = ({teachersData, studentID}) => {
  const dispatch = useDispatch();

  const setRating = async (rating, teacherData) => {
    dispatch(showModal({action: "show", type: "rateTeacher", modalData: {rating, teacherData, studentID}}));
  };


  let getTableData = (data) => {
    let result =[];
      
    data  && data.map((item, index) =>{
      result.push({
        serialNumber: index + 1,
        teacherDetails: item && item,
        ratings: item?.teacher_rating && item?.teacher_rating,
        allData: item
      });
    });
    return result;
  };

  const onSelectStar = (rating, data) => {
    setRating(rating, data);
  };


  const columnsHeaderAssessment = [                
    {
      Header: () => (
        <div />
      ),
      accessor: "teacherDetails",
      Cell: (row) => {
        let details = row.cell.row.values.teacherDetails;

        return <div  style={{width: "auto", display: "flex", gap: "0.5rem"}}>
          <div>
          
            {details?.subject_teacher?.avatar ? 
              <img style={{borderRadius: "50%", width: "2rem", height: "2rem"}} src={details?.subject_teacher?.avatar} alt="img" />
              :
              <span style={{ display: "inline-block", backgroundColor: "#D25B5D", color: "#fff", borderRadius: "50%", width: "2.5rem", height: "2.5rem", lineHeight: "2.5rem", fontSize: "1.25rem", textAlign: "center"}}>{initialsCase(`${details?.subject_teacher?.firstName || ""} ${details?.subject_teacher?.lastName || ""}`)}</span>
            }
          </div>

          <div>
            <p style={{fontWeight: "500", color: "#4f4f4f", fontSize: "1rem"}}>{details?.subject_teacher?.firstName ? titleCase(details?.subject_teacher?.firstName) : ""} {details?.subject_teacher?.lastName ? titleCase(details?.subject_teacher?.lastName) : ""}</p>
            <p style={{fontWeight: "500", color: "#828282", fontSize: "0.875rem"}}>{details?.subject}</p>
          </div>
        
          
        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{width: "auto"}}
        />
      ),
      accessor: "ratings",
      Cell: (row) => {
        let ratings = row.cell.row.values.ratings * 1;
        let allData = row.cell.row.original.allData;

        return <div>
          <StarRating
            numberOfSelectedStar={ratings}
            numberOfStar={5}
            onSelectStar={onSelectStar}
            dataObj={allData}
          />
          
        </div>;
      }
    }
  ];
      
  return (
    <div className={cx(styles.teacherRatingContainer, "flexCol")}>
      <div className={cx("flexRow", styles.heading)}>
        <h5>Rate Your Teacher</h5>
      </div>
      <div className={cx(styles.ratingsDiv)}>
        {/* {teachersData.length > 0 ? 
            <div className={cx(styles.tableDiv)}>
              <TableComponent defaultPageSize="10" showTableHeader={false} showPaginationSummary={true} showPaginationNavigation={false} columnsHeader={columnsHeaderAssessment} tableData= {getTableData(teachersData)} />
            </div>
            :
            <div className={cx(styles.emptyDataDiv)}>
              <p>No Teacher to rate</p>
            </div>
          } */}
        { Array.isArray(teachersData)  && <TableComponent defaultPageSize="10" showTableHeader={false} showPaginationSummary={true} showPaginationNavigation={false} columnsHeader={columnsHeaderAssessment} tableData= {getTableData(teachersData)} emptyDataText="There are no teachers to rate" /> }
      </div> 
    </div>
  );
};

TeacherRating.propTypes = {
  teachersData: PropTypes.array,
  studentID: PropTypes.string
};

export default TeacherRating;