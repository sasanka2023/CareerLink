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
    const [editingQuestionId, setEditingQuestionId] = useState(null); // New state for editing questions
    const [selectedTest, setSelectedTest] = useState(null);

    const API_URL = 'http://localhost:8091/api/tests';
    const token = localStorage.getItem('token');

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
                        marks: parseInt(q.marks)
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
                    marks: parseInt(q.marks)
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
            if (editingQuestionId) {
                setNewTest(prev => ({
                    ...prev,
                    questions: prev.questions.map(q =>
                        (q.questionId || q.tempId) === editingQuestionId
                            ? { ...newQuestion, tempId: q.tempId || Date.now(), marks: parseInt(newQuestion.marks) }
                            : q
                    )
                }));
                setEditingQuestionId(null);
            } else {
                setNewTest(prev => ({
                    ...prev,
                    questions: [...(prev.questions || []), { ...newQuestion, tempId: Date.now(), marks: parseInt(newQuestion.marks) }]
                }));
            }
            resetQuestionForm();
            setShowQuestionForm(false);
        } else {
            Swal.fire('Error', 'Please complete all question fields, including marks', 'error');
        }
    };

    const handleEditQuestion = (question) => {
        setEditingQuestionId(question.questionId || question.tempId);
        setNewQuestion({ ...question });
        setShowQuestionForm(true);
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
        setEditingQuestionId(null);
    };

    const showTestDetails = (test) => {
        setSelectedTest(test);
    };

    const closeModal = () => {
        setSelectedTest(null);
    };

    return (
        <div className="bg-gradient-to-br from-indigo-50 via-gray-100 to-purple-50 min-h-screen p-10">
            <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-6xl mx-auto border border-gray-100 transform transition-all duration-300 hover:shadow-3xl">
                <h2 className="text-5xl font-extrabold text-indigo-900 mb-12 tracking-wide">Test Management Dashboard</h2>

                <div className="space-y-10 bg-gradient-to-r from-gray-50 to-indigo-50 p-8 rounded-2xl shadow-inner border border-indigo-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-sm font-bold text-indigo-800 mb-3">Test Title</label>
                            <select
                                name="title"
                                value={newTest.title}
                                onChange={handleInputChange}
                                className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 bg-white shadow-md transition-all duration-300 hover:border-indigo-400"
                            >
                                <option value="">Select a Test</option>
                                {testOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.value}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-indigo-800 mb-3">Description</label>
                            <input
                                type="text"
                                name="description"
                                value={newTest.description}
                                readOnly
                                className="w-full p-4 border border-indigo-200 rounded-xl bg-indigo-50 shadow-md text-gray-600"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-indigo-800 mb-3">Duration (minutes)</label>
                            <input
                                type="number"
                                name="durationMinutes"
                                value={newTest.durationMinutes}
                                onChange={handleInputChange}
                                placeholder="Duration (minutes)"
                                className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 bg-white shadow-md transition-all duration-300 hover:border-indigo-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-indigo-800 mb-3">Total Marks</label>
                            <input
                                type="number"
                                name="totalMarks"
                                value={newTest.totalMarks}
                                onChange={handleInputChange}
                                placeholder="Total Marks"
                                className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 bg-white shadow-md transition-all duration-300 hover:border-indigo-400"
                            />
                        </div>
                    </div>

                    <div className="mt-8">
                        <button
                            onClick={() => setShowQuestionForm(true)}
                            className="flex items-center px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            <Plus size={22} className="mr-2" /> Add New Question
                        </button>

                        {showQuestionForm && (
                            <div className="mt-8 p-8 bg-white rounded-2xl shadow-xl border border-indigo-100 animate-fade-in">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-2xl font-bold text-indigo-900">{editingQuestionId ? 'Edit Question' : 'New Question'}</h3>
                                    <button onClick={() => { setShowQuestionForm(false); resetQuestionForm(); }} className="text-indigo-500 hover:text-indigo-700 transition-colors duration-200">
                                        <X size={26} />
                                    </button>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-indigo-800 mb-3">Question Text</label>
                                        <input
                                            type="text"
                                            name="text"
                                            value={newQuestion.text}
                                            onChange={handleQuestionChange}
                                            placeholder="Enter question text"
                                            className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 bg-white shadow-md transition-all duration-300"
                                        />
                                    </div>
                                    {newQuestion.options.map((option, index) => (
                                        <div key={index}>
                                            <label className="block text-sm font-bold text-indigo-800 mb-3">Option {index + 1}</label>
                                            <input
                                                type="text"
                                                name={`option-${index}`}
                                                value={option}
                                                onChange={(e) => handleQuestionChange(e, index)}
                                                placeholder={`Option ${index + 1}`}
                                                className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 bg-white shadow-md transition-all duration-300"
                                            />
                                        </div>
                                    ))}
                                    <div>
                                        <label className="block text-sm font-bold text-indigo-800 mb-3">Correct Answer</label>
                                        <input
                                            type="text"
                                            name="correctAnswer"
                                            value={newQuestion.correctAnswer}
                                            onChange={handleQuestionChange}
                                            placeholder="Correct Answer"
                                            className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 bg-white shadow-md transition-all duration-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-indigo-800 mb-3">Marks</label>
                                        <input
                                            type="number"
                                            name="marks"
                                            value={newQuestion.marks}
                                            onChange={handleQuestionChange}
                                            placeholder="Marks"
                                            className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 bg-white shadow-md transition-all duration-300"
                                        />
                                    </div>
                                    <button
                                        onClick={handleAddQuestion}
                                        className="w-full px-6 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg font-semibold"
                                    >
                                        {editingQuestionId ? 'Update Question' : 'Add Question'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {(newTest.questions || []).length > 0 && (
                            <div className="mt-8">
                                <h4 className="text-2xl font-bold text-indigo-900 mb-6">Questions</h4>
                                {(newTest.questions || []).map((question, index) => (
                                    <div key={question.questionId || question.tempId || index} className="p-5 bg-indigo-50 rounded-xl mb-4 flex justify-between items-center shadow-md hover:bg-indigo-100 transition-all duration-200">
                                        <span className="text-indigo-800 font-semibold">{question.text} <span className="text-indigo-600">({question.marks} marks)</span></span>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleEditQuestion(question)}
                                                className="p-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                            >
                                                <Edit size={22} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteQuestion(question.questionId || question.tempId || index)}
                                                className="p-2 text-red-600 hover:text-red-800 transition-colors duration-200"
                                            >
                                                <Trash2 size={22} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={editingId ? handleUpdateTest : handleAddTest}
                        className="w-full mt-8 px-8 py-4 bg-indigo-700 text-white rounded-xl hover:bg-indigo-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-xl font-bold flex items-center justify-center"
                    >
                        <Plus size={28} className="mr-3" /> {editingId ? 'Update Test' : 'Create Test'}
                    </button>
                </div>

                <div className="mt-12">
                    <h3 className="text-3xl font-bold text-indigo-900 mb-8">Scheduled Tests</h3>
                    {tests.length === 0 ? (
                        <p className="text-indigo-600 text-lg font-medium">No tests scheduled yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 gap-8">
                            {tests.map(test => (
                                <div
                                    key={test.testId}
                                    className="p-8 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-2xl shadow-lg flex justify-between items-center hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                                    onClick={() => showTestDetails(test)}
                                >
                                    <div>
                                        <h3 className="text-2xl font-semibold text-indigo-900">{test.title}</h3>
                                        <p className="text-indigo-700 mt-2">{test.description}</p>
                                        <p className="text-indigo-700 mt-2">
                                            {test.durationMinutes} mins | {test.totalMarks} marks
                                        </p>
                                        <p className="text-indigo-700 mt-2">Questions: {(test.questions || []).length}</p>
                                    </div>
                                    <div className="flex gap-5">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleEditTest(test); }}
                                            className="p-3 text-blue-700 hover:text-blue-900 transition-colors duration-200"
                                        >
                                            <Edit size={26} />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDeleteTest(test.testId); }}
                                            className="p-3 text-red-700 hover:text-red-900 transition-colors duration-200"
                                        >
                                            <Trash2 size={26} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {selectedTest && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in">
                    <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-3xl w-full mx-6 max-h-[85vh] overflow-y-auto border border-indigo-100 transform transition-all duration-300 scale-95 hover:scale-100">
                        <div className="flex justify-between items-center mb-8">
                            <h4 className="text-3xl font-bold text-indigo-900">Test Details</h4>
                            <button onClick={closeModal} className="text-indigo-500 hover:text-indigo-700 transition-colors duration-200">
                                <X size={30} />
                            </button>
                        </div>
                        <div className="space-y-6">
                            <p><strong className="text-indigo-800 font-semibold">Title:</strong> <span className="text-indigo-600">{selectedTest.title}</span></p>
                            <p><strong className="text-indigo-800 font-semibold">Description:</strong> <span className="text-indigo-600">{selectedTest.description}</span></p>
                            <p><strong className="text-indigo-800 font-semibold">Duration:</strong> <span className="text-indigo-600">{selectedTest.durationMinutes} minutes</span></p>
                            <p><strong className="text-indigo-800 font-semibold">Total Marks:</strong> <span className="text-indigo-600">{selectedTest.totalMarks}</span></p>
                            <h5 className="text-xl font-semibold text-indigo-900 mt-8 mb-4">Questions</h5>
                            {selectedTest.questions.length > 0 ? (
                                <ul className="space-y-8">
                                    {selectedTest.questions.map((q, index) => (
                                        <li key={q.questionId} className="bg-indigo-50 p-6 rounded-xl shadow-md transition-all duration-200 hover:bg-indigo-100">
                                            <p className="font-semibold text-indigo-800"><strong>Q{index + 1}:</strong> {q.text} <span className="text-indigo-600">({q.marks} marks)</span></p>
                                            <ul className="mt-3 space-y-2 pl-6 list-disc text-indigo-700">
                                                {q.options.map((opt, optIndex) => (
                                                    <li key={optIndex}>{opt}</li>
                                                ))}
                                            </ul>
                                            <p className="mt-3"><strong className="text-indigo-800">Correct Answer:</strong> <span className="text-green-600 font-medium">{q.correctAnswer}</span></p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-indigo-600 font-medium">No questions added yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TestManager;