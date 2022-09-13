import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import cx from "classnames";
import styles from "./MyClasses.module.scss";
import {useNavigate} from "react-router-dom";
import VideoCard from "@/components/VideoCard/VideoCard";
import { getAllLessons } from "@/redux/Student/StudentSlice";


const MyClasses = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classID = JSON.parse(localStorage.getItem("userData")).klass_id;  
  const loading = useSelector((state) => state.student.loading);
  const lessonsData = useSelector((state) => state.student.getAllLessonsData.lessons);

  useEffect(() => {
    dispatch(getAllLessons(classID));
  }, [classID, dispatch]);

  const handleClick = (lesson) => {
    navigate(`view-class/${lesson.id}`);
  };

      
  return (
    <div className={cx(styles.myClassesContainer)}>
      <div className={cx(styles.header)}>
        <h5>My Lessons</h5>
      </div>
      <div className={cx(styles.body, "flexCol")}>

        <div className={cx(styles.sectionWrapper)}>
          <p className={cx(styles.title)}>Today&apos;s Lessons</p>
          <div className={cx(styles.subGroupContainer)}>
            {lessonsData && lessonsData.map((item, index)=>{
              return(
                <div key={index} onClick={()=>handleClick(item)}>
                  <VideoCard cardDetails={item} />
                </div>
              );
            })}
          </div>
        </div>

        {/* <div className={cx(styles.sectionWrapper)}>
          <p className={cx(styles.title)}>Past Lessons</p>
          <div className={cx(styles.subGroupContainer)}>
            {lessonsData && lessonsData.map((item, index)=>{
              return(
                <div key={index} onClick={()=>handleClick(item)}>
                  <VideoCard cardDetails={item} />
                </div>
              );
            })}
          </div>
        </div> */}
   
      </div>
     
    </div>
   
  );
};

export default MyClasses;