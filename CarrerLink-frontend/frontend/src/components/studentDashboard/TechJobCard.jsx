import React from "react";

export default function CombinedCard({student}) {
  console.log(student);
  const technologies = student.technologies  || ["Java", "Spring Boot", "React", "Node.js"];
  const jobFields = student.jobsFields ||  ["Software Development", "Data Science", "Cloud Engineering", "Cybersecurity", "Project Management"];
  console.log(student.technologies)
  
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-sm">
      {/* Technology Section */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Technology</h3>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-purple-100 text-purple-700 text-xs font-medium rounded-md py-1 px-2"
            >
              {tech.techName}
            </span>
          ))}
        </div>
      </div>

      {/* Job Fields Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Job Fields</h3>
        <div className="flex flex-wrap gap-2">
          {jobFields.map((field, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 text-xs font-medium rounded-md py-1 px-2"
            >
              {field.jobField}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
