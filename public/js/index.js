// Get all of our friend data
var data;

function signIn(){
	$.getJSON("../../data.json", function(data) {
		console.log(data);
	});
	console.log("meowd it into the sign in function");
	var email = $("#email").text();
	var password = $("#password").text();
	var index = isExistingUser(email, password);
	if(index!=-1){	//will be a valid email password check soon
		console.log("We found a user at index");
		switchToPage("/home");
	}
	else {
		showLoginError(email, password);
	}
}

function showLoginError(email, password) {
	$('#errorPlaceholder').text("Sorry, email or password is incorrect."); 
}

function isExistingUser(email, password){
	var users = data.users;
	for(var i = 0; i<users.length(); i ++) {
		if(users[i].password = password && users[i].email = email) {
			return i; 
		}
	}
	return -1; 
}


$(document).ready(function() {
	$('#createAccountButton').click(function(){
		switchToPage("/placeholder");
	});
})