import React from "react";
import { useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Swal from 'sweetalert2';
import LoginApi from "../api/LoginApi";
import { AuthContext } from "../api/AuthProvider";
import { Lock, User } from "lucide-react";
import { getAdminByUserId } from "../api/AdminDetailsApi"; // Import admin details API

const AdminAuth = () => {
    const { setToken } = useContext(AuthContext);
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const extractUsernameFromToken = (token) => {
        try {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            return decodedToken.userId;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        try {
            const response = await LoginApi(formData, 'admin');
            console.log(response);
            if (response.token) {
                // Get admin details after successful login
                const adminResponse = await getAdminByUserId(extractUsernameFromToken(response.token)); // Assuming response contains userId

                if (!adminResponse.success || !adminResponse.data) {
                    throw new Error('Not Approved for the System'+adminResponse.success+extractUsernameFromToken(response.token));
                }

                if (adminResponse.data.status) {
                    setToken(response.token);
                    navigate("/admin");
                } else {
                    await Swal.fire({
                        icon: 'warning',
                        title: 'Approval Pending',
                        text: 'Your account is pending administrator approval.',
                        showConfirmButton: true,
                        confirmButtonColor: '#3085d6',
                    });
                    // setToken(null);
                }
            } else {
                // Handle invalid credentials with SweetAlert
                await Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: response.message || 'Invalid admin credentials',
                    confirmButtonColor: '#3085d6',
                });
            }
        } catch (error) {
            console.error('Login error:', error);
            await Swal.fire({
                icon: 'error',
                title: 'Login Error',
                text: error.message || 'Authentication failed. Please try again.',
                confirmButtonColor: '#3085d6',
            });
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Admin Sign In</h2>
                    <p className="mt-2 text-gray-600">Administrator Portal</p>
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
                            <Link to="/admin-register" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Register now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AdminAuth;