
import axios from 'axios';
const CompanyRegisterApi = async (formdata) => {
   try{
      const response =  await axios.post('http://localhost:8091/api/auth/register/company',{
        name:formdata.name,
        username:formdata.username,
        email:formdata.email,
        password:formdata.password,
        website:formdata.website,
        location:formdata.location
  
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