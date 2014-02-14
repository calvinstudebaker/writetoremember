function signIn(){
	var email = $("#email").val();
	var password = $("#password").val();

	var data = new Object();
	data.email = email;
	data.password = password;

	$.post("/signIn", data, function(result){
		if(result.status == "success"){
			switchToPage("/home");
		}else{
			showLoginError(email, password);
		}
	});
}

function showLoginError(email, password) {
	$('#errorPlaceholder').html("Sorry, email or password is incorrect."); 
}


$(document).ready(function() {
	$('#createAccountButton').click(function(){
		switchToPage("/create");
	});
})