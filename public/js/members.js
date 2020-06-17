// $(document).ready(function() {
// 	// This file just does a GET request to figure out which user is logged in
// 	// and updates the HTML on the page
// 	$.get("/api/user_data").then(function(data) {
// 		console.log(data)
//         $(".member-name").text("Welcome " + data.firstName + " " + data.lastName);
// 	});
// });
db.Task.findAll({
	where: {
		completed: true,
		graded: false,
	},
	include: [{
		model: db.User,
		required: true
	}]
}).then(function (tasks) {
	console.log(tasks);
res.render("teacher", {"task": tasks})