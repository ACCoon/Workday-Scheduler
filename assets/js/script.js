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

// Display current day
currentEl.text(moment().format("dddd, MMMM Do"));

createTimesheet();
populateTimesheet();

$(".saveBtn").click((e) => {
    // Determine which time block
    var hourBlock;
    
    if ($(e.target).is("i")){
        hourBlock = $($(e.target).parent()).prev();
    } else {
        hourBlock = $(e.target).prev();
    }

    var id = parseInt(hourBlock.attr("id"), 10) - 9;

    // Save contents of a timeblock to timesheet array, then save to localstorage
    timesheet[id] = $($(hourBlock).children()).val();
    localStorage.setItem("timesheet", JSON.stringify(timesheet));
});