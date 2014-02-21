//adapted from: https://facultystaff.richmond.edu/~creamer/web/js/date.html
function getDate(){
	// Array of day names
	var dayNames = new Array("Sunday","Monday","Tuesday","Wednesday",
					"Thursday","Friday","Saturday");

	// Array of month Names
	var monthNames = new Array(
	"January","February","March","April","May","June","July",
	"August","September","October","November","December");

	var now = new Date();
	var date = dayNames[now.getDay()] + ", " + 
	monthNames[now.getMonth()] + " " + 
	now.getDate() + ", " + now.getFullYear();

	$("#dateLocation").append(date);
}

function getAbbreviatedDate(){
	var monthNames = new Array(
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
	var now = new Date();
	var date = monthNames[now.getMonth()] + " " + now.getDate();
	return date;
}

function addPastEntry(){
	var data = new Object();
	data.date = getAbbreviatedDate();
	if ($("#fileupload").val()) {
		data.content = $("#fileupload").val() + " " + $("#entry").val();
	} else {
		data.content = $("#entry").val();
	}	
	$.post("/addEntry", data, function(response){
		if(response.status == "success") switchToPage("/past");
		else alert("Failure connecting to server. Please try again later.");
	});
}

$(document).ready(function() {
		getDate();
		$("#pastButton").click(function(){
			switchToPage("/past");
		});

	$('#submitButton').click(addPastEntry);
});