import React, { useContext, useEffect, useState } from 'react';
import utube_icon from "../../assets/utube_icon.png";
import './List.css';
import Sidebar from './Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { ListContext } from './../../context/ListContext';
import home_blue from "../../assets/home_blue.png";
import arrow_drop_down from "../../assets/arrow_drop_down.png";
import uk_logo from "../../assets/uk_logo.png";
import notification from "../../assets/notification.png";
import axios from 'axios';
import UploadPopup from './UploadPopup';

const List = () => {
  const { currentProjectId, token, url, setCurrentProjectContentId, setCurrentProjectId, currentProjectContentId } = useContext(ListContext);
  const navigate = useNavigate();

  const { id } = useParams();

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [allProjectContentData, setAllProjectContentData] = useState();

  const [projectData, setProjectData] = useState({});

  useEffect(() => {
    if (id) {
      // Ensure this runs only when id is set or change
      fetchProjectData();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      setCurrentProjectId(id); // Set the project ID in context
      // fetchAllProjectContentData(id); // Fetch data with the project ID from URL
    } else {
      console.log("No project ID found in URL");
    }
  }, [id]);

  useEffect(() => {
    if (currentProjectId) {
      // Ensure this runs only when currentProjectId is set or change
      fetchAllProjectContentData();
    }
  }, [currentProjectId]);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleEdit = (item) => {
    console.log("id ", item._id)
    setCurrentProjectContentId(item._id)
    navigate('/editList');
    // navigate('/editList', { state: { item } });
  };

  const fetchAllProjectContentData = async () => {
    console.log("Call fetchAllProjectContentData...");
    console.log("currentProjectId ", currentProjectId);
    const response = await axios.get(
      `${url}/api/projectContent/getAllProjectContent/${currentProjectId}`,
      { headers: { token } }
    );

    if (response.data.success) {
      console.log("AllProjectContent fetch successful:", response.data.allProjectContent);
      setAllProjectContentData(response.data.allProjectContent);
    } else {
      console.error("AllProjectContent fetch failed:", response.data.message);
    }
  };

  const handleDelete = async (item) => {
    const response = await axios.delete(
      `${url}/api/projectContent/deleteProjectContent/${item._id}`,
      { headers: { token } }
    );

    if (response.data.success) {
      console.log("ProjectContent deleted successful:", response.data);
      await fetchAllProjectContentData()
    } else {
      console.error("ProjectContent delete failed:", response.data.message);
    }
  }

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


  return (
    <div className="projectTask-listing">
      <div className="project-container">
        <Sidebar />
        <div className='content'>
          <div className='navigationStrip'>
            <div className='navigationStripLeft'>
              <img className="homeIcon" src={home_blue} onClick={()=>navigate("/")} alt="" />
              <p onClick={() => navigate(`/list/${id}`)}>{`/ ${projectData?.name}`} / <span>Upload</span></p>
              {/* <p>
                <span className="navigable" onClick={() => navigate(`/list/${id}`)}>{`/ ${projectData?.name}`}</span> / <span>Upload</span>
              </p> */}
            </div>
            <div className='navigationStripRight'>
              <img src={arrow_drop_down} alt='' />
              <p>EN</p>
            <div className="ukLogoDiv"> <img src={uk_logo} alt='' /></div>
              <div className="notificationIcon"><img src={notification} alt='' /></div>
            </div>
          </div>
          <div className="header">
            <h1>Sample Project</h1>
          </div>
          <div className="upload-options">
            <div className="upload-option" onClick={togglePopup}>
              <img src={utube_icon} alt='YouTube' />
              <p>Upload Youtube Video</p>
            </div>
            <div className="upload-option" onClick={togglePopup}>
              <img src={utube_icon} alt='Spotify' />
              <p>Upload Spotify Podcast</p>
            </div>
            <div className="upload-option" onClick={togglePopup}>
              <img src={utube_icon} alt='RSS Feed' />
              <p>Upload from RSS Feed</p>
            </div>
          </div>
          <div className='banner'>
            <p>All files are processed! Your widget is ready to go!</p>
            <button>Try it out!</button>
          </div>
          <div className='list-data'>
            <table className='listDataTable'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allProjectContentData?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>Done</td>
                    <td>
                      <div className='tableActionBtn'>
                        <button onClick={() => handleEdit(item)}>Edit</button>
                        <button onClick={() => handleDelete(item)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="fileUploadPopup">{isPopupVisible && <UploadPopup onClose={togglePopup} fetchAllProjectContentData={fetchAllProjectContentData} />}</div>
    </div>
  );
};

export default List;
