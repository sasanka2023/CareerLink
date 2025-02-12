import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import StudentRegisterApi from "../api/StudentRegisterApi";

const StudentRegister = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [academicStatus, setAcademicStatus] = useState([]);
    const [newCourse, setNewCourse] = useState({ course: "", result: "" });
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
        password: "",
        confirmPassword: "",
        address: "",
        university: "",
        department: "",
        degree: "",
        academicStatus: []
    });

    // const validateForm = () => {
    //     const newErrors = {};
    //
    //     if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    //     if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    //     if (!formData.email.trim()) {
    //         newErrors.email = "Email is required";
    //     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //         newErrors.email = "Invalid email format";
    //     }
    //     if (!formData.userName.trim()) newErrors.userName = "Username is required";
    //     if (!formData.password) {
    //         newErrors.password = "Password is required";
    //     } else if (formData.password.length < 6) {
    //         newErrors.password = "Password must be at least 6 characters";
    //     }
    //     if (formData.password !== formData.confirmPassword) {
    //         newErrors.confirmPassword = "Passwords do not match";
    //     }
    //     if (!formData.university) newErrors.university = "Please select a university";
    //     if (!formData.department) newErrors.department = "Please select a department";
    //     if (!formData.degree) newErrors.degree = "Please select a degree";
    //
    //     setErrors(newErrors);
    //     return Object.keys(newErrors).length === 0;
    // };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const addCourse = () => {
        if (!newCourse.course || !newCourse.result) {
            setErrors((prev) => ({
                ...prev,
                academicStatus: "Both course and result are required"
            }));
            return;
        }

        const updatedAcademicStatus = [...academicStatus, newCourse];
        setAcademicStatus(updatedAcademicStatus);
        setFormData((prev) => ({
            ...prev,
            academicStatus: updatedAcademicStatus
        }));
        setNewCourse({ course: "", result: "" });
        setErrors((prev) => ({
            ...prev,
            academicStatus: undefined
        }));
    };

    const handleSubmit = async (event) =>{
        event.preventDefault();
        console.log(formData);
        try {
            const response = await StudentRegisterApi(formData);
            console.log('Response:', response);
            navigate("/student-auth",{
                state: { message: "Successfully registered!" },
            });

        } catch (error) {
            console.error('Error during registration:', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Student Registration</h2>
                    <p className="mt-2 text-gray-600">Join CareerLink to explore opportunities</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {errors.submit && (
                            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4">
                                {errors.submit}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name
                                </label>
                                <input
                                    id="firstName"
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`p-2 border rounded w-full ${errors.firstName ? 'border-red-500' : ''}`}
                                    placeholder="First name"
                                />
                                {errors.firstName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name
                                </label>
                                <input
                                    id="lastName"
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`p-2 border rounded w-full ${errors.lastName ? 'border-red-500' : ''}`}
                                    placeholder="Last name"
                                />
                                {errors.lastName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`p-2 border rounded w-full ${errors.email ? 'border-red-500' : ''}`}
                                placeholder="Enter email"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                                Username
                            </label>
                            <input
                                id="userName"
                                type="text"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                className={`p-2 border rounded w-full ${errors.userName ? 'border-red-500' : ''}`}
                                placeholder="Choose username"
                            />
                            {errors.userName && (
                                <p className="text-red-500 text-xs mt-1">{errors.userName}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`p-2 border rounded w-full ${errors.password ? 'border-red-500' : ''}`}
                                placeholder="Choose password"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`p-2 border rounded w-full ${errors.confirmPassword ? 'border-red-500' : ''}`}
                                placeholder="Confirm your password"
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                Location
                            </label>
                            <input
                                id="address"
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="p-2 border rounded w-full"
                                placeholder="Enter location"
                            />
                        </div>

                        <div>
                            <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">
                                University
                            </label>
                            <select
                                id="university"
                                name="university"
                                value={formData.university}
                                onChange={handleChange}
                                className={`p-2 border rounded w-full ${errors.university ? 'border-red-500' : ''}`}
                            >
                                <option value="">Select university</option>
                                <option value="UniA">University A</option>
                                <option value="UniB">University B</option>
                            </select>
                            {errors.university && (
                                <p className="text-red-500 text-xs mt-1">{errors.university}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                                Department
                            </label>
                            <select
                                id="department"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                className={`p-2 border rounded w-full ${errors.department ? 'border-red-500' : ''}`}
                            >
                                <option value="">Select department</option>
                                <option value="deA">Department A</option>
                                <option value="deB">Department B</option>
                            </select>
                            {errors.department && (
                                <p className="text-red-500 text-xs mt-1">{errors.department}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">
                                Degree
                            </label>
                            <select
                                id="degree"
                                name="degree"
                                value={formData.degree}
                                onChange={handleChange}
                                className={`p-2 border rounded w-full ${errors.degree ? 'border-red-500' : ''}`}
                            >
                                <option value="">Select degree</option>
                                <option value="DegA">Degree A</option>
                                <option value="DegB">Degree B</option>
                            </select>
                            {errors.degree && (
                                <p className="text-red-500 text-xs mt-1">{errors.degree}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <h3 className="font-semibold mb-2">Academic Status</h3>
                            <div className="flex items-center mb-2">
                                <select
                                    className="p-2 border rounded mr-2 flex-1"
                                    value={newCourse.course}
                                    onChange={(e) => setNewCourse(prev => ({...prev, course: e.target.value}))}

                                >
                                    <option value="">Select course</option>
                                    <option value="OOP">OOP</option>
                                    <option value="Course B">Course B</option>
                                </select>
                                <select
                                    className="p-2 border rounded mr-2 w-24"
                                    value={newCourse.result}
                                    onChange={(e) => setNewCourse(prev => ({...prev, result: e.target.value}))}
                                >
                                    <option value="">Result</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="F">F</option>
                                </select>
                                <button
                                    type="button"
                                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                                    onClick={addCourse}
                                >
                                    Add
                                </button>
                            </div>
                            {errors.academicStatus && (
                                <p className="text-red-500 text-xs mt-1">{errors.academicStatus}</p>
                            )}
                            {academicStatus.length > 0 && (
                                <ul className="mt-2 border rounded-lg divide-y">
                                    {academicStatus.map((status, index) => (
                                        <li key={index} className="flex justify-between p-2">
                                            <span>{status.course}</span>
                                            <span>{status.result}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                        >
                            Register
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/student-auth" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentRegister;
