function createAccount(){
	var email = $("#email").val();
	var password = $("#password").val();

	var data = new Object();
	data.email = email;
	data.password = password;

	$.post("/create", data, function(result){
		if(result.status == "success"){
			switchToPage("/home");
		}else{
			showError();
		}
	});
};

function showError() {
	$('#errorPlaceholder').html("Sorry, that email is already in use. Choose a different email or log in to your existing account."); 
}

$(document).ready(function() {
	$('#backButton').click(function(){
		switchToPage("/");
	});
})