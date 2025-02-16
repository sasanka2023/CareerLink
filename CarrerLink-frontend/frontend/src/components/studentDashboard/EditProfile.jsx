import React, { useState, useEffect, useContext } from 'react';
import { Camera, Mail, Phone, Building2, GraduationCap, MapPin } from 'lucide-react';
import DashboardLayout from '../Dashboard/StudentDashboard/StudentDashboardLayout';
import UpdateStudent from '../../api/StudentDetailsUpdateApi';
import { AuthContext } from '../../api/AuthProvider';
import getStudentByUsername from '../../api/StudentDetailsApi';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const allTechnologies = [
  "Spring Boot", "React", "Node.js", "Python", "MongoDB",
  "JavaScript", "TypeScript", "Java", "C++", "Docker",
  "Kubernetes", "AWS", "Azure", "GraphQL", "REST API",
];

const allJobFields = [
  "Software Development", "Web Design", "Data Analysis", 
  "Machine Learning", "DevOps", "Cloud Computing",
  "Mobile App Development", "UI/UX Design", "Cybersecurity",
  "Artificial Intelligence",
];

function EditProfile() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [student, setStudent] = useState(null);
  const [profilePicture, setProfilePicture] = useState('/placeholder.svg');
  const [formData, setFormData] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    userName: '',
    jobsFields: [],
    technologies: []
  });

  // Fetch student data
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const username = extractUsernameFromToken(token);
        const response = await getStudentByUsername(username);
        if (response?.success) {
          setStudent(response.data);
          setFormData({
            studentId: response.data.studentId,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            address: response.data.address,
            userName: response.data.userName,
            jobsFields: response.data.jobsFields || [],
            technologies: response.data.technologies || []
          });
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    if (token) fetchStudentData();
  }, [token]);

  const extractUsernameFromToken = (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.sub;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTechnology = (tech) => {
    if (!formData.technologies.some(t => t.techName === tech)) {
      const updatedTechnologies = [...formData.technologies, { techName: tech }];
      setFormData(prev => ({
        ...prev,
        technologies: updatedTechnologies
      }));
    }
  };

  const removeTechnology = (tech) => {
    const updatedTechnologies = formData.technologies.filter(t => t.techName !== tech);
    setFormData(prev => ({
      ...prev,
      technologies: updatedTechnologies
    }));
  };

  const addJobField = (field) => {
    if (!formData.jobsFields.some(f => f.jobField === field)) {
      const updatedJobFields = [...formData.jobsFields, { jobField: field }];
      setFormData(prev => ({
        ...prev,
        jobsFields: updatedJobFields
      }));
    }
  };

  const removeJobField = (field) => {
    const updatedJobFields = formData.jobsFields.filter(f => f.jobField !== field);
    setFormData(prev => ({
      ...prev,
      jobsFields: updatedJobFields
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UpdateStudent(formData);
      console.log('Response:', response);
    //   alert('Profile updated successfully!');
    Swal.fire({
        title: "Updated Successfully!",
        icon: "success",
        draggable: true, // This property does not exist in SweetAlert2
      });
      navigate('/student')
    } catch (error) {
      console.error('Error during update:', error);
      alert('Update failed. Please try again.');
    }
  };

  if (!student) return <div>Loading...</div>;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Edit Profile</h2>

        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <img
                src={profilePicture}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="profileInput"
              />
              <label
                htmlFor="profileInput"
                className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors cursor-pointer"
              >
                <Camera className="h-5 w-5" />
              </label>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your address"
                  />
                </div>
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Technologies</h3>
              <div className="space-y-4">
                <select 
                  onChange={(e) => addTechnology(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select a technology</option>
                  {allTechnologies.map(tech => (
                    <option key={tech} value={tech}>{tech}</option>
                  ))}
                </select>
                <div className="flex flex-wrap gap-2">
                  {formData.technologies.map(tech => (
                    <span 
                      key={tech.techName}
                      className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {tech.techName}
                      <button
                        type="button"
                        onClick={() => removeTechnology(tech.techName)}
                        className="ml-2 text-indigo-600 hover:text-indigo-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Job Fields */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Job Fields</h3>
              <div className="space-y-4">
                <select 
                  onChange={(e) => addJobField(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select a job field</option>
                  {allJobFields.map(field => (
                    <option key={field} value={field}>{field}</option>
                  ))}
                </select>
                <div className="flex flex-wrap gap-2">
                  {formData.jobsFields.map(field => (
                    <span 
                      key={field.jobField}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {field.jobField}
                      <button
                        type="button"
                        onClick={() => removeJobField(field.jobField)}
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={()=> navigate('/student')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default EditProfile;