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
import { logout } from "@/redux/Auth/AuthSlice";
import Button from "@/components/Button/Button";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";


const SelectClass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const teacherDetails = useGetLoggedInUser();
  let classesArray = teacherDetails?.classes;
  const loading = useSelector((state) => state?.teacher?.loading);
  console.log(loading);
  console.log(teacherDetails);

  useEffect(() => {
    // if (!classesArray) {
    //   setTimeout(() => {
    //     navigate("/teacher/dashboard");
    //   }, 5000);
    // }
  }, [classesArray, dispatch, navigate]);

  const handleNavigateToDashboard = () => {
    setTimeout(() => {
      navigate("/teacher/dashboard");
    }, 5000);
  };

  const handleSwitchClass = async (class_id) => {
    toast("Switching class...");
    let response = await dispatch(switchClass({id: class_id }));
    if (response.payload.success) {
      localStorage.setItem("activeClassData", JSON.stringify(response.payload.class));
      localStorage.setItem("class_id", class_id);
      navigate("/teacher/dashboard");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };


  return (
    <div className={cx(styles.selectClassWrapper, "flexCol")}>
      <div className={cx(styles.heading, "flexCol")}>
        <Button onClick={()=>handleLogout()} title="Logout" borderRadiusType="mediumRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
        <img src={Logo} alt="" />
      </div>

      { loading ? <TableSkeleton /> :
      
        Array.isArray(classesArray) && classesArray.length > 0 ? 
          <>
            <div className={cx(styles.body, "flexCol")}>
              <p className={cx(styles.title)}>Select a class to continue</p>
              <div className={cx(styles.classesContainer)}>
                {Array.isArray(classesArray) && classesArray.map((element, index) => {
                  return (
                    <div key={index} onClick={() => handleSwitchClass(element?.id)} className={cx(styles.studentContainer, "flexCol")}>
                      <div className={cx(styles.imageDiv)}>
                        <Icon icon="healthicons:i-training-class" color="#d25b5d" width="72" />
                      </div>
                      <p>{element?.name}</p>
                    </div>
                  );
                }
                )}
              </div>
            </div>
          </>
          : Array.isArray(classesArray) && classesArray.length === 0 ? 
            <div className={cx(styles.body, "flexCol")}>
              <p className={cx(styles.title)}>You currently have no class assigned to you. Kindly contact the Proprietor / Administrator.</p>
              <small>Redirecting in 5 seconds</small>
              {handleNavigateToDashboard()}
              <Button onClick={()=>navigate("/teacher/dashboard")} title="Go To Dashboard" borderRadiusType="lowRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />

            </div> : null
      }
    </div>
  );
};

export default SelectClass;