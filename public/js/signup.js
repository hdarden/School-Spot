$(document).ready(function() {
	console.log('loaded')
	// Getting references to our form and input
	var signUpForm = $(".signup");
	var emailInput = $("input#email-input");
	var passwordInput = $("input#password-input");
	var first_Name = $("#firstName-input");
	var last_Name = $("#lastName-input");
	
	let teacherID
	$.ajax("/api/teachers", {
		type: "GET",
	}).then(function (data) {
		console.log(data);

		for (let i = 0; i < data.length; i++) {
			console.log(data[i].LastName)
			$("<div>").addClass("dropdown-item drop").attr("data-value", data[i].id).text(data[i].LastName).appendTo(".teacher1")
		}
		// console.log(data[i].LastName)
		// $(".teacher").append('<li>' + data)
		// ({"teacher": data})
		// Reload the page to get the updated list
		
		$(".drop").on("click", function(event) {
			event.preventDefault();

			console.log($(this).data("value"));
			teacherID = $(this).data("value")
			return teacherID
		
		});
	});


	let userTypeVar

	// Listener for the User Type button
	$(".choice-role").on("click", function(event) {
		event.preventDefault();
		var userData = {
			userType: $(this).text()
		};
		console.log(userData.userType);
		userTypeVar = userData.userType
		return userTypeVar
		//return userData;
	});
	// Listener for Teacher name
	// When the signup button is clicked, we validate the email and password are not blank
	signUpForm.on("submit", function(event) {
		
		event.preventDefault();
		var userData = {
			firstName: first_Name.val().trim(),
			lastName: last_Name.val().trim(),
			email: emailInput.val().trim(),
			password: passwordInput.val().trim(),
			userType: userTypeVar,
			teacherID: teacherID
		};

		// console.log(userData)

		if (!userData.email || !userData.password || !userData.firstName ||  !userData.lastName) {
			return;
		}

		// If we have an email and password, run the signUpUser function
		signUpUser(userData.firstName, userData.lastName, userData.email, userData.password, userData.userType, teacherID);
		emailInput.val("");
		passwordInput.val("");
	});

	// Does a post to the signup route. If successful, we are redirected to the members page
	// Otherwise we log any errors
	function signUpUser(first, last, email, password, userType, teacherID) {
		console.log(first, last, email, password, userType, teacherID)

		//not working//
		$.post("/api/signup", {
			firstName: first,
			lastName: last,
			email: email,
			password: password,
			userType: userType,
			teacherID: teacherID
		})
			.then(function(data) {
				console.log(data)
				// window.location.href= "/";
				// If there's an error, handle it by throwing up a bootstrap alert
			})
			// .catch(handleLoginErr);
	}

	function handleLoginErr(err) {
		$("#alert .msg").text(err.responseJSON);
		$("#alert").fadeIn(500);
	}
});
