import axiosInstance from './AxiosInstance';

const UpdateStudent = async (formdata) => {
  try {
    const response = await axiosInstance.put('/students',formdata);
    if (!response.data?.success || !response.data?.data) {
      throw new Error('Invalid API response structure');
    }
    return response.data;
  } catch (error) {
    console.error('Error updating student data:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });
    return { success: false };
  }
};

export default UpdateStudent;
