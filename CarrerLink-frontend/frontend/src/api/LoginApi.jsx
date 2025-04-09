import axiosInstance from './AxiosInstance'; // Change from axios

const LoginApi = async (formData) => {
  try {
    const response = await axiosInstance.post('/auth/login', { // Use relative path
      username: formData.username,
      password: formData.password,
    });

    //-------------------------------------------------
      if (response.data.message === "Company account not approved") {
          return {
              token: null,
              message: "Your company account is pending admin approval"
          };
      }
//-------------------------------------------
      const token = response.data.token;
      localStorage.setItem('token', token);
    console.log(response);

      // 🔥 Set it RIGHT NOW, not just on load
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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
