
import { useState, useEffect } from "react"
import ExamQuestion from "./ExamPage"

export default function TestPlatform() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [selectedExam, setSelectedExam] = useState(null)
  const [examStarted, setExamStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(30 * 60) // 30 minutes in seconds
  const [examSubmitted, setExamSubmitted] = useState(false)

  const exams = [
    { id: 1, code: "COSM2021321", name: "Python and SQL", date: "01/03/2021", status: "Scheduled" },
    { id: 2, code: "COSM2021322", name: "Data Structures", date: "10/03/2021", status: "Scheduled" },
    { id: 3, code: "COSM2021323", name: "Web Development", date: "20/03/2021", status: "Scheduled" },
  ]

  const questions = [
    {
      id: 1,
      question: "What is the output of print(2 + 3 * 4)?",
      options: ["14", "20", "11", "24"],
      correctAnswer: "14",
      timeLimit: 120, // 2 minutes
    },
    {
      id: 2,
      question: "Which data structure uses LIFO?",
      options: ["Queue", "Stack", "Linked List", "Tree"],
      correctAnswer: "Stack",
      timeLimit: 120,
    },
    {
      id: 3,
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Hyper Transfer Markup Language",
        "Home Tool Markup Language",
      ],
      correctAnswer: "Hyper Text Markup Language",
      timeLimit: 120,
    },
    {
      id: 4,
      question: "Which of the following is not a valid SQL command?",
      options: ["SELECT", "UPDATE", "DELETE", "MODIFY"],
      correctAnswer: "MODIFY",
      timeLimit: 120,
    },
    {
      id: 5,
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
      correctAnswer: "O(log n)",
      timeLimit: 120,
    },
    {
      id: 6,
      question: "Which of the following is not a JavaScript data type?",
      options: ["Number", "String", "Boolean", "Character"],
      correctAnswer: "Character",
      timeLimit: 120,
    },
  ]

  const handleEnroll = (exam) => {
    setSelectedExam(exam)
  }

  const startExam = () => {
    setExamStarted(true)
  }

  const handleAnswer = (answer) => {
    setUserAnswers({ ...userAnswers, [currentQuestionIndex]: answer })
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const submitExam = () => {
    setExamSubmitted(true)
  }

  useEffect(() => {
    let timer
    if (examStarted && !examSubmitted) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer)
            submitExam()
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [examStarted, examSubmitted])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="fixed top-0 left-0 right-0 h-14 bg-[#1a4d5c] text-white flex items-center px-4 z-10 shadow-md">
        <button
          className="text-white text-xl hover:bg-white hover:text-[#1a4d5c] p-2 rounded transition duration-300"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          ☰
        </button>
        <div className="font-bold ml-4 text-lg">LOGO</div>
      </header>

      <aside
        className={`fixed left-0 top-14 bottom-0 w-60 bg-[#1a4d5c] text-white transition-transform duration-200 ease-in-out shadow-lg ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <nav className="p-4 space-y-2">
          {["Dashboard", "Exams", "View Marks", "Check Answers"].map((item) => (
            <button
              key={item}
              className="w-full text-left p-2 rounded-md hover:bg-white hover:text-[#1a4d5c] transition duration-300"
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <main className={`pt-16 ${isSidebarOpen ? "ml-60" : "ml-0"} transition-all duration-300 ease-in-out p-6`}>
        {!selectedExam ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-300"
              >
                <h2 className="text-2xl font-semibold mb-4 text-[#1a4d5c]">Upcoming Exams</h2>
                <div className="border p-4 rounded-md bg-gray-50 hover:bg-gray-100 transition duration-300">
                  <div className="font-medium text-lg">{`Exam: ${exam.code} - ${exam.name}`}</div>
                  <div className="text-sm text-gray-600">Date: {exam.date}</div>
                  <div className="text-sm text-gray-600">Status: {exam.status}</div>
                </div>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleEnroll(exam)}
                    className="bg-[#1a4d5c] text-white px-4 py-2 rounded-md hover:bg-[#134b58] transition duration-300"
                  >
                    Enroll
                  </button>
                  <button className="bg-[#1a4d5c] text-white px-4 py-2 rounded-md hover:bg-[#134b58] transition duration-300">
                    View Result
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : !examStarted ? (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-[#1a4d5c]">Exam Instructions</h2>
            <p className="mb-2">
              You have successfully enrolled in <b>{selectedExam.name}</b> exam.
            </p>
            <p className="mb-2">Please read the following instructions carefully before starting the test:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ensure you have a stable internet connection.</li>
              <li>Do not refresh or leave the test page during the exam.</li>
              <li>Each question has a fixed time limit; unanswered questions will be automatically submitted.</li>
              <li>Use only authorized resources; cheating is strictly prohibited.</li>
              <li>Ensure you complete the test within the allotted time.</li>
              <li>Results will be available after the evaluation process.</li>
            </ul>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => setSelectedExam(null)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Back to Exams
              </button>
              <button
                onClick={startExam}
                className="bg-[#1a4d5c] text-white px-4 py-2 rounded-md hover:bg-[#134b58] transition duration-300"
              >
                Enroll Now
              </button>
            </div>
          </div>
        ) : !examSubmitted ? (
          <ExamQuestion
            question={questions[currentQuestionIndex]}
            totalQuestions={questions.length}
            currentQuestionIndex={currentQuestionIndex}
            userAnswer={userAnswers[currentQuestionIndex]}
            onAnswer={handleAnswer}
            onNext={nextQuestion}
            onSubmit={submitExam}
            timeLeft={timeLeft}
          />
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-[#1a4d5c]">Exam Submitted</h2>
            <p>Thank you for completing the exam. Your responses have been recorded.</p>
            <p>You will be notified once the results are available.</p>
            <button
              onClick={() => {
                setSelectedExam(null)
                setExamStarted(false)
                setExamSubmitted(false)
                setCurrentQuestionIndex(0)
                setUserAnswers({})
                setTimeLeft(30 * 60)
              }}
              className="mt-4 bg-[#1a4d5c] text-white px-4 py-2 rounded-md hover:bg-[#134b58] transition duration-300"
            >
              Back to Test Platform
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

