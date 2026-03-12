import React, { useState } from "react";
import { 
  Home, Users, Book, Settings, Layers, Clipboard, FileText, Calendar, ChevronLeft, ChevronRight, GraduationCap
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
    { name: "Students", icon: <Users size={20} />, path: "/students" },
    { name: "Teachers", icon: <Users size={20} />, path: "/teachers" },
    { name: "Classrooms", icon: <Layers size={20} />, path: "/classrooms" },
    { name: "Dormitories", icon: <Layers size={20} />, path: "/dormitories" },
    { name: "Teacher Duties", icon: <Clipboard size={20} />, path: "/teacher-duties" },
    { name: "Marks", icon: <FileText size={20} />, path: "/marks" },
    { name: "Subjects", icon: <Book size={20} />, path: "/subjects" },
    { name: "School Terms", icon: <Calendar size={20} />, path: "/school-terms" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <div className="logo-area">
          <div className="logo-icon">
            <GraduationCap size={28} />
          </div>
          {!collapsed && (
            <div className="logo-text">
              <span className="school-name">EduManage</span>
              <span className="school-tagline">School System</span>
            </div>
          )}
        </div>
        <div className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </div>
      </div>
      <ul className="menu">
        {menuItems.map((item, idx) => (
          <li 
            key={idx} 
            className={`menu-item ${location.pathname === item.path ? "active" : ""}`}
            onClick={() => handleNavigation(item.path)}
          >
            {item.icon}
            {!collapsed && <span className="menu-text">{item.name}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;