import React from "react";
import PropTypes from "prop-types";

const SuggestedProjects = ({ projects }) => {
  // Enhanced validation and error handling
  if (!Array.isArray(projects)) {
    console.error("Projects must be an array");
    return (
      <div className="w-full p-6 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">Error: Invalid projects data format</p>
      </div>
    );
  }

  // Filter and group projects by difficulty
  const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];
  const groupedProjects = difficultyLevels.map((level) =>
    projects.filter((project) => project.difficulty === level)
  );

  // Check if all groups are empty
  const allEmpty = groupedProjects.every((group) => group.length === 0);

  return (
    <div className="w-full bg-white p-6 shadow-lg rounded-lg">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        Suggested Projects
      </h3>

      {allEmpty ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No projects available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
          {groupedProjects.map((projects, index) => (
            <div key={difficultyLevels[index]} className="flex flex-col">
              <h4 className="font-medium text-lg text-gray-700 mb-3">
                {difficultyLevels[index]}
              </h4>

              {projects.length > 0 ? (
                <div
                  className={`space-y-4 ${
                    projects.length === 1 ? "lg:col-span-3 md:col-span-2" : ""
                  }`}
                >
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.id || project.title}
                      project={project}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">
                    No {difficultyLevels[index].toLowerCase()} projects
                    available
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Separate component for project card for better reusability
const ProjectCard = ({ project }) => {
  return (
    <div className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors border border-gray-200">
      <h5 className="font-semibold text-gray-800">{project.title}</h5>
      <p className="text-gray-600 text-sm mt-1">{project.description}</p>
      {project.technologies?.length > 0 && (
        <div className="mt-3">
          <p className="text-xs font-medium text-gray-500">Technologies:</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs font-medium bg-gray-200 text-gray-700 px-2 py-1 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    technologies: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

SuggestedProjects.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      difficulty: PropTypes.oneOf(["Beginner", "Intermediate", "Advanced"]),
      technologies: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};

export default SuggestedProjects;
