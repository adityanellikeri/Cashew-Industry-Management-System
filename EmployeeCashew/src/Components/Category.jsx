import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Papa from "papaparse";

const Grading = () => {
  const [grades, setGrades] = useState({
    W180: 0,
    W210: 0,
    W240: 0,
    W280: 0,
    W320: 0,
    W400: 0,
    JH: 0,
    JK: 0,
    K: 0,
    SWP: 0,
    LWP: 0,
    BB: 0,
  });
  const [date, setDate] = useState("");
  const [sum, setSum] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    calculateSum();
  }, [grades]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGrades((prevGrades) => ({
      ...prevGrades,
      [name]: parseFloat(value) || 0,
    }));
  };

  const calculateSum = () => {
    const total = Object.values(grades).reduce((acc, val) => acc + val, 0);
    setSum(total);
  };

  const handleSave = () => {
    axios
      .post("http://localhost:3000/auth/save_grades", { date, grades, sum })
      .then((result) => {
        if (result.data.Status) {
          alert("Grades saved successfully!");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error saving grades: " + err.message);
      });
  };

  const exportCSV = (type) => {
    if (!date) {
      alert("Please choose a date before exporting.");
      return;
    }
    
    console.log(`Exporting ${type} report`);
    axios
      .get(`http://localhost:3000/auth/export_grades`, {
        params: { type, date },
      })
      .then((result) => {
        if (result.data.Status) {
          const gradesData = result.data.Data;
          if (gradesData.length === 0) {
            alert("No data available for the selected date.");
            return;
          }
          
          // Adjust date format
          const formattedGradesData = gradesData.map(row => {
            let formattedDate;
            if (type === "monthly") {
              formattedDate = row.grade_date.substring(0, 7);
            } else if (type === "yearly") {
              formattedDate = row.grade_date.substring(0, 4);
            } else {
              formattedDate = row.grade_date; // If type is neither monthly nor yearly, keep original format
            }
            return { ...row, grade_date: formattedDate };
          });
          
          // Remove "id" column
          const filteredGradesData = formattedGradesData.map(({ id, ...row }) => row);
          
          // Construct CSV content
          const title = `Grades are in kilograms(Kgs)\n`;
          const headers = Object.keys(filteredGradesData[0]).join(",") + "\n";
          const csvContent = title + headers + filteredGradesData.map(row => Object.values(row).join(",")).join("\n");
  
          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${type}_grading_data.csv`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
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
        <h3>Grading Entry</h3>
      </div>
      <div className="d-flex mb-2">
        <input
          type="date"
          className="form-control me-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Grade</th>
              <th>Weight (kgs)</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(grades).map((grade) => (
              <tr key={grade}>
                <td>{grade}</td>
                <td>
                  <input
                    type="number"
                    name={grade}
                    className="form-control"
                    value={grades[grade]}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td><strong>Total</strong></td>
              <td><strong>{sum} kgs</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-end">
        <button onClick={handleSave} className="btn btn-success me-2">
          Save
        </button>
        <button onClick={() => exportCSV('monthly')} className="btn btn-secondary me-2">
          Export Monthly CSV
        </button>
        <button onClick={() => exportCSV('yearly')} className="btn btn-secondary">
          Export Yearly CSV
        </button>
      </div>
    </div>
  );
};

export default Grading;
