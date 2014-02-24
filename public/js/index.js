function signIn(){
	var username = $("#username").val();
	var password = $("#password").val();
	
	var data = new Object();
	data.username = username;
	data.password = password;
	$.post("/signIn", data, logInUser);
}

function logInUser(result) {
	if(result.status == "success"){
			switchToPage("/home");
	}else{
			showLoginError();
	}
}



function showLoginError() {
	$('#errorPlaceholder').html("Sorry, username or password is incorrect."); 
}

$(document).ready(function() {
	$('#createAccountButton').click(function(){
		switchToPage("/create");
	});
})