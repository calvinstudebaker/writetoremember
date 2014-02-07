'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$(".container").hide();
	$(".container").show("slow");

	$("input[type=text], input[type=password]").focusin(function() {
		$(this).removeClass("error").addClass("highlighted");
	}).focusout(function() {
		$(this).removeClass("highlighted").removeClass("error");
	});
}

function switchToPage(page){
	$(".content").hide("fast");
	setTimeout(function() {
		$(location).attr('href', page);
	}, 300);
};