import React from 'react';
import '../blocks/SideBar.css';

function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__user">
        <img src="/images/Avatar.png" alt="User Avatar" className="sidebar__avatar" />
        <p className="sidebar__username">Terrence Tegegne</p>
      </div>
    </aside>
  );
}

export default SideBar;
