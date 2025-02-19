import axiosInstance from './AxiosInstance';

const getAllCompaniesusingFilters = async (location, category) => {
  try {
    const response = await axiosInstance.get('companies/filter', {
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

const getCompanyByName = async (name) => {
  try {
    const response = await axiosInstance.get('companies/search', {
      params: { name } // Pass query parameters properly
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

const getAllCompanies = async () => {
    try {
      const response = await axiosInstance.get('companies');
  
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
  


  export { getAllCompanies,getCompanyByName, getAllCompaniesusingFilters };
