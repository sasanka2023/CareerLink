
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import {useNavigate, useLocation, Link} from "react-router-dom"; // Import useNavigate

import LoginApi from "../api/LoginApi";
import { AuthContext } from "../api/AuthProvider";
import {Lock, User} from "lucide-react";

const CompanyAuth = () => {
    const { setToken } = useContext(AuthContext);
 
    const [formData,setFormData] = useState({
        username:'',
        password:''
    });
    const navigate = useNavigate(); // Initialize useNavigate
    const location = useLocation();
    const [error,setError] = useState('');
    const handleChange = (event) =>{
        const {name,value} = event.target;
        setFormData(
            {
                ...formData,
                [name]:value
            }
        )
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(""); // Clear previous errors

        try {
            const response = await LoginApi(formData);
            
            if (response.token) {
                setToken(response.token);
                navigate("/company-dashboard"); // Redirect to Dashboard on success
            } else {
                setError(response.message || "Invalid credentials. Please try again.");
            }
        } catch (error) {
            setError("An unexpected error occurred. Please try again later.");
        }
    };

    // State for username and password
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    //
    // // Mock credentials for authentication (replace this with API logic)
    // const validCredentials = {
    //     username: "123",
    //     password: "123",
    // };

    // Handle form submission
    // const handleLogin = (e) => {
    //     e.preventDefault(); // Prevent default form submission
    //
    //     // Check credentials
    //     if (username === validCredentials.username && password === validCredentials.password) {
    //         // Redirect to CompanyDashboardPage if credentials are correct
    //         navigate("/company-dashboard");
    //     } else {
    //         // Show an alert for invalid credentials
    //         alert("Invalid username or password!");
    //     }
    // };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Company Sign In</h2>
                    <p className="mt-2 text-gray-600">Welcome back to CareerLink</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-8">
                    {location.state?.message && (
                        <p className="text-green-500 text-center mb-4">{location.state.message}</p>
                    )}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400"/>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter your username"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400"/>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-center">{error}</p>}

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Sign in
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <Link to="/company-register" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Register now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyAuth;