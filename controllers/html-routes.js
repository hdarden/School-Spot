var express = require("express");
var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

var router = express.Router();

router.get("/", function (req, res) {
	res.render("login");
});

router.get("/signup", function (req, res) {
	res.render("signup");
});

router.get("/teacher", isAuthenticated, function (req, res) {
	//get all tasks
	//if completed but not graded
	db.Task.findAll({
		include: [{
			model: db.User,
			required: true,
			where: {
				teacherID: req.user.id
			}
		}],
		where: {
			completed: true,
		}
	}).then(function (tasks) {
		console.log(tasks);
		res.render("teacher", {"task": tasks, "user": req.user});
	});
});

router.get("/child", isAuthenticated, function (req, res) {
	db.Task.findAll({
		where: {

			assignedUser: req.user.id
		}
	}).then(function (tasks) {
		res.render("child", {"task": tasks, "user": req.user});

	});
});


router.get("/logout", function (req, res) {
	req.logout();
	res.redirect("/");
});


module.exports = router;






// // Requiring path to so we can use relative routes to our HTML files
// var path = require("path");

// // Requiring our custom middleware for checking if a user is logged in
// var isAuthenticated = require("../config/middleware/isAuthenticated");

// module.exports = function(app) {

// 	app.get("/", function(req, res) {
// 		// If the user already has an account send them to the members page
// 		if (req.user) {
// 			res.redirect("/members");
// 		}
// 		res.sendFile(path.join(__dirname, "../public/signup.html"));
// 	});

// 	app.get("/login", function(req, res) {
// 		// If the user already has an account send them to the members page
// 		if (req.user) {
// 			res.redirect("/members");
// 		}
// 		res.sendFile(path.join(__dirname, "../public/login.html"));
// 	});

// 	// Here we've add our isAuthenticated middleware to this route.
// 	// If a user who is not logged in tries to access this route they will be redirected to the signup page
// 	app.get("/members", isAuthenticated, function(req, res) {
// 		res.sendFile(path.join(__dirname, "../public/members.html"));
// 	});


