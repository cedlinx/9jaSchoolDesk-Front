import React, {useEffect, useState} from "react";
import cx from "classnames";
import styles from "./SelectClass.module.scss";
import Logo from "@/assets/images/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { initialsCase, titleCase } from "@/helpers/textTransform";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import useGetLoggedInUser from "@/utils/useGetLoggedInUser";
import { toast } from "react-toastify";
import { switchClass } from "@/redux/Teacher/TeacherSlice";


const SelectClass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const teacherDetails = useGetLoggedInUser();
  let classesArray = teacherDetails?.classes;
  console.log(teacherDetails);


  const handleSwitchClass = async (class_id) => {
    console.log(class_id);
    toast("Switching class...");
    let response = await dispatch(switchClass({id: class_id }));
    console.log(response, "switch response");
    if (response.payload.success) {
      console.log(class_id);
      localStorage.setItem("activeClassData", JSON.stringify(response.payload.class));
      localStorage.setItem("class_id", class_id);
      navigate("/teacher/dashboard");
    }
  };


  return (
    <div className={cx(styles.selectClassWrapper, "flexCol")}>
      <div className={cx(styles.heading, "flexCol")}>
        <img src={Logo} alt="" />
        <p>Select a class to continue</p>
      </div>
      <div className={cx(styles.body)}>
        {Array.isArray(classesArray) && classesArray.map((element, index) => {
          return (
            <div key={index} onClick={() => handleSwitchClass(element?.id)} className={cx(styles.studentContainer, "flexCol")}>
              <div className={cx(styles.imageDiv)}>
                <Icon icon="healthicons:i-training-class" color="#d25b5d" width="72" />
              </div>
              <p>{element?.name}</p>
              {/* <p>JSS 1 A</p> */}
            </div>
          );
        }
        )}

      </div>
    </div>
  );
};

export default SelectClass;