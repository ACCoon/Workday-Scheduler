// Use all JQuery, not Javascript. Use For loops. 24h time
var currentEl = $("#currentDay");
var timeTableEl = $(".container");

// Fetch timesheet from localstorage if there is one, or initialize to empty array
var timesheet = JSON.parse(localStorage.getItem("timesheet")) || ["","","","","","","","",""];

// Generate and display timetable elements.
function createTimesheet() {

    // Loop to create multiple rows of elements
    for(var i = 9; i < 18; i++){
        var rowEl = $("<div></div>").addClass("row");
        var hourEl = $("<div></div>").addClass("hour col");
        var timeSlotEl = $("<div></div>").attr({"id": i, "class": "col-10"}).append($("<textarea></textarea"));
        var saveBtnEl = $("<button></button>").attr({"type": "button", "class": "col saveBtn"}).append($("<i></i>").text("Save!"));

        // Format text label per each time slot
        if(i < 12){
            hourEl.text(i + "AM");
        }
        else if (i === 12) {
            hourEl.text("12PM");
        }
        else {
            hourEl.text((i-12) + "PM");
        }

        timeTableEl.append(rowEl.append(hourEl, timeSlotEl, saveBtnEl));
    }
}

// Populate timesheet
function populateTimesheet() {
    
    var textBoxes = $("textarea");

    for (var i = 0; i < timesheet.length; i++) {
        $(textBoxes[i]).text(timesheet[i]);
    }
}

// Save a given time block
function saveTimeBlock(event) {
    // Determine which time block
    // var hourBlock = $(event.target + "div");
    // var id = parseInt(hourBlock.attr("id"), 10) - 9;

    console.log(event);
    
    // Save contents of a timeblock to timesheet array, then save to localstorage
    // timesheet[id] = $(hourBlock > "textarea").text();
    // localStorage.setItem("timesheet", JSON.stringify(timesheet));
}

// Display current day
currentEl.text(moment().format("dddd, MMMM Do"));

createTimesheet();
populateTimesheet();

$(".saveBtn").on("click", saveTimeBlock(event));