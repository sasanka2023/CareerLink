import { useState, useEffect, useContext } from "react";
import { Calendar } from "lucide-react";
import Swal from "sweetalert2";
import { getAllApplicants, getAllJobsByCompany } from "../../../api/JobDetailsApi";
import { ApproveJob } from "../../../api/CompanyDetailsGetApi";
import { AuthContext } from "../../../api/AuthProvider";
import { useNavigate } from 'react-router-dom';

function Applications({ applicants, company }) {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [students, setStudents] = useState([]);
  const [interviewDateTimes, setInterviewDateTimes] = useState({});
  const [jobId, setJobId] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const fetchCompanyData = async () => {
      if (!token) {
        if (isMounted) setLoading(false);
        return;
      }
      try {
        const response = await getAllJobsByCompany(company.id);
        if (isMounted && response?.success) {
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching Job data:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCompanyData();
    return () => { isMounted = false; };
  }, [token]);

  const handleApplicantsChange = async (jobId) => {
    try {
      const response = await getAllApplicants(jobId);
      if (response?.success) {
        setStudents(response.data);
      }
    } catch (error) {
      console.error("Error fetching applicants data:", error);
    }
  };

  const handleDateTimeChange = (applicantId, dateTime) => {
    setInterviewDateTimes(prev => ({
      ...prev,
      [applicantId]: dateTime
    }));
  };

  const sendNotification = async (studentId, message) => {
    try {
      const response = await fetch('http://localhost:8091/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ studentId, message })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    } catch (error) {
      console.error('Notification error:', error);
      Swal.fire('Error', 'Failed to send notification', 'error');
    }
  };

  const handleApproveJob = async (studentId, jobId) => {
    const dateTime = interviewDateTimes[studentId];
    if (!dateTime) {
      Swal.fire({
        icon: "warning",
        title: "Interview Date & Time Required",
        text: "Please assign an interview date and time before approving.",
        confirmButtonColor: "#ff9800",
      });
      return;
    }

    const selectedDateTime = new Date(dateTime);
    const currentDateTime = new Date();

    if (selectedDateTime < currentDateTime) {
      Swal.fire({
        icon: "error",
        title: "Invalid Date/Time",
        text: "Please select a future date and time for the interview.",
        confirmButtonColor: "#f44336",
      });
      return;
    }
    const isoInterviewDate = `${dateTime}:00.000Z`;

    const requestBody = {
      id: 0,
      interviewDate: isoInterviewDate, // Use the formatted date
      status: true,
    };

    try {
      const response = await ApproveJob(studentId, jobId, requestBody);
      if (response?.success) {
        const formattedDateTime = new Date(isoInterviewDate).toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });

        await sendNotification(
            studentId,
            `Your application for ${selectedPosition} has been approved! Interview scheduled on ${formattedDateTime}`
        );

        setStudents(prev => prev.map(student =>
            student.studentId === studentId ? { ...student, status: true } : student
        ));

        Swal.fire({
          icon: "success",
          title: "Approved!",
          text: "Applicant approved and notified with interview details.",
          confirmButtonColor: "#4CAF50",
        });
      }
    } catch (error) {
      console.error("Error approving applicant:", error);
      Swal.fire({
        icon: "error",
        title: "Approval Failed",
        text: error.message || "Something went wrong. Please try again later.",
        confirmButtonColor: "#f44336",
      });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
      <div className="space-y-8">
        <div className="bg-white rounded-xl shadow-sm p-4 sticky top-0 z-10">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">Job Fields</h2>
          <div className="flex flex-wrap gap-2">
            {company.jobs.map((job) => (
                <button
                    key={job.jobId}
                    onClick={() => {
                      setSelectedPosition(job.jobTitle);
                      setJobId(job.jobId);
                      handleApplicantsChange(job.jobId);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedPosition === job.jobTitle
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {job.jobTitle}
                </button>
            ))}
          </div>
        </div>

        {students.map((applicant) => (
            <div key={applicant.studentId} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4 w-[300px]">
                  <img
                      src={applicant.image || "/placeholder.svg"}
                      alt={applicant.firstName}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-medium text-base">{applicant.firstName}</h3>
                    <p className="text-sm text-gray-600">{applicant.university}</p>
                  </div>
                </div>

                <div className="w-[120px]">
              <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                  applicant.status ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
              }`}>
                {applicant.status ? "Approved" : "Pending"}
              </span>
                </div>

                <div className="flex items-center gap-2 w-[300px]">
                  <input
                      type="datetime-local"
                      value={interviewDateTimes[applicant.studentId] || ""}
                      min={new Date().toISOString().slice(0, 16)}
                      onChange={(e) => handleDateTimeChange(applicant.studentId, e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                  />
                  <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
                </div>

                <div className="flex gap-2 w-[280px] justify-end">
                  <button
                      onClick={() => navigate(`/student-dashboard/viewcv/${applicant.studentId}`)}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm hover:bg-blue-100 transition-colors">
                    View CV
                  </button>
                  <button
                      className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm hover:bg-green-100 transition-colors"
                      onClick={() => handleApproveJob(applicant.studentId, jobId)}
                  >
                    Approve
                  </button>
                  <button className="px-4 py-2 bg-red-50 text-red-700 rounded-lg text-sm hover:bg-red-100 transition-colors">
                    Ignore
                  </button>
                </div>
              </div>
            </div>
        ))}
      </div>
  );
}

export default Applications;