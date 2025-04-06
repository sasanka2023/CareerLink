// TestManager.jsx
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';

const TestManager = () => {
    const [tests, setTests] = useState([]);
    const [newTest, setNewTest] = useState({
        title: '',
        description: '',
        durationMinutes: '',
        totalMarks: '',
        questions: []
    });
    const [editingId, setEditingId] = useState(null);
    const [showQuestionForm, setShowQuestionForm] = useState(false);
    const [newQuestion, setNewQuestion] = useState({
        text: '',
        options: ['', '', '', ''],
        correctAnswer: '',
        marks: ''
    });
    const [selectedTest, setSelectedTest] = useState(null);

    const API_URL = 'http://localhost:8091/api/tests';
    const token = localStorage.getItem('token'); // Adjust based on your auth setup

    const testOptions = [
        { value: 'OOP', description: 'Object-Oriented Programming concepts and principles' },
        { value: 'Programming Techniques', description: 'Advanced programming methods and best practices' },
        { value: 'Software Engineering', description: 'Software development lifecycle and methodologies' },
        { value: 'Project Management', description: 'Project planning, execution, and management techniques' },
        { value: 'Statistics', description: 'Statistical analysis and data interpretation' },
        { value: 'Data Mining', description: 'Techniques for extracting patterns from large datasets' }
    ];

    useEffect(() => {
        if (!token) {
            Swal.fire('Error', 'Please log in to access tests', 'error');
            // Redirect to login page if needed, e.g., window.location.href = '/login';
            return;
        }
        const fetchTests = async () => {
            try {
                const response = await axios.get(API_URL, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTests(response.data);
            } catch (error) {
                console.error('Error fetching tests:', error.response ? error.response.data : error.message);
                Swal.fire('Error', 'Failed to load tests: ' + (error.response ? error.response.statusText : error.message), 'error');
            }
        };
        fetchTests();
    }, [token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'title') {
            const selectedTest = testOptions.find(option => option.value === value);
            setNewTest(prev => ({
                ...prev,
                title: value,
                description: selectedTest ? selectedTest.description : ''
            }));
        } else {
            setNewTest(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleQuestionChange = (e, index = null) => {
        const { name, value } = e.target;
        if (name === 'text') {
            setNewQuestion(prev => ({ ...prev, text: value }));
        } else if (name.startsWith('option')) {
            const optionIndex = parseInt(name.split('-')[1]);
            setNewQuestion(prev => ({
                ...prev,
                options: prev.options.map((opt, i) => i === optionIndex ? value : opt)
            }));
        } else if (name === 'correctAnswer') {
            setNewQuestion(prev => ({ ...prev, correctAnswer: value }));
        } else if (name === 'marks') {
            setNewQuestion(prev => ({ ...prev, marks: value }));
        }
    };

    const handleAddTest = async () => {
        if (!token) {
            Swal.fire('Error', 'Please log in to create tests', 'error');
            return;
        }
        if (newTest.title && newTest.description && newTest.durationMinutes && newTest.totalMarks) {
            try {
                const response = await axios.post(API_URL, {
                    ...newTest,
                    durationMinutes: parseInt(newTest.durationMinutes),
                    totalMarks: parseInt(newTest.totalMarks),
                    questions: newTest.questions.map(q => ({
                        ...q,
                        marks: parseInt(q.marks) // Ensure marks is an integer
                    }))
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTests([...tests, response.data]);
                resetTestForm();
                Swal.fire('Success', 'Test scheduled successfully', 'success');
            } catch (error) {
                console.error('Error adding test:', error.response ? error.response.data : error.message);
                Swal.fire('Error', `Failed to schedule test: ${error.response ? error.response.statusText : error.message}`, 'error');
            }
        } else {
            Swal.fire('Error', 'Please fill all required fields', 'error');
        }
    };

    const handleUpdateTest = async () => {
        if (!token) {
            Swal.fire('Error', 'Please log in to update tests', 'error');
            return;
        }
        if (!editingId) return;
        try {
            const response = await axios.put(`${API_URL}/${editingId}`, {
                ...newTest,
                durationMinutes: parseInt(newTest.durationMinutes),
                totalMarks: parseInt(newTest.totalMarks),
                questions: newTest.questions.map(q => ({
                    ...q,
                    marks: parseInt(q.marks) // Ensure marks is an integer
                }))
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTests(tests.map(test => test.testId === editingId ? response.data : test));
            resetTestForm();
            Swal.fire('Success', 'Test updated successfully', 'success');
        } catch (error) {
            console.error('Error updating test:', error.response ? error.response.data : error.message);
            Swal.fire('Error', `Failed to update test: ${error.response ? error.response.statusText : error.message}`, 'error');
        }
    };

    const handleEditTest = (test) => {
        setEditingId(test.testId);
        setNewTest({ ...test, questions: test.questions || [] });
    };

    const handleDeleteTest = (id) => {
        if (!token) {
            Swal.fire('Error', 'Please log in to delete tests', 'error');
            return;
        }
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${API_URL}/${id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setTests(tests.filter(test => test.testId !== id));
                    setSelectedTest(null);
                    Swal.fire('Deleted', 'Test has been deleted', 'success');
                } catch (error) {
                    console.error('Error deleting test:', error.response ? error.response.data : error.message);
                    Swal.fire('Error', `Failed to delete test: ${error.response ? error.response.statusText : error.message}`, 'error');
                }
            }
        });
    };

    const handleAddQuestion = () => {
        if (newQuestion.text && newQuestion.options.every(opt => opt) && newQuestion.correctAnswer && newQuestion.marks) {
            setNewTest(prev => ({
                ...prev,
                questions: [...(prev.questions || []), { ...newQuestion, tempId: Date.now(), marks: parseInt(newQuestion.marks) }]
            }));
            resetQuestionForm();
        } else {
            Swal.fire('Error', 'Please complete all question fields, including marks', 'error');
        }
    };

    const handleDeleteQuestion = (key) => {
        setNewTest(prev => ({
            ...prev,
            questions: (prev.questions || []).filter(q => (q.questionId || q.tempId || q) !== key)
        }));
    };

    const resetTestForm = () => {
        setNewTest({
            title: '',
            description: '',
            durationMinutes: '',
            totalMarks: '',
            questions: []
        });
        setEditingId(null);
        setShowQuestionForm(false);
    };

    const resetQuestionForm = () => {
        setNewQuestion({
            text: '',
            options: ['', '', '', ''],
            correctAnswer: '',
            marks: ''
        });
    };

    const showTestDetails = (test) => {
        setSelectedTest(test);
    };

    const closeModal = () => {
        setSelectedTest(null);
    };

    return (
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen p-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-5xl mx-auto border border-gray-200">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-10 tracking-tight">Test Management</h2>

                <div className="space-y-8 bg-gray-50 p-6 rounded-xl shadow-inner border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Test Title</label>
                            <select
                                name="title"
                                value={newTest.title}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white shadow-sm transition-all duration-200"
                            >
                                <option value="">Select a Test</option>
                                {testOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.value}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                            <input
                                type="text"
                                name="description"
                                value={newTest.description}
                                readOnly
                                className="w-full p-3 border border-gray-300 rounded-xl bg-gray-100 shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Duration (minutes)</label>
                            <input
                                type="number"
                                name="durationMinutes"
                                value={newTest.durationMinutes}
                                onChange={handleInputChange}
                                placeholder="Duration (minutes)"
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white shadow-sm transition-all duration-200"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Total Marks</label>
                            <input
                                type="number"
                                name="totalMarks"
                                value={newTest.totalMarks}
                                onChange={handleInputChange}
                                placeholder="Total Marks"
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white shadow-sm transition-all duration-200"
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={() => setShowQuestionForm(true)}
                            className="flex items-center px-5 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200 shadow-md"
                        >
                            <Plus size={20} className="mr-2" /> Add Question
                        </button>

                        {showQuestionForm && (
                            <div className="mt-6 p-6 bg-white rounded-xl shadow-md border border-gray-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-semibold text-gray-800">New Question</h3>
                                    <button onClick={() => setShowQuestionForm(false)} className="text-gray-500 hover:text-gray-700">
                                        <X size={24} />
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Question Text</label>
                                        <input
                                            type="text"
                                            name="text"
                                            value={newQuestion.text}
                                            onChange={handleQuestionChange}
                                            placeholder="Question Text"
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white shadow-sm"
                                        />
                                    </div>
                                    {newQuestion.options.map((option, index) => (
                                        <div key={index}>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Option {index + 1}</label>
                                            <input
                                                type="text"
                                                name={`option-${index}`}
                                                value={option}
                                                onChange={(e) => handleQuestionChange(e, index)}
                                                placeholder={`Option ${index + 1}`}
                                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white shadow-sm"
                                            />
                                        </div>
                                    ))}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Correct Answer</label>
                                        <input
                                            type="text"
                                            name="correctAnswer"
                                            value={newQuestion.correctAnswer}
                                            onChange={handleQuestionChange}
                                            placeholder="Correct Answer"
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Marks</label>
                                        <input
                                            type="number"
                                            name="marks"
                                            value={newQuestion.marks}
                                            onChange={handleQuestionChange}
                                            placeholder="Marks"
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white shadow-sm"
                                        />
                                    </div>
                                    <button
                                        onClick={handleAddQuestion}
                                        className="w-full px-5 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-200 shadow-md text-lg font-semibold"
                                    >
                                        Add Question
                                    </button>
                                </div>
                            </div>
                        )}

                        {(newTest.questions || []).length > 0 && (
                            <div className="mt-6">
                                <h4 className="text-xl font-semibold text-gray-800 mb-4">Questions</h4>
                                {(newTest.questions || []).map((question, index) => (
                                    <div key={question.questionId || question.tempId || index} className="p-4 bg-gray-100 rounded-xl mb-3 flex justify-between items-center shadow-sm hover:bg-gray-200 transition-colors duration-150">
                                        <span className="text-gray-700 font-medium">{question.text} ({question.marks} marks)</span>
                                        <button
                                            onClick={() => handleDeleteQuestion(question.questionId || question.tempId || index)}
                                            className="text-red-600 hover:text-red-800 transition-colors duration-150"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={editingId ? handleUpdateTest : handleAddTest}
                        className="w-full mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-200 shadow-lg text-lg font-semibold flex items-center justify-center"
                    >
                        <Plus size={24} className="mr-2" /> {editingId ? 'Update Test' : 'Create Test'}
                    </button>
                </div>

                <div className="mt-10">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Scheduled Tests</h3>
                    {tests.length === 0 ? (
                        <p className="text-gray-500 text-lg">No tests scheduled yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 gap-6">
                            {tests.map(test => (
                                <div
                                    key={test.testId}
                                    className="p-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl shadow-md flex justify-between items-center hover:shadow-xl transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
                                    onClick={() => showTestDetails(test)}
                                >
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">{test.title}</h3>
                                        <p className="text-gray-600 mt-1">{test.description}</p>
                                        <p className="text-gray-600 mt-1">
                                            {test.durationMinutes} mins | {test.totalMarks} marks
                                        </p>
                                        <p className="text-gray-600 mt-1">Questions: {(test.questions || []).length}</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleEditTest(test); }}
                                            className="p-2 text-blue-600 hover:text-blue-800 transition-colors duration-150"
                                        >
                                            <Edit size={24} />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDeleteTest(test.testId); }}
                                            className="p-2 text-red-600 hover:text-red-800 transition-colors duration-150"
                                        >
                                            <Trash2 size={24} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {selectedTest && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto border border-gray-200">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-2xl font-bold text-gray-800">Test Details</h4>
                            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                                <X size={28} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <p><strong className="text-gray-700">Title:</strong> <span className="text-gray-600">{selectedTest.title}</span></p>
                            <p><strong className="text-gray-700">Description:</strong> <span className="text-gray-600">{selectedTest.description}</span></p>
                            <p><strong className="text-gray-700">Duration:</strong> <span className="text-gray-600">{selectedTest.durationMinutes} minutes</span></p>
                            <p><strong className="text-gray-700">Total Marks:</strong> <span className="text-gray-600">{selectedTest.totalMarks}</span></p>
                            <h5 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Questions</h5>
                            {selectedTest.questions.length > 0 ? (
                                <ul className="space-y-6">
                                    {selectedTest.questions.map((q, index) => (
                                        <li key={q.questionId} className="bg-gray-50 p-4 rounded-xl shadow-sm">
                                            <p className="font-medium text-gray-800"><strong>Q{index + 1}:</strong> {q.text} ({q.marks} marks)</p>
                                            <ul className="mt-2 space-y-1 pl-5 list-disc text-gray-600">
                                                {q.options.map((opt, optIndex) => (
                                                    <li key={optIndex}>{opt}</li>
                                                ))}
                                            </ul>
                                            <p className="mt-2"><strong className="text-gray-700">Correct Answer:</strong> <span className="text-green-600">{q.correctAnswer}</span></p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">No questions added yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TestManager;