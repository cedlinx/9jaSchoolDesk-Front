import React, {useEffect, useState} from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate, Link, NavLink, useLocation } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import cx from "classnames";
import styles from "./DashboardHeader.module.scss";

import profilePicture from "@/assets/images/default-avatar.png";
import dashboardIcon from "@/assets/icons/dashboard-icon.svg";
import dashboardIconActive from "@/assets/icons/dashboard-icon-active.svg";
import classGistIcon from "@/assets/icons/classGist-icon.svg";
import classGistIconActive from "@/assets/icons/classGist-icon-active.svg";
import myClassesIcon from "@/assets/icons/myClasses-icon.svg";
import myClassesIconActive from "@/assets/icons/myClasses-icon-active.svg";

import messagesIcon from "@/assets/icons/messages-icon.svg";
import messagesIconActive from "@/assets/icons/messages-icon-active.svg";

import unreadNotificationsIcon from "@/assets/icons/unread-notifications-icon.svg";
import notificationIcon from "@/assets/icons/notification-icon.svg";
import { titleCase } from "@/helpers/textTransform";
import InputField from "@/components/Input/Input";
import { Icon } from "@iconify/react";
import Logo from "@/assets/images/Logo.png";
import Button from "@/components/Button/Button";
import { Navbar} from "react-bootstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";


const Header = (props) => {
  const {handleToggleSidebar} = props;
  const navigate = useNavigate();
  const location = useLocation();


  let rootPath = location.pathname.split("/")[2];
  let userCategory = location.pathname.split("/")[1];
  console.log(userCategory);
  console.log(rootPath);
	
  const dispatch = useDispatch();
  const unreadNotifications = useSelector((state)=>state?.notifications?.notificationSummaryData?.data?.unread);
  const userDetails = useSelector((state)=>state?.user?.getUserInfoData?.data?.data);

  useEffect(() => {
    // dispatch(notificationSummary());
    // dispatch(getUserInfo());
  },[]);

  
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = (e) => {
    console.log(e.target.name);
    setDropdownOpen(!dropdownOpen);
  };


  return (
    <section className={cx(styles.dashboardHeaderContainer, "flexRow", "")}>

      <Navbar collapseOnSelect expand="lg" className={cx(styles.navbarContainer, "flexRow")}>
        <Navbar.Brand className={cx(styles.siteLogo )}> 		
          <Link to="/student-experience/dashboard"><img src={Logo} alt="" /></Link>
        </Navbar.Brand>

        <Navbar.Toggle className={cx(styles.navbarToggler)} aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className={cx(styles.navbarCollapse)} id="responsive-navbar-nav" >
					
          <div className={cx(styles.contentWrapper, "flexRow")}>
            <div className={cx(styles.searchComponentDiv)}>
              <InputField
                
                label={"Search here"}
                // placeholder={"Search here"}
                type="text"
                marginbottom={"0px"}
                border={"#c1c7d0"}
                borderradius="0.25rem"
                icon
              />
            </div>
				
            <div className={cx(styles.profileDiv, "flexRow")}>
            
              <NavLink to="dashboard">
                {({ isActive }) => (
                  <div className={cx(isActive ? styles.navLinkActive : styles.navLink)}>
                    <div><img src={isActive ? dashboardIconActive : dashboardIcon} alt="" /></div>
                    <span>Dashboard</span>
                  </div>
                )}
              </NavLink>

              { userCategory === "student-experience" && <> <NavLink to="class-gist">
                {({ isActive }) => (
                  <div className={cx(isActive ? styles.navLinkActive : styles.navLink)}>
                    <div><img src={isActive ? classGistIconActive : classGistIcon} alt="" /></div>
                    <span>Class Gist</span>
                  </div>
                )}
              </NavLink>
            
              <NavLink to="my-classes">
                {({ isActive }) => (
                  <div className={cx(isActive ? styles.navLinkActive : styles.navLink)}>
                    <div><img src={isActive ? myClassesIconActive : myClassesIcon} alt="" /></div>
                    <span>My Classes</span>
                  </div>
                )}
              </NavLink>
              </>
              }

              { userCategory === "parent-experience" && 
              <> 
                <NavLink to="messages">
                  {({ isActive }) => (
                    <div className={cx(isActive ? styles.navLinkActive : styles.navLink)}>
                      <div><img src={isActive ? messagesIconActive : messagesIcon} alt="" /></div>
                      <span>Messages</span>
                    </div>
                  )}
                </NavLink>
            
                <div><img src={unreadNotificationsIcon} alt="" /></div>
              </>
              }

              <Dropdown className={cx(styles.dropdown)} isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle name="profile-toggler" className={cx(styles.dropdownToggler)}>

                  <span className={cx(styles.avatarDiv, styles.logoutDropdown, "flexRow")}>
                    <img className={cx(styles.profilePicture)} src={userDetails && userDetails.avatar ? userDetails.avatar : profilePicture} alt="" />
                    <Icon icon="clarity:caret-line" color="#000" rotate={2} />
                  </span>
                </DropdownToggle>
                <DropdownMenu className={cx(styles.dropdownMenuWrapper)}>

                  <DropdownItem onClick={() => navigate("profile")}>Profile</DropdownItem>
                  <DropdownItem>Logout</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>

          </div>

        </Navbar.Collapse>
      </Navbar>

   
    </section>
  );
};

export default Header;