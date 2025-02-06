import React from 'react'

const UpdateStudent = async (username) => {
    try {
      const response = await axiosInstance.post(`/students/username/`,{
        
      });
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

export default StudentDetailsUpdateApi
