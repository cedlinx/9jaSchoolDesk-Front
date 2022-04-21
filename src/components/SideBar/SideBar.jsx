import React, {useEffect} from "react";
import "./SideBar.scss";
import {useDispatch, useSelector} from "react-redux"; 
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
	ProSidebar,
	Menu,
	MenuItem,
	SubMenu,
	SidebarHeader,
	SidebarFooter,
	SidebarContent
} from "react-pro-sidebar";

import {logout} from "@/redux/User/user.action";

// import "react-pro-sidebar/dist/css/styles.css";
// import logo from "@/assets/images/Transparent logo.png";
import dashboardIcon from "@/assets/icons/dashboard-icon.svg";
import assetIcon from "@/assets/icons/asset-icon.svg";
import profileIcon from "@/assets/icons/profile-icon.svg";
import logoutIcon from "@/assets/icons/logout-icon.svg";
import billingsIcon from "@/assets/icons/billings-icon.svg";

import dashboardIconActive from "@/assets/icons/dashboard-active.svg";
import assetIconActive from "@/assets/icons/assets-active.svg";
import profileIconActive from "@/assets/icons/profile-active.svg";
import logoutIconActive from "@/assets/icons/logout-active.svg";
import billingsIconActive from "@/assets/icons/billings-active.svg";
import { getUserInfo } from "@/redux/User/user.action";


const Aside = ({ rtl, toggled, handleToggleSidebar }) => {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	// const actualPath = location.pathname.match(/([^/]+$)/);
	const actualPath = location.pathname.split("/").pop();

	useEffect(() => {
		dispatch(getUserInfo());
	});

	const userDetails = JSON.parse(localStorage.getItem("loginData")).logged_in_user;
	const userRole = userDetails?.group?.name;
	
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
					<div className="flexRow" >
						<img
							src={""}
							alt="logo"
							className="user-image"
							onClick={()=>navigate("/")}

						/>
					</div>
				</div>
			</SidebarHeader>

			<SidebarContent>

				<Menu iconShape="">

					<MenuItem
						active={actualPath === "individual-dashboard" || actualPath === "enterprise-dashboard" || actualPath === "superAdmin-dashboard" ? "true" : ""}
						prefix={<span className="menuIcon"><img src={actualPath === "individual-dashboard" || actualPath === "enterprise-dashboard" || actualPath === "superAdmin-dashboard" ? dashboardIconActive : dashboardIcon} alt="" /></span>}
					>
						<NavLink to={""}>
							Dashboard
						</NavLink>
					</MenuItem>

				</Menu>

				{/* Individual User Menu Group */}
				{(location.pathname.toLowerCase().includes("individual")) ? 
					(
						<>
							<Menu iconShape="">
								<SubMenu
									active={actualPath === "add-new-asset" || actualPath === "all-assets" || actualPath === "transfer-asset" ? "true" : ""}

									prefix={<span className="menuIcon"><img src={actualPath === "add-new-asset" || actualPath === "all-assets" || actualPath === "transfer-asset" ? assetIconActive : assetIcon} alt="" /></span>}

									title="Assets"
									data-element={location.pathname}
								>
									<MenuItem>
										<NavLink  to={"add-new-asset"}>Add New</NavLink>
									</MenuItem>
									<MenuItem >
										<NavLink  to={"all-assets"}>All Assets</NavLink>
									</MenuItem>
									<MenuItem >
										<NavLink  to={"transfer-asset"}>Transfer Asset</NavLink>
									</MenuItem>
								</SubMenu>
							</Menu>

							<Menu iconShape="">
								<MenuItem
									active={actualPath === "profile" ? "true" : ""}
									prefix={<span className="menuIcon"><img src={actualPath === "profile" ? profileIconActive : profileIcon} alt="" /></span>}
								>
									<NavLink  to={"profile"}>Profile</NavLink>
								</MenuItem>
							</Menu> 

							<Menu iconShape="">
								<MenuItem
									active={actualPath === "billings" ? "true" : ""}
									prefix={<span className="menuIcon"><img src={actualPath === "billings" ? billingsIconActive : billingsIcon} alt="" /></span>}
								>
									<NavLink to={"billings"}>Billings</NavLink>
								</MenuItem>
							</Menu>
						</>
					) : null }

				{/* Business User Menu Group */}
				{(location.pathname.toLowerCase().includes("business")) ? <>
					<Menu iconShape="">
						<SubMenu
							active={actualPath === "add-new-asset" || actualPath === "all-assets" || actualPath === "transfer-asset" ? "true" : ""}

							prefix={<span className="menuIcon"><img src={actualPath === "add-new-asset" || actualPath === "all-assets" || actualPath === "transfer-asset" ? assetIconActive : assetIcon} alt="" /></span>}

							title="Assets"
							data-element={location.pathname}
						>
							<MenuItem>
								<NavLink  to={"add-new-asset"}>Add New</NavLink>
							</MenuItem>
							<MenuItem >
								<NavLink  to={"all-assets"}>All Assets</NavLink>
							</MenuItem>
							<MenuItem >
								<NavLink  to={"transfer-asset"}>Transfer Asset</NavLink>
							</MenuItem>
						</SubMenu>
					</Menu>

					<Menu iconShape="">
						<MenuItem
							active={actualPath === "users" ? "true" : ""}
							prefix={<span className="menuIcon"><img src={actualPath === "users" ? billingsIconActive : billingsIcon} alt="" /></span>}
						>
							<NavLink  to={"users"}>Users</NavLink>
						</MenuItem>
					</Menu>

					<Menu iconShape="">
						<MenuItem
							active={actualPath === "profile" ? "true" : ""}
							prefix={<span className="menuIcon"><img src={actualPath === "profile" ? profileIconActive : profileIcon} alt="" /></span>}
						>
							<NavLink  to={"profile"}>Profile</NavLink>
						</MenuItem>
					</Menu> 

					<Menu iconShape="">
						<MenuItem
							active={actualPath === "billings" ? "true" : ""}
							prefix={<span className="menuIcon"><img src={actualPath === "billings" ? billingsIconActive : billingsIcon} alt="" /></span>}
						>
							<NavLink to={"billings"}>Billings</NavLink>
						</MenuItem>
					</Menu>

					<Menu iconShape="">
						<MenuItem
							active={actualPath === "analysis" ? "true" : ""}
							prefix={<span className="menuIcon"><img src={actualPath === "analysis" ? billingsIconActive : billingsIcon} alt="" /></span>}
						>
							<NavLink  to={"analysis"}>Analysis</NavLink>
						</MenuItem>
					</Menu>

				</> : null}


				{/* Super Admin Menu Group */}
				{(location.pathname.toLowerCase().includes("superadmin")) ? 
					<>

						<Menu iconShape="">
							<SubMenu
								active={actualPath === "add-new-asset" || actualPath === "all-assets" || actualPath === "asset-category" ? "true" : ""}

								prefix={<span className="menuIcon"><img src={actualPath === "add-new-asset" || actualPath === "all-assets" || actualPath === "asset-category" ? assetIconActive : assetIcon} alt="" /></span>}

								title="Assets"
								data-element={location.pathname}
							>
								{/* <MenuItem>
									<NavLink  to={"add-new-asset"}>Add New</NavLink>
								</MenuItem> */}
								<MenuItem >
									<NavLink  to={"all-assets"}>All Assets</NavLink>
								</MenuItem>
								<MenuItem >
									<NavLink  to={"asset-category"}>Asset Category</NavLink>
								</MenuItem>
								
								
							</SubMenu>
						</Menu>

						<Menu iconShape="">
							<MenuItem
								active={actualPath === "account" ? "true" : ""}
								prefix={<span className="menuIcon"><img src={actualPath === "account" ? profileIconActive : profileIcon} alt="" /></span>}
							>
								<NavLink  to={"account"}>Account</NavLink>
							</MenuItem>
						</Menu> 

						<Menu iconShape="">
							<MenuItem
								active={actualPath === "reported-assets" ? "true" : ""}
								prefix={<span className="menuIcon"><img src={actualPath === "reported-assets" ? billingsIconActive : billingsIcon} alt="" /></span>}
							>
								<NavLink  to={"reported-assets"}>Reports Assets</NavLink>
							</MenuItem>
						</Menu>

						<Menu iconShape="">
							<MenuItem
								active={actualPath === "settings" ? "true" : ""}
								prefix={<span className="menuIcon"><img src={actualPath === "settings" ? billingsIconActive : billingsIcon} alt="" /></span>}
							>
								<NavLink  to={"settings"}>Settings</NavLink>
							</MenuItem>
						</Menu>

					</> : null}
				
			</SidebarContent>

			<SidebarFooter>
				<Menu iconShape="">

					<MenuItem
						active={actualPath === "logout" ? "true" : ""}
						prefix={<span className="menuIcon"><img src={actualPath === "logout" ? logoutIconActive : logoutIcon} alt="" /></span>}
						onClick={handleLogout}
					>
						<p style={{marginBottom: "0rem"}} >LogOut</p>
					</MenuItem>

				</Menu>
			</SidebarFooter>
		</ProSidebar>
	);
};

export default Aside;
