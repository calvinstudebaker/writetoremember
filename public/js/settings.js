$(document).ready(function() {
	$("#rate").change(function(){
		var rate = $("#rate").val();
		var data = new Object();
		data.rate = rate;
		$.post("/saveSettings", data, function(response){
			if(response.status != "success") alert("Error connecting with server. Please try again later");
		});
	});

	$('option').each(function(){
		var name = $(this).val();
		var rate = $("#rateKey").attr('class');
		if(name == rate){
			$(this).attr('selected', 'selected');
		}
	});


	$("#changePassword").click(changePassword);

	$("#testPush").click(testPushNotification);
});

function testPushNotification(){
	$.get("/testPush", function(response){
		if(response.status == "success") alert("sent");
	});
}

function changePassword() {
	var data = new Object()//TODO: make the route and get verification for the new password matching! 
	data.newPassword = $("passwordField").val();
	$.post("/changePassword", data, function(response) {
		if(response.status != "success") {
			alert("Your password was not changed.");
		}
	}
}