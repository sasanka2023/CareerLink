import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import Sidebar from '../components/SideBar/SideBar';
import JobApplicationsCard from '../components/studentDashboard/JobApplicantsCard';
import RegisteredCoursesCard from '../components/studentDashboard/RegisteredCoursesCard';
import RegisteredTestsCard from '../components/studentDashboard/RegisteredTestsCard';
import SkillProgress from '../components/studentDashboard/SkillProgress';
import CombinedCard from '../components/studentDashboard/TechJobCard';
import UpdateDetailsForm from '../components/studentDashboard/UpdateDetails';
import ProfileCard from '../components/studentDashboard/ProfileCard';
import { AuthContext } from '../api/AuthProvider';
import getStudentByUsername from '../api/StudentDetailsApi';
const StudentDashBoard = () => {
  const initialData = {
    firstName: 'sasanka',
    lastName: 'gayathra',
    email: 'sasankagayathra@gmail.com',
    technologies: ['Java', 'Spring boot', 'react', 'node'],
    appliedJobFields: ['Software Engneering', 'Project Managment', 'Dev Ops'],
    address: 'Ahangama,Galle',
    university:'University of Ruhuna',
    degree:'BCS',
    department:'Computer Science'
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [student, setStudent] = useState(initialData);
  const { token } = useContext(AuthContext);
  const [loading,setLoading] = useState(true);
  const extractUsernameFromToken = (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.sub;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchStudentData = async () => {
      
      try{
      if (!token) {
        // No token available - abort fetch
        if (isMounted) setLoading(false);
        return;
      
      }
      
      
        const username = extractUsernameFromToken(token);
        if (!username) return;

        const response = await getStudentByUsername(username);
        if (isMounted && response?.success) {
          setStudent(response.data); // Directly store the student data
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchStudentData();
    return () => { isMounted = false };
  }, [token]);

  if(loading) return <div>Loading ...</div>
  if(!student) return <div>Student not found</div>
  


  const handleSubmit = (updatedStudent) => {
    setStudent(updatedStudent);
    setIsModalOpen(false);
  };

  return (
    <div className={`flex h-[630px]`}>
      <Sidebar />
      <div className={`bg-orange-400 w-full px-2`}>
        <div className='w-full h-16 py-2 flex justify-between items-center'>
          <h1 className='text-2xl font-bold my-auto block'>Welcome Student</h1>
          <button
            className="bg-white text-black py-3 px-6 rounded-md text-lg font-semibold hover:bg-gray-200"
            onClick={() => setIsModalOpen(true)}
          >
            Update Profile
          </button>
        </div>
        <div className='flex space-x-6 '>
        <ProfileCard student={student} />
          <JobApplicationsCard />
          <RegisteredCoursesCard />
          <RegisteredTestsCard />
        </div>
        <div className='mt-8 flex space-x-6'>
          <SkillProgress />
          <CombinedCard />
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl h-auto max-h-[80vh] overflow-y-auto">
              <UpdateDetailsForm student={student} onSubmit={handleSubmit} onClose={() => setIsModalOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashBoard;