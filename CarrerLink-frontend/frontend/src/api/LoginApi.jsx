
import axios from 'axios'
const LoginApi = async (formdata) => {
  try{
    const response =  await axios.post('http://localhost:8091/api/auth/login',{
    username: formdata.username,
    password: formdata.password
  });
  //console.log(response.data.message)
  return response.data.message;
}
catch(error){
  if(error.response && error.response.data){
    //console.error('Error:',error.response.data.message);
    return error.response.data.message;
    //console.log("try again");

  }
  else{
    return 'An unexpected error ocurd';
  }
}
}

export default LoginApi
