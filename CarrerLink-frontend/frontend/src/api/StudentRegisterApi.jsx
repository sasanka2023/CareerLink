
import axios from 'axios'                                                         

const StudentRegisterApi = async (formData) => {
  try{
    const response =  await axios.post('http://localhost:8091/api/auth/register/student',{
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      address: formData.address,
      university: formData.university,
      department: formData.department,
      degree: formData.degree,
      acedemicResults: formData.academicStatus,
      jobFields: formData.jobsFields,  // Correct key and source
      technologies: formData.technologies,  // Correct key and source
      userSaveRequestDTO: {
        username: formData.userName,
        password: formData.password,
        // Optionally include email or profilePic here if needed
      }

    });
    console.log(formData);
    console.log(response);
    return response.data.message;
  }
  catch(error){
    if(error.response && error.response.data){
      console.log(error.response);
      return error.response.data.message;
    }

  }
}

export default StudentRegisterApi