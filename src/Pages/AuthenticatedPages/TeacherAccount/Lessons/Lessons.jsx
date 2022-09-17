import React, {useState, useEffect} from "react";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Lessons.module.scss";
import {useNavigate} from "react-router-dom";
import VideoCard from "@/components/VideoCard/VideoCard";
import Button from "@/components/Button/Button";
import { showModal } from "@/redux/ModalState/ModalSlice";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import UploadLessonModal from "@/components/Modals/UploadLesson/UploadLesson";
import ViewLessonDetailsModal from "@/components/Modals/ViewLessonDetails/ViewLessonDetails";
import ModifyLessonModal from "@/components/Modals/ModifyLesson/ModifyLesson";
import DeleteLessonModal from "@/components/Modals/DeleteLesson/DeleteLesson";
import { getClassLessons } from "@/redux/Teacher/TeacherSlice";
import useGetClassID from "@/utils/useGetClassID";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";




const Lessons = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.teacher.loading);
  const classLessonsData = useSelector((state) => state.teacher.getClassLessonsData.lessons);
  const class_id = useGetClassID();

  useEffect(() => {
    class_id && dispatch(getClassLessons({class_id}));
  },[class_id, dispatch]);

  const modalType = useSelector((state) => state.modalState.type);
  const modalState = useSelector((state) => state.modalState.action);
  
  const handleClick = (product) => {
    navigate(`view-class/${product.id}`);
  };
    
  return (
    <div className={cx(styles.lessonsContainer, "flexCol")}>
      <div className={cx(styles.header, "flexRow")}>
        <h3 className={cx(styles.title)}>My Lessons</h3>
        {class_id && <Button  onClick={()=> dispatch(showModal({action: "show", type:"uploadLesson"}))} title="Upload Lesson" borderRadiusType="fullyRounded" textColor="#D25B5D" bgColor="#fff" bordercolor="#D25B5D" />}
      </div>

      {
        class_id ? 
          <div className={cx(styles.body, "flexCol")}>
            <div className={cx(styles.sectionWrapper, "flexCol")}>
              {/* <p className={cx(styles.title)}>Recent Uploads</p> */}
              <div className={cx(styles.subGroupContainer)}>
                {loading ? <TableSkeleton /> : Array.isArray(classLessonsData) && classLessonsData.length > 0 ? classLessonsData.map((item, index)=>{
                  return(
                    <div key={index}>
                      <VideoCard cardDetails={item} teacherSection={true} studentSection={false} />
                    </div>
                  );
                }) : <p className={cx(styles.noData)}>No Lessons Uploaded</p>}
              </div>
            </div>
   
          </div>
          :
          <div className={cx(styles.noDataDiv)}>
            <p>You have no class assigned to you. You can only create lessons when you have at least one (1) class assigned to you. Kindly contact your administrator.</p>
          </div>
      }

     

      {modalType === "uploadLesson" && <Modal size="lg" show > <UploadLessonModal /></Modal>}
      {modalType === "lessonDetails" && <Modal show > <ViewLessonDetailsModal /></Modal>}
      {modalType === "modifyLesson" && <Modal show size="lg" > <ModifyLessonModal /></Modal>}
      {modalType === "deleteLesson" && <Modal show > <DeleteLessonModal /></Modal>}
    </div>
  );
};

export default Lessons;