import React, {useEffect} from "react";
import { FaBars } from "react-icons/fa";
import {useSelector, useDispatch} from "react-redux";
import {notificationSummary} from "@/redux/Notifications/notifications.action";
import cx from "classnames";
import styles from "./DashboardHeader.module.scss";
import messageCountIcon from "@/assets/icons/message-count.svg";
import notificationIcon from "@/assets/icons/notification.svg";
import profilePicture from "@/assets/images/default-avatar.png";
import { getUserInfo } from "@/redux/User/user.action";
import { titleCase } from "@/helpers/textTransform";
import InputField from "@/components/Input/Input";
import { Icon } from "@iconify/react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "@/assets/images/Logo.svg";
import Button from "@/components/Button/Button";
import { Navbar, Nav, Dropdown, 
  NavDropdown} from "react-bootstrap";


const Header = (props) => {
  const {handleToggleSidebar} = props;
  const navigate = useNavigate();
	
  const dispatch = useDispatch();
  const unreadNotifications = useSelector((state)=>state?.notifications?.notificationSummaryData?.data?.unread);
  const userDetails = useSelector((state)=>state?.user?.getUserInfoData?.data?.data);

  useEffect(() => {
    // dispatch(notificationSummary());
    // dispatch(getUserInfo());
  },[]);


  return (
    <section className={cx(styles.dashboardHeaderContainer, "flexRow", "")}>

      <Navbar collapseOnSelect expand="lg" className={cx(styles.navbarContainer, "flexRow")}>
        <Navbar.Brand className={cx(styles.siteLogo )}> 		
          <Link to="/"><img src={Logo} alt="" /></Link>
        </Navbar.Brand>

        <Navbar.Toggle className={cx(styles.navbarToggler)} aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className={cx(styles.navbarCollapse)} id="responsive-navbar-nav" >
					
          <div className={cx(styles.contentWrapper, "flexRow")}>
            <div className={cx(styles.searchComponentDiv)}>
              <InputField
                
                label={"Search here"}
                placeholder={""}
                type="text"
                marginbottom={"0px"}
                border={"#c1c7d0"}
              />
            </div>
				
            <div className={cx(styles.profileDiv, "flexRow")}>
              <span className={cx(styles.notificationIconSpan)}><img src={notificationIcon} alt="" /><sup>{unreadNotifications || "9"}</sup></span>
              <span className={cx(styles.dashboardTitle)}>My Classes</span>
              <span className={cx(styles.avatarDiv)}>
                <img className={cx(styles.profilePicture)} src={userDetails && userDetails.avatar ? userDetails.avatar : profilePicture} alt="" />
                <Icon icon="clarity:caret-line" rotate={2} />
              </span>
            </div>

          </div>

        </Navbar.Collapse>
      </Navbar>

   
    </section>
  );
};

export default Header;