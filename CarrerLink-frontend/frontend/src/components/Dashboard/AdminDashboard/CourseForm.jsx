import React, { useState } from 'react';

export function CourseForm({ initialValues, onSubmit, onCancel, isLoading }) {
    const [formData, setFormData] = useState(
        initialValues || {
            courseName: '',
            requiredSkill: '',
            skillLevel: '',
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">
                    Course Name
                </label>
                <input
                    type="text"
                    id="courseName"
                    value={formData.courseName}
                    onChange={(e) => setFormData({...formData, courseName: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                    disabled={isLoading}
                />
            </div>

            <div>
                <label htmlFor="requiredSkill" className="block text-sm font-medium text-gray-700">
                    Required Skill
                </label>
                <input
                    type="text"
                    id="requiredSkill"
                    value={formData.requiredSkill}
                    onChange={(e) => setFormData({...formData, requiredSkill: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                    disabled={isLoading}
                />
            </div>

            <div>
                <label htmlFor="skillLevel" className="block text-sm font-medium text-gray-700">
                    Skill Level
                </label>
                <select
                    id="skillLevel"
                    value={formData.skillLevel}
                    onChange={(e) => setFormData({...formData, skillLevel: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                    disabled={isLoading}
                >
                    <option value="">Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
            </div>

            <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                    Url
                </label>
                <input
                    type="text"
                    id="url"
                    value={formData.url}
                    onChange={(e) => setFormData({...formData, url: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                    disabled={isLoading}
                />
            </div>

            <div className="flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={isLoading}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    {isLoading ? 'Saving...' : 'Save'}
                </button>
            </div>
        </form>
    );
}
