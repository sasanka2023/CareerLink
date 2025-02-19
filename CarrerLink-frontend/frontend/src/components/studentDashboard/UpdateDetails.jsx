import React, { useState } from 'react';
import UpdateStudent from '../../api/StudentDetailsUpdateApi';

const allTechnologies = [
  "Spring Boot",
  "React",
  "Node.js",
  "Python",
  "MongoDB",
  "JavaScript",
  "TypeScript",
  "Java",
  "C++",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "GraphQL",
  "REST API",
];

const allJobFields = [
  "Software Development",
  "Web Design",
  "Data Analysis",
  "Machine Learning",
  "DevOps",
  "Cloud Computing",
  "Mobile App Development",
  "UI/UX Design",
  "Cybersecurity",
  "Artificial Intelligence",
];

const UpdateDetailsForm = ({ student, onSubmit, onClose }) => {
  //const [name, setName] = useState(student.firstName || "");
  //const [email, setEmail] = useState(student.email || "");
  const [profilePicture, setProfilePicture] = useState('/placeholder.svg');
  const [technologies, setTechnologies] = useState(
    student.technologies?.map(t => typeof t === 'string' ? { techName: t } : t) || []
  );
  const [appliedJobFields, setAppliedJobFields] = useState(
    student.jobsFields?.map(j => typeof j === 'string' ? { jobField: j } : j) || []
  );
  //const [address, setAddress] = useState(student.address || "");
  const [formdata,setFormdata] = useState({
    studentId:student.studentId,
    firstName:student.firstName,
    lastName:student.lastName,
    email:student.email,
    address:student.address,
    userName:student.userName,
    jobsFields:student.jobsFields,
    technologies:student.technologies

  })

  const handelChange = (event) =>{
    event.preventDefault();
    const {name,value} = event.target;
    setFormdata((prev) => ({
        ...prev,
        [name]:value
    }));
    
}
  const handleSubmit = async (event) =>{
    event.preventDefault();
    console.log(formdata);
    console.log(student)
    try {
        const response = await UpdateStudent(formdata);
        console.log('Response:', response);
        onSubmit(formdata);
        
    } catch (error) {
        console.error('Error during registration:', error);
        alert('Registration failed. Please try again.');
    }
  };



  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTechnology = (tech) => {
    if (!technologies.some(t => t.techName === tech)) {
      const updatedTechnologies = [...technologies, { techName: tech }];
      setTechnologies(updatedTechnologies);
      setFormdata((prev) => ({
        ...prev,
        technologies: updatedTechnologies
      }));
    }
  };

  const removeTechnology = (tech) => {
    const updatedTechnologies = technologies.filter(t => t.techName !== tech);
    setTechnologies(updatedTechnologies);
    setFormdata((prev) => ({
      ...prev,
      technologies: updatedTechnologies
    }));
  };

  const addJobField = (field) => {
    if (!appliedJobFields.some(f => f.jobField === field)) {
      const updatedJobFields = [...appliedJobFields, { jobField: field }];
      setAppliedJobFields(updatedJobFields);
      setFormdata((prev) => ({
        ...prev,
        jobsFields: updatedJobFields
      }));
    }
  };

  const removeJobField = (field) => {
    const updatedJobFields = appliedJobFields.filter(f => f.jobField !== field);
    setAppliedJobFields(updatedJobFields);
    setFormdata((prev) => ({
      ...prev,
      jobsFields: updatedJobFields
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col items-center mb-4">
        <img
          src={profilePicture || "/placeholder.svg"}
          alt="Profile Picture"
          className="rounded-full mb-2"
          style={{ width: 100, height: 100 }}
        />
        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full max-w-xs" />
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="firstName" value={formdata.firstName} onChange={handelChange} className="w-full border p-2 rounded" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={formdata.email} onChange={handelChange} className="w-full border p-2 rounded" />
      </div>
      <div>
        <label htmlFor="technologies">Technologies</label>
        <select onChange={(e) => addTechnology(e.target.value)} className="w-full border p-2 rounded">
          <option value="">Select a technology</option>
          {allTechnologies.map((tech) => (
            <option key={tech} value={tech}>
              {tech}
            </option>
          ))}
        </select>
        <div className="flex flex-wrap gap-2 mt-2">
        {technologies.map((tech) => (
          <span key={tech.techName} className="bg-black text-white p-2 rounded-full">
            {tech.techName}
            <button 
            type="button" 
            onClick={() => removeTechnology(tech.techName)} 
            className="ml-2 text-white-500"
            >
            x
            </button>
          </span>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="appliedJobFields">Applied Job Fields</label>
        <select onChange={(e) => addJobField(e.target.value)} className="w-full border p-2 rounded">
          <option value="">Select a job field</option>
          {allJobFields.map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
        <div className="flex flex-wrap gap-2 mt-2">
        {appliedJobFields.map((field) => (
            <span key={field.jobField} className="bg-black text-white p-2 rounded-full">
              {field.jobField}
              <button 
                type="button" 
                onClick={() => removeJobField(field.jobField)} 
                className="ml-2 text-white-500"
              >
                x
              </button>
            </span>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <textarea id="address" name="address" value={formdata.address} onChange={handelChange} className="w-full border p-2 rounded" />
      </div>
      <div className="flex justify-between">
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Save Changes
        </button>
        <button type="button" className="bg-red-500 text-white py-2 px-4 rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </form>
  );
};

export default UpdateDetailsForm;