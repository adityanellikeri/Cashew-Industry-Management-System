import express from 'express'
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const router = express.Router()

router.post("/employee_login", (req, res) => {
    const sql = "SELECT * from employee Where email = ?";
    con.query(sql, [req.body.email], (err, result) => {
      if (err) return res.json({ loginStatus: false, Error: "Query error" });
      if (result.length > 0) {
        bcrypt.compare(req.body.password, result[0].password, (err, response) => {
            if (err) return res.json({ loginStatus: false, Error: "Wrong Password" });
            if(response) {
                const email = result[0].email;
                const token = jwt.sign(
                    { role: "employee", email: email, id: result[0].id },
                    "jwt_secret_key",
                    { expiresIn: "1d" }
                );
                res.cookie('token', token)
                return res.json({ loginStatus: true, id: result[0].id });
            }
        })
        
      } else {
          return res.json({ loginStatus: false, Error:"wrong email or password" });
      }
    });
  });

  router.get('/detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee where id = ?"
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false});
        return res.json(result)
    })
  })

  router.get('/work_details/:id', (req, res) => {
    const { id } = req.params;
    const { date } = req.query;
    
    const sql = `
        SELECT weight, wage
        FROM employee_wages
        WHERE employee_id = ? AND work_date = ?
    `;

    con.query(sql, [id, date], (err, result) => {
        if (err) {
            return res.json({ Status: false, Error: "Query Error: " + err });
        }
        if (result.length > 0) {
            return res.json({ Status: true, Result: result[0] });
        } else {
            return res.json({ Status: false, Error: "No data found for the selected date" });
        }
    });
});

  router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
  })

  export {router as EmployeeRouter}