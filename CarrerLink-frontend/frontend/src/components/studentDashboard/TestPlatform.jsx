// TestPlatform.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Plus, X, Check, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';
import StudentDashboardLayout from '../Dashboard/StudentDashboard/StudentDashboardLayout';

const TestPlatform = () => {
  const [tests, setTests] = useState([]);
  const [enrolledTests, setEnrolledTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [takingTest, setTakingTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const videoRef = useRef(null);

  const API_URL = 'http://localhost:8091/api/tests';
  const ENROLLMENT_URL = 'http://localhost:8091/api/enrollments';
  const SUBMISSION_URL = 'http://localhost:8091/api/submissions';
  const token = localStorage.getItem('token');

  const fetchTests = useCallback(async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTests(response.data);
    } catch (error) {
      console.error('Error fetching tests:', error.response ? error.response.data : error.message);
      Swal.fire('Error', 'Failed to load tests: ' + (error.response ? error.response.statusText : error.message), 'error');
    }
  }, [token]);

  const fetchEnrolledTests = useCallback(async () => {
    try {
      const response = await axios.get(`${ENROLLMENT_URL}/student`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEnrolledTests(response.data.map(enrollment => enrollment.testId));
    } catch (error) {
      console.error('Error fetching enrolled tests:', error.response ? error.response.data : error.message);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      Swal.fire('Error', 'Please log in to access the test platform', 'error');
      return;
    }
    fetchTests();
    fetchEnrolledTests();
  }, [token, fetchTests, fetchEnrolledTests]);

  useEffect(() => {
    if (takingTest) {
      startCamera();
    }
    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [takingTest]);

  const handleEnroll = async (testId) => {
    if (!token) {
      Swal.fire('Error', 'Please log in to enroll in tests', 'error');
      return;
    }
    if (enrolledTests.includes(testId)) {
      Swal.fire('Info', 'You are already enrolled in this test.', 'info');
      return;
    }
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to enroll and start this test?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, enroll and start!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post(ENROLLMENT_URL, { testId }, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setEnrolledTests([...enrolledTests, testId]);
          const test = tests.find(t => t.testId === testId);
          setSelectedTest(test);
          startTest(test);
          Swal.fire('Success', 'You have enrolled and can now take the test!', 'success');
        } catch (error) {
          console.error('Error enrolling in test:', error.response ? error.response.data : error.message);
          Swal.fire('Error', `Failed to enroll: ${error.response ? error.response.statusText : error.message}`, 'error');
        }
      }
    });
  };

  const startTest = (test) => {
    setTakingTest(test);
    setAnswers({});
    setResults(null);
  };

  const fetchSubmission = async (testId) => {
    try {
      const response = await axios.get(`${SUBMISSION_URL}/student/${testId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResults({
        score: response.data.score,
        total: response.data.totalMarks,
        answers: response.data.answers
      });
    } catch (error) {
      console.error('Error fetching submission:', error.response ? error.response.data : error.message);
      Swal.fire('Error', 'No submission found for this test.', 'error');
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmitTest = async () => {
    setIsSubmitting(true);
    const score = calculateScore();
    try {
      await axios.post(SUBMISSION_URL, {
        testId: takingTest.testId,
        answers,
        score,
        totalMarks: takingTest.totalMarks
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTimeout(() => {
        setResults({ score, total: takingTest.totalMarks, answers });
        setIsSubmitting(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting test:', error.response ? error.response.data : error.message);
      Swal.fire('Error', 'Failed to submit test.', 'error');
      setIsSubmitting(false);
    }
  };

  const calculateScore = () => {
    let score = 0;
    takingTest.questions.forEach(q => {
      if (answers[q.questionId] === q.correctAnswer) {
        score += parseInt(q.marks);
      }
    });
    return score;
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      setVideoStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      Swal.fire('Error', 'Failed to access camera. Please allow camera permissions.', 'error');
    }
  };

  const stopCamera = () => {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      setVideoStream(null);
    }
  };

  const showTestDetails = (test) => {
    setSelectedTest(test);
    if (enrolledTests.includes(test.testId)) {
      fetchSubmission(test.testId);
    }
  };

  const closeModal = () => {
    setSelectedTest(null);
    setTakingTest(null);
    setResults(null);
    stopCamera();
  };

  return (
    <StudentDashboardLayout>
      <div className="bg-gradient-to-br from-teal-50 via-gray-100 to-blue-50 min-h-screen p-10">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-6xl mx-auto border border-teal-100 transform transition-all duration-300 hover:shadow-3xl">
          <h2 className="text-5xl font-extrabold text-teal-900 mb-12 tracking-wide">Student Test Platform</h2>

          <div className="mt-12">
            <h3 className="text-3xl font-bold text-teal-900 mb-8">Available Tests</h3>
            {tests.length === 0 ? (
              <p className="text-teal-600 text-lg font-medium">No tests available yet.</p>
            ) : (
              <div className="grid grid-cols-1 gap-8">
                {tests.map(test => (
                  <div
                    key={test.testId}
                    className="p-8 bg-gradient-to-r from-teal-100 to-blue-100 rounded-2xl shadow-lg flex justify-between items-center hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                    onClick={() => showTestDetails(test)}
                  >
                    <div>
                      <h3 className="text-2xl font-semibold text-teal-900">{test.title}</h3>
                      <p className="text-teal-700 mt-2">{test.description}</p>
                      <p className="text-teal-700 mt-2">
                        {test.durationMinutes} mins | {test.totalMarks} marks
                      </p>
                      <p className="text-teal-700 mt-2">Questions: {(test.questions || []).length}</p>
                    </div>
                    <div className="flex gap-5">
                      {enrolledTests.includes(test.testId) ? (
                        <button
                          onClick={(e) => { e.stopPropagation(); results ? showTestDetails(test) : startTest(test); setSelectedTest(test); }}
                          className="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all duration-300 shadow-lg flex items-center"
                        >
                          <Check size={22} className="mr-2" /> {results && enrolledTests.includes(test.testId) ? 'View Results' : 'Take Test'}
                        </button>
                      ) : (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleEnroll(test.testId); }}
                          className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-300 shadow-lg flex items-center"
                        >
                          <Plus size={22} className="mr-2" /> Enroll
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {selectedTest && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in">
              <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-4xl w-full mx-6 max-h-[90vh] overflow-y-auto border border-teal-100 transform transition-all duration-300 scale-95 hover:scale-100">
                <div className="flex justify-between items-center mb-8">
                  <h4 className="text-3xl font-bold text-teal-900">{takingTest ? 'Take Test' : 'Test Details'}</h4>
                  <button onClick={closeModal} className="text-teal-500 hover:text-teal-700 transition-colors duration-200">
                    <X size={30} />
                  </button>
                </div>

                {takingTest && (
                  <div className="mb-8 flex justify-center">
                    <video ref={videoRef} autoPlay className="w-64 h-48 rounded-xl border-2 border-teal-200 shadow-md" />
                  </div>
                )}

                <div className="space-y-6">
                  {!takingTest ? (
                    results && enrolledTests.includes(selectedTest.testId) ? (
                      <div className="space-y-8">
                        <h5 className="text-2xl font-bold text-teal-900">Test Results</h5>
                        <p className="text-lg text-teal-800"><strong>Your Score:</strong> {results.score} / {results.total}</p>
                        <h6 className="text-xl font-semibold text-teal-900 mt-6">Correct Answers</h6>
                        <ul className="space-y-8">
                          {selectedTest.questions.map((q, index) => (
                            <li key={q.questionId} className="bg-teal-50 p-6 rounded-xl shadow-md">
                              <p className="font-semibold text-teal-800"><strong>Q{index + 1}:</strong> {q.text} <span className="text-teal-600">({q.marks} marks)</span></p>
                              <ul className="mt-3 space-y-2 pl-6 list-disc text-teal-700">
                                {q.options.map((opt, optIndex) => (
                                  <li key={optIndex} className={opt === q.correctAnswer ? 'text-green-600 font-medium' : ''}>
                                    {opt} {opt === q.correctAnswer && '(Correct)'}
                                  </li>
                                ))}
                              </ul>
                              <p className="mt-3"><strong className="text-teal-800">Your Answer:</strong> <span className={results.answers[q.questionId] === q.correctAnswer ? 'text-green-600' : 'text-red-600'}>{results.answers[q.questionId] || 'Not answered'}</span></p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <>
                        <p><strong className="text-teal-800 font-semibold">Title:</strong> <span className="text-teal-600">{selectedTest.title}</span></p>
                        <p><strong className="text-teal-800 font-semibold">Description:</strong> <span className="text-teal-600">{selectedTest.description}</span></p>
                        <p><strong className="text-teal-800 font-semibold">Duration:</strong> <span className="text-teal-600">{selectedTest.durationMinutes} minutes</span></p>
                        <p><strong className="text-teal-800 font-semibold">Total Marks:</strong> <span className="text-teal-600">{selectedTest.totalMarks}</span></p>
                        <h5 className="text-xl font-semibold text-teal-900 mt-8 mb-4">Questions</h5>
                        {selectedTest.questions.length > 0 ? (
                          <ul className="space-y-8">
                            {selectedTest.questions.map((q, index) => (
                              <li key={q.questionId} className="bg-teal-50 p-6 rounded-xl shadow-md transition-all duration-200 hover:bg-teal-100">
                                <p className="font-semibold text-teal-800"><strong>Q{index + 1}:</strong> {q.text} <span className="text-teal-600">({q.marks} marks)</span></p>
                                <ul className="mt-3 space-y-2 pl-6 list-disc text-teal-700">
                                  {q.options.map((opt, optIndex) => (
                                    <li key={optIndex}>{opt}</li>
                                  ))}
                                </ul>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-teal-600 font-medium">No questions added yet.</p>
                        )}
                      </>
                    )
                  ) : results ? (
                    <div className="space-y-8">
                      <h5 className="text-2xl font-bold text-teal-900">Test Results</h5>
                      <p className="text-lg text-teal-800"><strong>Your Score:</strong> {results.score} / {results.total}</p>
                      <h6 className="text-xl font-semibold text-teal-900 mt-6">Correct Answers</h6>
                      <ul className="space-y-8">
                        {takingTest.questions.map((q, index) => (
                          <li key={q.questionId} className="bg-teal-50 p-6 rounded-xl shadow-md">
                            <p className="font-semibold text-teal-800"><strong>Q{index + 1}:</strong> {q.text} <span className="text-teal-600">({q.marks} marks)</span></p>
                            <ul className="mt-3 space-y-2 pl-6 list-disc text-teal-700">
                              {q.options.map((opt, optIndex) => (
                                <li key={optIndex} className={opt === q.correctAnswer ? 'text-green-600 font-medium' : ''}>
                                  {opt} {opt === q.correctAnswer && '(Correct)'}
                                </li>
                              ))}
                            </ul>
                            <p className="mt-3"><strong className="text-teal-800">Your Answer:</strong> <span className={answers[q.questionId] === q.correctAnswer ? 'text-green-600' : 'text-red-600'}>{answers[q.questionId] || 'Not answered'}</span></p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <h5 className="text-xl font-semibold text-teal-900 mb-4">Answer the Questions</h5>
                      {takingTest.questions.map((q, index) => (
                        <div key={q.questionId} className="bg-teal-50 p-6 rounded-xl shadow-md transition-all duration-200 hover:bg-teal-100">
                          <p className="font-semibold text-teal-800 mb-4"><strong>Q{index + 1}:</strong> {q.text} <span className="text-teal-600">({q.marks} marks)</span></p>
                          {q.options.map((opt, optIndex) => (
                            <label key={optIndex} className="flex items-center space-x-3 mb-3 cursor-pointer">
                              <input
                                type="radio"
                                name={`question-${q.questionId}`}
                                value={opt}
                                checked={answers[q.questionId] === opt}
                                onChange={() => handleAnswerChange(q.questionId, opt)}
                                className="w-5 h-5 text-teal-600 border-teal-300 focus:ring-teal-500"
                              />
                              <span className="text-teal-700">{opt}</span>
                            </label>
                          ))}
                        </div>
                      ))}
                      <button
                        onClick={handleSubmitTest}
                        disabled={isSubmitting}
                        className="w-full px-8 py-4 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-xl font-bold flex items-center justify-center disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={28} className="mr-3 animate-spin" /> Submitting...
                          </>
                        ) : (
                          <>
                            <Check size={28} className="mr-3" /> Submit Test
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </StudentDashboardLayout>
  );
};

export default TestPlatform;