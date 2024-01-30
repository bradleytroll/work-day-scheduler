// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  
  // Grabs current date
  var currentDate = dayjs().format('dddd, MMMM D, YYYY');
  $('#currentDay').text(currentDate);

  // Creates a full day of time blocks from 9am to 5pm.
  var businessHours = Array.from({ length: 9 }, function (_, index) {
    return index + 9;
  });
  var container = $('.container-fluid');

  // Creates time blocks for each hour. TROLL NOTES: FINISH NOTES HERE
  businessHours.forEach(function (hour) {
    var timeBlock = $('<div>').addClass('row time-block').attr('id', 'hour-' + hour);
    timeBlock.append($('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(hour + 'AM'));
    timeBlock.append($('<textarea>').addClass('col-8 col-md-10 description').attr('rows', '3'));
    timeBlock.append($('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save').html('<i class="fas fa-save" aria-hidden="true"></i>'));

    container.append(timeBlock);
  });

  // Loads any saved events from local storage and populates the events in the appropriate hour blocks.
  $('.time-block').each(function () {
    var blockId = $(this).attr('id');
    var storedData = localStorage.getItem(blockId);
    if (storedData) {
      $(this).find('.description').val(storedData);
    }
  });

  // Grabs current hour
  var currentHour = dayjs().hour();

  // Iterates through elements with a class of "time-block", extracts the id (which indicates the hour), splits the string at they hyphen, accesses the second element of the array (the hour), and parses the hour into an integer.
  $('.time-block').each(function () {
    var blockHour = parseInt($(this).attr('id').split('-')[1]);
    
    // Compares the block's hour with the current hour. Depending on whether it's in the past, present, or future, the appropriate class will be applied. 
    if (blockHour < currentHour) {
      $(this).removeClass('present future').addClass('past');
    } else if (blockHour === currentHour) {
      $(this).removeClass('past future').addClass('present');
    } else {
      $(this).removeClass('past present').addClass('future');
    }
  });

  // Attaches an event listener to a button that, when clicked, saves the parent id (time block) and the user's input to local storage in a key value pair.
  $('.saveBtn').on('click', function () {
    var blockId = $(this).parent().attr('id');
    var userInput = $(this).siblings('.description').val();

    localStorage.setItem(blockId, userInput);
  });


  



});





  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.