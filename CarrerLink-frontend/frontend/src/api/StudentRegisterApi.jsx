
import axios from 'axios'                                                         

const StudentRegisterApi = async (formData) => {
  try{
    const response =  await axios.post('http://localhost:8091/api/auth/register/student',{
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      userName: formData.userName,
      password: formData.password,
      address: formData.address,
      university: formData.university,
      department: formData.department,
      degree: formData.degree,
      acedemicResults:formData.academicStatus

    });
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