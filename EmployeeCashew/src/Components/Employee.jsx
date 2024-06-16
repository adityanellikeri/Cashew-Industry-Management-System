import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Papa from "papaparse"; // Import PapaParse

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error fetching data: " + err.message);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete('http://localhost:3000/auth/delete_employee/' + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error deleting employee: " + err.message);
      });
  };

  const exportCSV = () => {
    // Exclude the image field from the export
    const dataToExport = employee.map(({ image, ...rest }) => rest);
    const csv = Papa.unparse(dataToExport);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'employee_data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <div className="d-flex mb-2">
        <Link to="/dashboard/add_employee" className="btn btn-success">
          Add Employee
        </Link>
        <Link to="/dashboard/employee_attendance" className="btn btn-primary ms-2">
          Employee Attendance
        </Link>
        <button onClick={exportCSV} className="btn btn-secondary ms-2">
          Export as CSV
        </button>
      </div>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>
                   <img
                     src={`http://localhost:3000/Images/` + e.image}
                     className="employee_image"
                   ></img>
                </td>
                <td>{e.email}</td>
                <td>{e.salary}</td>
                <td>{e.address}</td>
                <td>
                  <Link to={`/dashboard/edit_employee/${e.id}`}
                    className="btn btn-info btn-sm me-2">Edit
                  </Link>
                  <button className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e.id)}>Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
