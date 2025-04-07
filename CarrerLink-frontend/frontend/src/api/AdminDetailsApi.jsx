import axiosInstance from './AxiosInstance';
import axios from 'axios';
const getAdminByUserId = async (userId) => {
    try {
        const response = await axiosInstance.get(`/admin/userId/${userId}`);
        console.log(response)
        if (!response.data?.success || !response.data?.data) {
            throw new Error('Invalid admin data structure');
        }

        return {
            success: true,
            data: response.data.data
        };

    } catch (error) {
        console.error('Fetch admin details error:', {
            status: error.response?.status,
            message: error.response?.data?.message || error.message
        });
        return {
            success: false,
            data: null,
            message: error.response?.data?.message || 'Failed to fetch admin details'
        };
    }
};

const getAllCourses = async () => {
    try {
        const response = await axiosInstance.get(`/admin/get-all-required-courses`);
        console.log("getAllCourses API response:", response);

        if (!Array.isArray(response.data)) {
            throw new Error('Invalid course data');
        }

        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        console.error('Fetch admin details error:', {
            status: error.response?.status,
            message: error.response?.data?.message || error.message
        });
        return { success: false };
    }
};


const saveTechnology = async (techData) => {
    try {
        const response = await axiosInstance.post('/admin/saveTechnology', {
            techName: techData.name
        });
        return response.data;
    } catch (error) {
        return { success: false, message: error.response?.data?.message };
    }
};
 const saveJobField = async (fieldData) => {
    try {
        const response = await axiosInstance.post('/admin/saveJobField', {
            jobField: fieldData.name
        });
        return response.data;
    } catch (error) {
        return { success: false, message: error.response?.data?.message };
    }
};
const getAdminList = async () => {
    try {
        const response = await axiosInstance.get('/admin/getAll');

        if (!response.data?.success || !response.data?.data) {
            throw new Error('Invalid admin list data structure');
        }

        return {
            success: true,
            data: response.data.data,
            message: 'Admins fetched successfully'
        };
    } catch (error) {
        console.error('Fetch admin list error:', {
            status: error.response?.status,
            message: error.response?.data?.message || error.message
        });
        return {
            success: false,
            data: null,
            message: error.response?.data?.message || 'Failed to fetch admin list'
        };
    }
};

const approveAdmin = async (adminId, adminData) => {
    try {
        console.log(adminId);
        console.log(adminData);
        const response = await axiosInstance.put(`/admin/approve/${adminId}`, adminData);
        console.log(response);
        return {
            success: response.data?.success || false,
            message: response.data?.message || 'Admin approved successfully'
        };
    } catch (error) {
        console.error('Approve admin error:', {
            status: error.response?.status,
            message: error.response?.data?.message || error.message
        });
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to approve admin'
        };
    }
};

// Get All Technologies
 const getAllTechnologies = async () => {
    try {
        const response = await axiosInstance.get('/admin/get-all-technologies');
        return {
            success: response.data?.success,
            data: response.data?.data,
            message: response.data?.message
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to fetch technologies'
        };
    }
};

// Get All Job Fields
 const getAllJobFields = async () => {
    try {
        const response = await axiosInstance.get('/admin/get-all-job-fields');
        return {
            success: response.data?.success,
            data: response.data?.data,
            message: response.data?.message
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to fetch job fields'
        };
    }
};


const getAllCoursesUsingFilters = async (requiredSkill, skillLevel) => {
    try {
        const response = await axios.get('http://localhost:8091/api/v1/acedemicCourses/filter', {
            params: {
                requiredSkill,
                skillLevel
            }
        });

        return {
            success: true,
            data: response.data.data
        };
    } catch (error) {
        console.error('Fetch courses error:', error);
        return { success: false };
    }
};






export { getAdminByUserId,saveTechnology,getAllCourses, saveJobField,getAdminList,approveAdmin,getAllTechnologies,getAllJobFields,getAllCoursesUsingFilters };