// Show current date in header
let currentDayEl = $('#currentDay');
let timeblocksEl = $('#timeblocks');

let formEl = $('#event-form');
let now = moment();
let currentHour = moment().hour();

let currentDay = moment().format('LLLL');
currentDayEl.text(currentDay);

// clear event for the previous day
let storedCurrentDay = localStorage.getItem('currentDay');

if (storedCurrentDay !== null && storedCurrentDay !== currentDay) {
	localStorage.clear();
}

let hoursArray = [9, 10, 11, 12, 13, 14, 15, 16, 17];
let setCurrentDay = false;

// set coloured timeblocks
for (let i = 0; i < hoursArray.length; i++) {
	let bgColorClass = hoursArray[i] < currentHour ? "past" : hoursArray[i] === currentHour ? "present" : "future";
	if (hoursArray[i] === currentHour) {
		bgColorClass = 'present';
	} else if (hoursArray[i] > currentHour) {
		bgColorClass = 'future';
	}

	// Add hours to the planner

	let hourText = moment().hour(hoursArray[i]).format('hA');

	// GET saved item from local Storage

	let item = localStorage.getItem(hourText);

	// add table cells

	let rowDiv = $('<div>');
   rowDiv.addClass('row border-top border-secondary ' + bgColorClass); 

	let hourColDiv = $('<div>');
	hourColDiv.addClass('col-2 border-right');

	hourColDiv.text(hourText);
	rowDiv.append(hourColDiv);

	// Add input for Event row

	let eventDiv = $('<div>');
	eventDiv.addClass('col-9 border-right align-top'); // Remove "present" and "future" here

	// add textarea for writing events

	let textareaEl = $('<textarea>');
	textareaEl.addClass('form-control bg-transparent');
	textareaEl.attr('data-ta-hour', hourText);
	textareaEl.attr('rows', 3);
	textareaEl.attr('maxlength', 100);
	textareaEl.val(item);
	eventDiv.append(textareaEl);
	rowDiv.append(eventDiv);

	//add save button for saving the task
	let saveDiv = $('<div>');
	saveDiv.addClass('col-1');

	let saveBtn = $('<button>');
	saveBtn.addClass('btn btn-primary');
	saveBtn.attr('data-toggle', 'button');
	saveBtn.attr('type', 'submit');

	saveDiv.append(saveBtn);
	rowDiv.append(saveDiv);
	// add icon instead of the word "Save"
	let iconEl = $('<i>');
	iconEl.addClass('fas fa-save');
	saveBtn.append(iconEl);

	// add textarea
	let formEl = $('<form>');
	formEl.attr('data-form-hour', hourText);
	formEl.append(rowDiv);

	// add the form to containers
	timeblocksEl.append(formEl);

	formEl.submit(function (event) {
		event.preventDefault();

		// set current date to local Storage
		if (!setCurrentDay) {
			localStorage.setItem('currentDay', currentDay);
			setCurrentDay = true;
		}

		// get textarea value and also set value to local storage
		let val = $('[data-ta-hour=' + hourText + ']')
			.val()
			.trim();

		// Only save to local storage if there is a valid value in the textarea
		if (val) {
			localStorage.setItem(hourText, val);
		}
	});
}

// Button function to clear local storage and clear contents
$('#clearFieldsBtn').click(function (event) {
	event.preventDefault();
	$('textarea').val('');
	localStorage.clear();
});

