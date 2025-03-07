import { useState, useEffect, useContext } from "react";
import { Calendar } from "lucide-react";
import Swal from "sweetalert2";
import { getAllApplicants, getAllJobsByCompany } from "../../../api/JobDetailsGetApi";
import { ApproveJob } from "../../../api/CompanyDetailsGetApi";
import { AuthContext } from "../../../api/AuthProvider";

function Applications({ applicants, company }) {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [students, setStudents] = useState([]);
  const [interviewDates, setInterviewDates] = useState({});
  const [jobId,setJobId] = useState(0);

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

  if (loading) return <div>Loading...</div>;

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

  // ✅ Corrected function: Updates only one applicant's date
  const handleDateChange = (applicantId, date) => {
    setInterviewDates((prevDates) => ({
      ...prevDates,
      [applicantId]: date,
    }));
  };

  const handleApproveJob = async (studentId, jobId) => {
    if (!interviewDates[studentId]) {
      Swal.fire({
        icon: "warning",
        title: "Interview Date Required",
        text: "Please assign an interview date before approving the applicant.",
        confirmButtonColor: "#ff9800",
      });
      return;
    }

    const requestBody = {
      id: 0,
      interviewDate: interviewDates[studentId],
      status: true,
    };

    try {
      const response = await ApproveJob(studentId, jobId, requestBody);
      console.log(studentId);
      console.log(jobId);
      console.log(requestBody);
      if (response?.success) {
        // Update the students state to reflect the approval
        setStudents(prevStudents =>
            prevStudents.map(student =>
                student.studentId === studentId
                    ? { ...student, status: true }
                    : student
            )
        );

        Swal.fire({
          icon: "success",
          title: "Approved!",
          text: "The applicant has been successfully approved.",
          confirmButtonColor: "#4CAF50",
        });
      }
    } catch (error) {
      console.error("Error approving applicant:", error);
      Swal.fire({
        icon: "error",
        title: "Approval Failed",
        text: "Something went wrong. Please try again later.",
        confirmButtonColor: "#f44336",
      });
    }
  };

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
                        selectedPosition === job.jobTitle ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
              <span className="inline-block px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm">
                {applicant.status === false ? "Pending" : "Approved"}
              </span>
                </div>

                <div className="flex items-center gap-2 w-[250px]">
                  <input
                      type="date"
                      value={interviewDates[applicant.studentId] || applicant.interviewDate}
                      onChange={(e) => handleDateChange(applicant.studentId, e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                  />
                  <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
                </div>

                <div className="flex gap-2 w-[280px] justify-end">
                  <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm hover:bg-blue-100 transition-colors">
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
