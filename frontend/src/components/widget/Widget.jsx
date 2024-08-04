import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../upload/Sidebar';
import './Widget.css';
import home_blue from '../../assets/home_blue.png';
import arrow_drop_down from '../../assets/arrow_drop_down.png';
import uk_logo from '../../assets/uk_logo.png';
import notification from '../../assets/notification.png';
import { ListContext } from '../../context/ListContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Widget = () => {
  const { url, token } = useContext(ListContext);
  const navigate = useNavigate();

  const [tabName, setTabName] = useState('general');
  const [isDisplayAccessible, setIsDisplayAccessible] = useState(false);

  const [generalData, setGeneralData] = useState({
    chatbotName: "",
    welcomeMessage: "",
    inputPlaceholder: ""
  });

  const [displayData, setDisplayData] = useState({
    primaryColor: '#7BD568',
    fontColor: '#3C3C3C',
    fontSize: '',
    chatHeight: '',
    showSources: false,
    chatIconSize: 'Small (48x48 px)',
    positionOnScreen: 'Bottom Right',
    distanceFromBottom: '',
    horizontalDistance: '',
    botIcon: null
  });

  const [isGeneralComplete, setIsGeneralComplete] = useState(false);

  const { id } = useParams();

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

  const tabNameHandler = (tab) => {
    if ((tab === 'display' && isDisplayAccessible) || tab === 'general') {
      setTabName(tab);
    }
  };

  const handleGeneralInputChange = (e) => {
    const { name, value } = e.target;
    setGeneralData(prevState => ({
      ...prevState,
      [name]: value
    }));

    const allFieldsFilled = Object.values({
      ...generalData,
      [name]: value
    }).every(field => field.trim() !== "");
    setIsGeneralComplete(allFieldsFilled);
  };

  const handleDisplayInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDisplayData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleColorChange = (name, value) => {
    setDisplayData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleGeneralSaveAndNext = async (e) => {
    e.preventDefault();
    if (isGeneralComplete) {
      try {
        const response = await axios.post(
          `${url}/api/widgetGeneral`, 
          generalData, 
          {
            headers: { token }
          }
        );

        if (response.data.success) {
          console.log("General form submitted successfully:", response.data);
          setIsDisplayAccessible(true);
          setTabName('display');
        } else {
          console.error("General form submission failed:", response.data.message);
        }
      } catch (error) {
        console.error("Error submitting general form:", error);
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log('Display Data:', displayData);
    try {
      const response = await axios.post(
        `${url}/api/widgetDisplay`, 
        displayData, 
        {
          headers: { token }
        }
      );

      if (response.data.success) {
        console.log("Display form submitted successfully:", response.data);
        navigate(`/settings`);
      } else {
        console.error("Display form submission failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error submitting display form:", error);
    }
  };

  return (
    <div className="project-container">
      <Sidebar />
      <div className="content">
        <div className='navigationStrip'>
          <div className='navigationStripLeft'>
            <img className="homeIcon" src={home_blue} onClick={() => navigate("/")} alt="" />
            {/* <p>/ Sample Project / <span>Widget Configuration</span></p> */}
            <p onClick={() => navigate(`/list/${id}`)}>{`/ ${projectData?.name}`} / <span>Widget Configuration</span></p>
          </div>
          <div className='navigationStripRight'>
            <img src={arrow_drop_down} alt='' />
            <p>EN</p>
            <div className="ukLogoDiv"><img src={uk_logo} alt='' /></div>
            <div className="notificationIcon"><img src={notification} alt='' /></div>
          </div>
        </div>
        <div className="header">
          <h1>Configuration</h1>
        </div>
        <div className="widget-container">
          <div className="tabs">
            <div onClick={() => tabNameHandler('general')} className={`${tabName === 'general' ? 'tab active' : 'tab'}`}>General</div>
            <div onClick={() => tabNameHandler('display')} className={`${tabName === 'display' ? 'tab active' : 'tab'}`} disabled={!isDisplayAccessible}>Display</div>
            <div className='tab' disabled={true}>Advanced</div>
          </div>

          {tabName === 'general' && (
            <form className="form" onSubmit={handleGeneralSaveAndNext}>
              <div className="form-group">
                <label>Chatbot Name</label>
                <input 
                  type="text" 
                  name="chatbotName" 
                  value={generalData.chatbotName}
                  onChange={handleGeneralInputChange}
                  placeholder="Enter chatbot name" 
                />
              </div>
              <div className="form-group">
                <label>Welcome Message</label>
                <input 
                  type="text" 
                  name="welcomeMessage" 
                  value={generalData.welcomeMessage}
                  onChange={handleGeneralInputChange}
                  placeholder="Enter welcome message" 
                />
              </div>
              <div className="form-group">
                <label>Input Placeholder</label>
                <input 
                  type="text" 
                  name="inputPlaceholder" 
                  value={generalData.inputPlaceholder}
                  onChange={handleGeneralInputChange}
                  placeholder="Enter input placeholder" 
                />
              </div>
              <div className='widgetSaveNext'><button type="submit" disabled={!isGeneralComplete}>Save and Next</button></div>
            </form>
          )}

          {isDisplayAccessible && tabName === 'display' && (
            <form className='form' onSubmit={handleFormSubmit}>
              <div className='formFirstSection'>
                <div className="form-group">
                  <label>Primary Color</label>
                  <div className="input-group">
                    <input 
                      type="text" 
                      name="primaryColor" 
                      value={displayData.primaryColor} 
                      onChange={(e) => handleColorChange('primaryColor', e.target.value)} 
                      style={{ marginRight: '10px' }}
                    />
                    <input   className='colorPickerBox' 
                      type="color" 
                      value={displayData.primaryColor} 
                      onChange={(e) => handleColorChange('primaryColor', e.target.value)} 
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Font Color</label>
                  <div className="input-group">
                    <input
                      type="text" 
                      name="fontColor" 
                      value={displayData.fontColor} 
                      onChange={(e) => handleColorChange('fontColor', e.target.value)} 
                      style={{ marginRight: '10px' }}
                    />
                    <input  className='colorPickerBox' 
                      type="color" 
                      value={displayData.fontColor} 
                      onChange={(e) => handleColorChange('fontColor', e.target.value)} 
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Font Size (in px)</label>
                  <input 
                    type="text" 
                    name="fontSize" 
                    value={displayData.fontSize}
                    onChange={handleDisplayInputChange}
                    placeholder="25" 
                  />
                </div>
                <div className="form-group">
                  <label>Chat Height (in % of total screen)</label>
                  <input 
                    type="text" 
                    name="chatHeight" 
                    value={displayData.chatHeight}
                    onChange={handleDisplayInputChange}
                    placeholder="40" 
                  />
                </div>
                <div className="form-group switch-group">
                  <label>Show Sources</label>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      name="showSources" 
                      checked={displayData.showSources}
                      onChange={handleDisplayInputChange}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>

              <div className="section-header">Chat Icon</div>
              <div className='formFirstSection formFirstSectionBordeNone'>
                <div className="form-group">
                  <label>Chat Icon Size</label>
                  <select 
                    name="chatIconSize" 
                    value={displayData.chatIconSize}
                    onChange={handleDisplayInputChange}
                  >
                    <option>Small (48x48 px)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Position on Screen</label>
                  <select 
                    name="positionOnScreen" 
                    value={displayData.positionOnScreen}
                    onChange={handleDisplayInputChange}
                  >
                    <option>Bottom Right</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Distance from Bottom (in px)</label>
                  <input 
                    type="text" 
                    name="distanceFromBottom" 
                    value={displayData.distanceFromBottom}
                    onChange={handleDisplayInputChange}
                    placeholder="20" 
                  />
                </div>
                <div className="form-group">
                  <label>Horizontal Distance (in px)</label>
                  <input 
                    type="text" 
                    name="horizontalDistance" 
                    value={displayData.horizontalDistance}
                    onChange={handleDisplayInputChange}
                    placeholder="20" 
                  />
                </div>
                <div className="form-group">
                  <label>Bot Icon</label>
                  <div className='iconUploadBox'>
                    <div className='circleIconHolder'></div>
                    <div className="upload-btn-wrapper">
                      <button className="btn">Upload Image</button>
                      <input 
                        type="file" 
                        name="botIcon" 
                        onChange={(e) => handleDisplayInputChange(e)} 
                      />
                      <div className="recommendation">Recommended Size: 48x48px</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="widgetSubmit"><button type="submit">Submit</button></div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Widget;
