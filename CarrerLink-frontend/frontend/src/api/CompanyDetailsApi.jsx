import axiosInstance from './AxiosInstance';

// const getCompanyDetailsById = async (companyId) => {
//     try {
//         const response = await axiosInstance.get(`/companies/${companyId}`);
//
//         // Validate the response structure
//         if (!response.data?.success || !response.data?.data) {
//             throw new Error('Invalid API response structure');
//         }
//
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching company details:', {
//             status: error.response?.status,
//             message: error.response?.data?.message || error.message
//         });
//         return { success: false, data: null };
//     }
// };

const getCompanyDetailsByUsername = async (userId) => {
    try {
        const response = await axiosInstance.get(`/companies/userId/${userId}`);

        // Validate the response structure
        if (!response.data?.success || !response.data?.data) {
            throw new Error('Invalid API response structure');
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching company details:', {
            status: error.response?.status,
            message: error.response?.data?.message || error.message
        });
        return { success: false, data: null };
    }
};
 const updateCompany = async (formData) => {
    try {
        const response = await axiosInstance.put('/companies', formData);
        return response.data;
    } catch (error) {
        console.error('Error updating company:', error);
        throw error;
    }
};

export {  getCompanyDetailsByUsername,updateCompany };