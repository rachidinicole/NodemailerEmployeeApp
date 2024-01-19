import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";
import EmployeeForm from "./EmployeeForm";
import EmployeeList from "./EmployeeList";
import SearchForm from "./SearchForm";
import employeesData from "../../src/employees.json";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const backgroundImage = require("../assets/barbz.jpg");
const Home = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const signOutClick = () => {
    auth.signOut();
    navigate("/");
  };
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const [value, setValue] = useState("");

  useEffect(() => {
    setEmployees(employeesData);
  }, []);

  const addEmployee = (employee) => {
    setEmployees([...employees, employee]);
    setShowForm(false);
  };

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleEditClick = (employee) => {
    setShowForm(true);
    setSelectedEmployee(employee);
  };

  const handleUpdateEmployee = (updatedEmployee) => {
    const updatedEmployees = employees.map((employee) =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    );
    setEmployees(updatedEmployees);
    setSelectedEmployee(null);
    setShowForm(false);
  };
  const handleDelete = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
  };

  const clearForm = () => {
    setSelectedEmployee(null);
    setShowForm(false);
  };

  const handleCancel = () => {
    setSelectedEmployee(null);
    setShowForm(false);
  };

  const handleSearch = (searchId) => {
    setValue(searchId);
    if (searchId === "") {
      setSearchResults([]);
    } else {
      const searchResults = employees.filter(
        (employee) => employee.id === searchId
      );
      setSearchResults(searchResults);
    }
  };

  return (
    <>
      <div
        className="   vh-100"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: 10,
        }}
      >
        <h4>Welcome {user?.displayName}</h4>
        <button
          style={{ backgroundColor: "red", color: "white", borderRadius: 15 }}
          onClick={() => signOutClick()}
        >
          Logout
        </button>
        <SearchForm onSearch={handleSearch} value={value} />
        {!showForm && (
          <button
            style={{ backgroundColor: "green" }}
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            Add Employee
          </button>
        )}
        {showForm && (
          <EmployeeForm
            onAdd={addEmployee}
            selectedEmployee={selectedEmployee}
            employee={selectedEmployee}
            onUpdateEmployee={handleUpdateEmployee}
            clearForm={clearForm}
            handleCancel={handleCancel}
          />
        )}
        <EmployeeList
          employees={searchResults.length > 0 ? searchResults : employees}
          onDelete={handleDelete}
          onEditClick={handleEditClick}
          setShowForm={setShowForm}
        />
      </div>
    </>
  );
};

export default Home;
