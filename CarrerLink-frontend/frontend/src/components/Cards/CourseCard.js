import React, { useEffect, useState } from "react";

const CourseCard = () => {
    const [course, setCourse] = useState(null); // State to store course data
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Simulate fetching data from a backend
        const fetchCourseData = async () => {
            /*
            Uncomment this when you have a backend API:
            try {
              const response = await fetch("https://your-backend-url.com/api/courses/1"); // Replace with your API URL
              const data = await response.json();
              setCourse(data);
              setLoading(false);
            } catch (error) {
              console.error("Error fetching course data:", error);
              setLoading(false);
            }
            */

            // Example data (simulating API response)
            const exampleData = {
                id: 1,
                image: "https://via.placeholder.com/150",
                title: "Java",
                platform: "Udemy",
                description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
                rating: 4,
                date: "22 April 2021",
                comments: 10,
            };

            setCourse(exampleData);
            setLoading(false);
        };

        fetchCourseData();
    }, []);

    if (loading) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }

    if (!course) {
        return <div className="text-center text-red-500">Failed to load course data.</div>;
    }

    return (
        <div className="w-80 rounded-lg shadow-lg overflow-hidden bg-white">
            {/* Image Section */}
            <div className="bg-gray-200 h-40 flex items-center justify-center">
                <img src={course.image} alt={course.title} className="h-24 w-24 rounded-full" />
            </div>

            {/* Content Section */}
            <div className="p-5">
                {/* Title and Platform */}
                <h3 className="text-lg font-bold text-gray-800">{course.title}</h3>
                <p className="text-sm text-gray-500 uppercase tracking-wide">{course.platform}</p>

                {/* Description */}
                <p className="text-sm text-gray-600 mt-3">{course.description}</p>

                {/* Rating */}
                <div className="flex items-center mt-3">
                    {Array.from({ length: 5 }, (_, index) => (
                        <span
                            key={index}
                            className={`text-xl ${
                                index < course.rating ? "text-yellow-500" : "text-gray-300"
                            }`}
                        >
              ★
            </span>
                    ))}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                    <span>{course.date}</span>
                    <span>{course.comments} comments</span>
                </div>

                {/* Button */}
                <button className="mt-4 w-full bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700">
                    Learn More
                </button>
            </div>
        </div>
    );
};

export default CourseCard;
