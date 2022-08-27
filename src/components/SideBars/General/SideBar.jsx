import React, { useEffect } from "react";
import "./GeneralSideBar.scss";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./GeneralSideBar.module.scss";
import { NavLink, useNavigate, useLocation, Navigate } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent
} from "react-pro-sidebar";

import { logout } from "@/redux/Auth/AuthSlice";

import logo from "@/assets/images/Logo.svg";
import thumbnailImg from "@/assets/images/testimonialsAvatar.png";
import rightCaret from "@/assets/icons/right-caret.svg";
import classroomIcon from "@/assets/icons/classroom-icon.svg";
import tasksIcon from "@/assets/icons/tasks-icon.svg";
import loungeIcon from "@/assets/icons/lounge-icon.svg";
import lessonsIcon from "@/assets/icons/lessons-icon.svg";
import settingsIconActive from "@/assets/icons/settings-icon-active.svg";
import settingsIcon from "@/assets/icons/settings-white.svg";
import useGetLoggedInUser from "@/utils/useGetLoggedInUser";
import { titleCase, initialsCase } from "@/helpers/textTransform";


// import { getUserInfo } from "@/redux/Auth/AuthSlice";


const Aside = ({ rtl, toggled, handleToggleSidebar }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const teacherDetails = useGetLoggedInUser();

  console.log(teacherDetails);

  // const actualPath = location.pathname.match(/([^/]+$)/);
  const actualPath = location.pathname.split("/").pop();
  const basePath = location.pathname.split("/")[1];

  useEffect(() => {
    // dispatch(getUserInfo());
  });

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };


  return (
    <ProSidebar
      rtl={rtl}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
      className="general-sidebar"
    >
      <SidebarHeader>
        <div style={{ height: "61px", backgroundColor: "#fff", padding: "0.25rem 0rem", border: "1px solid #fff" }}>
          <img style={{ width: "100%", height: "100%" }} src={logo} alt="img" />
        </div>
        <div className="sidebar-header" >
          <div className="imageDiv">
            {teacherDetails?.avatar ?  
              <img
                src={teacherDetails?.avatar}
                alt="thumb"
                className="user-image"
              /> 
              : 
              <span style={{ backgroundColor: "#D25B5D" }}>{initialsCase(`${teacherDetails.firstName} ${teacherDetails.lastName}`)}</span>}
          </div>
          <div className="user-info">
            <p>{`${teacherDetails?.firstName && titleCase(teacherDetails?.firstName)} ${teacherDetails?.firstName && titleCase(teacherDetails?.lastName)}` }</p>
            <small>{teacherDetails?.email}</small>
          </div>
          <img onClick={() => navigate("settings")} className="caret-icon" src={rightCaret} alt="icon" />
        </div>
      </SidebarHeader>

      <SidebarContent style={{ backgroundColor: "#22467B" }}>

        <Menu iconShape="">
          <MenuItem
            active={actualPath === "dashboard" ? "true" : ""}
            prefix={<span className="menuIcon"><img src={classroomIcon} alt="" /></span>}
          >
            <NavLink to={`/${basePath}/dashboard`}>
              Classroom
            </NavLink>
          </MenuItem>
        </Menu>

        <Menu iconShape="">
          <MenuItem
            active={actualPath === "tasks-and-activities" ? "true" : ""}
            prefix={<span className="menuIcon"><img src={tasksIcon} alt="" /></span>}
          >
            <NavLink to={`/${basePath}/tasks-and-activities`}>Activities</NavLink>
          </MenuItem>
        </Menu>

        <Menu iconShape="">
          <MenuItem
            active={actualPath === "lessons" ? "true" : ""}
            prefix={<span className="menuIcon"><img src={lessonsIcon} alt="" /></span>}
          >
            <NavLink to={`/${basePath}/lessons`}>Lessons</NavLink>
          </MenuItem>
        </Menu>

        <Menu iconShape="">
          <MenuItem
            active={actualPath === "lounge" ? "true" : ""}
            prefix={<span className="menuIcon"><img src={loungeIcon} alt="" /></span>}
          >
            <NavLink to={`/${basePath}/lounge`}>Lounge</NavLink>
          </MenuItem>
        </Menu>
        {/* 
        <Menu iconShape="">

          <MenuItem
            active={actualPath === "settings" ? "true" : ""}
            prefix={<span className="menuIcon"><img src={settingsIcon} alt="" /></span>}
          >
            <NavLink to={`/${basePath}/profile`}>Settings Old</NavLink>
          </MenuItem>

        </Menu> */}

        <Menu iconShape="">

          <MenuItem
            style={{ marginTop: "2rem" }}
            active={actualPath === "settings" ? "true" : ""}
            prefix={<span className="menuIcon"><img src={actualPath === "settings" ? settingsIconActive : settingsIcon} alt="" /></span>}
          >
            <NavLink to={`/${basePath}/settings`}>Settings</NavLink>
          </MenuItem>

        </Menu>

      </SidebarContent>

      {/* <SidebarFooter>
        <Menu iconShape="">

          <MenuItem
            active={actualPath === "logout" ? "true" : ""}
            prefix={<span className="menuIcon"><img src={actualPath === "logout" ? logoutIconActive : logoutIcon} alt="" /></span>}
            onClick={handleLogout}
          >
            <p style={{marginBottom: "0rem"}} >LogOut</p>
          </MenuItem>

        </Menu>
      </SidebarFooter> */}
    </ProSidebar>
  );
};

export default Aside;
