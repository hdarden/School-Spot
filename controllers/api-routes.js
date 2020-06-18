// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
	// Using the passport.authenticate middleware with our local strategy.
	// If the user has valid login credentials, send them to the members page.
	// Otherwise the user will be sent an error
	app.post("/api/login", passport.authenticate("local"), function (req, res) {
		res.json(req.user);
	});

	// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
	// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
	// otherwise send back an error
	app.post("/api/signup", function (req, res) {
		db.User.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password,
			userType: req.body.userType,
			teacherID: req.body.teacherID
		}).then(function (dbUser) {
			res.json(dbUser);
		}).catch(function (err) {
			res.json(err);
		});
	});

	// Route for logging user out
	app.get("/logout", function (req, res) {
		req.logout();
		res.redirect("/");
	});

	// Route for getting some data about our user to be used client side
	app.get("/api/user_data", function (req, res) {
		if (!req.user) {
			// The user is not logged in, send back an empty object
			res.json({});
		} else {
			// Otherwise send back the user's email and id (will not return password of user)
			res.json({
				email: req.user.email,
				firstName: req.user.firstName,
				lastName: req.user.lastName,
				id: req.user.id,
				userType: req.user.userType
			});
		}
	});

	// Route for getting a list of teachers
	app.get("/api/teachers", function (req, res) {
		db.User.findAll({
			attributes: ["id", ["firstName", "FirstName"], ["lastName", "LastName"]],
			where: {
				userType: "Teacher"
			}
		}).then(function (teacherList) {
			res.json(teacherList);
		}).catch(function (err) {
			res.status(500).json(err);
		});
	});

	// Route for getting a list of students
	app.get("/api/students", function (req, res) {
		db.User.findAll({
			attributes: ["id", ["firstName", "FirstName"], ["lastName", "LastName"]],
			where: {
				userType: "Student"
			}
		}).then(function (studentList) {
			res.json(studentList);
		}).catch(function (err) {
			res.status(500).json(err);
		});
	});

	// Route for getting list of tasks not completed
	app.get("/api/uncompletedTasks/:id", function (req, res) {
		db.Task.findAll({
			where: {
				completed: false,
				assignedUser: req.params.id
			}
		}).then(function (tasks) {
			res.json(tasks);
		}).catch(function (err) {
			res.status(500).json(err);
		});
	});

	// Route for getting list of tasks not graded
	app.get("/api/ungradedTasks", function (req, res) {
		db.Task.findAll({
			where: {
				completed: true,
				graded: false,
			},
			attributes: ["id", "taskDetail"],
			include: [{
				model: db.User,
				required: true,
				attributes: ["firstName", "lastName"]
			}]
		}).then(function (tasks) {
			res.json(tasks);
			console.log(tasks);
		}).catch(function (err) {
			res.status(500).json(err);
		});
	});

	// Route for getting list of tasks graded
	app.get("/api/gradedTasks", function (req, res) {
		db.Task.findAll({
			where: { graded: true },
			include: [{
				model: db.User,
				required: true
			}]
		}).then(function (tasks) {
			res.json(tasks);
		}).catch(function (err) {
			res.status(500).json(err);
		});
	});

	// Add a task to each student that has specific teacher
	app.post("/api/addTask", function (req, res) {
		if (!req.user) {
			return res.status(401).end();
		}

		db.User.findAll({
			where: {
				userType: "Student",
				teacherID: req.user.id,
			}
		}).then(function (students) {
			var tasks = students.map(function (student) {
				// Create task for student
				return {
					assignedUser: student.id,
					taskDetail: req.body.taskDetail,
					dueDate: req.body.dueDate
				};
			});
			db.Task.bulkCreate(tasks)
				.then(function(err){
					if(err) {
						throw err;
					}
					return res.sendStatus(200);
				}).catch(function (err) {
					res.status(500).json(err);
				});
		}).catch(function (err) {
			res.status(500).json(err);
		});
	});

	// Student marking a task completed
	app.put("/api/completeTask/:id", function (req, res) {
		db.Task.update({
			completed: true
		}, {
			where: { id: req.params.id }
		}).then(function (dbTask) {
			res.json(dbTask);
		}).catch(function (err) {
			res.status(500).json(err);
		});
	});

	// Teacher grading the task
	app.put("/api/gradeTask/:id/:taskGrade", function (req, res) {
		db.Task.update({
			graded: true,
			taskGrade: parseInt(req.params.taskGrade)
		}, {
			where: { id: req.params.id }
		}).then(function (dbTask) {
			res.json(dbTask);
		}).catch(function (err) {
			res.status(500).json(err);
		});
	});

	// Teacher removing task from graded list (deletes task from db)
	app.delete("/api/deleteTask/:id", function (req, res) {
		db.Task.destroy({
			where: {id: req.params.id}
		}).then(function(dbTask) {
			res.json(dbTask);
		}).catch(function (err) {
			res.status(500).json(err);
		});
	});
};
