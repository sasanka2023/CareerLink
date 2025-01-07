import React, { useState } from "react";
import backgroundImage from "../assets/HeroSection/students-recognize-the-importance-of-gaining-internship-experience-xlarge.png";

const StudentRegister = () => {
    const [academicStatus, setAcademicStatus] = useState([]);
    const [newCourse, setNewCourse] = useState({ course: "", grade: "" });

    const addCourse = () => {
        if (newCourse.course && newCourse.grade) {
            setAcademicStatus([...academicStatus, newCourse]);
            setNewCourse({ course: "", grade: "" });
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
                    <button className="px-4 py-2 w-1/2 text-center border-b-2 border-black">
                        Login
                    </button>
                    <button className="px-4 py-2 w-1/2 text-center text-gray-500">
                        Register
                    </button>
                </div>
                <form>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="First name"
                            className="p-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Last name"
                            className="p-2 border rounded"
                        />
                        <input
                            type="email"
                            placeholder="Enter email"
                            className="p-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Choose username"
                            className="p-2 border rounded"
                        />
                        <input
                            type="password"
                            placeholder="Choose password"
                            className="p-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Enter location"
                            className="p-2 border rounded"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <select className="p-2 border rounded">
                            <option>Select university</option>
                            <option>University A</option>
                            <option>University B</option>
                        </select>
                        <select className="p-2 border rounded">
                            <option>Select department</option>
                            <option>Department A</option>
                            <option>Department B</option>
                        </select>
                        <select className="p-2 border rounded">
                            <option>Select degree</option>
                            <option>Degree A</option>
                            <option>Degree B</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-semibold mb-2">Academic Status</h3>
                        <div className="flex items-center mb-2">
                            <select
                                className="p-2 border rounded mr-2 flex-1"
                                value={newCourse.course}
                                onChange={(e) =>
                                    setNewCourse({
                                        ...newCourse,
                                        course: e.target.value,
                                    })
                                }
                            >
                                <option value="">Select course</option>
                                <option value="Course A">Course A</option>
                                <option value="Course B">Course B</option>
                            </select>
                            <select
                                className="p-2 border rounded mr-2 w-24"
                                value={newCourse.grade}
                                onChange={(e) =>
                                    setNewCourse({
                                        ...newCourse,
                                        grade: e.target.value,
                                    })
                                }
                            >
                                <option value="">Grade</option>
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
                                    <span>{status.grade}</span>
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