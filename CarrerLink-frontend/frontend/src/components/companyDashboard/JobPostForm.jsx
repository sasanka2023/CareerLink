import React, { useState } from "react";
import { X } from "lucide-react";
import { saveJob } from "../../api/JobSaveApi";




interface JobPostFormProps {
  onClose: () => void;
}

function JobPostForm({ onClose }: JobPostFormProps) {
  const [jobData, setJobData] = useState({
    //company: 0,
    title: "",
    //department: "",
    type: "Full-time",
    description: "",
    requirements: [""],
    salary: 0,
    location: "",
    technologies: [{ techId: 1, techName: "" }], // Default tech object    //deadline: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedJobData = {
      //companyId: jobData.company,
      jobTitle: jobData.title,
      jobType: jobData.type,
      description: jobData.description,
      requirements: Array.isArray(jobData.requirements) ? jobData.requirements : [], 
      salary: Number(jobData.salary),  //  Ensure it's a number
      location: jobData.location,
      technologies: jobData.technologies
      .filter((tech) => tech.techName.trim() !== "")
      .map((tech) => ({ techId: tech.techId }))
        };

    const companyId = 3; // Replace with actual company ID from state/context

    const response = await saveJob(formattedJobData, companyId);

    if (response.success) {
      alert("Job posted successfully!");
      onClose();
    } else {
      alert("Failed to post job.");
    }
  };

  const addRequirement = () => {
    setJobData((prev) => ({
      ...prev,
      requirements: [...prev.requirements, ""],
    }));
  };

  const updateRequirement = (index: number, value: string) => {
    const newRequirements = [...jobData.requirements];
    newRequirements[index] = value;
    setJobData((prev) => ({
      ...prev,
      requirements: newRequirements,
    }));
  };

  const removeRequirement = (index: number) => {
    setJobData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const updateTechnology = (index: number, value: string) => {
    const newTechnologies = [...jobData.technologies];
    newTechnologies[index] = { techId: index + 1, techName: value }; // Ensure correct format
    setJobData((prev) => ({
      ...prev,
      technologies: newTechnologies,
    }));
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Post New Job</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <input
              type="text"
              required
              value={jobData.title}
              onChange={(e) =>
                setJobData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              location
            </label>
            <input
              type="text"
              required
              value={jobData.location}
              onChange={(e) =>
                setJobData((prev) => ({ ...prev, location: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Technologies
            </label>
            {jobData.technologies.map((tech, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  required
                  value={tech.techName}
                  onChange={(e) => updateTechnology(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            ))}
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Salary
            </label>
            <input
              type="number"
              required
              value={jobData.salary}
              onChange={(e) =>
                setJobData((prev) => ({ ...prev, salary: Number(e.target.value) }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
           
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Type
              </label>
              <select
                value={jobData.type}
                onChange={(e) =>
                  setJobData((prev) => ({ ...prev, type: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              required
              value={jobData.description}
              onChange={(e) =>
                setJobData((prev) => ({ ...prev, description: e.target.value }))
              }
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Requirements
            </label>
            {jobData.requirements.map((req, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={req}
                  onChange={(e) => updateRequirement(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeRequirement(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addRequirement}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              Add Requirement
            </button>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobPostForm;
