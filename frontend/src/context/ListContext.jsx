import React, { createContext, useEffect, useState } from "react";

import axios from "axios";
export const ListContext = createContext();

export const ListProvider = ({ children }) => {
  const [currentProjectId, setCurrentProjectId] = useState("");
  const [currentProjectContentId, setCurrentProjectContentId] = useState("");
  const [listData, setListData] = useState([]);
  const [allProjectContentData, setAllProjectContentData] = useState();
  const [token, setToken] = useState(localStorage.getItem("token") || "")

  const url = process.env.REACT_APP_BASE_URL;

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

  useEffect(() => {
    if (token) {
      fetchAllProjectsHandler();
    }
    else{
      setListData([])
    }
  }, [token]);

  const contextValue = {
    url,
    token,
    setToken,
    listData,
    currentProjectId,
    setListData,
    setCurrentProjectId,
    currentProjectContentId,
    setCurrentProjectContentId,
    allProjectContentData,
    setAllProjectContentData,
    fetchAllProjectContentData
  };

  return (
    <ListContext.Provider value={contextValue}>
      {children}
    </ListContext.Provider>
  );
};
