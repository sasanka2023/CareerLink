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

export default getStudentByUsername;