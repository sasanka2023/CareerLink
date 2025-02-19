import React from "react";

export default function TechJobCard({ student = {} }) {
    console.log(student);

    // Use optional chaining and provide default values
    const technologies = student?.technologies || ["Java", "Spring Boot", "React", "Node.js"];
    const jobFields = student?.jobsFields || ["Software Development", "Data Science", "Cloud Engineering", "Cybersecurity", "Project Management"];

    console.log(technologies);

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            {/* Technology Section */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm"
                        >
                            {tech?.techName || tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Job Fields Section */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Job Fields</h3>
                <div className="flex flex-wrap gap-2">
                    {jobFields.map((field, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm"
                        >
                            {field?.jobField || field}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
