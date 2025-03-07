import axiosInstance from './AxiosInstance';

const getAllJobsusingFilters = async (jobType, company) => {
  try {
    const response = await axiosInstance.get('jobs/filter', {
      params: { jobType, company } // Pass query parameters properly
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

const getAllApplicants = async (jobId) =>{
  try{
    const response = await axiosInstance.get('jobs/get-all-applicants-for-job',{
      params: {jobId}
    });

    if(!response.data?.success || !response.data?.data){
      throw new Error('Invalid API response structure');
    }
    return response.data;

  }
  catch (error){
    console.error('Error fetching companies data:',{
      status:error.response?.status,
      message: error.response?.data?.message || error.message
    });
    return {success: false};
  }
}

const getAllJobsByCompany = async (companyId) => {
  try{
    const response = await axiosInstance.get('jobs/get-all-jobs-by-company',{
      params: {companyId}
    });
    if(!response.data?.success || !response.data?.data){
      throw new Error('Invalid API response structure');
    }
    return response.data;
  }
  catch (error){
    console.error('Error fetching companies data:',{
      status:error.response?.status,
      message: error.response?.data?.message || error.message
    });
    return {success: false};
}
}


 
  


  export { getAllJobs, getAllJobsusingFilters, getAllApplicants,getAllJobsByCompany };
