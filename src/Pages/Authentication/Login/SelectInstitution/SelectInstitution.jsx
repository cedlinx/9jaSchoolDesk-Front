import React, {useEffect, useState} from "react";
import cx from "classnames";
import styles from "./SelectInstitution.module.scss";
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

const SelectInstitution = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const proprietorDetails = useGetLoggedInUser();
  let institutionsArray = proprietorDetails?.institutions;
  console.log(proprietorDetails);

  useEffect(() => {
    if(proprietorDetails.institutions === undefined) {
      navigate("/proprietor/dashboard");
    }
  },[dispatch, navigate, proprietorDetails.institutions]);


  const handleSwitchClass = async (institution_id) => {
    console.log(institution_id);
    toast("Switching Institution...");
    let response = await dispatch(switchClass({id: institution_id }));
    console.log(response, "switch response");
    if (response.payload.success) {
      console.log(institution_id);
      localStorage.setItem("activeInstitutionData", JSON.stringify(response.payload.institution));
      localStorage.setItem("institution_id", institution_id);
      navigate("/teacher/dashboard");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className={cx(styles.selectInstitutionWrapper, "flexCol")}>
      <div className={cx(styles.heading, "flexCol")}>
        <Button onClick={()=>handleLogout()} title="Logout" borderRadiusType="mediumRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
        <img src={Logo} alt="" />
        <p>Select an institution to continue</p>
      </div>
      <div className={cx(styles.body)}>
        {Array.isArray(institutionsArray) && institutionsArray.map((element, index) => {
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

export default SelectInstitution;