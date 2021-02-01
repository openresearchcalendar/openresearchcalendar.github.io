```javascript
//push new events to calendar
function pushToCalendar() {
  
  //spreadsheet variables
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("SHEETNAME")
  var firstRow = 2;
  var nRows = sheet.getLastRow(); 
  var firstCol = 1;
  var nCols = 15; //remember 0 indexed
  var eventLocationCol = 2;  
  var eventDescCol = 8;
  var eventNameCol = 9; 
  var eventTimeStartCol = 10;
  var eventTimeEndCol = 11;
  var pushDoneCol = 12;  
  var eventIDCol = 13; 
  var lastActionCol = 14;
  var updateDateCol = 15;
  var range = sheet.getRange(firstRow,firstCol,nRows,nCols); //%** num columns must be updated if we modify the sheet columns
  var values = range.getValues();   
  
  //calendar variables
  var calendar = CalendarApp.getCalendarById('YOURACCOUNTEMAIL')
  
  //current date, time and timezone
  var dateToday = Utilities.formatDate(new Date(), SpreadsheetApp.getActive().getSpreadsheetTimeZone(), "dd/MM/yyyy hh:mm"); 
     
  var numValues = 0;
  for (var i = 0; i < values.length; i++) {     
    //check to see if event name, start and end date are filled 
      if (values[i][eventNameCol].length > 0) { //eventname
        
        //create event https://developers.google.com/apps-script/class_calendarapp#createEvent
        var newEventTitle = values[i][eventNameCol];
        var newEventDesc = values[i][eventDescCol];
        var newEventStart = values[i][eventTimeStartCol];
        var newEventEnd = values[i][eventTimeEndCol];
        var newEventLocation = values[i][eventLocationCol];
        
        //check if event ID exists                  
        if (values[i][eventIDCol].length < 1) {     // if no entry, create event
          
          // setting description: https://stackoverflow.com/questions/31548227/google-apps-script-setting-color-of-an-event-using-calendar-api
          var newEvent = calendar.createEvent(newEventTitle, newEventStart, newEventEnd,{location:newEventLocation, description:newEventDesc});
                
          //get ID
          var newEventId = newEvent.getId();
        
          //mark as entered, enter ID and date
          sheet.getRange(i+2,pushDoneCol+1).setValue('-Done-');
          sheet.getRange(i+2,pushDoneCol+1).setFontColor('red');
          
          sheet.getRange(i+2,lastActionCol+1).setValue('-New-');
          sheet.getRange(i+2,lastActionCol+1).setFontColor('red');
          
          sheet.getRange(i+2,eventIDCol+1).setValue(newEventId);
          sheet.getRange(i+2,updateDateCol+1).setValue(dateToday);
          sheet.getRange(i+2,updateDateCol+1).setFontColor('black');
        
        }
        else { //pull info from existing event
          var oldEventID = values[i][eventIDCol];
          
          //https://developers.google.com/apps-script/reference/calendar/calendar-app#getEventSeriesById(String)
          
          var oldEvent = calendar.getEventById(oldEventID);
          if (oldEvent.length < 1) {  // Check if old event has been deleted, if so, add flag
            sheet.getRange(i+2,lastActionCol+1).setValue('-DELETED-');
            sheet.getRange(i+2,lastActionCol+1).setFontColor('red');
            sheet.getRange(i+2,updateDateCol+1).setValue(dateToday);
            sheet.getRange(i+2,updateDateCol+1).setFontColor('black');
          }

          else {

          var oldEventTitle = oldEvent.getTitle();
          var oldEventStart = oldEvent.getStartTime();
          var oldEventEnd = oldEvent.getEndTime();
          var oldEventLocation = oldEvent.getLocation();
          
          if (newEventTitle != oldEventTitle || newEventStart.toISOString() != oldEventStart.toISOString() || newEventEnd.toISOString() != oldEventEnd.toISOString() || newEventLocation != oldEventLocation)  {
          //above wasn't working when attempting to compare dates and strings in one line, so converted the dates to ISO (date formt) sting (https://stackoverflow.com/questions/11174385/compare-two-dates-google-apps-script)

            oldEvent.deleteEvent(); 
                        
            var newEvent = calendar.createEvent(newEventTitle, newEventStart, newEventEnd,{location:newEventLocation,description:newEventDesc});
            var newEventId = newEvent.getId();
            sheet.getRange(i+2,eventIDCol+1).setValue(newEventId);
            
            sheet.getRange(i+2,lastActionCol+1).setValue('-Updated-');
            sheet.getRange(i+2,lastActionCol+1).setFontColor('red');
            sheet.getRange(i+2,updateDateCol+1).setValue(dateToday);
             sheet.getRange(i+2,updateDateCol+1).setFontColor('black');
            
          }
          
          else {
            
            sheet.getRange(i+2,lastActionCol+1).setValue('-Unchanged-');
            sheet.getRange(i+2,lastActionCol+1).setFontColor('black');
            
          }
                   
        }
      }
    }
    numValues++;
  }
}

//add a menu when the spreadsheet is opened
function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [];  
  menuEntries.push({name: "Update Calendar", functionName: "pushToCalendar"}); 
  sheet.addMenu("Push to Calendar", menuEntries);  
}

```
