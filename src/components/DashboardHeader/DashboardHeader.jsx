import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate, Link, NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import cx from "classnames";
import styles from "./DashboardHeader.module.scss";
import { showModal } from "@/redux/ModalState/ModalSlice";

import profilePicture from "@/assets/images/default-avatar.png";
import dashboardIcon from "@/assets/icons/dashboard-icon.svg";
import dashboardIconActive from "@/assets/icons/dashboard-icon-active.svg";
import classGistIcon from "@/assets/icons/classGist-icon.svg";
import classGistIconActive from "@/assets/icons/classGist-icon-active.svg";
import myClassesIcon from "@/assets/icons/myClasses-icon.svg";
import myClassesIconActive from "@/assets/icons/myClasses-icon-active.svg";

import messagesIcon from "@/assets/icons/messages-icon.svg";
import messagesIconActive from "@/assets/icons/messages-icon-active.svg";

import { FormCheck } from "react-bootstrap";


import unreadNotificationsIcon from "@/assets/icons/unread-notifications-icon.svg";
import { titleCase } from "@/helpers/textTransform";
import { Icon } from "@iconify/react";
import Logo from "@/assets/images/logo.png";
import Button from "@/components/Button/Button";
import { Navbar } from "react-bootstrap";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";

import { logout } from "@/redux/Auth/AuthSlice";

import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import UrgentInfoTeacherModal from "@/components/Modals/UrgentInfoTeacher/UrgentInfoTeacher";
import useGetClassDetails from "@/utils/useGetClassDetails";

const Header = (props) => {
  const { handleToggleSidebar, showLinks = true } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const classDetails = useGetClassDetails();

  let rootPath = location.pathname.split("/")[2];
  let userCategory = location.pathname.split("/")[1];

  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);
  const userDetails = JSON.parse(localStorage.getItem("userData"));
  const activeInstitutionData = JSON.parse(localStorage.getItem("activeInstitutionData"));
  const institutionName = activeInstitutionData?.name;

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = (e) => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleChangeFxn = (e) => {
    // alert("navigate to teacher");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <section className={cx(styles.dashboardHeaderContainer, "flexRow", "")}>

      <Navbar collapseOnSelect expand="lg" className={cx(styles.navbarContainer, "flexRow")}>
        <div
          className={cx(styles.dashboardToggler, "btn-toggle")}
          onClick={() => handleToggleSidebar(true)}
        >
          <FaBars />
        </div>
        {userCategory !== "proprietor" && userCategory !== "teacher" && <Navbar.Brand className={cx(styles.siteLogo)}>
          <Link to={`/${userCategory}/dashboard`}><img src={Logo} alt="" /></Link>
        </Navbar.Brand>}

        <Navbar.Toggle className={cx(styles.navbarToggler)} aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className={cx(styles.navbarCollapse)} id="responsive-navbar-nav" >

          <div className={cx(styles.contentWrapper, "flexRow", userCategory === "proprietor" || (userCategory === "teacher" && rootPath !== "profile") ? styles.reducedWidth : styles.fullWidth)}>

            {/* <div className={cx(styles.searchComponentDiv, "flexRow")}>
              <Icon icon="ei:search" color="#c4c4c4" width="28" />
              <input
                placeholder={"Search"}
                type="text"
              />
            </div> */}

            {userCategory === "teacher" &&
              <div className={cx(styles.switcher, "flexRow")}>
                <div className={cx(styles.infoDiv, "flexRow")}>
                  <span>Class: </span><span>{classDetails?.name}</span>
                </div>
                <Button onClick={() => navigate("/select-class/teacher")} type title="Switch Class" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#D25B5D" hoverColor="#000" />
              </div>
            }

            {userCategory === "proprietor" &&
              <div className={cx(styles.switcher, "flexRow")}>
                <div className={cx(styles.infoDiv, "flexRow")}>
                  <span>Institution: </span><span>{institutionName && titleCase(institutionName)}</span>
                </div>
                <Button onClick={() => navigate("/select-institution/proprietor")} type title="Switch Institution" borderRadiusType="fullyRounded" textColor="#FFF" bgColor="#D25B5D" hoverColor="#000" />
              </div>
            }

            {/* {rootPath === "teachers" && <div style={{ width: "100%", display: "flex", gap: "1rem", justifyContent: "center" }}>
              <p style={{ color: "#828282", whiteSpace: "nowrap" }} >Switch to Teacher Experience</p>
              <div className={cx(styles.togglerDiv)}>
                <FormCheck
                  type="switch"
                  onChange={(e) => toggleChangeFxn(e)}
                />
              </div>
            </div>} */}

            {
              <div className={cx(styles.profileDiv, "flexRow")}>

                {userCategory === "teacher" && <Button onClick={() => dispatch(showModal({ action: "show", type: "urgentInfoTeacher" }))} type title="Send Urgently" borderRadiusType="fullyRounded" textColor="#fff" bgColor="#D25B5D" bordercolor="#D25B5D" />
                }

                {userCategory !== "teacher" && <NavLink to="dashboard">
                  {({ isActive }) => (
                    <div className={cx(isActive ? styles.navLinkActive : styles.navLink)}>
                      <div><img src={isActive ? dashboardIconActive : dashboardIcon} alt="" /></div>
                      <span>Dashboard</span>
                    </div>
                  )}
                </NavLink>}

                {userCategory === "student" && <> <NavLink to="class-gist">
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

                <NavLink to="tasks">
                  {({ isActive }) => (
                    <div className={cx(isActive ? styles.navLinkActive : styles.navLink)}>
                      <div><img src={isActive ? myClassesIconActive : myClassesIcon} alt="" /></div>
                      <span>Tasks</span>
                    </div>
                  )}
                </NavLink>
                </>
                }

                {userCategory === "guardian" &&
                  <>
                    <NavLink to="messages">
                      {({ isActive }) => (
                        <div className={cx(isActive ? styles.navLinkActive : styles.navLink)}>
                          <div><img src={isActive ? messagesIconActive : messagesIcon} alt="" /></div>
                          <span>Messages</span>
                        </div>
                      )}
                    </NavLink>

                    <NavLink to="submissions">
                      {({ isActive }) => (
                        <div className={cx(isActive ? styles.navLinkActive : styles.navLink)}>
                          <div><img src={isActive ? myClassesIconActive : myClassesIcon} alt="" /></div>
                          <span>Submissions</span>
                        </div>
                      )}
                    </NavLink>

                    <NavLink to="tasks">
                      {({ isActive }) => (
                        <div className={cx(isActive ? styles.navLinkActive : styles.navLink)}>
                          <div><img src={isActive ? myClassesIconActive : myClassesIcon} alt="" /></div>
                          <span>Tasks</span>
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

                    {userCategory !== "proprietor" ? <DropdownItem onClick={() => navigate("profile")}>Profile</DropdownItem> :
                      <DropdownItem onClick={() => navigate("settings")}>Settings</DropdownItem>}
                    <DropdownItem onClick={() => handleLogout()}>Logout</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            }
          </div>

        </Navbar.Collapse>
      </Navbar>

      {modalState === "show" && modalType === "urgentInfoTeacher" && <Modal show >{<UrgentInfoTeacherModal />}</Modal>}

    </section>
  );
};

export default Header;