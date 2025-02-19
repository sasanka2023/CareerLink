import React from 'react';

const ProfileCard = ({ student }) => {
  if (!student) return <div className="p-4">No Studetnt data available</div>;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md h-full flex">
      <img
        src={student.profilePicture || "/placeholder.svg"}
        className="rounded-full mr-4"
        style={{ width: 100, height: 100 }}
        alt="Profile"
      />
      <div className="flex flex-col justify-center">
        <h2 className="text-xl font-bold">
          {student.firstName} {student.lastName}
        </h2>
        <p className="text-gray-600">{student.email}</p>
        <p className="text-gray-600">{student.address}</p>
        <p className="text-gray-600">{student.university}</p>
        <p className="text-gray-600">{student.degree}</p>
        <p className="text-gray-600">{student.department}</p>
      </div>
    </div>
  );
};

export default ProfileCard;