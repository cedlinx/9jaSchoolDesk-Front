import React from "react";
import { NavLink } from "react-router-dom";
import shortId from "shortid";

import "./style.scss";

const SideBar = ({ routes = [] }) => {
	const upperMenuLinks = routes.filter(({ topMenu }) => topMenu);
	const lowerMenuLinks = routes.filter(({ topMenu }) => !topMenu);

	return (
		<div className="sidebar">
			<nav className="sidebar__nav">
				<ul className="sidebar-menu-items">
					{upperMenuLinks.map(({ path, name, exact, icon: Icon }) => (
						<li key={shortId.generate()} className="menu__item">
							<NavLink exact={exact} to={path} activeClassName="sidebar__nav-active">
								<Icon className="menu--icon" />
							</NavLink>
							<div className="hover__state hover--active">{name}</div>
						</li>
					))}
				</ul>
				<ul className="sidebar-menu-items">
					{lowerMenuLinks.map(({ path, name, exact, icon: Icon }) => (
						<li key={shortId.generate()} className="menu__item">
							{path ? (
								<NavLink
									exact={exact}
									to={path}
									activeClassName={`${
										name !== "Profile" ? "sidebar__nav-active" : ""
									}`}
								>
									<Icon className="menu--icon" />
								</NavLink>
							) : (
								<Icon className="menu--icon" />
							)}

							<div className="hover__state hover--active">{name}</div>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
};

export default SideBar;
