import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import { getAllCoursesUsingFilters } from '../api/AdminDetailsApi'; // You'll need to create this API function
import CourseCard from '../components/Cards/CourseCard'; // Your existing CourseCard component

function CourseFilters({ onFilterChange, requiredSkills, skillLevels }) {
  return (
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-indigo-600" />
          <h3 className="font-semibold">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Required Skill
            </label>
            <select
                name="requiredSkill"
                onChange={(e) => onFilterChange('requiredSkill', e.target.value)}
                className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {requiredSkills.map(skill => (
                  <option key={skill} value={skill}>
                    {skill === 'all' ? 'All Skills' : skill}
                  </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skill Level
            </label>
            <select
                name="skillLevel"
                onChange={(e) => onFilterChange('skillLevel', e.target.value)}
                className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {skillLevels.map(level => (
                  <option key={level} value={level}>
                    {level === 'all' ? 'All Levels' : level}
                  </option>
              ))}
            </select>
          </div>
        </div>
      </div>
  );
}

function Courses() {
  const [filters, setFilters] = useState({
    requiredSkill: 'all',
    skillLevel: 'all'
  });

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Example filter options - replace with your actual data
  const requiredSkills = [
    'all',
    'Programming',
    'Data Analysis',
    'Web Development',
    'Machine Learning',
    'Database Management'
  ];

  const skillLevels = [
    'all',
    'Beginner',
    'Intermediate',
    'Advanced'
  ];

  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await getAllCoursesUsingFilters(
            filters.requiredSkill === 'all' ? null : filters.requiredSkill,
            filters.skillLevel === 'all' ? null : filters.skillLevel
        );

        if (isMounted && response?.success) {
          setCourses(response.data);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCourses();
    return () => { isMounted = false };
  }, [filters]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  if (loading) return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
  );

  if (!courses.length) return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h3 className="text-xl font-semibold text-gray-700">No courses found</h3>
        <p className="text-gray-500 mt-2">Please try different filters or check back later.</p>
      </div>
  );

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <CourseFilters
              onFilterChange={handleFilterChange}
              requiredSkills={requiredSkills}
              skillLevels={skillLevels}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
                <CourseCard key={course.courseId} course={course} />
            ))}
          </div>
        </div>
      </div>
  );
}

export default Courses;