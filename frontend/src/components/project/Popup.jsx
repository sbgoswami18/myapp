import React, { useContext, useEffect, useState } from 'react';
import './Popup.css'; // Ensure you have appropriate styling
import { ListContext } from '../../context/ListContext';
import axios from "axios"

const Popup = ({ onClose }) => {
  const {url, token, setListData, listData} = useContext(ListContext);

  const [projectName, setProjectName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreate = (event) => {
    event.preventDefault();
    if (projectName.trim() === '') {
      setErrorMessage("Project Name can't be empty");
    } else {
      // Handle project creation logic
      setErrorMessage('');
      onClose(); // Close the popup after creation
    }
  };

  const createProjectHandler = async () => {
    const response = await axios.post(`${url}/api/project/createProject`, {name: projectName}, { headers: { token } })

    if(response.data.success) {
      console.log('Create project successful:', response.data);
      fetchAllProjectsHandler();
    }
    else {
      console.error('Create project failed:', response.data.message);
    }
  }


  const fetchAllProjectsHandler = async () => {
    try {
      const response = await axios.get(`${url}/api/project/getProjects`, {
        headers: { token },
      });

      if (response.data.success) {
        setListData(response.data.projects);
      } else {
        console.error("All projects fetch failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  return (
    <div className='popUpRegistration'><div className="popup-container">
      <div className="popup-header"> {/* popup-header */}
        <h2>Create Project</h2>
      </div>

      <div className="popup-body">
        <form onSubmit={handleCreate}>
          <div className="form-group">
            <label htmlFor="projectName">Enter Project Name:</label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              placeholder='Type here'
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className={errorMessage ? 'input-error' : ''}
              required
            />
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="popup-footer border-none">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit" onClick={createProjectHandler}>Create</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Popup;
