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

	if($("#entry").val()){
		data.text = $("#entry").val();
		if ($("#photoUpload").val()) {
			data.photo 
		}	
		$.post("/addEntry", data, function(response){
			if(response.status == "success") switchToPage("/past");
			else alert("Failure connecting to server. Please try again later.");
		});
	} else {
		showEntryError();
	}
}

function hasGetUserMedia() {
  	return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

function uploadMedia(){
	if (hasGetUserMedia()) {
	  alert('werrrd');
	} else {
	  alert('accessing user media is not supported in your browser');
	}
}


function getRandomEntry() {
	$.post("/getRandomEntry", data, function(response){
		$('#randomPlaceholder').html("TEST STUFF")
}

function showEntryError() {
	$('#errorPlaceholder').html("Please enter some text!"); 
}

$(document).ready(function() {
	getDate();
	$("#pastButton").click(function(){
		switchToPage("/past");
	});

	$('#submitButton').click(addPastEntry);
	$("#uploadTest").click(uploadMedia);
});