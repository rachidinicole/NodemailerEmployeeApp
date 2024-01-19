import React, { useState } from "react";

const EmployeeForm = ({
  onAdd,
  onUpdateEmployee,
  selectedEmployee,
  handleCancel,
}) => {
  const [employee, setEmployee] = useState({
    name: "",
    surname: "",
    idNo: "",
    email: "",
    phone: "",
    position: "",
    id: "",
  });

  useState(() => {
    if (selectedEmployee) {
      setEmployee(selectedEmployee);
    }
  }, [selectedEmployee]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedEmployee) {
      onUpdateEmployee(employee);
    } else {
      onAdd(employee);
    }
    clearForm();
  };

  const clearForm = () => {
    setEmployee({
      name: "",
      surname: "",
      idNo: "",
      email: "",
      position: "",
      phone: "",
      id: "",
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Surname:</label>
        <input
          type="text"
          name="surname"
          value={employee.surname}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">ID Number:</label>
        <input
          type="numeric"
          name="idNo"
          value={employee.idNo}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Email address:</label>
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="name">Employee position:</label>
        <input
          type="text"
          name="position"
          value={employee.position}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Phone Number:</label>
        <input
          type="tel"
          name="phone"
          value={employee.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">ID:</label>
        <input
          type="number"
          name="id"
          value={employee.id}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {selectedEmployee ? "Update" : "Add"} Employee
      </button>
      {selectedEmployee && (
        <button type="button" className="btn btn-secondary" onClick={clearForm}>
          ClearForm
        </button>
      )}
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleCancel}
      >
        Cancel
      </button>
    </form>
  );
};

export default EmployeeForm;
