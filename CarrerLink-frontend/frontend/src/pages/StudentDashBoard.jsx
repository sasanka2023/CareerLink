import React, { useState, useEffect, useContext } from "react";
import DashboardLayout from "../components/Dashboard/StudentDashboard/StudentDashboardLayout";
import { AuthContext } from "../api/AuthProvider";
import {
  getStudentByUsername,
  getProjectRecommendations,
} from "../api/StudentDetailsApi";
import SkillProgress from "../components/studentDashboard/SkillProgress";
import TechJobCard from "../components/studentDashboard/TechJobCard";
import SuggestedProjects from "../components/Dashboard/StudentDashboard/SuggestedProjects";

const StudentDashboard = () => {
  const [studentInfo, setStudentInfo] = useState(null);
  const [skills, setSkills] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [jobFields, setJobFields] = useState([]);
  const [projectRecommendations, setProjectRecommendations] = useState([]);
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  // Extract username (or userId) from the JWT token
  const extractUsernameFromToken = (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return decodedToken.userId;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchStudentData = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const username = extractUsernameFromToken(token);
        if (!username) return;
        const response = await getStudentByUsername(username);
        if (isMounted && response?.success) {
          setStudentInfo(response.data);
          setSkills(response.data.skills || []);
          setTechnologies(response.data.technologies || []);
          setJobFields(response.data.appliedJobFields || []);
        }
        // Fetch Project Recommendations
        const projectsResponse = await getProjectRecommendations(
          token,
          response?.data?.studentId
        );
        console.log("Projects Response:", projectsResponse); // Log the project data

        if (isMounted && projectsResponse?.success) {
          setProjectRecommendations(projectsResponse.data || []);
        } else {
          setProjectRecommendations([]); // If no projects, set to empty array
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchStudentData();
    return () => {
      isMounted = false;
    };
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (!studentInfo) return <div>Student not found</div>;

  return (
    <DashboardLayout
      StudentName={studentInfo.firstName}
      profileImage={studentInfo.profileImageUrl}
    >
      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Profile Info */}
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col items-center text-center">
              <img
                src={studentInfo.profileImageUrl}
                alt={studentInfo.firstName}
                className="w-24 h-24 rounded-full mb-4"
              />
              <h2 className="text-xl font-semibold">
                {studentInfo.firstName} {studentInfo.lastName}
              </h2>
              <p className="text-gray-600 mb-2">{studentInfo.email}</p>

              <div className="w-full border-t border-gray-100 my-4 pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">University</p>
                    <p className="font-medium">{studentInfo.university}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Degree</p>
                    <p className="font-medium">{studentInfo.degree}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Department</p>
                    <p className="font-medium">{studentInfo.department}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Address</p>
                    <p className="font-medium">{studentInfo.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Summary Cards + TechJob */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-sm p-6 text-white">
              <h3 className="text-lg font-semibold">Job Applications</h3>
              <p className="text-3xl font-bold">15</p>
              <p className="text-indigo-100">Applications submitted</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-sm p-6 text-white">
              <h3 className="text-lg font-semibold">Enrolled Courses</h3>
              <p className="text-3xl font-bold">8</p>
              <p className="text-purple-100">Active courses</p>
            </div>

            <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-sm p-6 text-white">
              <h3 className="text-lg font-semibold">Tests Completed</h3>
              <p className="text-3xl font-bold">12</p>
              <p className="text-pink-100">Tests passed</p>
            </div>
          </div>

          {/* Tech Jobs */}
          <TechJobCard student={studentInfo} />
        </div>
      </div>

      {/* Full-Width Skills Section (without heading) */}
      <div className="mt-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <SkillProgress student={studentInfo} />
          </div>
          <div className="lg:w-2/3">
            <SuggestedProjects projects={projectRecommendations} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
