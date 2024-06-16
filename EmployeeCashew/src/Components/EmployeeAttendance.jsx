import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchAttendance();
  }, [month, year]);

  const fetchAttendance = () => {
    axios
      .get(`http://localhost:3000/auth/attendance/${year}/${month}`)
      .then((response) => {
        setAttendance(response.data);
      })
      .catch((error) => {
        console.error("Error fetching attendance:", error);
      });
  };

  const saveAttendance = () => {
    axios
      .post(`http://localhost:3000/auth/attendance`, { attendance, year, month })
      .then(() => {
        console.log("Attendance saved successfully.");
      })
      .catch((error) => {
        console.error("Error saving attendance:", error);
      });
  };

  const handleAttendanceChange = (employeeId, day, value) => {
    setAttendance((prevAttendance) =>
      prevAttendance.map((record) =>
        record.employee_id === employeeId
          ? { ...record, attendance: { ...record.attendance, [day]: value } }
          : record
      )
    );
  };

  const daysInMonth = new Date(year, month, 0).getDate();

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Employee Attendance</h2>
      <div className="row">
        <div className="col">
          <button
            className="btn btn-secondary me-2"
            onClick={() => setMonth((prevMonth) => (prevMonth === 1 ? 12 : prevMonth - 1))}
          >
            Previous Month
          </button>
          <h5 className="d-inline">
            {new Date(year, month - 1).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h5>
          <button
            className="btn btn-secondary ms-2"
            onClick={() => setMonth((prevMonth) => (prevMonth === 12 ? 1 : prevMonth + 1))}
          >
            Next Month
          </button>
        </div>
      </div>
      <div className="table-responsive mt-4">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              {[...Array(daysInMonth)].map((_, index) => (
                <th key={index}>{index + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {attendance.map((record) => (
              <tr key={record.employee_id}>
                <td>{record.name}</td>
                {[...Array(daysInMonth)].map((_, index) => (
                  <td key={index} style={{ textAlign: 'center' }}>
                    <div className="btn-group" role="group">
                      <button
                        type="button"
                        className={`btn btn-sm ${record.attendance[index + 1] === "P" ? "btn-success" : "btn-outline-success"}`}
                        onClick={() => handleAttendanceChange(record.employee_id, index + 1, "P")}
                      >
                        P
                      </button>
                      <button
                        type="button"
                        className={`btn btn-sm ${record.attendance[index + 1] === "A" ? "btn-danger" : "btn-outline-danger"}`}
                        onClick={() => handleAttendanceChange(record.employee_id, index + 1, "A")}
                      >
                        A
                      </button>
                      <button
                        type="button"
                        className={`btn btn-sm ${record.attendance[index + 1] === "L" ? "btn-warning" : "btn-outline-warning"}`}
                        onClick={() => handleAttendanceChange(record.employee_id, index + 1, "L")}
                      >
                        L
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <button className="btn btn-primary" onClick={saveAttendance}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EmployeeAttendance;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const EmployeeAttendance = () => {
//   const [attendance, setAttendance] = useState([]);
//   const [month, setMonth] = useState(new Date().getMonth() + 1);
//   const [year, setYear] = useState(new Date().getFullYear());

//   useEffect(() => {
//     fetchAttendance();
//   }, [month, year]);

//   const fetchAttendance = () => {
//     axios
//       .get(`http://localhost:3000/auth/attendance/${year}/${month}`)
//       .then((response) => {
//         setAttendance(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching attendance:", error);
//       });
//   };

//   const saveAttendance = () => {
//     axios
//       .post(`http://localhost:3000/auth/attendance`, { attendance, year, month })
//       .then(() => {
//         console.log("Attendance saved successfully.");
//       })
//       .catch((error) => {
//         console.error("Error saving attendance:", error);
//       });
//   };

//   const handleAttendanceChange = (employeeId, day, value) => {
//     setAttendance((prevAttendance) =>
//       prevAttendance.map((record) =>
//         record.employee_id === employeeId
//           ? { ...record, attendance: { ...record.attendance, [day]: value } }
//           : record
//       )
//     );
//   };

//   const daysInMonth = new Date(year, month, 0).getDate();

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Employee Attendance</h2>
//       <div className="row">
//         <div className="col">
//           <button
//             className="btn btn-secondary me-2"
//             onClick={() => setMonth((prevMonth) => prevMonth === 1 ? 12 : prevMonth - 1)}
//           >
//             Previous Month
//           </button>
//           <h5 className="d-inline">
//             {new Date(year, month - 1).toLocaleString("default", {
//               month: "long",
//               year: "numeric",
//             })}
//           </h5>
//           <button
//             className="btn btn-secondary ms-2"
//             onClick={() => setMonth((prevMonth) => prevMonth === 12 ? 1 : prevMonth + 1)}
//           >
//             Next Month
//           </button>
//         </div>
//       </div>
//       <div className="table-responsive mt-4">
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th>Name</th>
//               {[...Array(daysInMonth)].map((_, index) => (
//                 <th key={index}>{index + 1}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {attendance.map((record) => (
//               <tr key={record.employee_id}>
//                 <td>{record.name}</td>
//                 {[...Array(daysInMonth)].map((_, index) => (
//                   <td key={index}>
//                     <select
//                       value={record.attendance[index + 1] || ""}
//                       onChange={(e) => handleAttendanceChange(record.employee_id, index + 1, e.target.value)}
//                     >
//                       <option value="">Select</option>
//                       <option value="P">Present</option>
//                       <option value="A">Absent</option>
//                       <option value="L">Leave</option>
//                     </select>
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="mt-4">
//         <button className="btn btn-primary" onClick={saveAttendance}>
//           Save
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EmployeeAttendance;

