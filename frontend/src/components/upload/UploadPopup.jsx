import axios from 'axios';
import React, { useContext, useState } from 'react';
// import './UploadPopup.css'; // Ensure you have appropriate styling
import { useNavigate } from 'react-router-dom';
import { ListContext } from '../../context/ListContext';

const UploadPopup = ({ onClose, fetchAllProjectContentData }) => {
  const { url, currentProjectId, token } = useContext(ListContext);

  const [projectName, setProjectName] = useState('');
  const [projectDes, setProjectDes] = useState('');
  const navigate = useNavigate();

  const handleCreate = async (event) => {
    event.preventDefault();

    const response = await axios.post(`${url}/api/projectContent/createProjectContent`, {name: projectName, description: projectDes, projectId: currentProjectId}, { headers: { token } })
    if(response.data.success) {
      console.log('projectContent created successful:', response.data);
      await fetchAllProjectContentData();
    }
    else {
      console.error('projectContent creation failed:', response.data.message);
    }

    onClose(); // Close the popup after creation
    navigate(`/list/${currentProjectId}`);
  };

  return (
   <div className='popUpRegistration'> <div className="popup-container">
      <div className="popup-header">
        <h2>Upload</h2>
      </div>

      <div className="popup-body">
        <form onSubmit={handleCreate}>
          <div className="form-group">
            <label htmlFor="projectName">Name</label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="projectdes">Description</label>
            <input
              type="text"
              id="projectdes"
              name="projectdes"
              value={projectDes}
              onChange={(e) => setProjectDes(e.target.value)}
              required
            />
          </div>

          <div className="popup-footer">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Upload</button>
          </div>
        </form>
      </div>
    </div></div>
  );
};

export default UploadPopup;
