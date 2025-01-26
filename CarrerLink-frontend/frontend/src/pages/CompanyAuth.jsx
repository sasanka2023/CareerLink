import React, {useState} from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import backgroundImage from "../assets/HeroSection/students-recognize-the-importance-of-gaining-internship-experience-xlarge.png"; // Import the image

const CompanyAuth = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    // State for username and password
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Mock credentials for authentication (replace this with API logic)
    const validCredentials = {
        username: "123",
        password: "123",
    };

    // Handle form submission
    const handleLogin = (e) => {
        e.preventDefault(); // Prevent default form submission

        // Check credentials
        if (username === validCredentials.username && password === validCredentials.password) {
            // Redirect to CompanyDashboardPage if credentials are correct
            navigate("/company-dashboard");
        } else {
            // Show an alert for invalid credentials
            alert("Invalid username or password!");
        }
    };

    return (
        <div
            className="h-screen flex justify-center items-center bg-cover bg-center"
            style={{
                backgroundImage: `url(${backgroundImage})`, // Use the imported image variable
            }}
        >
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Company Authentication
                </h2>
                <div className="flex justify-center mb-4">
                    <button className="px-4 py-2 border-b-2 border-black">
                        Login
                    </button>
                    <button
                        className="px-4 py-2 ml-4 text-gray-500"
                        onClick={() => navigate("/company-register")} // Use navigate here
                    >
                        Register
                    </button>
                </div>
                <form onSubmit={handleLogin}>{}
                    <label className="block mb-2 font-semibold">Username</label>
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border rounded mb-4"
                    />
                    <label className="block mb-2 font-semibold">Password</label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

export default CompanyAuth;