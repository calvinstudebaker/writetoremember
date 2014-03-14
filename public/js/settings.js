$(document).ready(function() {
	$("#rate").change(function(){
		var rate = $("#rate").val();
		var data = new Object();
		data.rate = rate;
		data.pushKey = $(".pushText").text();
		alert(data.rate);
		alert(data.pushKey);
		$.post("/saveSettings", data, function(response){
			alert(response.status);
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


	// $("#changePassword").click(changePassword);

	$("#testPush").click(testPushNotification);
	$("#editKey").click(editPushKey);
	$("#saveKey").click(savePushKey);
});

function testPushNotification(){
	var data = new Object();
	data.key = $(".pushText").text();
	$.post("/testPush", data, function(response){
		if(response.status == "success") $(".error").text("SENT!");
	});
}

function editPushKey(){
	$("#editKey").addClass("hidden");
	$(".pushText").addClass("hidden");
	$("#pushKey").removeClass("hidden");
	$("#saveKey").removeClass("hidden");
}

function savePushKey(){
	var data = new Object();
	var key = $("#pushKey").val();
	data.pushKey = key;
	data.rate = $("#rate").val();
	$.post("/saveSettings", data, function(response){
		if(response.status != "success") alert("Error connecting with server. Please try again later.");
		else{
			$(".pushText").text(key);
			$("#saveKey").addClass("hidden");
			$("#pushKey").addClass("hidden");
			$("#editKey").removeClass("hidden");
			$(".pushText").removeClass("hidden");
		}  
	});
}

// function changePassword() {
// 	var data = new Object()//TODO: make the route and get verification for the new password matching! 
// 	data.newPassword = $("passwordField").val();
// 	$.post("/changePassword", data, function(response) {
// 		if(response.status != "success") {
// 			alert("Your password was not changed.");
// 		}
// 	}
// }