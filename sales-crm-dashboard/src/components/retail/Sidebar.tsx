import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "../../data/data"; // Adjust the import path based on your folder structure
import '../../styles/SideBar.css' // Ensure you have this CSS file for styling

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      <div className="bars" style={expanded ? { left: '60%' } : { left: '5%' }} onClick={() => setExpanded(!expanded)}>
        {/* You can add a button or icon here to toggle the sidebar */}
        {/* For example: <UilBars /> */}
      </div>
      <div className={`sidebar ${expanded ? 'open' : 'closed'}`}>
        {/* logo */}
        <div className="logo">
          <img src="../imgs/logo.png" alt="logo" />
          <span>
            Sh<span>o</span>ps
          </span>
        </div>

        {/* menu */}
        <div className="menu">
          {SidebarData.map((item, index) => (
            <Link to={item.path} // Use the path defined in SidebarData
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => setSelected(index)}
            >
              <span>{item.heading}</span>
            </Link>
          ))}
          {/* Sign-out option (if needed) */}
          <div className="menuItem">
            <span>Sign Out</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
