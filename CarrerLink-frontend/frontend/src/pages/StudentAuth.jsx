import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import backgroundImage from "../assets/HeroSection/students-recognize-the-importance-of-gaining-internship-experience-xlarge.png";

const StudentAuth = () => {
    const navigate = useNavigate(); // Initialize navigate

    return (
        <div
            className="h-screen flex justify-center items-center bg-cover bg-center"
            style={{
                backgroundImage: `url(${backgroundImage})`,
            }}
        >
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Student Authentication
                </h2>
                <div className="flex justify-center mb-4">
                    <button className="px-4 py-2 border-b-2 border-black">
                        Login
                    </button>
                    <button
                        className="px-4 py-2 ml-4 text-gray-500"
                        onClick={() => navigate("/student-register")} // Navigate to StudentRegister
                    >
                        Register
                    </button>
                </div>
                <form>
                    <label className="block mb-2 font-semibold">Username</label>
                    <input
                        type="text"
                        placeholder="Enter username"
                        className="w-full p-2 border rounded mb-4"
                    />
                    <label className="block mb-2 font-semibold">Password</label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        className="w-full p-2 border rounded mb-4"
                    />
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StudentAuth;