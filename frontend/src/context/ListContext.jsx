import React, { createContext, useEffect, useState } from "react";

import axios from "axios";
export const ListContext = createContext();

export const ListProvider = ({ children }) => {
  const [currentProjectId, setCurrentProjectId] = useState("");
  const [currentProjectContentId, setCurrentProjectContentId] = useState("");
  const [listData, setListData] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "")

  const url = "http://localhost:4000";

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
  };

  return (
    <ListContext.Provider value={contextValue}>
      {children}
    </ListContext.Provider>
  );
};
