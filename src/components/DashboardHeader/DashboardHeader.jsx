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


const Header = (props) => {
	const {showSearchComponent, handleToggleSidebar} = props;
	
	const dispatch = useDispatch();
	const unreadNotifications = useSelector((state)=>state?.notifications?.notificationSummaryData?.data?.unread);
	const userDetails = useSelector((state)=>state?.user?.getUserInfoData?.data?.data);

	useEffect(() => {
		dispatch(notificationSummary());
		dispatch(getUserInfo());
	},[]);


	return (
		<section className={cx(styles.container, "flexRow", "")}>

			<div
				className={cx(styles.dashboardToggler, "btn-toggle")}
				onClick={() => handleToggleSidebar(true)}
			>
				<FaBars />
			</div>

			<div className={cx(styles.notificationsDiv, "flexRow")}>
				{/* <div className={cx(styles.searchComponentDiv)}>
					<InputField
						icon
						placeholder={"Search here"}
						type="text"
						marginbottom={"0px"}
						border={"#c1c7d0"}
					/>
				</div> */}
				<div className={cx("flexRow", styles.notificationsWrapper)}><span><img src={messageCountIcon} alt="" /><sup>{unreadNotifications}</sup></span>
					<span><img src={notificationIcon} alt="" /><sup>{unreadNotifications}</sup></span></div>
				
				<div className={cx("flexRow")}><span>{userDetails && titleCase(userDetails.name)}</span>
					<img className={cx(styles.profilePicture)} src={userDetails && userDetails.avatar ? userDetails.avatar : profilePicture} alt="" /></div>

			</div>
		</section>
	);
};

export default Header;