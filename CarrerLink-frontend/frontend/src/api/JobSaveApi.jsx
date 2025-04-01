import axiosInstance from './AxiosInstance';

const saveJob = async (jobData, companyId) => {
  try {
    const response = await axiosInstance.post('/jobs/save', jobData, {
      params: { companyId }, // Pass company ID as a query parameter
    });

    if (!response.data?.success) {
      throw new Error('Failed to save job');
    }

    return response.data;
  } catch (error) {
    console.error('Error saving job:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });
    return { success: false };
  }
};

export { saveJob };

