
const { where } = require('sequelize');
const model = require('../models');
const employee = require('../models/employee');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = 'your_secret_key';



function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    model.employee.findOne({ where: { email } })
        .then(employee => {
            if (!employee) {
                return res.status(404).json({ message: "Employee not found." });
            }

            bcrypt.compare(password, employee.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ message: "Error comparing passwords.", error: err });
                }
                if (!isMatch) {
                    return res.status(401).json({ message: "Please Check Your credintials." });
                }

                const token = jwt.sign(
                    { id: employee.id, email: employee.email },
                    secretKey,
                    { expiresIn: '1min' }
                );

                res.status(200).json({
                    message: "Login successful.",
                    token: token,
                    employee: employee
                });
            });
        })
        .catch(error => {
            res.status(500).json({ message: "Internal server error.", error: error });
        });
}



function addEmployee(req, res) {
    const emp = {
        name: req.body.name,
        surname: req.body.surname,
        middlename: req.body.middlename,
        email: req.body.email,
        company_id: req.body.company_ID,
        role_id: req.body.role_ID,
    };

    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: "Error hashing password", error: err });
        }

        emp.password = hashedPassword;

        model.employee.create(emp).then(result => {
            res.status(201).json({
                message: "New Employee has been added successfully",
                emp: result
            });
        }).catch(error => {
            res.status(500).json({
                message: "Error Occurred",
                error: error
            });
        });
    });
}



function getAllEmployee(req, res) {

    model.employee.findAll({
        where : {
    
        }
        }

    ).then(result => {
        res.status(201).json({
            message: "Successfully achived the Data ",
            total: result.length,
            emp: result
        })

    }).catch(error => {

        res.status(500).json({
            message: "Error Occured ",
            error: error

        })
    });

}


function getEmpByID(req, res) {

    const empId = req.params.id

    model.employee.findAll({
        where : {
            id: empId
        }
        }

    ).then(result => {
        res.status(201).json({
            message: "Successfully achived the Data ",
            total: result.length,
            emp: result
        })

    }).catch(error => {

        res.status(500).json({
            message: "Error Occured ",
            error: error

        })
    });

}





module.exports = {

    addEmployee: addEmployee,
    getAllEmployee: getAllEmployee,
    login : login

}