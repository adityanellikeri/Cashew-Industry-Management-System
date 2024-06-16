import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [workDetails, setWorkDetails] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3000/employee/detail/' + id)
      .then((result) => {
        setEmployee(result.data[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleLogout = () => {
    axios
      .get('http://localhost:3000/employee/logout')
      .then((result) => {
        if (result.data.Status) {
          localStorage.removeItem('valid');
          navigate('/');
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);

    if (date) {
      axios
        .get(`http://localhost:3000/employee/work_details/${id}?date=${date}`)
        .then((result) => {
          if (result.data.Status) {
            setWorkDetails(result.data.Result);
          } else {
            setWorkDetails(null);
          }
        })
        .catch((err) => {
          console.log(err);
          setWorkDetails(null);
        });
    } else {
      setWorkDetails(null);
    }
  };

  return (
    <div className="container-fluid p-4" style={{ paddingTop: '60px' }}>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <div className="container-fluid">
          <a className="navbar-brand mx-auto" href="#" style={{ color: '#000' }}>
            <h4 className="mb-0 mt-n2">Cashew Industry Management System</h4>
          </a>
        </div>
      </nav>

      <div className="container-fluid" style={{ marginTop: '60px' }}>
      <div className="row mt-4">
        <div className="col-md-4 text-center rounded" style={{ backgroundColor: '#343a40', color: '#fff', padding: '20px' }}>
        <img
            src={`http://localhost:3000/Images/` + employee.image}
            className="img-fluid rounded-circle mb-3"
            style={{ width: '200px', height: '200px', objectFit: 'cover', border: '5px solid #fff'}}
            alt="Employee"
        />
        <div className="mb-3">
            <h3>{employee.name}</h3>
            <p>Email: {employee.email}</p>
            <p>Salary: ${employee.salary}</p>
        </div>
        </div>

        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header">
              <h5>Work Details</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="dateSelect" className="form-label">Select Date:</label>
                <input
                  type="date"
                  id="dateSelect"
                  className="form-control"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </div>
              {selectedDate && (
                <div className="mt-3">
                  {workDetails ? (
                    <div className="alert alert-info">
                      <h5>Work Details for {selectedDate}:</h5>
                      <p>Weight: {workDetails.weight} kg</p>
                      <p>Wage: ${workDetails.wage}</p>
                    </div>
                  ) : (
                    <div className="alert alert-warning">
                      <h5>No work details available for {selectedDate}</h5>
                      <p>The table is not updated yet.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
  
      <div className="row mt-4">
        <div className="col-12 text-center">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default EmployeeDetail;
