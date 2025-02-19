
import axios from 'axios';
const CompanyRegisterApi = async (formdata) => {
   try{
      const response =  await axios.post('http://localhost:8091/api/auth/register/company',{
        name:formdata.name,
        
        email:formdata.email,
        
        website:formdata.website,
        location:formdata.location,
        userSaveRequestDTO: {
          username: formdata.username,
          password: formdata.password,
          // Optionally include email or profilePic here if needed
        }
  
      });
      return response.data.message;
    }
    catch(error){
      if(error.response && error.response.data){
        return error.response.data.message;
      }
  
    }
  
}

export default CompanyRegisterApi