import React, { useState, useEffect, useContext } from "react";
import DashboardLayout from "../components/Dashboard/StudentDashboard/StudentDashboardLayout";
import { AuthContext } from "../api/AuthProvider";
import {
  getStudentByUsername,
  getRecommendedCourses,
} from "../api/StudentDetailsApi";
import SkillProgress from "../components/studentDashboard/SkillProgress";
import TechJobCard from "../components/studentDashboard/TechJobCard";

const StudentDashboard = () => {
  const [studentInfo, setStudentInfo] = useState(null);
  const [skills, setSkills] = useState([]);
  const [jobFields, setJobFields] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

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
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const username = extractUsernameFromToken(token);
        if (!username) throw new Error("No username found in token");

        // Fetch student profile
        const profileResponse = await getStudentByUsername(username);
        if (!profileResponse?.success) {
          throw new Error(
            profileResponse?.message || "Failed to fetch profile"
          );
        }

        setStudentInfo(profileResponse.data);
        setSkills(profileResponse.data.skills || []);

        // Fetch recommended courses
        const coursesResponse = await getRecommendedCourses(
          token,
          profileResponse.data.studentId
        );

        if (coursesResponse?.success) {
          setRecommendedCourses(coursesResponse.data || []);
        } else {
          throw new Error(
            coursesResponse?.message || "Failed to fetch courses"
          );
        }
      } catch (error) {
        console.error("Dashboard error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!studentInfo) {
    return (
      <div className="flex justify-center items-center h-screen">
        Student data not found
      </div>
    );
  }

  return (
    <DashboardLayout
      StudentName={studentInfo.firstName}
      profileImage={studentInfo.profileImageUrl}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile */}
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col items-center text-center">
              <img
                src={studentInfo.profileImageUrl || "/default-profile.png"}
                alt={studentInfo.firstName}
                className="w-24 h-24 rounded-full mb-4 object-cover"
              />
              <h2 className="text-xl font-semibold">
                {studentInfo.firstName} {studentInfo.lastName}
              </h2>
              <p className="text-gray-600 mb-2">{studentInfo.email}</p>
              <div className="w-full border-t border-gray-100 my-4 pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">University</p>
                    <p className="font-medium">
                      {studentInfo.university || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Degree</p>
                    <p className="font-medium">{studentInfo.degree || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Department</p>
                    <p className="font-medium">
                      {studentInfo.department || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Address</p>
                    <p className="font-medium">{studentInfo.address || "-"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SkillProgress student={studentInfo} />
        </div>

        {/* Right Column - Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-sm p-6 text-white">
              <h3 className="text-lg font-semibold">Job Applications</h3>
              <p className="text-3xl font-bold">{jobFields.length}</p>
              <p className="text-indigo-100">Applications submitted</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-sm p-6 text-white">
              <h3 className="text-lg font-semibold">Recommended Courses</h3>
              <p className="text-3xl font-bold">{recommendedCourses.length}</p>
              <p className="text-purple-100">Available courses</p>
            </div>
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-sm p-6 text-white">
              <h3 className="text-lg font-semibold">Skills</h3>
              <p className="text-3xl font-bold">{skills.length}</p>
              <p className="text-pink-100">Skills mastered</p>
            </div>
          </div>

          <TechJobCard student={studentInfo} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
