import axiosInstance from './AxiosInstance';

const getAllJobsusingFilters = async (jobType, company) => {
  try {
    const response = await axiosInstance.get('jobs/filter', {
      params: { jobType, company }
    });

    if (!response.data?.success || !response.data?.data) {
      throw new Error('Invalid API response structure');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching jobs with filters:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });
    return { success: false };
  }
};

const getAllJobs = async () => {
  try {
    const response = await axiosInstance.get('jobs');

    if (!response.data?.success || !response.data?.data) {
      throw new Error('Invalid API response structure');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching all jobs:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });
    return { success: false };
  }
};



export { getAllJobs, getAllJobsusingFilters}; 

