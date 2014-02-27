

function signIn(){
	var username = $("#username").val();
	var password = $("#password").val();	
	var data = new Object();
	data.username = username;
	data.password = password;
	if(!checkFields()) return;

	$.post("/signIn", data, function (response) {
		if(response.status == "failure"){
			showLoginError();
		}else{
			switchToPage("/home");
		}
	});
}

function checkFields(){
	var valid = true;
	//Check all fields have input
	$("input").each(function(){
		$(this).removeClass("error").removeClass("highlighted");
		var value = $(this).val();
		if(value == ""){
			valid = false;
			$(this).removeClass("highlighted").addClass("error");
			showBlankError();
		}
	});
	return valid;//should return valid, just checking things
}

function showBlankError(){
	$('#errorPlaceholder').html("Please fill in all fields");
}

function showLoginError() {
	$('#errorPlaceholder').html("Sorry, username or password is incorrect."); 
}

$(document).ready(function() {
	$('#createAccountButton').click(function(){
		switchToPage("/create");
	});
	//$('#signInButton').click(signIn());
});