import React from 'react';

// Map skill levels to percentage values
const levelToPercentage = (level) => {
  switch(level) {
    case 'Expert': return 90;
    case 'Advanced': return 80;
    case 'Intermediate': return 70;
    case 'Beginner': return 60;
    case 'Novice': return 40;
    default: return 50; // Fallback for unknown levels
  }
};

const SkillProgress = ({ student }) => {
  // Default skills with level-based progress
  const defaultSkills = [
    { skillName: 'JavaScript', skillLevel: 'Advanced' },
    { skillName: 'React', skillLevel: 'Intermediate' },
    { skillName: 'Node.js', skillLevel: 'Beginner' },
    { skillName: 'CSS', skillLevel: 'Expert' },
    { skillName: 'Docker', skillLevel: 'Novice' },
  ];

  // Safely get skills with fallback
  const skills = student?.skills || defaultSkills;

  return (
    <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-4 overflow-hidden h-96">
      <div className="sticky top-0 bg-white z-10">
        <h2 className="text-2xl font-bold text-center mb-6">Skill Proficiency</h2>
      </div>
      
      <div className="space-y-4 overflow-y-auto h-64 scrollbar-hide">
        {skills.map((skill) => {
          const level = skill?.skillLevel || 'Novice';
          const percentage = levelToPercentage(level);
          const skillName = skill?.skillName || 'Unknown Skill';

          return (
            <div key={skillName} className="w-full">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-semibold">{skillName}</span>
                <span className={`text-sm font-medium px-2 py-1 rounded-full 
                  ${level === 'Expert' ? 'bg-green-100 text-green-800' :
                    level === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                    level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    level === 'Beginner' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'}`}>
                  {level}
                </span>
              </div>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-500
                        ${level === 'Expert' ? 'bg-green-500' :
                          level === 'Advanced' ? 'bg-blue-500' :
                          level === 'Intermediate' ? 'bg-yellow-500' :
                          level === 'Beginner' ? 'bg-orange-500' :
                          'bg-red-500'}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add this to your global CSS */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default SkillProgress;