$(document).ready(function() {
	console.log("loaded");

	var date_input = $("input[name=\"date\"]"); //our date input has the name "date"
	var container = $(".bootstrap-iso form").length > 0 ? $(".bootstrap-iso form").parent() : "body";
	var options = {
		format: "mm/dd/yyyy",
		container: container,
		todayHighlight: true,
		autoclose: true,
	};
	date_input.datepicker(options);

	// Getting references to our form and input
	var newTaskForm = $(".newTaskForm");
	var taskText = $("#taskText");
	var dateInput = $("#date");

	

	// When the signup button is clicked, we create taskData
	newTaskForm.on("submit", function(event) {
		console.log(dateInput.val());

		event.preventDefault();
		var taskData = {
			taskDetails: taskText.val().trim(),
			dueDate: dateInput.val()
		};

		console.log(taskData);


		// If we have a text and a date, run the postTask function
		postTask(taskData.taskDetails, taskData.dueDate);
		dateInput.val("");
		taskText.val("");
	});

	// Does a post to the newTask route If successful, we are refreshes page
	// Otherwise we log any errors
	function postTask(text, date) {
		console.log(text, date);

		//not working//
		$.post("/api/addTask", {
			taskDetails: text,
			dueDate: date,

		})
			.then(function(data) {
				console.log(data)
				// If there's an error, handle it by throwing up a bootstrap alert
			});
		// .catch(handleLoginErr);
	}

	function handleLoginErr(err) {
		$("#alert .msg").text(err.responseJSON);
		$("#alert").fadeIn(500);
	}
});


