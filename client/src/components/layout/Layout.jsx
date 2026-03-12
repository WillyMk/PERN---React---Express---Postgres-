import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Header adminName={'Admin User'} />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;