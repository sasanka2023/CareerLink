import Header from "./components/Headers/Header";
import './App.css';
import Footer from "./components/Footer/Footer";
import JobCard from "./components/Cards/JobCard";
import EmployerCard  from "./components/Cards/EmployerCard";
import CourseCard  from "./components/Cards/CourseCard";

function App() {
  return (
    <div className="App">

        <Header/>
        <Footer/>
        <JobCard/>
        <EmployerCard/>
        <CourseCard/>
    </div>
  );
}

export default App;
