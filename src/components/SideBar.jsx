import React from "react";
import "../blocks/SideBar.css";
import Avatar from "../images/Avatar.png"; // Update if needed

function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__user-inline">
        <img
          src={Avatar}
          alt="User Avatar"
          className="sidebar__avatar"
        />
        <p className="sidebar__greeting">Terrence Tegegne</p>
      </div>
    </aside>
  );
}

export default SideBar;
