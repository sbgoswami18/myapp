import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/project/Home';
import Project from './components/upload/Project';
import List from './components/upload/List';
import EditList from './components/upload/EditList';
import { ListProvider } from './context/ListContext';
import Widget from './components/widget/Widget';
import Settings from './components/settings/Settings';

const App = () => {
  return (
    <ListProvider>
      <Routes>
        <Route path='/project/:id' element={<Project />} />
        <Route path='/list/:id' element={<List />} />
        <Route path='/editList' element={<EditList />} />
        <Route path='/widget/:id' element={<Widget />} />
        <Route path='/settings/:id' element={<Settings />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </ListProvider>
  );
};

export default App;
