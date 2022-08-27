import React, {useState, useEffect} from "react";
import cx from "classnames";
import {useDispatch, useSelector} from "react-redux";
import styles from "./TeacherRating.module.scss";
import studentProfilePic from "@/assets/images/student-profile-pic.png";
import TableComponent from "@/components/Table/Table";
import {initialsCase, titleCase} from "@/helpers/textTransform";
import StarRating from "@/components/StarRating";
// import {rateTeacher} from "@/redux/Guardian/GuardianSlice"


const TeacherRating = ({selectedWard}) => {
  const dispatch = useDispatch();

  // const [rating, setRating] = useState({});

  const teachersArray1 = selectedWard?.teachers;

  const setRating = async (rating, teacherData) => {
    // console.log(rating, teacherData);
    //let response = await dispatch(rateTeacher({rating, teacherData}));
    // console.log(response);
  };

  const teachersArray = [
    {
      name: "Emenike Chidi",
      subject: "Mathematics",
      rating: 4,
      profilePic: studentProfilePic
    },
    {
      name: "George Saim",
      subject: "Basic Technology",
      rating: 0,
      profilePic: studentProfilePic
    },
    {
      name: "Fred Anderson",
      subject: "Home Economics",
      rating: 0,
      profilePic: studentProfilePic
    },
    {
      name: "John Doe",
      subject: "Civic Education",
      rating: 3,
      profilePic: studentProfilePic
    },
    {
      name: "John Doe",
      subject: "Civic Education",
      rating: 0,
      profilePic: null
    }
  ];

  let getTableData = (data) => {
    let result =[];
      
    data  && data.map((item, index) =>{
      result.push({
        serialNumber: index + 1,
        imageUrl: item?.imageUrl && item?.imageUrl,
        teacherDetails: item?.teacher && item?.teacher,
        rating: item?.rating && item?.rating,
        allData: item
      });
    });
    return result;
  };

  const columnsHeaderAssessment = [                
    {
      Header: () => (
        <div
          style={{
            minWidth: "auto"
          }}
        />
      ),
      accessor: "imageUrl",
      Cell: (row) => {
        let imageUrl = row.cell.row.values.imageUrl;
        let allData = row.cell.row.original.allData;
        return <div>
          
          {imageUrl ? 
            <img style={{borderRadius: "50%", width: "2rem"}} src={imageUrl} alt="img" />
            :
            <span style={{ display: "inline-block", backgroundColor: "#D25B5D", color: "#fff", borderRadius: "50%", width: "2.5rem", height: "2.5rem", lineHeight: "2.5rem", fontSize: "1.25rem", textAlign: "center"}}>{initialsCase(`${allData?.teacher?.firstName} ${allData?.teacher?.lastName}`)}</span>
          }
        </div>;
      }
    },
    {
      Header: () => (
        <div />
      ),
      accessor: "teacherDetails",
      Cell: (row) => {
        let details = row.cell.row.values.teacherDetails;
        return <div  style={{width: "5rem"}}>
          <p style={{fontWeight: "500", color: "#4f4f4f", fontSize: "1rem"}}>{details?.firstName && titleCase(`${details?.firstName} ${details?.lastName}`)}</p>
          <p style={{fontWeight: "500", color: "#828282", fontSize: "0.875rem"}}>{details?.subject}</p>
          
        </div>;
      }
    },
    {
      Header: () => (
        <div />
      ),
      accessor: "ratings",
      Cell: (row) => {
        let rating = row.cell.row.values.ratings;
        let allData = row.cell.row.original.allData;

        return <div  style={{width: "auto"}}>
          <StarRating
            numberOfSelectedStar={rating}
            numberOfStar={5}
            onSelectStar={(value) => {
              setRating(value, allData);
            }}
          />
          
        </div>;
      }
    }
  ];
      
  return (
    <div className={cx(styles.teacherRatingContainer)}>
      <div className={cx(styles.teacherRatingsDiv)}>
        <h5>Rate Your Teacher</h5>
        <div className={cx(styles.ratingsDiv)}>
          <div className={cx(styles.tableDiv)}>
            {<TableComponent defaultPageSize="10" showTableHeader={false} showPaginationSummary={true} showPaginationNavigation={false} columnsHeader={columnsHeaderAssessment} tableData= {getTableData(teachersArray)} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherRating;