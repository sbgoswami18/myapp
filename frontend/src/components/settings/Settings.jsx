import React, { useContext, useEffect, useState } from 'react';
import home_blue from '../../assets/home_blue.png';
import arrow_drop_down from '../../assets/arrow_drop_down.png';
import uk_logo from '../../assets/uk_logo.png';
import upload_area from '../../assets/upload_area.png'; // Import the placeholder image
import notification from '../../assets/notification.png';
import './Settings.css';
import Sidebar from '../upload/Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ListContext } from '../../context/ListContext';

const Settings = () => {
    const { url, token } = useContext(ListContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        _id: '',
    });
    const [profileIcon, setProfileIcon] = useState(null);
    const [profileIconUrl, setProfileIconUrl] = useState(upload_area); // Set the placeholder image as default

    const fetchUserDataHandler = async () => {
        try {
            const response = await axios.get(
                `${url}/api/user/userData`, 
                { headers: { token } }
            );

            if (response.data.success) {
                console.log("User data fetch successful:", response.data);
                setUserData(response.data.userDetails);
                setProfileIconUrl(response.data.userDetails.userImage || upload_area); // Use the placeholder if no image
            } else {
                console.error("User data fetch failed:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const fetchUpdatedUserDataHandler = async () => {
        const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('userId', userData._id);
        if (profileIcon) {
            formData.append('image', profileIcon);
        }

        try {
            const response = await axios.put(
                `${url}/api/user/userDataUpdate`,
                formData, 
                { headers: { token, 'Content-Type': 'multipart/form-data' } }
            );

            if (response.data.success) {
                console.log("User data update successful:", response.data.updatedUserDetails);
                setUserData(response.data.updatedUserDetails);
                setProfileIconUrl(response.data.updatedUserDetails.userImage || upload_area); // Use the placeholder if no image
            } else {
                console.error("User data update failed:", response.data.message);
            }
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    const handleSave = () => {
        fetchUpdatedUserDataHandler();
    };

    const handleDisplayInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileIcon(file);
            const imageUrl = URL.createObjectURL(file);
            setProfileIconUrl(imageUrl);
        }
    };

    useEffect(() => {
        fetchUserDataHandler();
    }, []);

    return (
        <div className="project-container">
            <Sidebar />
            <div className="content">
                <div className='navigationStrip'>
                    <div className='navigationStripLeft'>
                        <img className="homeIcon" src={home_blue} onClick={() => navigate("/")} alt="" />
                        <p>/ <span> Account Settings</span></p>
                    </div>
                    <div className='navigationStripRight'>
                        <img src={arrow_drop_down} alt='' />
                        <p>EN</p>
                        <div className="ukLogoDiv"><img src={uk_logo} alt='' /></div>
                        <div className="notificationIcon"><img src={notification} alt='' /></div>
                    </div>
                </div>
                <div className="header">
                    <h1>Account Settings</h1>
                </div>
                <div className="profile-subscription">
                    <div className="profile-header">
                        <div className="form-group">
                            <label>Profile Icon</label>
                            <div className='iconUploadBox'>
                                <div className='circleIconHolder' style={{ backgroundImage: `url(${profileIconUrl})` }}></div>
                                <div className="upload-btn-wrapper">
                                    <button className="btn">Upload Image</button>
                                    <input 
                                        type="file" 
                                        name="profileIcon" 
                                        accept="image/*"
                                        onChange={handleDisplayInputChange} 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="profile-details">
                            <div className="profile-field">
                                <label>User Name</label>
                                <input
                                    type="text"
                                    value={userData.name}
                                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                />
                            </div>
                            <div className="profile-field">
                                <label>Email</label>
                                <input type="email" value={userData.email} readOnly />
                            </div>
                        </div>
                    </div>
                    <button className="save-button" onClick={handleSave}>Save</button>
                    <div className="subscription-section">
                        <h2>Subscriptions</h2>
                        <div className="subscription-plan">
                            <span>You are currently on the <strong><span className='textUnderLine'>Ques AI Basic Plan!</span></strong></span>
                            <button className="upgrade-button">Upgrade</button>
                        </div>
                        <button className="cancel-button">Cancel Subscription</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
