import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { ListContext } from '../../context/ListContext';
import home_blue from "../../assets/home_blue.png";
import arrow_drop_down from "../../assets/arrow_drop_down.png";
import uk_logo from "../../assets/uk_logo.png";
import notification from "../../assets/notification.png";
import './EditList.css';
import axios from 'axios';

const EditList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const { item } = location.state;
  // console.log("item.des ", item.des)
  // const { updateListItemDescription } = useContext(ListContext);
  const {currentProjectContentId, currentProjectId, url, token} = useContext(ListContext)

  const [description, setDescription] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchProjectContent = async () => {
    console.log("fetchProjectContent...")

    const response = await axios.get(
      `${url}/api/projectContent/getProjectContent/${currentProjectContentId}`,
      { headers: { token } }
    );

    if (response.data.success) {
      console.log("ProjectContent fetch successful:", response.data);
      setDescription(response.data.projectContent.description);
    } else {
      console.error("ProjectContent fetch failed:", response.data.message);
    }
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const response = await axios.put(`${url}/api/projectContent/editProjectContent`, {projectContentId: currentProjectContentId, description}, { headers: { token } })

    if(response.data.success) {
      console.log('projectContent edited successful:', response.data);
    }
    else {
      console.error('projectContent edtion failed:', response.data.message);
    }

    navigate(`/list/${currentProjectId}`);

    // updateListItemDescription(item.name, description);
    // navigate('/list');  // Navigate back to the list after saving
  };

  const handleDiscard = () => {
    // setDescription(item.des);  // Reset description to initial value
    console.log('Changes discarded');
    navigate(`/list/${currentProjectId}`);

    // navigate('/list');  // Navigate back to the list after changes discard
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  useEffect(() => {
    fetchProjectContent();
  }, [])

  return (
    <div className="project-container">
      <Sidebar />
      <div className='content'>
        <div>
          <div className='navigationStrip'>
            <div className='navigationStripLeft'>
              <img src={home_blue} onClick={()=>navigate("/")} alt='' />
              <p>/ Sample Project / <span>Description</span></p>
            </div>
            <div className='navigationStripRight'>
              <img src={arrow_drop_down} alt='' />
              <p>EN</p>
            <div className="ukLogoDiv"> <img src={uk_logo} alt='' /></div>
              <div className="notificationIcon"><img src={notification} alt='' /></div>
            </div>
          </div>
          <div className="header">
            <h1>Edit Description</h1>
            {
            isEditMode && (
              <div>
                <button className='discardButton' onClick={handleDiscard} disabled={!isEditMode}>Discard</button>
                <button className='saveExitButton' onClick={handleSave} disabled={!isEditMode}>Save & exit</button>
              </div>
            )
          }
          </div>

          
        </div>
        <div className='editorPanel'>
          <div className='editButton'>
            <button onClick={toggleEditMode}>
              {isEditMode ? "Disable Edit Mode" : "Enable Edit Mode"}
            </button>
          </div>
          <div className='editorTextBox'>
            <textarea 
              value={description} 
              onChange={handleDescriptionChange} 
             
              disabled={!isEditMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditList;
