import React from "react";
import registrationBackground from "../assets/HeroSection/students-recognize-the-importance-of-gaining-internship-experience-xlarge.png"; // Update this path

const CompanyRegister = () => {
    return (
        <div
            className="h-screen flex justify-center items-center bg-cover bg-center"
            style={{
                backgroundImage: `url(${registrationBackground})`,
            }}
        >
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Company Authentication
                </h2>
                <div className="flex justify-center mb-4">
                    <button className="px-4 py-2 text-gray-500">Login</button>
                    <button className="px-4 py-2 ml-4 border-b-2 border-black">
                        Register
                    </button>
                </div>
                <form>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 font-semibold">Company Name</label>
                            <input
                                type="text"
                                placeholder="Enter company name"
                                className="w-full p-2 border rounded mb-4"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-semibold">Username</label>
                            <input
                                type="text"
                                placeholder="Choose username"
                                className="w-full p-2 border rounded mb-4"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-semibold">Email</label>
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="w-full p-2 border rounded mb-4"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-semibold">Password</label>
                            <input
                                type="password"
                                placeholder="Choose password"
                                className="w-full p-2 border rounded mb-4"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-semibold">Website</label>
                            <input
                                type="text"
                                placeholder="Enter website URL"
                                className="w-full p-2 border rounded mb-4"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-semibold">Location</label>
                            <input
                                type="text"
                                placeholder="Enter location"
                                className="w-full p-2 border rounded mb-4"
                            />
                        </div>
                    </div>
                    <label className="block mb-2 font-semibold">Profile Photo</label>
                    <input
                        type="file"
                        className="block w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-sm file:font-semibold"
                    />
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded mt-4"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CompanyRegister;