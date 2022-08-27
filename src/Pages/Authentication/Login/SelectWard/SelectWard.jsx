import React, {useEffect, useState} from "react";
import cx from "classnames";
import styles from "./SelectWard.module.scss";
import Logo from "@/assets/images/Logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { initialsCase, titleCase } from "@/helpers/textTransform";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import useGetLoggedInUser from "@/utils/useGetLoggedInUser";
import { toast } from "react-toastify";
import useGetAllWards from "@/utils/useGetAllWards";
// import { switchClass } from "@/redux/Teacher/TeacherSlice";




const SelectWard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wardsArray = useGetAllWards();

  console.log(wardsArray);


  const handleSwitchWard = (id) => {
    console.log(id);
    toast("Switching ward...");
    localStorage.setItem("selectedWardID", id);
    navigate("/guardian/dashboard");
  };


  return (
    <div className={cx(styles.selectWardWrapper, "flexCol")}>
      <div className={cx(styles.heading, "flexCol")}>
        <img src={Logo} alt="" />
        <p>Select a ward to continue</p>
      </div>
      <div className={cx(styles.body)}>
        {Array.isArray(wardsArray) && wardsArray.map((ward, index) => {
          return (
            <div key={index} onClick={() => handleSwitchWard(ward?.id)} className={cx(styles.studentContainer, "flexCol")}>
              <div className={cx(styles.imageDiv)}>
                {ward?.avatar ? 
                  <img src={ward?.avatar} alt="avatar" />
                  :
                  <span style={{ backgroundColor: "#D25B5D" }}>{initialsCase(`${ward.firstName} ${ward.lastName}`)}</span>
                }
              </div>
              <p>{titleCase(`${ward.firstName} ${ward.lastName}`)}</p>
            </div>
          );
        }
        )}

      </div>
    </div>
  );
};

export default SelectWard;