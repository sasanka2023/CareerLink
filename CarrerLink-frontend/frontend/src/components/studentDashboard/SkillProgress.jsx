import React from 'react';

// Map skill levels to percentage values
const levelToPercentage = (level) => {
    switch (level) {
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
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Skill Proficiency</h3>
            <div className="space-y-4">
                {skills.map((skill) => {
                    const level = skill?.skillLevel || 'Novice';
                    const percentage = levelToPercentage(level);
                    const skillName = skill?.skillName || 'Unknown Skill';

                    return (
                        <div key={skillName}>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">{skillName}</span>
                                <span className={`text-sm font-medium px-2 py-1 rounded-full 
                  ${level === 'Expert' ? 'bg-green-100 text-green-800' :
                                    level === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                                        level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                            level === 'Beginner' ? 'bg-orange-100 text-orange-800' :
                                                'bg-red-100 text-red-800'}`}>
                  {level}
                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full transition-all duration-500
                    ${level === 'Expert' ? 'bg-green-500' :
                                        level === 'Advanced' ? 'bg-blue-500' :
                                            level === 'Intermediate' ? 'bg-yellow-500' :
                                                level === 'Beginner' ? 'bg-orange-500' :
                                                    'bg-red-500'}`}
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SkillProgress;