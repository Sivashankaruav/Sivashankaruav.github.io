$(document).ready(function() {

	var specialChars = [62,33,36,64,35,37,94,38,40,41,123,125,95,63,124,91,93,126];
	var operationChars = [42,43,45,47];
	
	$('#txt').on('keypress', function(e) {
		var input_char = e.which;
		var char_color;
		console.log(input_char);
		var exist_input = $(this).html();
		if((input_char>=65 && input_char<=90)||(input_char>=97 && input_char<=122)) {
			console.log("character");
			char_color="red";
		} else if(input_char>=48 && input_char<=57) {
			char_color="green";
		} else if($.inArray(event.which,specialChars) != -1) {
			char_color="blue";
		} else if($.inArray(event.which,operationChars) != -1) {
			char_color="grey";
		} else {
			console.log("Could not find the character" + input_char);
		}
		
		exist_input += "<span style='color:"+char_color+"'>" + String.fromCharCode(e.which) + "</span>";
		e.preventDefault();
		$(this).html(exist_input);
		
	});
});