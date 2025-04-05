import axiosInstance from './AxiosInstance';

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


const saveTechnology = async (technologyData) => {
    try {
        const response = await axiosInstance.post('/saveTechnology',
            {
                techName: technologyData.techName
            });
        return {
            success: true,
            data: response.data,
            message: 'Technology added successfully'
        };
    } catch (error) {
        console.error('Save technology error:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to save technology'
        };
    }
};
const saveJobField = async (jobFieldData) => {
    try {
        const response = await axiosInstance.post('/saveJobField',
            {
                jobName: jobFieldData.jobField
            });
        return {
            success: true,
            data: response.data,
            message: 'Job field added successfully'
        };
    } catch (error) {
        console.error('Save job field error:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to save job field'
        };
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




export { getAdminByUserId,saveTechnology,getAllCourses, saveJobField,getAdminList,approveAdmin };