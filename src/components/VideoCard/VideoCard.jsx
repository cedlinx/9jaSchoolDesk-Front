import React, {useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./VideoCard.module.scss";
import { titleCase, initialsCase } from "@/helpers/textTransform";
import { Icon } from "@iconify/react";
import { showModal } from "@/redux/ModalState/ModalSlice";
import cardImagePlaceholder from "@/assets/images/lesson-placeholder.jpg";

const VideoCard = ({ cardDetails, teacherSection, studentSection=true }) => {

  const dispatch = useDispatch();
  const { created_at, date, description, id, klass_id, status, teacher, type, video_url, topic, thumbnail_url, document_url, subject } = cardDetails;
  const videoEl = useRef(null);
  const [duration, setDuration] = useState("Loading...");

  const handleLoadedMetadata = () => {
    const video = videoEl.current;
    if (!video) return;
    let result = new Date(video.duration * 1000).toISOString().substring(11, 19);
    setDuration(result);
  };

  let formatDate=(value)=>{
    let date = new Date(value);
    return date.toDateString();
  };

  const handleClick = (e) => {
    e.preventDefault();
    if(!studentSection){
      dispatch(showModal({ action: "show", type: "lessonDetails", modalData: cardDetails }));
    }
  };

  return (

    <section onClick={handleClick} className={cx(styles.videoCardContainer, "flexCol")}>
      <div className={cx(styles.header)}>
        <div className={cx(styles.imageWrapper)}>
          {type === "video" ?
            <video ref={videoEl} onLoadedMetadata={handleLoadedMetadata} src={document_url} id="myVideo" width="100%" height="100%" controls /> 
            :
            <img src={thumbnail_url || cardImagePlaceholder} alt="img" />
          }
          
          {/* {studentSection && <a href={document_url}>
            <img src={thumbnail_url} alt="img" />
          </a>} */}
        </div>
      </div>
      <div className={cx(styles.body, "flexCol")}>
        <div className={cx(styles.lessonDetails, "flexRow-space-between")}>
          <p>
            <span className={cx(styles.title)}>{topic}</span>
            {studentSection && 
            <div className={cx(styles.metaData, "flexRow")}>
              <Icon icon="ci:dot-01-xs" color="#828282" width="12" />
              <small>{subject?.subject}</small>
              { type === "video" && <small className={cx(styles.duration)}>{duration}</small> }
            </div>
            }
          </p>
      
          
        </div>

        {studentSection &&  <div className={cx(styles.tutorDetails, "flexRow-space-between")}>
          <div className={cx(styles.imageDiv)}>
            {teacher?.avatar ? 
              <img src={teacher?.avatar} alt="img" />
              :
              <span style={{ display: "inline-block", backgroundColor: "#D25B5D", color: "#fff", borderRadius: "50%", width: "3rem", height: "3rem", lineHeight: "3rem", fontSize: "1.25rem", textAlign: "center"}}>{initialsCase(`${teacher?.firstName ? teacher?.firstName : ""} ${teacher?.lastName
                ? teacher?.lastName : ""}`)}</span>
            }
          </div>
          <small>{`${teacher?.firstName ? titleCase(teacher?.firstName) : ""} ${teacher?.lastName ? titleCase(teacher?.lastName) : ""}`}</small>
          <Icon icon="ci:play-circle-filled" color="#d25b5d" width="32" height="32"  />
        </div>}

        {teacherSection &&  <div className={cx(styles.tutorDetails, "flexRow-space-between")}>
          <p>Uploaded - {formatDate(new Date())}</p>
        </div>}

      </div>

    </section>
  );
};

VideoCard.propTypes = {
  cardDetails: PropTypes.object.isRequired,
  teacherSection: PropTypes.bool,
  studentSection: PropTypes.bool
};

export default VideoCard;