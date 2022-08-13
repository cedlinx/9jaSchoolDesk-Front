import React from "react";
import cx from "classnames";
import styles from "./TeacherRating.module.scss";
import studentProfilePic from "@/assets/images/student-profile-pic.png";
import useGenerateColor from "@/utils/useGenerateColor";
import {initialsCase} from "@/helpers/textTransform";
import StarRating from "@/components/StarRating";


const TeacherRating = () => {

  const generateColor = useGenerateColor();

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
      
  return (
    <div className={cx(styles.teacherRatingContainer)}>
      <div className={cx(styles.teacherRatingsDiv)}>
        <h5>Rate Your Teacher</h5>
        <div className={cx(styles.ratingsDiv)}>
          <div className={cx(styles.body, "flexCol")}>
            {teachersArray.map((teacher, index) => {
              return(
                <div key={index}>
                  <span> 
                    {teacher.profilePic ? <img src={teacher.profilePic} alt="profile pic" /> : <span style={{backgroundColor: generateColor}}>{initialsCase(teacher.name)}</span>}
                      
                  </span>
                  <div>
                    <p className={cx(styles.teacherName)}>{teacher.name}</p>
                    <small className={cx(styles.teacherSubject)}>{teacher.subject}</small>
                  </div>
                  <span> 
                    <StarRating
                      numberOfSelectedStar={teacher.rating}
                      numberOfStar={5}
                      onSelectStar={(value) => {
                      }}
                    />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherRating;