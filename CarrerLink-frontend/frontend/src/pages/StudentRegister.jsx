import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/HeroSection/students-recognize-the-importance-of-gaining-internship-experience-xlarge.png";
import StudentRegisterApi from "../api/StudentRegisterApi";
const StudentRegister = () => {
    const [academicStatus, setAcademicStatus] = useState([]);
    const [newCourse, setNewCourse] = useState({ course: "", result: "" });
    const navigate = useNavigate(); // Hook for navigation
    const [formData,setFormData] = useState({
        firstName:'',
        lastName:'',
        email:'',
        userName:'',
        password:'',
        address:'',
        university:'',
        department:'',
        degree:'',
        academicStatus:[]


    })
    const addCourse = () => {
        const updatedAcademicStatus = [...academicStatus, newCourse];
        setAcademicStatus(updatedAcademicStatus);
        setNewCourse({ course: "", result: "" });
        setFormData((prev) => ({
            ...prev,
            academicStatus: updatedAcademicStatus
        }));
    };

    const handelChange = (event) =>{
        event.preventDefault();
        const {name,value} = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]:value
        }));
        
    }

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
        <div
            className="h-screen flex justify-center items-center bg-cover bg-center"
            style={{
                backgroundImage: `url(${backgroundImage})`,
            }}
        >
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Student Authentication
                </h2>
                <div className="flex justify-center mb-4">
                    <button
                        className="px-4 py-2 w-1/2 text-center text-gray-500"
                        onClick={() => navigate("/student-auth")}
                    >
                        Login
                    </button>
                    <button
                        className="px-4 py-2 w-1/2 text-center border-b-2 border-black font-semibold"
                    >
                        Register
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="First name"
                            className="p-2 border rounded"
                            name = "firstName"
                            onChange={handelChange}
                        />
                        <input
                            type="text"
                            placeholder="Last name"
                            className="p-2 border rounded"
                            name = "lastName"
                            onChange={handelChange}
                        />
                        <input
                            type="email"
                            placeholder="Enter email"
                            className="p-2 border rounded"
                            name="email"
                            onChange={handelChange}
                        />
                        <input
                            type="text"
                            placeholder="Choose username"
                            className="p-2 border rounded"
                            name="userName"
                            onChange={handelChange}
                        />
                        <input
                            type="password"
                            placeholder="Choose password"
                            className="p-2 border rounded"
                            name="password"
                            onChange={handelChange}
                        />
                        <input
                            type="text"
                            placeholder="Enter location"
                            className="p-2 border rounded"
                            name="address"
                            onChange={handelChange}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <select className="p-2 border rounded" name="university" placeholder="select university" onChange={handelChange}>
                            <option>Select university</option>
                            <option value="UniA">University A</option>
                            <option value="UniB">University B</option>
                        </select>
                        <select className="p-2 border rounded" name="department" onChange={handelChange}>
                            <option>Select department</option>
                            <option value="deA">Department A</option>
                            <option value="deB">Department B</option>
                        </select>
                        <select className="p-2 border rounded" name="degree" onChange={handelChange}>
                            <option>Select degree</option>
                            <option value = "DegA">Degree A</option>
                            <option value= "DegB">Degree B</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-semibold mb-2">Academic Status</h3>
                        <div className="flex items-center mb-2">
                            <select
                                className="p-2 border rounded mr-2 flex-1"
                                value={newCourse.course}
                                name="course"
                                onChange={(e) =>
                                    setNewCourse({
                                        ...newCourse,
                                        course: e.target.value,
                                    })
                                }
                            >
                                <option>Select course</option>
                                <option value="OOP">OOP</option>
                                <option value="Course B">Course B</option>
                            </select>
                            <select
                                className="p-2 border rounded mr-2 w-24"
                                value={newCourse.result}
                                name="result"
                                onChange={(e) =>
                                    setNewCourse({
                                        ...newCourse,
                                        result: e.target.value,
                                    })
                                }
                            >
                                <option value="">Result</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="F">F</option>
                            </select>
                            <button
                                type="button"
                                className="bg-black text-white px-4 py-2 rounded"
                                onClick={addCourse}
                            >
                                Add
                            </button>
                        </div>
                        <ul>
                            {academicStatus.map((status, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between border-b py-2"
                                >
                                    <span>{status.course}</span>
                                    <span>{status.result}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StudentRegister;