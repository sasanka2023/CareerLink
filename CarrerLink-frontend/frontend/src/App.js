import React from 'react';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import Header from './components/Headers/Header';
import Footer from './components/Footer/Footer';
import CompanyAuth from './pages/CompanyAuth';
import CompanyRegister from './pages/CompanyRegister';
import StudentAuth from './pages/StudentAuth';
import StudentRegister from './pages/StudentRegister';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Employer from './pages/Employer';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import CompanyDashboardPage from "./pages/CompanyDashboard";
import StudentDashBoard from './pages/StudentDashBoard';
import { AuthProvider } from './api/AuthProvider';

const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet /> {/* This renders the child route's component */}
            </main>
            <Footer />
        </>
    );
};

// Define routes
const router = createBrowserRouter([
    {
        element: <Layout />, // Applies Header/Footer to all child routes
        children: [
            { path: '/', element: <Home /> },
            { path: '/company-auth', element: <CompanyAuth /> },
            { path: '/company-register', element: <CompanyRegister /> },
            { path: '/company-dashboard', element: <CompanyDashboardPage /> },
            { path: '/student-auth', element: <StudentAuth /> },
            { path: '/student-register', element: <StudentRegister /> },
            { path: '/home', element: <Home /> },
            { path: '/jobs', element: <Jobs /> },
            { path: '/employer', element: <Employer /> },
            { path: '/courses', element: <Courses /> },
            { path: '/contact', element: <Contact /> },
        ],
    },
    {
        path: '/student',
        element: <StudentDashBoard /> // No Header/Footer for this route
     }
    // {
    //     path: '/test',
    //     element: <Dashboard /> // No Header/Footer for this route
    // }
]);

function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}

export default App;