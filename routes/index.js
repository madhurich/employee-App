var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlEmployee = require('../controllers/getEmployees');
var ctrlPassword = require('../controllers/forgotPassword');
var ctrlResetPassword = require('../controllers/resetPassword');
var Employee = require('../models/employee');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//post email to get reset email
router.post('/forgot', ctrlPassword.forgotPassword);

//post new passwords
router.post('/reset/:ptoken', ctrlResetPassword.resetPassword);

//authorization to get all employees to only admins
router.get('/employees', auth, ctrlEmployee.employeeRead);

router.get('/employees/:id', function(req, res, next) {
 Employee.getEmployeeById(req.params.id, function(err, employee){
 	if(err){
 		console.log(err);
 	}
 	res.json(employee);
 });
});

router.get('/reset/:ptoken', function(req, res) {
  Employee.findOne({ resetPasswordToken: req.params.ptoken, resetPasswordExpires: { $gt: Date.now() } }, 
    function(err, employee) {
    if (!employee) {
      //req.flash('error', 'Password reset token is invalid or has expired.');
      console.log('sorry the token has expired');
      //return res.redirect('/forgot');
    }
    res.json(employee);
  });
});

//update possibility to only admins and logged in employee
router.put('/update', ctrlEmployee.updateAuth);

//delete employee
router.delete('/employee/:id', auth, function(req, res, next){

    if(!req.payload._id){
        res.status(401).json({
            'message': 'you are not supposed to delete'
        });
    }
    var id = req.params.id;

    //remove employee
    Employee.removeEmployee(id, function(err, employee){
        if(err){
            console.log(err);
        }
       
    });
});




module.exports = router;