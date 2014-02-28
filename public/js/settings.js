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

	$("#testPush").click(testPushNotification);
});

function testPushNotification(){
	$.get("/testPush", function(response){
		if(response.status == "success") alert("sent");
	});
}