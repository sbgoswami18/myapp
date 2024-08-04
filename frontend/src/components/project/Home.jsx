import React, { useContext, useState } from "react";
import logo from "../../assets/logo.png";
import setting from "../../assets/setting.png";
import notification from "../../assets/notification.png";
import home from "../../assets/home.png";
import home_bg from "../../assets/home_bg.png";
import plus from "../../assets/plus.png";
import dp from "../../assets/dp.jpeg";
import Popup from "./Popup";
import "./Home.css";
import LoginPopup from "../LoginPopup/LoginPopup";
import { ListContext } from "../../context/ListContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { token, listData, setCurrentProjectId, setToken } = useContext(ListContext);
  console.log("listData ", listData)

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isLoginPopupVisible, setIsLoginPopupVisible] = useState(false);

  const navigate = useNavigate();

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const toggleLoginPopup = () => {
    if (token) {
      // User is logged in, so log them out
      localStorage.removeItem("token");
      setToken("");
    } else {
      // User is not logged in, show login popup
      setIsLoginPopupVisible(!isLoginPopupVisible);
    }
  };

  const projectClickHandler = (id) => {
    console.log("id ", id);
    setCurrentProjectId(id);
    navigate(`/project/${id}`);
  };

  return (
    <div>
      <div
        className={`container ${
          isPopupVisible || isLoginPopupVisible ? "blur" : ""
        }`}
      >
        <header className="header">
          <div className="logo">
            <img src={logo} alt="LAMA logo" />
            <p>LAMA.</p>
          </div>

          <div className="settings">
            <div className="loginButton">
              <button onClick={toggleLoginPopup}>
                {token ? "Logout" : "Login"}
              </button>
            </div>
            <img src={setting} alt="Settings" />
            <img src={notification} alt="Notifications" />
          </div>
        </header>

        <div className="back-button">
          <button>
            <img src={home} alt="Home" />
            <p>Back to Home</p>
          </button>
        </div>

        <div className="content">
          <h1>Create a New Project</h1>

          {listData.length === 0 ? (
            <div>
              <img src={home_bg} alt="Background" className="home-bg" />
              <p className="description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in
              </p>
            </div>
          ) : (
            <div className="project-cards">
              {listData?.map((project, index) => {
                // Extract the first letter and the second letter (if any)
                const nameParts = project.name.split(" ");
                const initials = nameParts
                  .map((part) => part.charAt(0))
                  .join("")
                  .toUpperCase();

                return (
                  <div
                    key={index}
                    className="project-card"
                    onClick={() => projectClickHandler(project._id)}
                  >
                    {/* <img src={dp} alt='Project Icon' /> */}
                    <div className="projectTitleHolder">{initials}</div>
                    <div className="project-card-content">
                      <h2>{project.name}</h2>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {token && (
            <button className="create-button" onClick={togglePopup}>
              <img src={plus} alt="Plus icon" />
              <p>Create New Project</p>
            </button>
          )}
        </div>
      </div>

      {isPopupVisible && <Popup onClose={togglePopup} />}
      {isLoginPopupVisible && (
        <LoginPopup setShowLogin={setIsLoginPopupVisible} />
      )}
    </div>
  );
};

export default Home;
