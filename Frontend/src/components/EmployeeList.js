import React from "react";

const EmployeeList = ({ employees, onDelete, onEditClick }) => {
  const handleEditClick = (employee) => {
    onEditClick(employee);
  };
  return (
    <div style={{ padding: 10 }}>
      <h2 className="h1">Employee List</h2>
      <table style={{ border: 10, borderColor: "red" }} className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>ID Number</th>
            <th>Email</th>

            <th>Position</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.surname}</td>
              <td>{employee.idNo}</td>
              <td>{employee.email}</td>
              <td>{employee.position}</td>
              <td>{employee.phone}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEditClick(employee)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
