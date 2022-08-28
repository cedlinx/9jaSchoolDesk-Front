import React, {useEffect, useRef, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ViewClass.module.scss";
import cx from "classnames";
import VideoCard from "@/components/VideoCard/VideoCard";
import { Icon } from "@iconify/react";
import { lessonDetails, getAllLessons } from "@/redux/Student/StudentSlice";
import { titleCase } from "@/helpers/textTransform";
import cardImagePlaceholder from "@/assets/images/lesson-placeholder.jpg";



const ViewClass = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.student.loading);
  const lessonDetailsData = useSelector((state) => state?.student?.lessonDetailsData?.lesson);
  const classID = JSON.parse(localStorage.getItem("userData")).klass_id;  
  const lessonsData = useSelector((state) => state.student.getAllLessonsData.lessons);

  const videoEl = useRef(null);
  const [duration, setDuration] = useState("Loading...");

  const handleLoadedMetadata = () => {
    const video = videoEl.current;
    if (!video) return;
    let result = new Date(video.duration * 1000).toISOString().substring(11, 19);
    setDuration(result);
  };

  useEffect(() => {
    dispatch(lessonDetails({id}));
    dispatch(getAllLessons(classID));

  }, [classID, dispatch, id]);

  console.log(lessonDetailsData);

  const handleClick = (lesson) => {
    navigate(`/student/my-classes/view-class/${lesson.id}`);
  };

  return (
    <div className={cx(styles.viewClassContainer, "flexCol")}>
      <div className={cx(styles.lessonDetails, "flexRow-space-between")}>
        <p className={cx("flexRow")}>
          <Icon onClick={()=> navigate(-1)} icon="akar-icons:arrow-back" color="#22467b" />
          <span className={cx(styles.title)}>{lessonDetailsData?.topic && titleCase(lessonDetailsData?.topic)}</span>
          <Icon icon="ci:dot-01-xs" color="#828282" width="12" />
          <small>{lessonDetailsData?.subject?.name}</small>
        </p>
        {/* { lessonDetailsData?.type === "video" && <small className={cx(styles.duration)}>{duration}</small> } */}
      </div>
      <div className={cx(styles.container, "row", "g-0")}>
        <div className={cx(styles.mainContent, "col-md-12", "col-lg-9", "flexCol", "g-0")}>
          <div className={cx(styles.viewingArea)}>
            {lessonDetailsData?.type === "video" ?
              <video ref={videoEl} onLoadedMetadata={handleLoadedMetadata} src={lessonDetailsData?.document_url} id="myVideo" width="100%" height="100%" controls /> 
              :
              <img src={lessonDetailsData?.thumbnail_url ? lessonDetailsData?.thumbnail_url : cardImagePlaceholder} alt="img" />
            }
          </div>
          <div className={cx(styles.downloadDiv)}>
            <a href={lessonDetailsData?.document_url} target="_blank" rel="noreferrer">Download Attachment</a>
          </div>
          <div className={cx(styles.transcriptArea)}>
            <h5>Description</h5>
            <p>{lessonDetailsData?.description}</p>
          </div>
        </div>
        <div className={cx(styles.aside, "flexCol", "col-lg-3")}>
          <div className={cx(styles.subGroupContainer, "flexCol")}>
            {Array.isArray(lessonsData) && lessonsData.map((item, index)=>{
              return(
                <div style={{width: "100%"}} onClick={()=>handleClick(item)} key={index}>
                  <VideoCard cardDetails={item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
   
    </div>
  );
};

export default ViewClass;