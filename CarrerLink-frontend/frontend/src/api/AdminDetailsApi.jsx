import axiosInstance from './AxiosInstance';

const getAdminByUserId = async (userId) => {
    try {
        const response = await axiosInstance.get(`/admins/userId/${userId}`);

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




export { getAdminByUserId,saveTechnology, saveJobField };