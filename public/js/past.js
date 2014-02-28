
$(document).ready(function() {
	$(".saveEditsButton").click(function(e) {
		e.preventDefault();
		var entryID = $(this).attr('id');
		var data = new Object();
		data.text = $("#edited_text_field_"+ entryID).val();
		console.log("entryID is : " + entryID);
		console.log("data is :" + data.text);
		data.entryID = entryID;
		$.post("/editEntry", data, function(response){
			switchToPage("/past");
		});
	});

	$('.deleteButton').click(function(e) {
		e.preventDefault();
		var entryID = $(this).attr('id');
		console.log("entryID from delete is" + entryID);
		var data = new Object();
		data.entryID = entryID;
		$.post("/removeEntry", data, function(response){
			var entryID = '#' + response.entryID;
			console.log(entryID);
		//	$("entryID").hide("fast");//this isn't working. 
			switchToPage("/past");
		});
	});
});