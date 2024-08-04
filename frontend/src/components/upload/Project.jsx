import React, { useContext, useEffect, useState } from "react";
import utube_icon from "../../assets/utube_icon.png";
import UploadPopup from "./UploadPopup";
import Sidebar from "./Sidebar";
import "./Project.css"; // Assuming you have a CSS file for this component
import home_blue from "../../assets/home_blue.png";
import arrow_drop_down from "../../assets/arrow_drop_down.png";
import uk_logo from "../../assets/uk_logo.png";
import notification from "../../assets/notification.png";
import axios from "axios";
import { ListContext } from "../../context/ListContext";
import { useNavigate, useParams } from "react-router-dom";

const Project = () => {
  const { url, token, currentProjectId } = useContext(ListContext);
  const navigate = useNavigate();

  const { id } = useParams();

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const [projectData, setProjectData] = useState({});

  const fetchProjectData = async () => {
    console.log("Call fetchProjectData...", token);
    // console.log("id ", id);
    const response = await axios.get(
      `${url}/api/project/getProject/${id}`,
      { headers: { token } }
    );

    if (response.data.success) {
      console.log("project fetch successful:", response.data);
      setProjectData(response.data.project);
    } else {
      console.error("project fetch failed:", response.data.message);
    }
  };

  useEffect(() => {
    if (id) {
      // Ensure this runs only when id is set or change
      fetchProjectData();
    }
  }, [id]);

  return (
    <div className="project-container">
      <Sidebar />
      <div className={`content ${isPopupVisible ? "blur" : ""}`}>
        <div className="navigationStrip">
          <div className="navigationStripLeft">
            <img className="homeIcon" src={home_blue} onClick={()=>navigate("/")} alt="" />
            <p onClick={() => navigate(`/list/${id}`)}>{`/ ${projectData?.name}`} / <span>Upload</span></p>
          </div>
          <div className="navigationStripRight">
            <img src={arrow_drop_down} alt="" />
            <p>EN</p>
            <div className="ukLogoDiv">
              {" "}
              <img src={uk_logo} alt="" />
            </div>
            <div className="notificationIcon">
              <img src={notification} alt="" />
            </div>
          </div>
        </div>
        <div className="header">
          <h1>Upload</h1>
        </div>
        <div className="upload-options">
          <div className="upload-option" onClick={togglePopup}>
            <img src={utube_icon} alt="YouTube" />
            <p>Upload Youtube Video</p>
          </div>
          <div className="upload-option" onClick={togglePopup}>
            <img src={utube_icon} alt="Spotify" />
            <p>Upload Spotify Podcast</p>
          </div>
          <div className="upload-option" onClick={togglePopup}>
            <img src={utube_icon} alt="RSS Feed" />
            <p>Upload from RSS Feed</p>
          </div>
          <div className="upload-option" onClick={togglePopup}>
            <img src={utube_icon} alt="YouTube" />
            <p>Upload Youtube Video</p>
          </div>
          <div className="upload-option" onClick={togglePopup}>
            <img src={utube_icon} alt="Spotify" />
            <p>Upload Spotify Podcast</p>
          </div>
          <div className="upload-option" onClick={togglePopup}>
            <img src={utube_icon} alt="RSS Feed" />
            <p>Upload from RSS Feed</p>
          </div>
        </div>
      </div>
      <div className="fileUploadPopup">{isPopupVisible && <UploadPopup onClose={togglePopup} />}</div>
    </div>
  );
};

export default Project;
