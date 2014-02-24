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
	if(!valid) return false;

	//Check password and retype password match
	var password = $("#password").val();
	var retypePassword = $("#retypePassword").val();

	if(password != retypePassword){
		$("#password").removeClass("highlighted").addClass("error");
		$("#retypePassword").removeClass("highlighted").addClass("error");
		showPasswordError();
		return false;
	}

	return true;
}

function createAccount(){

	if(!checkFields()) return;

	var username = $("#username").val();
	var password = $("#password").val();
	var retypePassword = $("#retypePassword").val();

	var data = new Object();
	data.username = username;
	data.password = password;

	$.post("/create", data, function(result){
		alert(result.status);
		if(result.status == "success"){
			switchToPage("/home");
		}else{
			showUsernameError();
		}
	});
};

function showPasswordError(){
	$("#errorPlaceholder").html("Password and confirm password do not match");
}

function showUsernameError() {
	$('#errorPlaceholder').html("Sorry, that username is already in use. Choose a different username or log in to your existing account."); 
}

function showBlankError(){
	$("#errorPlaceholder").html("Please fill in all fields");
}

$(document).ready(function() {
	$('#backButton').click(function(){
		switchToPage("/");
	});
})