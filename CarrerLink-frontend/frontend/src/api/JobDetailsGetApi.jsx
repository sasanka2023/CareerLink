import axiosInstance from './AxiosInstance';

const getAllJobsusingFilters = async (location, category) => {
  try {
    const response = await axiosInstance.get('jobs/filter', {
      params: { location, category } // Pass query parameters properly
    });

    if (!response.data?.success || !response.data?.data) {
      throw new Error('Invalid API response structure');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching companies data:', {
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
      console.error('Error fetching companies data:', {
        status: error.response?.status,
        message: error.response?.data?.message || error.message
      });
      return { success: false };
    }
  };


  const getCompanyByJoId = async () => {
    try {
        const response = await axiosInstance.get('jobs/getcompany');
    
        if (!response.data?.success || !response.data?.data) {
          throw new Error('Invalid API response structure');
        }
    
        return response.data;
      } catch (error) {
        console.error('Error fetching companies data:', {
          status: error.response?.status,
          message: error.response?.data?.message || error.message
        });
        return { success: false };
      }

  }
  


  export { getAllJobs, getAllJobsusingFilters };
