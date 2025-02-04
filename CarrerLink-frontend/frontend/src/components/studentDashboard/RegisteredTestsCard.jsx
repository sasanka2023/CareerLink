import React from 'react'

const RegisteredTestsCard = () => {
    const totalApplications = 15;
    return (
        <div className="flex flex-col bg-white shadow-md rounded-lg p-6 w-60 max-w-sm">
          {/* Header with Icon */}
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-full">
              {/* Replace with a relevant job icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7M5 13l4-4M5 13H3"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-800">Tests Registered</h2>
              <p className="text-gray-500 text-sm">Track your progress</p>
            </div>
          </div>
    
          {/* Content Section */}
          <div className="mt-4">
            <h3 className="text-3xl font-bold text-gray-800">{totalApplications}</h3>
            <p className="text-gray-500">Entered Tests</p>
          </div>
    
          
        </div>
      );
}

export default RegisteredTestsCard