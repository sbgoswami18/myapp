import React, { useContext } from 'react';
import logo from '../../assets/logo.png';
import './Sidebar.css';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import sidebar_setting_black from "../../assets/sidebar_setting_black.png";
import sidebar_setting_white from "../../assets/sidebar_setting_white.png";
import { ListContext } from '../../context/ListContext';

const Sidebar = () => {
  const location = useLocation();
  const { currentProjectId } = useContext(ListContext);
  const { id } = useParams();

  const projId = id || currentProjectId;

//   const isActive = (path) => location.pathname.startsWith(path);
  const isActive = () => {
    return location.pathname.includes('project') || 
           location.pathname.includes('list') || 
           location.pathname.includes('editList');
  };

  const settingsIcon = location.pathname.includes("/settings")
    ? sidebar_setting_black
    : sidebar_setting_white;

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="LAMA logo" />
        <p>LAMA.</p>
      </div>
      <div className="sideBarListingText">
        <p>{isActive("/project") ? "Podcast Upload Flow" : "Sample Project Name"}</p>
        <ul className="sideBarListing">
          <NavLink to={`/project/${projId}`}>
            <li className={isActive("/project") ? "active" : ""}>
              <span className="number">1</span> Project
            </li>
          </NavLink>
          <NavLink to={`/widget/${projId}`}>
            <li className={location.pathname.includes(`/widget`) ? "active" : ""}>
              <span className="number">2</span> Widget Configurations
            </li>
          </NavLink>
          <NavLink to={`/settings/${projId}`} className="settingBar">
            <li className={location.pathname.includes(`/settings`) ? "active" : ""}>
              <span>
                <img className="setting_icon" src={settingsIcon} alt="" />
              </span>{" "}
              Settings
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};


export default Sidebar;
