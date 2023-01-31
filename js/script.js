// Show current date in header
let currentDayEl = $('#currentDay');
// currentDayE1.text(moment().format("LLLL").split(" ").slice(0, 4).join(" "));
let timeblocksEl = $('#timeblocks');

const formEl = $('#event-form');
const now = moment();
const currentHour = parseInt(now.format("H"));

const currentDay = now.format('dddd, MMMM Do');
currentDayEl.text(currentDay);

// check if data from the previous day exist, if yes, erase all keys
let storedCurrentDay = localStorage.getItem('currentDay');
if (storedCurrentDay !== null && storedCurrentDay !== currentDay) {
    localStorage.clear();
}

let hourArray = new Array(24);
let setCurrentDay = false;

// set up bootstrap grid for timeblocks
let bgColorClass = "past";
for (let i = 0; i < hourArray.length; i++) {
    if (i === currentHour) {
        bgColorClass = "present";
    } else if (i >= currentHour) {
        bgColorClass = "future";
    }
    let hourText = moment().hour(i).format("hA"); // set hour in 12-hour AM/PM format  
    
    // get item from localStorage
    let item = localStorage.getItem(hourText); // get saved item from localStorage

    // create div for Hour column
    let rowDiv = $('<div>');
    rowDiv.addClass('row border-top border-secondary');
    let hourColDiv = $('<div>');
    hourColDiv.addClass('col-2 border-right');
    hourColDiv.text(hourText);
    rowDiv.append(hourColDiv);

    // create div for Event column
    let eventDiv = $('<div>');
    eventDiv.addClass('col-9 border-right align-top '+bgColorClass);
    // create textarea element for inputing event
    let textareaEl = $('<textarea>');
    textareaEl.addClass('form-control bg-transparent');
    textareaEl.attr('data-ta-hour', hourText);
    textareaEl.attr('rows', 3);
    textareaEl.attr('maxlength', 100);
    textareaEl.val(item); // display saved item
    eventDiv.append(textareaEl);
    rowDiv.append(eventDiv);

    // create div for Save button column
    let saveDiv = $('<div>');
    saveDiv.addClass('col-1');
    // add a save button to the last column
    let saveBtn = $('<button>');
    saveBtn.addClass('btn btn-primary');
    saveBtn.attr('data-toggle', 'button');
    saveBtn.attr('type', 'submit');
    saveBtn.text('Save');
    saveDiv.append(saveBtn);
    rowDiv.append(saveDiv);

    // create a form for each hour
    let formEl = $('<form>');
    formEl.attr('data-form-hour', hourText);
    formEl.append(rowDiv);

    // append the form to the timeblocks container
    timeblocksEl.append(formEl);

    formEl.submit(function( event ) {
        event.preventDefault();

        if (!setCurrentDay) {
            localStorage.setItem('currentDay', currentDay); // set today's date to localStorage
            setCurrentDay = true;
        }

        let val = $('[data-ta-hour=' + hourText + ']').val().trim(); // get textarea value
        // console.log("hourText: "+hourText);
        // console.log("textarea value: "+val);
        localStorage.setItem(hourText, val); // set textarea value to localStorage
    });



}