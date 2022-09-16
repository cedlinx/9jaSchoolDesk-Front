import React, { useEffect, useState } from "react";
import "./GeneralSideBar.scss";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import styles from "./GeneralSideBar.module.scss";
import { NavLink, useNavigate, useLocation, Navigate } from "react-router-dom";
import {ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader,
  SidebarFooter,
  SidebarContent
} from "react-pro-sidebar";

import { logout } from "@/redux/Auth/AuthSlice";

import logo from "@/assets/images/logo.svg";
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
import useGetUser from "@/utils/useGetUser";

import dashboardIconActive from "@/assets/icons/dashboard-icon-active.svg";
import dashboardIcon from "@/assets/icons/dashboard-icon.svg";
import classIcon from "@/assets/icons/class-icon.svg";
import classIconActive from "@/assets/icons/class-icon-active.svg";
import studentIconActive from "@/assets/icons/student-icon-active.svg";
import studentIcon from "@/assets/icons/student-icon.svg";
import parentIconActive from "@/assets/icons/parent-icon-active.svg";
import parentIcon from "@/assets/icons/parent-icon.svg";
import teacherIconActive from "@/assets/icons/teacher-icon-active.svg";
import teacherIcon from "@/assets/icons/teacher-icon.svg";
import subjectIconActive from "@/assets/icons/subject-icon-active.svg";
import subjectIcon from "@/assets/icons/subject-icon.svg";
import proprietorSettingsIconActive from "@/assets/icons/settings-icon-active.svg";
import proprietorSettingsIcon from "@/assets/icons/settings-icon.svg";
import { getTeacherDetails } from "@/redux/Teacher/TeacherSlice";

// import { getUserInfo } from "@/redux/Auth/AuthSlice";


const Aside = ({ rtl, toggled, handleToggleSidebar }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // const teacherDetails = JSON.parse(localStorage.getItem("userData"));
  const user = useGetUser();
  // const actualPath = location.pathname.match(/([^/]+$)/);
  const actualPath = location.pathname.split("/").pop();
  const basePath = location.pathname.split("/")[1];
  const updateProfileLoading = useSelector((state) => state.loading.updateProfileLoading);
  const userDetails = JSON.parse(localStorage.getItem("userData"));
  const [avatar, setAvatar] = useState(userDetails?.avatar);

  const teacherDetails = useSelector((state) => state?.teacher?.getTeacherDetailsData?.user);
  console.log(teacherDetails);

  console.log(updateProfileLoading);

  useEffect(() => {
    user === "teacher" && dispatch(getTeacherDetails());
    setAvatar(userDetails?.avatar);
  },[dispatch, updateProfileLoading, user, userDetails?.avatar]);

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
        <div style={{ height: "61px", backgroundColor: "#fff", padding: "0.25rem 0rem" }}>
          <img style={{ width: "100%", height: "100%" }} src={logo} alt="img" />
        </div>
        {user === "teacher" && <div className="sidebar-header" >
          <div className="imageDiv">
            {avatar ?  
              <img
                src={avatar}
                alt="thumb"
                className="user-image"
              /> 
              : 
              <span style={{ backgroundColor: "#D25B5D" }}>{teacherDetails?.firstName ? initialsCase(`${teacherDetails.firstName} ${teacherDetails.lastName}`) : ""}</span>}
          </div>
          <div className="user-info">
            <p>{teacherDetails?.firstName && `${titleCase(teacherDetails?.firstName)} ${teacherDetails?.firstName && titleCase(teacherDetails?.lastName)}` }</p>
            <small>{teacherDetails && teacherDetails?.email}</small>
          </div>
          <img onClick={() => navigate("settings")} className="caret-icon" src={rightCaret} alt="icon" />
        </div> }
      </SidebarHeader>

      {user === "teacher"  && <SidebarContent style={{ backgroundColor: "#22467B" }}>

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
            <NavLink to={`/${basePath}/lessons`}>Resources</NavLink>
          </MenuItem>
        </Menu>

        <Menu iconShape="">
          <MenuItem
            active={actualPath === "lounge" ? "true" : ""}
            prefix={<span className="menuIcon"><img src={loungeIcon} alt="" /></span>}
          >
            <NavLink to={`/${basePath}/lounge`}>Class Gist</NavLink>
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

      </SidebarContent>}

      {user === "proprietor" &&    <SidebarContent style={{paddingTop: "2rem", backgroundColor: "#22467B"}}>

        <Menu iconShape="">
          <MenuItem
            active={actualPath === "dashboard" ? "true" : ""}
            prefix={<span className="menuIcon"><img src={actualPath === "dashboard" ? dashboardIcon : dashboardIcon} alt="" /></span>}
          >
            <NavLink to={`/${basePath}/dashboard`}>
      Dashboard
            </NavLink>
          </MenuItem>
        </Menu>

        <Menu iconShape="">
          <MenuItem
            active={actualPath === "institutions" ? "true" : ""}
            prefix={<span className="menuIcon"><img src={actualPath === "institutions" ? classIcon : classIcon} alt="" /></span>}
          >
            <NavLink  to={`/${basePath}/institutions`}>Institutions</NavLink>
          </MenuItem>
        </Menu>

        <Menu iconShape="">
          <MenuItem
            active={actualPath === "students" ? "true" : ""}
            prefix={<span className="menuIcon"><img src={actualPath === "students" ? studentIcon : studentIcon} alt="" /></span>}
          >
            <NavLink  to={`/${basePath}/students`}>Students</NavLink>
          </MenuItem>
        </Menu> 

        <Menu iconShape="">
          <MenuItem
            active={actualPath === "parents" ? "true" : ""}
            prefix={<span className="menuIcon"><img src={actualPath === "parents" ? parentIcon : parentIcon} alt="" /></span>}
          >
            <NavLink  to={`/${basePath}/parents`}>Parents</NavLink>
          </MenuItem>
        </Menu> 

        <Menu iconShape="">
          <MenuItem
            active={actualPath === "teachers" ? "true" : ""}
            prefix={<span className="menuIcon"><img src={actualPath === "teachers" ? teacherIcon : teacherIcon} alt="" /></span>}
          >
            <NavLink to={`/${basePath}/teachers`}>Teachers</NavLink>
          </MenuItem>
        </Menu>

        <Menu iconShape="">
          <MenuItem
            active={actualPath === "classes" ? "true" : ""}
            prefix={<span className="menuIcon"><img src={actualPath === "classes" ? classIcon : classIcon} alt="" /></span>}
          >
            <NavLink to={`/${basePath}/classes`}>Classes</NavLink>
          </MenuItem>
        </Menu>

        <Menu iconShape="">
          <MenuItem
            active={actualPath === "subjects" ? "true" : ""}
            prefix={<span className="menuIcon"><img src={actualPath === "subjects" ? subjectIcon : subjectIcon} alt="" /></span>}
          >
            <NavLink to={`/${basePath}/subjects`}>Subjects</NavLink>
          </MenuItem>
        </Menu>

        <Menu iconShape="">

          <MenuItem
            style={{marginTop: "2rem"}}
            active={actualPath === "settings" ? "true" : ""}
            prefix={<span className="menuIcon"><img src={actualPath === "settings" ? settingsIcon : settingsIcon} alt="" /></span>}
          >
            <NavLink to={`/${basePath}/settings`}>Settings</NavLink>
          </MenuItem>

        </Menu>

      </SidebarContent> }

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
