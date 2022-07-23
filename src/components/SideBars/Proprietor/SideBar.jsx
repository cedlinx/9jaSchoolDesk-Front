import React, {useEffect} from "react";
import "./ProprietorSideBar.scss";
import {useDispatch, useSelector} from "react-redux"; 
import cx from "classnames";
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

import {logout} from "@/redux/Auth/AuthSlice";

import logo from "@/assets/images/Logo.svg";
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
import settingsIconActive from "@/assets/icons/settings-icon-active.svg";
import settingsIcon from "@/assets/icons/settings-icon.svg";



// import { getUserInfo } from "@/redux/Auth/AuthSlice";


const Aside = ({ rtl, toggled, handleToggleSidebar }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // const actualPath = location.pathname.match(/([^/]+$)/);
  const actualPath = location.pathname.split("/")[2];
  const basePath = location.pathname.split("/")[1];


  // const userDetails = JSON.parse(localStorage.getItem("loginData")).logged_in_user;
  // const userRole = userDetails?.group?.name;
	
  // const handleLogout=()=>{
  //   dispatch(logout());
  //   navigate("/");
  // };
		

  return (
    <ProSidebar
      rtl={rtl}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
      className="proprietor-sidebar"
    >
      <SidebarHeader>
        <div className={cx("flexRow-fully-centered")} style={{}}>
          <img style={{width: "70%"}} src={logo} alt="logo" />
        </div>  
      </SidebarHeader>

      <SidebarContent style={{paddingTop: "2rem"}}>

        <Menu iconShape="">
          <MenuItem
            active={actualPath === "dashboard" ? "true" : ""}
            prefix={<span className="menuIcon"><img src={actualPath === "dashboard" ? dashboardIconActive : dashboardIcon} alt="" /></span>}
          >
            <NavLink to={`/${basePath}/dashboard`}>
							Dashboard
            </NavLink>
          </MenuItem>
        </Menu>

        <Menu iconShape="">
          <MenuItem
            active={actualPath === "students" ? "true" : ""}
            prefix={<span className="menuIcon"><img src={actualPath === "students" ? studentIconActive : studentIcon} alt="" /></span>}
          >
            <NavLink  to={`/${basePath}/students`}>Students</NavLink>
          </MenuItem>
        </Menu> 

        <Menu iconShape="">
          <MenuItem
            active={actualPath === "parents" ? "true" : ""}
            prefix={<span className="menuIcon"><img src={actualPath === "parents" ? parentIconActive : parentIcon} alt="" /></span>}
          >
            <NavLink  to={`/${basePath}/parents`}>Parents</NavLink>
          </MenuItem>
        </Menu> 

        <Menu iconShape="">
          <MenuItem
            active={actualPath === "teachers" ? "true" : ""}
            prefix={<span className="menuIcon"><img src={actualPath === "teachers" ? teacherIconActive : teacherIcon} alt="" /></span>}
          >
            <NavLink to={`/${basePath}/teachers`}>Teachers</NavLink>
          </MenuItem>
        </Menu>

        <Menu iconShape="">
          <MenuItem
            active={actualPath === "classes" ? "true" : ""}
            prefix={<span className="menuIcon"><img src={actualPath === "classes" ? classIconActive : classIcon} alt="" /></span>}
          >
            <NavLink to={`/${basePath}/classes`}>Classes</NavLink>
          </MenuItem>
        </Menu>

        <Menu iconShape="">
          <MenuItem
            active={actualPath === "subjects" ? "true" : ""}
            prefix={<span className="menuIcon"><img src={actualPath === "subjects" ? subjectIconActive : subjectIcon} alt="" /></span>}
          >
            <NavLink to={`/${basePath}/subjects`}>Subjects</NavLink>
          </MenuItem>
        </Menu>

        <Menu iconShape="">

          <MenuItem
            style={{marginTop: "2rem"}}
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
            active={actualPath === "settings" ? "true" : ""}
            prefix={<span className="menuIcon"><img src={actualPath === "settings" ? settingsIconActive : settingsIcon} alt="" /></span>}
          >
            <p style={{marginBottom: "0rem"}} >Settings</p>
          </MenuItem>

        </Menu>
      </SidebarFooter> */}
    </ProSidebar>
  );
};

export default Aside;
