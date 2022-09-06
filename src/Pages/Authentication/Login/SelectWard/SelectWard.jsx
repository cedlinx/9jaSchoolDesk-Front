import React, {useEffect, useState} from "react";
import cx from "classnames";
import styles from "./SelectWard.module.scss";
import Logo from "@/assets/images/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { initialsCase, titleCase } from "@/helpers/textTransform";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import useGetLoggedInUser from "@/utils/useGetLoggedInUser";
import { toast } from "react-toastify";
import useGetAllWards from "@/utils/useGetAllWards";
import Button from "@/components/Button/Button";
import { logout } from "@/redux/Auth/AuthSlice";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";

// import { switchClass } from "@/redux/Teacher/TeacherSlice";




const SelectWard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.guardian.loading);

  const wardsArray = useGetAllWards();

  const handleSwitchWard = (id) => {
    toast("Switching ward...");
    localStorage.setItem("selectedWardID", id);
    navigate("/guardian/dashboard");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };


  return (
    <div className={cx(styles.selectWardWrapper, "flexCol")}>
      <div className={cx(styles.heading, "flexCol")}>
        <Button onClick={()=>handleLogout()} title="Logout" borderRadiusType="mediumRounded" textColor="#FFF" bgColor="#eb5757" hoverColor="#eb5757" hoverBg="#fff" />
        <img src={Logo} alt="" />
      </div>
      {
        loading ? 
          <>
            <p>...fetching data, please wait...</p>
            <TableSkeleton />
          </>
          :
          Array.isArray(wardsArray) && wardsArray.length > 0 ?
            <> 
              <p>Select a ward to continue</p>
              <div className={cx(styles.body)}>
                {Array.isArray(wardsArray) && wardsArray.map((ward, index) => {
                  return (
                    <div key={index} onClick={() => handleSwitchWard(ward?.id)} className={cx(styles.studentContainer, "flexCol")}>
                      <div className={cx(styles.imageDiv)}>
                        {ward?.avatar ? 
                          <img className={cx(styles.profileImage)} src={ward?.avatar} alt="avatar" />
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
            </> 
            :
            Array.isArray(wardsArray) && wardsArray.length === 0 ?
              <>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", gap: "1rem"}}>
                  <p style={{color: "#747474", fontSize: "1.5rem"}}>You currently do not have any ward assigned to you. Kindly contact the institution administrator. Thank you</p>
                </div>
              </>
              :
              <p>An Error Occured. Please Try Again</p>
      }
     
    </div>
  );
};

export default SelectWard;