import axiosInstance from './AxiosInstance'; // Change from axios

const LoginApi = async (formData) => {
  try {
    const response = await axiosInstance.post('/auth/login', { // Use relative path
      username: formData.username,
      password: formData.password,
    });
    localStorage.setItem('token', response.data.token);
    return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data; // Return error message from server
        } else {
            return { message: "An unexpected error occurred. Please try again." };
        }
    }
};

export default LoginApi;
