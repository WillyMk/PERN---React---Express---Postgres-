import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './views/auth/ProtectedRoute';
import Layout from './views/layout/Layout';
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import Dashboard from './views/layout/Dashboard';
// Import other page components here
// import Students from './pages/Students';
// import Teachers from './pages/Teachers';
// etc.

import "./layout.css";

function App() {
  return (
    <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/students" element={<div>Students Page</div>} />
              <Route path="/teachers" element={<div>Teachers Page</div>} />
              <Route path="/classrooms" element={<div>Classrooms Page</div>} />
              <Route path="/dormitories" element={<div>Dormitories Page</div>} />
              <Route path="/teacher-duties" element={<div>Teacher Duties Page</div>} />
              <Route path="/marks" element={<div>Marks Page</div>} />
              <Route path="/subjects" element={<div>Subjects Page</div>} />
              <Route path="/school-terms" element={<div>School Terms Page</div>} />
              <Route path="/settings" element={<div>Settings Page</div>} />
            </Route>
          </Route>
          
          {/* Redirect root to dashboard or login */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
    </Router>
  );
}

export default App;