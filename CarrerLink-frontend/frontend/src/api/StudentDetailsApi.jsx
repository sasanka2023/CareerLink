import axiosInstance from './AxiosInstance';

const getStudentByUsername = async (userId) => {
  try {
    const response = await axiosInstance.get(`/students/userId/${userId}`);
    if (!response.data?.success || !response.data?.data) {
      throw new Error('Invalid API response structure');
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching student data:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });
    return { success: false };
  }
};

const getJobRecommendations = async (studentId) => {
  try {
    const response = await axiosInstance.get(`/students/jobrecommendations/${studentId}`);
    if (!response.data?.success || !response.data?.data) {
      throw new Error('Invalid API response structure');
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching student data:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });
    return { success: false };
  }
}

const applyForJob = async (applicationData) => {
  console.log(applicationData);
  try {
    const response = await axiosInstance.post('/students/apply-job', {
      studentId: applicationData.studentId,
      jobId: applicationData.jobId

    });
    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Application failed');
    }
    return response.data;
  } catch (error) {
    console.error('Application error:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });
    throw error;
  }
};

export {getStudentByUsername,getJobRecommendations,applyForJob};