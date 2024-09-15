import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/NavBar";
import Homescreen from "./components/Homescreen";

import CreateEmployee from "./components/CreateEmployee";
import EmployeeList from "./components/EmployeeList";
import UpdateEmployee from "./components/UpdateEmployee";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/home" exact element={<Homescreen />} />
          <Route path="/create" exact element={<CreateEmployee />} />
          <Route path="/list" exact element={<EmployeeList />} />
          <Route path="/update/:id" exact element={<UpdateEmployee />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
