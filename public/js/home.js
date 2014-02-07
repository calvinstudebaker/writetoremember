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

$(document).ready(function() {
	getDate();

	$("#pastButton").click(function(){
		switchToPage("/past");
	});
})