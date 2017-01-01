var mongoose = require('mongoose');
var Employee = require('../models/employee');

module.exports.employeeRead = function(req, res, next) {
  var adminEmp;

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private to admins"
    });
  } else if(req.payload.roles[0] === "readWrite") {
    console.log("admin true");
   
        Employee.getEmployees(function(err, employees){
          if(err){
            console.log(err);
          }
          res.json(employees);
        });
  }else{
    console.log('Employee is not an admin');
    //you need to put a redirection to a page here
  }

};

module.exports.updateAuth = function(req, res, next){
/*  if(!req.payload._id){
     res.status(401).json({
      "message" : "Update can be done only by users and admins"
    });
  }*/
   // console.log("admin to update");
  
      var id = req.body.id;

     var data = {
      name: req.body.name,
      email: req.body.email

     };

     //to update employee
     Employee.updateEmployee(id, data, function(err, employee){
      if(err){
        console.log(err);
      }

     });   
};