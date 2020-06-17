var express = require("express");
var passport = require("../config/passport");
var db = require("../models");

var router = express.Router()

router.get("/", (req, res) => {
    res.render("login", {"login": true})
})

router.get("/signup", (req, res) => {
    res.render("signup")
})

router.get("/teacher", (req, res) => {
	res.render("teacher", {"user": req.user})
})
router.get("/child", (req, res) => {
	res.render("child", {"user": req.user})
})
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });


module.exports = router






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

// };
