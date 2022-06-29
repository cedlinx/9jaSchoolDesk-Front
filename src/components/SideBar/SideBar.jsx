import React, {useEffect} from "react";
import "./SideBar.scss";
import {useDispatch, useSelector} from "react-redux"; 
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

import logo from "@/assets/images/testimonialsAvatar.png";
import rightCaret from "@/assets/icons/right-caret.svg";
import classroomIcon from "@/assets/icons/classroom-icon.svg";
import tasksIcon from "@/assets/icons/tasks-icon.svg";
import loungeIcon from "@/assets/icons/lounge-icon.svg";
import lessonsIcon from "@/assets/icons/lessons-icon.svg";


// import { getUserInfo } from "@/redux/Auth/AuthSlice";


const Aside = ({ rtl, toggled, handleToggleSidebar }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // const actualPath = location.pathname.match(/([^/]+$)/);
  const actualPath = location.pathname.split("/").pop();
  const basePath = location.pathname.split("/")[1];

  useEffect(() => {
    // dispatch(getUserInfo());
  });

  // const userDetails = JSON.parse(localStorage.getItem("loginData")).logged_in_user;
  // const userRole = userDetails?.group?.name;
	
  const handleLogout=()=>{
    dispatch(logout());
    navigate("/");
  };
		

  return (
    <ProSidebar
      rtl={rtl}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div className="sidebar-header" >
          <div className="imageDiv">
            <img
              src={logo}
              alt="logo"
              className="user-image"
            />
          </div>
          <div className="user-info">
            <p>Eunice Mark</p>
            <small>eunicemark@gmail.com</small>
          </div>
          <img onClick={() => navigate("profile")}  className="caret-icon" src={rightCaret} alt="icon" />
        </div>
      </SidebarHeader>

      <SidebarContent>

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
            <NavLink  to={`/${basePath}/tasks-and-activities`}>Tasks and Activities</NavLink>
          </MenuItem>
        </Menu> 

        <Menu iconShape="">
          <MenuItem
            active={actualPath === "lessons" ? "true" : ""}
            prefix={<span className="menuIcon"><img src={lessonsIcon} alt="" /></span>}
          >
            <NavLink  to={`/${basePath}/lessons`}>Lessons</NavLink>
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
