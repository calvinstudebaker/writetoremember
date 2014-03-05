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

function addPastEntry(){//this is called when submit button is clicked!
	if($("#entry-form").val()){
		var data = new Object();
		data.date = getAbbreviatedDate();
		data.text = $("#entry-form").val();
		data.image = "image placeholder!!";
		data.mood_index = $('#mood-slider').slider("getValue");
		console.log(data);
		$.post("/addEntry", data, function(response){
			switchToPage("/past");
		});
	} else {
		showEntryError();
	}
}

function uploadMood() {
	/*$('#moodInputPlaceholder').html('<select class="form-control input-sm" placeholder = "Enter a happiness index">
					<option value="">1</option><option value="">2</option><option value="">3</option>
					<option value="">4</option><option value="">5</option>
				</select>');
	//$("#moodSlider").slider(show);*/
}

function getRandomEntry() {
	$.post("/getRandomEntry", data, function(response){
		//compose an html with the data from the response
		$('#randomPlaceholder').html("TEST STUFF");
	});
}

function showEntryError() {
	$('#errorPlaceholder').html("Please enter some text!"); 
}

$(document).ready(function() {
	console.log(getDate());
	$("#mood-slider").slider();
	$("#submitButton").click(addPastEntry);
	//$("#uploadMood").click(uploadMood);
});