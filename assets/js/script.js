// Use all JQuery, not Javascript. Use For loops. 24h time
var currentEl = $("#currentDay");
var timeTableEl = $(".container");

// Generate and display timetable elements.
function createTableEl() {
    for(i = 9; i < 18; i++){
        var rowEl = $("<div></div>").addClass("row");
        var hourEl = $("<div></div>").addClass("hour col-1");
        var timeSlotEl = $("<div></div>").attr({"id": i, "class": "col-8"}).append($("<textarea></textarea"));
        var saveBtnEl = $("<button></button>").attr({"type": "button", "class": "col-1 saveBtn"}).append($("<i></i>").text("Save!"));

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

// Display current day
currentEl.text(moment().format("dddd, MMMM Do"));

createTableEl();
