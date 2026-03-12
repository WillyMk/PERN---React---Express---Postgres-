import React from "react";

const Header = ({ adminName }) => {
  return (
    <div className="header">
      <div className="title">School Admin Panel</div>
      <div className="user-actions">
        <span className="admin-name">{adminName}</span>
        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default Header;