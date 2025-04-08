import axiosInstance from "./AxiosInstance";

const getStudentByUsername = async (userId) => {
  try {
    const response = await axiosInstance.get(`/students/userId/${userId}`);
    if (!response.data?.success || !response.data?.data) {
      throw new Error("Invalid API response structure");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching student data:", {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });
    return { success: false };
  }
};

const getJobRecommendations = async (studentId) => {
  try {
    const response = await axiosInstance.get(
      `/students/jobrecommendations/${studentId}`
    );
    if (!response.data?.success || !response.data?.data) {
      throw new Error("Invalid API response structure");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching student data:", {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });
    return { success: false };
  }
};

const applyForJob = async (applicationData) => {
  console.log(applicationData);
  try {
    const response = await axiosInstance.post("/students/apply-job", {
      studentId: applicationData.studentId,
      jobId: applicationData.jobId,
    });
    if (!response.data?.success) {
      throw new Error(response.data?.message || "Application failed");
    }
    return response.data;
  } catch (error) {
    console.error("Application error:", {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

const getRecommendedCourses = async (studentId) => {
  try {
    // Validate studentId exists and is a number
    if (!studentId || isNaN(studentId)) {
      throw new Error("Invalid student ID");
    }

    const response = await axiosInstance.get(
        `students/recommend-courses?studentId=${studentId}`
    );

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Invalid response structure");
    }
    console.log(response.data);

    return {
      success: true,
      data: response.data.data || [],
    };
  } catch (error) {
    console.error("Error fetching recommended courses:", {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });

    return {
      success: false,
      message: error.response?.data?.message || error.message,
      data: null,
    };
  }
};

const getProjectRecommendations = async (token, studentId) => {
  try {
    // Validate studentId exists and is a number
    if (!studentId || isNaN(studentId)) {
      throw new Error("Invalid student ID");
    }

    const response = await axiosInstance.get(
      `/students/recommend-projects/${studentId}`, // Adjusted API path for project recommendations
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token
        },
      }
    );

    console.log("Projects Response:", response.data); // Log the response to ensure it's correct

    if (!response.data?.length) {
      return { success: false, message: "No projects available" };
    }

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching project recommendations:", error);
    return { success: false, message: error.message, data: [] };
  }
};

const SaveCV = async (studentId,transformedCVData) => {
  try {
    const response = await axiosInstance.put(`/cv?studentId=${studentId}`, transformedCVData);
    console.log('Save successful:', response.data);
  } catch (error) {
    console.error('Save failed:', error);
  }
};
const getCV = async (studentId) => {
  try {
    const response = await axiosInstance.get(`/cv?studentId=${studentId}`);
    console.log('CV fetched successfully:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error fetching CV:', error);
    return { success: false };
  }
};

const getAllStudents = async () => {
  try {
    const response = await axiosInstance.get("/students/getall");
    console.log('Students fetched successfully:', response.data);

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Failed to fetch students");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching students:", {
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });
    return { success: false, message: error.message };
  }
};

const approveStudent = async (studentId) => {
  try {
    const response = await axiosInstance.put(`/students/approve/${studentId}`);
    console.log('Student approval response:', response.data);

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Approval failed");
    }

    return response.data;
  } catch (error) {
    console.error("Approval error:", {
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });
    return { success: false, message: error.message };
  }
};

export {
  getStudentByUsername,
  getJobRecommendations,
  applyForJob,
  getRecommendedCourses,
  getProjectRecommendations,
  SaveCV,
  getCV,
  getAllStudents,
  approveStudent
};
