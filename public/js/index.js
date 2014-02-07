function signIn(){
	var email = $("#email").text();
	var password = $("#password").text();
	if(true){	//will be a valid email password check soon
		switchToPage("/home");
	}
}

$(document).ready(function() {
	$('#settingsButton').click(switchToPage(placeholder));
	$('#signInButton').click(switchToPage(placeholder));
	$('#createAccountButton').click(switchToPage(placeholder));

})