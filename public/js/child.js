/* eslint-disable no-mixed-spaces-and-tabs */
$(document).ready(function () {
	console.log("loaded");

	// Getting references to our form and input
	var newTaskForm = $(".newTaskForm");
	var taskText = $("#taskText");
	var dateInput = $("#date");

	// When the signup button is clicked, we create taskData


	$(".markComplete").on("click", function (event) {
		var id = $(this).data("id");
		console.log(id);

		// the following not work
		$.ajax("/api/completeTask/" + id, {
			type: "PUT",
		}).then(function () {
			console.log("Task Completed!");
			// Reload the page to get the updated list
			location.reload();
		});
	});

	function handleLoginErr(err) {
		$("#alert .msg").text(err.responseJSON);
		$("#alert").fadeIn(500);
	}
});
