import express from 'express'
import con from '../utils/db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import multer from "multer";
import path from "path";

const router = express.Router()

router.post('/adminlogin', (req, res) => {
    const sql = "SELECT * from admin Where email =? and password =?"
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" })
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign({ role: "admin", email: email, id: result[0].id }, "jwt_secret_key", { expiresIn: '1d' })
            res.cookie('token', token)
            return res.json({ loginStatus: true })
        } 
        else {
            return res.json({ loginStatus: false, Error: "wrong email or password" })
        }
    })
});

// router.get('/category',(req,res) => {
//     const sql = "SELECT * from category";
//     con.query(sql, (err,result) => {
//         if (err) return res.json({ Status: false, Error: "Query Error"})
//             return res.json({Status: true, Result: result})
//     })
// })

// router.post('/add_category',(req,res) => {
//     const sql = "INSERT into category (`name`) VALUES (?)"
//     con.query(sql, [req.body.category], (err,result) => {
//         if (err) return res.json({ Status: false, Error: "Query Error"})
//             return res.json({Status: true})
//     })
// })

//image upload

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage : storage
})

//end image upload

router.post('/add_employee', upload.single('image'), (req, res) => {
    const sql = `INSERT INTO employee 
      (name, email, password, salary, address, image, bankname, account_no) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  
    // Hash the password
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) return res.status(500).json({ Status: false, Error: "Password Hashing Error" });
  
      // Generate account number starting with "0400"
      const generateAccountNo = () => {
        const prefix = "0400";
        const randomNumber = Math.floor(10000000 + Math.random() * 90000000); // 6-digit random number
        return prefix + randomNumber.toString();
      };
  
      const values = [
        req.body.name,
        req.body.email,
        hash,  // Use the hashed password here
        req.body.salary,
        req.body.address,
        req.file.filename, // Use the uploaded file name
        // req.body.category_id,
        req.body.bankname,
        generateAccountNo()
      ];
  
      con.query(sql, values, (err, result) => {
        if (err) {
          console.error("Error executing SQL query:", err);
          return res.status(500).json({ Status: false, Error: "Query Error" });
        }
        return res.json({ Status: true });
      });
    });
  });

router.get('/employee',(req,res) => {
    const sql = "SELECT * from employee";
    con.query(sql, (err,result) => {
        if (err) return res.json({ Status: false, Error: "Query Error"})
            return res.json({Status: true, Result: result})
    })
})

router.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE id = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee/bankdetails', (req, res) => {
    const sql = "SELECT id, bankname, account_no FROM employee";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.put('/edit_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE employee 
        set name = ?, email = ?, salary = ?, address = ?, bankname = ?, account_no = ?
        Where id = ?`
    const values = [
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.bankname,
        req.body.account_no
    ]
    con.query(sql,[...values, id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})


router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    
    // SQL query to delete records from employee_attendance
    const deleteAttendanceSql = "DELETE FROM employee_attendance WHERE employee_id = ?";
    const deleteWagesSql = "DELETE FROM employee_wages WHERE employee_id = ?";

    
    con.query(deleteAttendanceSql, [id], (err, result) => {
        if (err) {
            return res.json({Status: false, Error: "Query Error: " + err});
        }

    con.query(deleteWagesSql, [id], (err, result) => {
            if (err) {
                return res.json({Status: false, Error: "Query Error: " + err});
            }
        });
        
        // SQL query to delete record from employee
        const deleteEmployeeSql = "DELETE FROM employee WHERE id = ?";
        
        con.query(deleteEmployeeSql, [id], (err, result) => {
            if (err) {
                return res.json({Status: false, Error: "Query Error: " + err});
            }
            
            return res.json({Status: true, Result: result});
        });
    });
});


router.get('/admin_count', (req, res) => {
    const sql = "select count(id) as admin from admin";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee_count', (req, res) => {
    const sql = "select count(id) as employee from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/salary_count', (req, res) => {
    const sql = "select sum(salary) as salaryOFEmp from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_records', (req, res) => {
    const sql = "select * from admin"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})

router.get('/admin',(req,res) => {
    const sql = "SELECT * from admin";
    con.query(sql, (err,result) => {
        if (err) return res.json({ Status: false, Error: "Query Error"})
            return res.json({Status: true, Result: result})
    })
})

router.put('/admin/uploadImage', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const filename = req.file.filename;

    const sql = `UPDATE admin SET image = ?`;
    const values = [filename];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json({ filename: filename });
    });
});

router.put('/admin/edit_admin', (req, res) => {
    const sql = `UPDATE admin
        set name = ?, email = ?`
    const values = [
        req.body.name,
        req.body.email,
    ]
    con.query(sql,[...values], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/attendance/:year/:month', (req, res) => {
    const { year, month } = req.params;
    const query = `
      SELECT e.id as employee_id, e.name, a.attendance_date, a.status
      FROM employee e
      LEFT JOIN employee_attendance a ON e.id = a.employee_id
      AND YEAR(a.attendance_date) = ? AND MONTH(a.attendance_date) = ?
    `;
    con.query(query, [year, month], (err, result) => {
      if (err) {
        console.error("Error fetching attendance:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
  
      const attendance = result.reduce((acc, row) => {
        if (!acc[row.employee_id]) {
          acc[row.employee_id] = {
            employee_id: row.employee_id,
            name: row.name,
            attendance: {}
          };
        }
        if (row.attendance_date) {
          const day = new Date(row.attendance_date).getDate();
          acc[row.employee_id].attendance[day] = row.status;
        }
        return acc;
      }, {});
  
      res.json(Object.values(attendance));
    });
  });
  
  // New POST route for saving attendance
  router.post('/attendance', (req, res) => {
    const { attendance, year, month } = req.body;
  
    const insertOrUpdateAttendance = (employeeId, day, status) => {
      const attendanceDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const query = `
        INSERT INTO employee_attendance (employee_id, attendance_date, status)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE status = VALUES(status)
      `;
      return new Promise((resolve, reject) => {
        con.query(query, [employeeId, attendanceDate, status], (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        });
      });
    };
  
    const promises = [];
    attendance.forEach(record => {
      Object.keys(record.attendance).forEach(day => {
        const status = record.attendance[day];
        promises.push(insertOrUpdateAttendance(record.employee_id, day, status));
      });
    });
  
    Promise.all(promises)
      .then(() => {
        res.json({ message: "Attendance saved successfully" });
      })
      .catch((err) => {
        console.error("Error saving attendance:", err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  });

  
  // Route to save employee wages
  router.post('/save_wages', async (req, res) => {
      const wagesData = req.body.wages; // Assume wages data is an array of objects
      const workDate = req.body.workDate;
  
      if (!workDate || !wagesData) {
          return res.status(400).json({ Status: false, Error: 'Invalid data' });
      }
  
      try {
          const promises = wagesData.map(({ employee_id, weight, wage }) => {
              const sql = `
                  INSERT INTO employee_wages (employee_id, work_date, weight, wage)
                  VALUES (?, ?, ?, ?)
                  ON DUPLICATE KEY UPDATE weight = VALUES(weight), wage = VALUES(wage)
              `;
              return new Promise((resolve, reject) => {
                  con.query(sql, [employee_id, workDate, weight, wage], (err, result) => {
                      if (err) {
                          return reject(err);
                      }
                      resolve(result);
                  });
              });
          });
  
          const results = await Promise.all(promises);
          res.json({ Status: true, Result: results });
      } catch (err) {
          res.json({ Status: false, Error: "Query Error: " + err });
      }
  });

  router.get('/export_wages', (req, res) => {
    const date = req.query.date;
    const sql = `
        SELECT e.name, ew.weight, ew.wage
        FROM employee_wages ew
        JOIN employee e ON ew.employee_id = e.id
        WHERE ew.work_date = ?
    `;

    con.query(sql, [date], (err, result) => {
        if (err) {
            return res.json({ Status: false, Error: "Query Error: " + err });
        }
        return res.json({ Status: true, Result: result });
    });
});

router.get('/export_monthly_wages', (req, res) => {
    const month = req.query.month; // Expected format: 'YYYY-MM'
    
    if (!month) {
        return res.status(400).json({ Status: false, Error: 'Month is required' });
    }

    const sql = `
        SELECT e.name, e.id, e.bankname, e.account_no, SUM(ew.weight) as total_weight, SUM(ew.wage) as total_wage
        FROM employee_wages ew
        JOIN employee e ON ew.employee_id = e.id
        WHERE DATE_FORMAT(ew.work_date, '%Y-%m') = ?
        GROUP BY ew.employee_id
    `;

    con.query(sql, [month], (err, result) => {
        if (err) {
            return res.json({ Status: false, Error: "Query Error: " + err });
        }
        return res.json({ Status: true, Result: result });
    });
});

router.get('/export_yearly_wages', (req, res) => {
    const year = req.query.year; // Expected format: 'YYYY'
    
    if (!year) {
        return res.status(400).json({ Status: false, Error: 'Year is required' });
    }

    const sql = `
        SELECT e.name, e.id, e.bankname, e.account_no, SUM(ew.weight) as total_weight, SUM(ew.wage) as total_wage
        FROM employee_wages ew
        JOIN employee e ON ew.employee_id = e.id
        WHERE DATE_FORMAT(ew.work_date, '%Y') = ?
        GROUP BY ew.employee_id
    `;

    con.query(sql, [year], (err, result) => {
        if (err) {
            return res.json({ Status: false, Error: "Query Error: " + err });
        }
        return res.json({ Status: true, Result: result });
    });
});

router.post('/save_grades', (req, res) => {
    const { date, grades, sum } = req.body;
  
    const sql = `INSERT INTO grading (grade_date, W180, W210, W240, W280, W320, W400, JH, JK, K, SWP, LWP, BB, sum) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const values = [date, grades.W180, grades.W210, grades.W240, grades.W280, grades.W320, grades.W400, grades.JH, grades.JK, grades.K, grades.SWP, grades.LWP, grades.BB, sum];
  
    con.query(sql, values, (err, result) => {
      if (err) {
        return res.json({ Status: false, Error: err.message });
      }
      res.json({ Status: true, Result: result });
    });
  });

  router.get('/export_grades', (req, res) => {
    const { type, date } = req.query;
    let sql = '';
    let values = [];
  
    if (type === 'daily') {
      sql = `SELECT * FROM grading WHERE grade_date = ?`;
      values = [date];
    } else if (type === 'monthly') {
      const month = new Date(date).getMonth() + 1;
      const year = new Date(date).getFullYear();
      sql = `SELECT * FROM grading WHERE MONTH(grade_date) = ? AND YEAR(grade_date) = ?`;
      values = [month, year];
    } else if (type === 'yearly') {
      const year = new Date(date).getFullYear();
      sql = `SELECT * FROM grading WHERE YEAR(grade_date) = ?`;
      values = [year];
    } else {
      return res.json({ Status: false, Error: 'Invalid type specified' });
    }
  
    con.query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({ Status: false, Error: err.message });
      }
      console.log(results);
      res.json({ Status: true, Data: results });
    });
  });

export { router as adminRouter }