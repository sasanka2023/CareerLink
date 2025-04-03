
import axios from 'axios';
const AdminRegisterApi = async (adminData) => {
    try {
        const response = await axios.post('http://localhost:8091/api/auth/register/admin', adminData);

        if (!response.data) {
            throw new Error('Empty response from server');
        }

        return {
            success: response.data.success,
            message: response.data.message,
            data: response.data.data
        };

    } catch (error) {
        console.error('Admin registration API error:', {
            status: error.response?.status,
            message: error.response?.data?.message || error.message
        });
        return {
            success: false,
            message: error.response?.data?.message || 'Admin registration failed',
            data: null
        };
    }
};

export default AdminRegisterApi;