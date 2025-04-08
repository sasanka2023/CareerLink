// TestPlatform.jsx
import React, { useState, useEffect, useCallback } from 'react';
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
  const [enrolledTestResults, setEnrolledTestResults] = useState({});

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
      const enrolledTestIds = response.data.map(enrollment => enrollment.testId);
      setEnrolledTests(enrolledTestIds);

      // Fetch results for all enrolled tests
      const resultsPromises = enrolledTestIds.map(testId =>
        axios.get(`${SUBMISSION_URL}/student/${testId}`, {
          headers: { Authorization: `Bearer ${token}` }
        }).then(res => ({ testId, data: res.data })).catch(() => ({ testId, data: null }))
      );
      const results = await Promise.all(resultsPromises);
      const resultsMap = results.reduce((acc, { testId, data }) => {
        acc[testId] = data;
        return acc;
      }, {});
      setEnrolledTestResults(resultsMap);
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
          startTest(test); // Start the test immediately after enrolling
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
      setEnrolledTestResults(prev => ({
        ...prev,
        [testId]: response.data
      }));
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
        setEnrolledTestResults(prev => ({
          ...prev,
          [takingTest.testId]: { score, totalMarks: takingTest.totalMarks, answers }
        }));
        setIsSubmitting(false);
      }, 3000); // 3-second delay for loading
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
  };

  // Separate upcoming and enrolled tests
  const upcomingTests = tests.filter(test => !enrolledTests.includes(test.testId));
  const enrolledTestsList = tests.filter(test => enrolledTests.includes(test.testId));

  return (
    <StudentDashboardLayout>
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          {/* Upcoming Exams Section */}
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Upcoming Exams</h2>
          {upcomingTests.length === 0 ? (
            <p className="text-gray-600 text-lg">No upcoming exams available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingTests.map(test => (
                <div
                  key={test.testId}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Exam: {test.title}
                  </h3>
                  <p className="text-gray-600 mb-1">{test.description || 'No description available'}</p>
                  <p className="text-gray-600 mb-4">Duration: {test.durationMinutes || 'Not specified'} minutes</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEnroll(test.testId)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                    >
                      Enroll
                    </button>

                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Enrolled Tests Section */}
          <h2 className="text-3xl font-bold text-gray-800 mt-12 mb-6">Enrolled Tests</h2>
          {enrolledTestsList.length === 0 ? (
            <p className="text-gray-600 text-lg">You have not enrolled in any tests yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledTestsList.map(test => (
                <div
                  key={test.testId}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Exam: {test.title}
                  </h3>
                  <p className="text-gray-600 mb-1">{test.description || 'No description available'}</p>
                  <p className="text-gray-600 mb-4">Duration: {test.durationMinutes || 'Not specified'} minutes</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        if (enrolledTestResults[test.testId]) {
                          setResults(enrolledTestResults[test.testId]);
                          setSelectedTest(test);
                        } else {
                          startTest(test);
                          setSelectedTest(test);
                        }
                      }}
                      className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition-colors duration-300"
                    >
                      {enrolledTestResults[test.testId] ? 'View Result' : 'Take Test'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Modal for Test Details or Taking Test */}
          {selectedTest && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-0">
              <div className="bg-white rounded-3xl shadow-2xl w-full h-full p-10 overflow-y-auto border border-gray-200 transform transition-all duration-300 scale-95 hover:scale-100">
                <div className="flex justify-between items-center mb-8">
                  <h4 className="text-3xl font-bold text-gray-800">{takingTest ? 'Take Test' : 'Test Details'}</h4>
                  <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                    <X size={30} />
                  </button>
                </div>

                <div className="space-y-6">
                  {!takingTest ? (
                    results && enrolledTests.includes(selectedTest.testId) ? (
                      <div className="space-y-8">
                        <h5 className="text-2xl font-bold text-gray-800">Test Results</h5>
                        <p className="text-lg text-gray-700"><strong>Your Score:</strong> {results.score} / {results.total}</p>
                        <h6 className="text-xl font-semibold text-gray-800 mt-6">Correct Answers</h6>
                        <ul className="space-y-8">
                          {selectedTest.questions.map((q, index) => (
                            <li key={q.questionId} className="bg-gray-50 p-6 rounded-xl shadow-sm">
                              <p className="font-semibold text-gray-800"><strong>Q{index + 1}:</strong> {q.text} <span className="text-gray-600">({q.marks} marks)</span></p>
                              <ul className="mt-3 space-y-2 pl-6 list-disc text-gray-700">
                                {q.options.map((opt, optIndex) => (
                                  <li key={optIndex} className={opt === q.correctAnswer ? 'text-green-600 font-medium' : ''}>
                                    {opt} {opt === q.correctAnswer && '(Correct)'}
                                  </li>
                                ))}
                              </ul>
                              <p className="mt-3"><strong className="text-gray-800">Your Answer:</strong> <span className={results.answers[q.questionId] === q.correctAnswer ? 'text-green-600' : 'text-red-600'}>{results.answers[q.questionId] || 'Not answered'}</span></p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <>
                        <p><strong className="text-gray-800 font-semibold">Title:</strong> <span className="text-gray-600">{selectedTest.title}</span></p>
                        <p><strong className="text-gray-800 font-semibold">Description:</strong> <span className="text-gray-600">{selectedTest.description}</span></p>
                        <p><strong className="text-gray-800 font-semibold">Duration:</strong> <span className="text-gray-600">{selectedTest.durationMinutes} minutes</span></p>
                        <p><strong className="text-gray-800 font-semibold">Total Marks:</strong> <span className="text-gray-600">{selectedTest.totalMarks}</span></p>
                        <h5 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Questions</h5>
                        {selectedTest.questions.length > 0 ? (
                          <ul className="space-y-8">
                            {selectedTest.questions.map((q, index) => (
                              <li key={q.questionId} className="bg-gray-50 p-6 rounded-xl shadow-sm transition-all duration-200 hover:bg-gray-100">
                                <p className="font-semibold text-gray-800"><strong>Q{index + 1}:</strong> {q.text} <span className="text-gray-600">({q.marks} marks)</span></p>
                                <ul className="mt-3 space-y-2 pl-6 list-disc text-gray-700">
                                  {q.options.map((opt, optIndex) => (
                                    <li key={optIndex}>{opt}</li>
                                  ))}
                                </ul>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-600 font-medium">No questions added yet.</p>
                        )}
                      </>
                    )
                  ) : results ? (
                    <div className="space-y-8">
                      <h5 className="text-2xl font-bold text-gray-800">Test Results</h5>
                      <p className="text-lg text-gray-700"><strong>Your Score:</strong> {results.score} / {results.total}</p>
                      <h6 className="text-xl font-semibold text-gray-800 mt-6">Correct Answers</h6>
                      <ul className="space-y-8">
                        {takingTest.questions.map((q, index) => (
                          <li key={q.questionId} className="bg-gray-50 p-6 rounded-xl shadow-sm">
                            <p className="font-semibold text-gray-800"><strong>Q{index + 1}:</strong> {q.text} <span className="text-gray-600">({q.marks} marks)</span></p>
                            <ul className="mt-3 space-y-2 pl-6 list-disc text-gray-700">
                              {q.options.map((opt, optIndex) => (
                                <li key={optIndex} className={opt === q.correctAnswer ? 'text-green-600 font-medium' : ''}>
                                  {opt} {opt === q.correctAnswer && '(Correct)'}
                                </li>
                              ))}
                            </ul>
                            <p className="mt-3"><strong className="text-gray-800">Your Answer:</strong> <span className={answers[q.questionId] === q.correctAnswer ? 'text-green-600' : 'text-red-600'}>{answers[q.questionId] || 'Not answered'}</span></p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <h5 className="text-xl font-semibold text-gray-800 mb-4">Answer the Questions</h5>
                      {takingTest.questions.map((q, index) => (
                        <div key={q.questionId} className="bg-gray-50 p-6 rounded-xl shadow-sm transition-all duration-200 hover:bg-gray-100">
                          <p className="font-semibold text-gray-800 mb-4"><strong>Q{index + 1}:</strong> {q.text} <span className="text-gray-600">({q.marks} marks)</span></p>
                          {q.options.map((opt, optIndex) => (
                            <label key={optIndex} className="flex items-center space-x-3 mb-3 cursor-pointer">
                              <input
                                type="radio"
                                name={`question-${q.questionId}`}
                                value={opt}
                                checked={answers[q.questionId] === opt}
                                onChange={() => handleAnswerChange(q.questionId, opt)}
                                className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                              />
                              <span className="text-gray-700">{opt}</span>
                            </label>
                          ))}
                        </div>
                      ))}
                      <button
                        onClick={handleSubmitTest}
                        disabled={isSubmitting}
                        className="w-full px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-xl font-bold flex items-center justify-center disabled:opacity-50"
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