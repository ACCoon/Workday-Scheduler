// Use all JQuery, not Javascript. Use For loops. 24h time
var currentEl = $("#currentDay");
var timeTableEl = $(".container");

var currentDay = moment().format("dddd, MMMM Do");
var lastSave = localStorage.getItem("saveDate") || "";
var timesheet;

// Fetch timesheet from localstorage. If timesheet is from previous day, or does not exist, then initialize with blank.

if(lastSave !== currentDay || lastSave === ""){
    timesheet = ["","","","","","","","",""];
} else {
    timesheet = JSON.parse(localStorage.getItem("timesheet"));
} 

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
    var time = moment().format("H");
    var id;

    // Loop through each textarea to populate with timesheet data and color-code
    for (var i = 0; i < timesheet.length; i++) {

        id = parseInt($(textBoxes[i]).parent().attr("id"), 10);
        
        $(textBoxes[i]).text(timesheet[i]);

        if(id < time){
            $(textBoxes[i]).parent().addClass("past");
        }
        else if (id > time){
            $(textBoxes[i]).parent().addClass("future");
        }
        else {
            $(textBoxes[i]).parent().addClass("present");
        }
    }
}

// Display current day
currentEl.text(currentDay);

createTimesheet();
populateTimesheet();

// Add event listener to each save button
$(".saveBtn").click((e) => {
    // Determine which time block
    var hourBlock;
    
    if ($(e.target).is("i")){
        hourBlock = $($(e.target).parent()).prev();
    } else {
        hourBlock = $(e.target).prev();
    }

    var id = parseInt(hourBlock.attr("id"), 10) - 9;

    // Save contents of a timeblock to timesheet array, then save to localstorage along with current date
    timesheet[id] = $($(hourBlock).children()).val();
    localStorage.setItem("timesheet", JSON.stringify(timesheet));
    localStorage.setItem("saveDate", currentDay);
});