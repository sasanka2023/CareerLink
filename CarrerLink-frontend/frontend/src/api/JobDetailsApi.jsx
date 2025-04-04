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
      console.log(response)
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

const saveJob = async (jobData, companyId) => {
  try {
    const response = await axiosInstance.post('jobs/save', jobData, {
      params: { companyId }
    });

    if (!response.data?.success) {
      throw new Error('Invalid API response structure');
    }

    return response.data;
  } catch (error) {
    console.error('Error saving job data:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });
    return { success: false };
  }
};


const updateJob = async (jobData) => {
  try {
    const response = await axiosInstance.put('jobs/update', jobData);

    if (!response.data?.success) {
      throw new Error('Invalid API response structure');
    }

    return response.data;
  } catch (error) {
    console.error('Error saving job data:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });
    return { success: false };
  }
};

const closeJob = async (jobId) => {
  try{
    const id = parseInt(jobId, 10);
    const response = await axiosInstance.put(`jobs/close/${id}`);
    if (!response.data?.success) {
      throw new Error('Invalid API response structure');
    }

    return response.data;
  } catch (error) {
    console.error('Error saving job data:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });
    return { success: false };
  }
}


  export { getAllJobs, getAllJobsusingFilters, getAllApplicants,getAllJobsByCompany,saveJob,updateJob,closeJob };
