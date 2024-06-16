// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const EmployeeWages = () => {
//   const [employees, setEmployees] = useState([]);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");
//   const [weights, setWeights] = useState({});
//   const [wages, setWages] = useState({});
//   const [fixedValuePerKg, setFixedValuePerKg] = useState(10); // Default value
//   const [bonusPercentage, setBonusPercentage] = useState(0); // Bonus percentage
//   const [pfPercentage, setPfPercentage] = useState(0); // PF percentage
//   const FIXED_VALUE_PER_KG_DEFAULT = 10;
//   const PF_CONSTANT_PERCENTAGE = 12;

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/auth/employee")
//       .then((result) => {
//         if (result.data.Status) {
//           setEmployees(result.data.Result);
//         } else {
//           alert(result.data.Error);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         alert("Error fetching data: " + err.message);
//       });
//   }, []);

//   const handleWeightChange = (employeeId, weight) => {
//     setWeights({
//       ...weights,
//       [employeeId]: weight,
//     });
//   };

//   const calculateWages = () => {
//     const calculatedWages = {};
//     for (const [employeeId, weight] of Object.entries(weights)) {
//       let baseWage = weight * fixedValuePerKg;
//       let bonus = (bonusPercentage / 100) * baseWage;
//       let pf = (pfPercentage / 100) * baseWage;
//       calculatedWages[employeeId] = baseWage + bonus + pf;
//     }
//     setWages(calculatedWages);
//   };

//   const handleSubmit = () => {
//     const wagesData = employees.map((employee) => ({
//       employee_id: employee.id,
//       weight: weights[employee.id] || 0,
//       wage: wages[employee.id] || 0,
//     }));

//     axios
//       .post("http://localhost:3000/auth/save_wages", {
//         workDate: selectedDate,
//         wages: wagesData,
//       })
//       .then((result) => {
//         if (result.data.Status) {
//           alert("Wages saved successfully");
//         } else {
//           alert(result.data.Error);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         alert("Error saving data: " + err.message);
//       });
//   };

//   const handleFixedValueChange = (e) => {
//     const value = parseFloat(e.target.value);
//     if (!isNaN(value) && value >= 0) {
//       setFixedValuePerKg(value);
//     } else {
//       setFixedValuePerKg(FIXED_VALUE_PER_KG_DEFAULT);
//     }
//   };

//   const handleBonusPercentageChange = (e) => {
//     const value = parseFloat(e.target.value);
//     if (!isNaN(value) && value >= 0) {
//       setBonusPercentage(value);
//     } else {
//       setBonusPercentage(0);
//     }
//   };

//   const handlePfPercentageChange = (e) => {
//     const value = parseFloat(e.target.value);
//     if (!isNaN(value) && value >= 0) {
//       setPfPercentage(value);
//     } else {
//       setPfPercentage(12);
//     }
//   };

//   const exportToCSV = () => {
//     const selectedMonth = selectedDate.slice(0, 7); // Extract the YYYY-MM portion
//     if (!selectedMonth) {
//       alert("Please select a date to export data.");
//       return;
//     }

//     axios
//       .get(`http://localhost:3000/auth/export_monthly_wages?month=${selectedMonth}`)
//       .then((result) => {
//         if (result.data.Status) {
//           const csvContent =
//             "data:text/csv;charset=utf-8," +
//             "Employee Name,Employee ID,Bank Name,Account Number,Month,Total Weight (kg),Total Wage,PF Amount(12%)\n" +
//             result.data.Result.map((entry) => {
//               const pfAmount = (entry.total_wage * PF_CONSTANT_PERCENTAGE) / 100;
//               return `${entry.name},${entry.id},${entry.bankname},${entry.account_no},${selectedMonth},${entry.total_weight},${entry.total_wage},${pfAmount.toFixed(
//                 2
//               )}`;
//             }).join("\n");

//           const encodedUri = encodeURI(csvContent);
//           const link = document.createElement("a");
//           link.setAttribute("href", encodedUri);
//           link.setAttribute("download", "monthly_employee_wages.csv");
//           document.body.appendChild(link);
//           link.click();
//         } else {
//           alert(result.data.Error);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         alert("Error exporting data: " + err.message);
//       });
//   };

//   const exportYearlyToCSV = () => {
//     const selectedYearValue = selectedYear; // Extract the YYYY portion
//     if (!selectedYearValue) {
//       alert("Please select a year to export data.");
//       return;
//     }

//     axios
//       .get(`http://localhost:3000/auth/export_yearly_wages?year=${selectedYearValue}`)
//       .then((result) => {
//         if (result.data.Status) {
//           const csvContent =
//             "data:text/csv;charset=utf-8," +
//             "Employee Name,Employee ID,Bank Name,Account Number,Year,Total Weight (kg),Total Wage,PF Amount(12%)\n" +
//             result.data.Result.map((entry) => {
//               const pfAmount = (entry.total_wage * PF_CONSTANT_PERCENTAGE) / 100;
//               return `${entry.name},${entry.id},${entry.bankname},${entry.account_no},${selectedYearValue},${entry.total_weight},${entry.total_wage},${pfAmount.toFixed(
//                 2
//               )}`;
//             }).join("\n");

//           const encodedUri = encodeURI(csvContent);
//           const link = document.createElement("a");
//           link.setAttribute("href", encodedUri);
//           link.setAttribute("download", "yearly_employee_wages.csv");
//           document.body.appendChild(link);
//           link.click();
//         } else {
//           alert(result.data.Error);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         alert("Error exporting data: " + err.message);
//       });
//   };

//   return (
//     <div className="px-5 mt-3">
//       <div className="d-flex justify-content-center">
//         <h3>Employee Wages</h3>
//       </div>
//       <div className="form-group">
//         <label htmlFor="dateSelect">Select Date:</label>
//         <input
//           type="date"
//           id="dateSelect"
//           className="form-control"
//           value={selectedDate}
//           onChange={(e) => setSelectedDate(e.target.value)}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="yearSelect">Select Year:</label>
//         <input
//           type="number"
//           id="yearSelect"
//           className="form-control"
//           value={selectedYear}
//           onChange={(e) => setSelectedYear(e.target.value)}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="fixedValuePerKg">Fixed Value per kg ($):</label>
//         <input
//           type="number"
//           id="fixedValuePerKg"
//           className="form-control"
//           value={fixedValuePerKg}
//           onChange={handleFixedValueChange}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="bonusPercentage">Bonus Percentage (%):</label>
//         <input
//           type="number"
//           id="bonusPercentage"
//           className="form-control"
//           value={bonusPercentage}
//           onChange={handleBonusPercentageChange}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="pfPercentage">PF Percentage (%):</label>
//         <input
//           type="number"
//           id="pfPercentage"
//           className="form-control"
//           value={pfPercentage}
//           onChange={handlePfPercentageChange}
//         />
//       </div>
//       <div className="mt-3">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Employee Name</th>
//               <th>Weight (kg)</th>
//               <th>Wage</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.map((employee) => (
//               <tr key={employee.id}>
//                 <td>{employee.name}</td>
//                 <td>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={weights[employee.id] || ""}
//                     onChange={(e) => handleWeightChange(employee.id, e.target.value)}
//                   />
//                 </td>
//                 <td>{wages[employee.id] ? wages[employee.id].toFixed(2) : "-"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button className="btn btn-primary " onClick={calculateWages}>
//           Calculate Wages
//         </button>
//         <button className="btn btn-success ms-2" onClick={handleSubmit}>
//           Submit
//         </button>
//       </div>
//       <div className="mt-3">
//         <button className="btn btn-secondary" onClick={exportToCSV}>
//           Export Monthly Wages to CSV
//         </button>
//         <button className="btn btn-secondary ms-2" onClick={exportYearlyToCSV}>
//           Export Yearly Wages to CSV
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EmployeeWages;

import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeWages = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [weights, setWeights] = useState({});
  const [wages, setWages] = useState({});
  const [fixedValuePerKg, setFixedValuePerKg] = useState(10); // Default value
  const [bonusPercentage, setBonusPercentage] = useState(0); // Bonus percentage
  const [pfPercentage, setPfPercentage] = useState(12); // PF percentage
  const FIXED_VALUE_PER_KG_DEFAULT = 10;
  const PF_CONSTANT_PERCENTAGE = 12;

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployees(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error fetching data: " + err.message);
      });
  }, []);

  const handleWeightChange = (employeeId, weight) => {
    setWeights({
      ...weights,
      [employeeId]: weight,
    });
  };

  const calculateWages = () => {
    const calculatedWages = {};
    for (const [employeeId, weight] of Object.entries(weights)) {
      let baseWage = weight * fixedValuePerKg;
      let bonus = (bonusPercentage / 100) * baseWage;
      let pf = (pfPercentage / 100) * baseWage;
      calculatedWages[employeeId] = baseWage + bonus + pf;
    }
    setWages(calculatedWages);
  };

  const handleSubmit = () => {
    const wagesData = employees.map((employee) => ({
      employee_id: employee.id,
      weight: weights[employee.id] || 0,
      wage: wages[employee.id] || 0,
    }));

    axios
      .post("http://localhost:3000/auth/save_wages", {
        workDate: selectedDate,
        wages: wagesData,
      })
      .then((result) => {
        if (result.data.Status) {
          alert("Wages saved successfully");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error saving data: " + err.message);
      });
  };

  const handleFixedValueChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setFixedValuePerKg(value);
    } else {
      setFixedValuePerKg(FIXED_VALUE_PER_KG_DEFAULT);
    }
  };

  const handleBonusPercentageChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setBonusPercentage(value);
    } else {
      setBonusPercentage(0);
    }
  };

  const handlePfPercentageChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setPfPercentage(value);
    } else {
      setPfPercentage(0);
    }
  };

  const exportToCSV = () => {
    const selectedMonth = selectedDate.slice(0, 7); // Extract the YYYY-MM portion
    if (!selectedMonth) {
      alert("Please select a date to export data.");
      return;
    }
  
    axios
      .get(`http://localhost:3000/auth/export_monthly_wages?month=${selectedMonth}`)
      .then((result) => {
        if (result.data.Status) {
          const csvContent =
            `data:text/csv;charset=utf-8,` +
            `Employee Name,Employee ID,Bank Name,Account Number,Month,Total Weight (kg),Total Wage,PF Amount (12%),Bonus Amount (${bonusPercentage}%)\n` +
            result.data.Result.map((entry) => {
              const pfAmount = (entry.total_wage * PF_CONSTANT_PERCENTAGE) / 100;
              const bonusAmount = (entry.total_wage * bonusPercentage) / 100;
              return `${entry.name},${entry.id},${entry.bankname},${entry.account_no},${selectedMonth},${entry.total_weight},${entry.total_wage},${pfAmount.toFixed(2)},${bonusAmount.toFixed(2)}`;
            }).join("\n");
  
          const encodedUri = encodeURI(csvContent);
          const link = document.createElement("a");
          link.setAttribute("href", encodedUri);
          link.setAttribute("download", "monthly_employee_wages.csv");
          document.body.appendChild(link);
          link.click();
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error exporting data: " + err.message);
      });
  };
  

  const exportYearlyToCSV = () => {
    const selectedYearValue = selectedYear; // Extract the YYYY portion
    if (!selectedYearValue) {
      alert("Please select a year to export data.");
      return;
    }
  
    axios
      .get(`http://localhost:3000/auth/export_yearly_wages?year=${selectedYearValue}`)
      .then((result) => {
        if (result.data.Status) {
          const csvContent =
            `data:text/csv;charset=utf-8,` +
            `Employee Name,Employee ID,Bank Name,Account Number,Year,Total Weight (kg),Total Wage,PF Amount (12%),Bonus Amount (${bonusPercentage}%)\n` +
            result.data.Result.map((entry) => {
              const pfAmount = (entry.total_wage * PF_CONSTANT_PERCENTAGE) / 100;
              const bonusAmount = (entry.total_wage * bonusPercentage) / 100;
              return `${entry.name},${entry.id},${entry.bankname},${entry.account_no},${selectedYearValue},${entry.total_weight},${entry.total_wage},${pfAmount.toFixed(2)},${bonusAmount.toFixed(2)}`;
            }).join("\n");
  
          const encodedUri = encodeURI(csvContent);
          const link = document.createElement("a");
          link.setAttribute("href", encodedUri);
          link.setAttribute("download", "yearly_employee_wages.csv");
          document.body.appendChild(link);
          link.click();
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error exporting data: " + err.message);
      });
  };
  

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee Wages</h3>
      </div>
      <div className="form-group">
        <label htmlFor="dateSelect">Select Date:</label>
        <input
          type="date"
          id="dateSelect"
          className="form-control"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="yearSelect">Select Year:</label>
        <input
          type="number"
          id="yearSelect"
          className="form-control"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="fixedValuePerKg">Fixed Value per kg ($):</label>
        <input
          type="number"
          id="fixedValuePerKg"
          className="form-control"
          value={fixedValuePerKg}
          onChange={handleFixedValueChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="bonusPercentage">Bonus Percentage (%):</label>
        <input
          type="number"
          id="bonusPercentage"
          className="form-control"
          value={bonusPercentage}
          onChange={handleBonusPercentageChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="pfPercentage">PF Percentage (%):</label>
        <input
          type="number"
          id="pfPercentage"
          className="form-control"
          value={pfPercentage}
          onChange={handlePfPercentageChange}
        />
      </div>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Weight (kg)</th>
              <th>Wage</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={weights[employee.id] || ""}
                    onChange={(e) => handleWeightChange(employee.id, e.target.value)}
                  />
                </td>
                <td>{wages[employee.id] ? wages[employee.id].toFixed(2) : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary" onClick={calculateWages}>
          Calculate Wages
        </button>
        <button className="btn btn-success ms-2" onClick={handleSubmit}>
          Save Wages
        </button>
        <button className="btn btn-info ms-2" onClick={exportToCSV}>
          Export Monthly to CSV
        </button>
        <button className="btn btn-info ms-2" onClick={exportYearlyToCSV}>
          Export Yearly to CSV
        </button>
      </div>
    </div>
  );
};

export default EmployeeWages;
