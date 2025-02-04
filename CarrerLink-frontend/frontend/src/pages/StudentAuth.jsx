import React from "react";
import { useContext } from "react";
import { useNavigate,useLocation } from "react-router-dom"; // Import useNavigate
import backgroundImage from "../assets/HeroSection/students-recognize-the-importance-of-gaining-internship-experience-xlarge.png";
import { useState } from "react";
import LoginApi from "../api/LoginApi";
import { AuthContext } from "../api/AuthProvider";

const StudentAuth = () => {
    const navigate = useNavigate(); // Initialize navigate
    const location = useLocation();
    const { setToken } = useContext(AuthContext);
    const [formData,setFormData] = useState({
            username:'',
            password:''
        });
    
        const [error,setError] = useState('');
        const handleChange = (event) =>{
            const {name,value} = event.target;
            setFormData((prev) => ({
                
                    ...prev,
                    [name]:value
                }
            ));
        }

        const handleSubmit = async (event) => {
            event.preventDefault();
            setError(""); // Clear previous errors
    
            try {
                const response = await LoginApi(formData);
                
                if (response.token) {
                    console.log(response.token);
                    //localStorage.setItem('token', response.token);
                    setToken(response.token);
                    navigate("/student"); // Redirect to Dashboard on success
                } else {
                    setError(response.message || "Invalid credentials. Please try again.");
                }
            } catch (error) {
                setError("An unexpected error occurred. Please try again later.");
            }
        };

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
                {location.state?.message && (
                    <p className="text-green-500 text-center mb-4">
                        {location.state.message}
                    </p>
                )}
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2 font-semibold">Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        className="w-full p-2 border rounded mb-4"
                        value={formData.username} // Bind the value to the username state
                        onChange={handleChange}
                    />
                    <label className="block mb-2 font-semibold">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        className="w-full p-2 border rounded mb-4"
                        value={formData.password} // Bind the value to the password state
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded"
                    >
                        Login
                    </button>
                </form>
                {error && <p>{error}</p>}
            </div>
        </div>
    );
};

export default StudentAuth;