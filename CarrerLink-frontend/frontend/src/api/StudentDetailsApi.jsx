import axiosInstance from "./AxiosInstance";

export const getStudentByUsername = async (userId) => {
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

export const getRecommendedCourses = async (token, studentId) => {
  try {
    // Validate studentId exists and is a number
    if (!studentId || isNaN(studentId)) {
      throw new Error("Invalid student ID");
    }

    const response = await axiosInstance.get(
      `/students/${studentId}/course-recommendations`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Debug log the actual URL being called
    console.log(
      "API Request URL:",
      `/students/${studentId}/course-recommendations`
    );

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Invalid response structure");
    }

    return response.data;
  } catch (error) {
    // Enhanced error logging
    console.error("API Request Failed:", {
      endpoint: "/students//[studentId]/course-recommendation",
      status: error.response?.status,
      error: error.message,
      response: error.response?.data,
    });

    return {
      success: false,
      message: error.response?.data?.message || error.message,
      data: null,
    };
  }
};

export default {
  getStudentByUsername,
  getRecommendedCourses,
};
