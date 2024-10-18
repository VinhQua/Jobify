import React from "react";
import links from "../utils/links";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const NavLinks = ({ toggleSideBar }) => {
  const { user } = useSelector((store) => store.user);
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { id, text, path, icon } = link;
        if (
          user.role !== "super-admin" &&
          ["all admins", "add admin"].includes(text)
        )
          return;
        return (
          <NavLink
            key={id}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            to={path}
            onClick={toggleSideBar}
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
