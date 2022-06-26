import React from "react";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Lessons.module.scss";
import {videoLessonsData} from "@/helpers/sampleData";
import {useNavigate} from "react-router-dom";
import VideoCard from "@/components/VideoCard/VideoCard";
import Button from "@/components/Button/Button";
import { showModal } from "@/redux/ModalState/modalState.action";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import UploadLessonModal from "@/components/Modals/UploadLesson/UploadLesson";


const Lessons = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(videoLessonsData);

  const modalType = useSelector((state) => state.modalState.type);
  const modalState = useSelector((state) => state.modalState.action);
  
  const handleClick = (product) => {
    console.log(product);
    navigate(`view-class/${product.id}`);
  };
    
  return (
    <div className={cx(styles.lessonsContainer, "flexCol")}>
      <div className={cx(styles.header, "flexRow")}>
        <h5>My Lessons</h5>
        <Button  onClick={()=> dispatch(showModal({action: "show", type:"uploadLesson"}))} title="Upload Lesson" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" />
      </div>
      <div className={cx(styles.body, "flexCol")}>
        <div className={cx(styles.sectionWrapper, "flexCol")}>
          <p className={cx(styles.title)}>Recent Uploads</p>
          <div className={cx(styles.subGroupContainer)}>
            {videoLessonsData && videoLessonsData.map((item, index)=>{
              return(
                <div key={index}>
                  <VideoCard productDetails={item} teacherSection={true} studentSection={false} />
                </div>
              );
            })}
          </div>
        </div>
   
      </div>
      {modalState === "show" ? <Modal show >{modalType === "uploadLesson" ?<UploadLessonModal /> :  null}</Modal> : null}
    </div>
  );
};

export default Lessons;