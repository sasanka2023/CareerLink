import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Headers/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Employer from './pages/Employer';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import CompanyAuth from './pages/CompanyAuth';
import CompanyRegister from './pages/CompanyRegister';
import StudentAuth from './pages/StudentAuth';
import StudentRegister from './pages/StudentRegister';
import CompanyDashboardPage from './pages/CompanyDashboard';
import StudentDashBoard from './pages/StudentDashBoard';
import { AuthProvider } from './api/AuthProvider';

function App() {
  return (
      <AuthProvider>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/company-auth" element={<CompanyAuth />} />
              <Route path="/company-register" element={<CompanyRegister />} />
              <Route path="/company-dashboard" element={<CompanyDashboardPage />} />
              <Route path="/student-auth" element={<StudentAuth />} />
              <Route path="/student-register" element={<StudentRegister />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/employer" element={<Employer />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/student" element={<StudentDashBoard />} />
            </Routes>
          </main>
          <Footer />
      </AuthProvider>
  );
}

export default App;
