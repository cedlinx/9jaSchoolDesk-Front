import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import cx from "classnames";
import styles from "./MyLessons.module.scss";
import {videoLessonsData} from "@/helpers/sampleData";
import {useNavigate} from "react-router-dom";
import VideoCard from "@/components/VideoCard/VideoCard";



const MyLessons = () => {

  const navigate = useNavigate();
  console.log(videoLessonsData);

  const handleClick = (product) => {
    console.log(product);
    navigate(`view-lesson/${product.id}`);
  };

      
  return (
    <div className={cx(styles.myLessonsContainer)}>
      <div className={cx(styles.header)}>
        <h5>My Lessons</h5>
      </div>
      <div className={cx(styles.body, "flexCol")}>

        <div className={cx(styles.sectionWrapper)}>
          <p className={cx(styles.title)}>Today's Lessons</p>
          <div className={cx(styles.subGroupContainer)}>
            {videoLessonsData && videoLessonsData.map((item, index)=>{
              return(
                <div key={index} onClick={()=>handleClick(item)}>
                  <VideoCard productDetails={item} />
                </div>
              );
            })}
          </div>
        </div>

        <div className={cx(styles.sectionWrapper)}>
          <p className={cx(styles.title)}>Tomorrow's Lessons</p>
          <div className={cx(styles.subGroupContainer)}>
            {videoLessonsData && videoLessonsData.map((item, index)=>{
              return(
                <div key={index} onClick={()=>handleClick(item)}>
                  <VideoCard productDetails={item} />
                </div>
              );
            })}
          </div>
        </div>
   
      </div>
     
    </div>
   
  );
};

export default MyLessons;