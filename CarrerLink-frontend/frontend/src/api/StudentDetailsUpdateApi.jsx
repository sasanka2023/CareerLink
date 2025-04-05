import axios from "axios";

const UpdateStudent = async (studentData, imageFile) => {
  try {
    const formData = new FormData();
    formData.append("student", JSON.stringify(studentData)); // Convert JSON to string
    if (imageFile) {
      formData.append("image", imageFile); // Append file if exists
    }

    const response = await axios.put("http://localhost:8091/api/students", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Success:", response.data);
  } catch (error) {
    console.error("Error updating student:", error.response?.data || error.message);
  }
};


export default UpdateStudent;
