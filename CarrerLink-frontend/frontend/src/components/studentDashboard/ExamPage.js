import React, { useState, useEffect } from "react";
import { preventCopying, openCamera, closeCamera } from "./ExamSecurity";

const ExamQuestion = ({ question, totalQuestions, currentQuestionIndex, userAnswer, onAnswer, onNext, onSubmit, timeLeft }) => {
  const [questionTimeLeft, setQuestionTimeLeft] = useState(question.timeLimit);

  useEffect(() => {
    setQuestionTimeLeft(question.timeLimit);
    preventCopying();
    openCamera();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuestionTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onNext();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questionTimeLeft]);

  const handleSubmit = () => {
    closeCamera(); // Close the camera when submitting
    onSubmit(); // Call the submit function
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold text-[#1a4d5c]">Exam Question</h2>
        <div className="text-lg font-medium">
          Time Left: <span className="text-red-600">{formatTime(timeLeft)}</span>
        </div>
      </div>
      <div className="mb-4">
        <p className="font-medium">Question {currentQuestionIndex + 1} of {totalQuestions}</p>
        <p className="text-sm">Time left for this question: {formatTime(questionTimeLeft)}</p>
      </div>
      <div className="mb-6">
        <p className="text-lg mb-4">{question.question}</p>
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={userAnswer === option}
                onChange={() => onAnswer(option)}
                className="form-radio text-[#1a4d5c]"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <button onClick={onNext} disabled={currentQuestionIndex === totalQuestions - 1} className="bg-[#1a4d5c] text-white px-4 py-2 rounded-md hover:bg-[#134b58] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
          Next Question
        </button>
        <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300">
          Submit Exam
        </button>
      </div>
    </div>
  );
};

export default ExamQuestion;
