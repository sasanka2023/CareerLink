import axiosInstance from './AxiosInstance';
import {ApproveJob} from "./CompanyDetailsGetApi";// const getCompanyDetailsById = async (companyId) => {
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
    return await axiosInstance.put(
        '/companies',
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
};

export {  getCompanyDetailsByUsername,updateCompany };