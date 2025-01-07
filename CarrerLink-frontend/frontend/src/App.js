import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';  // For React Router v7
import Header from './components/Headers/Header';
import Footer from './components/Footer/Footer';
import HeroSection from './pages/HeroSection';
import CompanyAuth from './pages/CompanyAuth';
import CompanyRegister from './pages/CompanyRegister';
import StudentAuth from './pages/StudentAuth';
import StudentRegister from './pages/StudentRegister';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Employer from './pages/Employer';
import Courses from './pages/Courses';
import Contact from './pages/Contact';

// Define the routes for v7
const router = createBrowserRouter([
  { path: '/', element: <HeroSection /> },
  { path: '/company-auth', element: <CompanyAuth /> },
  { path: '/company-register', element: <CompanyRegister /> },
  { path: '/student-auth', element: <StudentAuth /> },
  { path: '/student-register', element: <StudentRegister /> },
  { path: '/home', element: <Home /> },
  { path: '/jobs', element: <Jobs /> },
  { path: '/employer', element: <Employer /> },
  { path: '/courses', element: <Courses /> },
  { path: '/contact', element: <Contact /> },
]);

function App() {
  return (
    <>
      <Header />
      <main>
        <RouterProvider router={router} /> {/* Use RouterProvider for v7 */}
      </main>
      <Footer />
    </>
  );
}

export default App;
