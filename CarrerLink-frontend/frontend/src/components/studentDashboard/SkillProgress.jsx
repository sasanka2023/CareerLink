import React from 'react';

const SkillProgress = () => {
  const skills = [
    { name: 'JavaScript', progress: 80 },
    { name: 'React', progress: 70 },
    { name: 'Node.js', progress: 60 },
    { name: 'CSS', progress: 90 },
    { name: 'Docker', progress: 40 },
  ];

  return (
    <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-4  overflow-hidden h-80">
      {/* Skill Progress Card */}
      <div className="sticky top-0 bg-white ">
        <h2 className="text-2xl font-bold text-center mb-6">Skill Progress</h2>
      </div>
      <div className="space-y-4 overflow-y-auto h-64">
        {skills.map((skill) => (
          <div key={skill.name} className="w-full">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold">{skill.name}</span>
              <span className="text-gray-600">{skill.progress}%</span>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: `${skill.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillProgress;