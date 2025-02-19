import React from 'react';
import cv5 from '../../Images/cv5.PNG';
import cv6 from '../../Images/cv6.PNG';
import cv7 from '../../Images/cv7.PNG';
import cv8 from '../../Images/cv8.PNG';

const cvFormats = [
    { id: 1, title: 'Format 1', image: cv5 },
    { id: 2, title: 'Format 2', image: cv6 },
    { id: 3, title: 'Format 3', image: cv7 },
    { id: 4, title: 'Format 4', image: cv8 },
];

const CvFormatsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl h-auto max-h-[96vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-black font-bold">CV Formats</h2>
          <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cvFormats.map((format) => (
            <div key={format.id} className="bg-gray-100 p-4 rounded-lg shadow-md h-full flex flex-col">
              <img src={format.image} alt={format.title} className="w-full h-full object-cover rounded-lg mb-2" />
              <h3 className="text-lg text-black font-semibold mt-auto">{format.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CvFormatsModal;