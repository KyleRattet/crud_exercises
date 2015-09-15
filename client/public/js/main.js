$(document).on('ready', function() {
  getExercises();
  $('.edit-section').hide();
});

// create new exercise /hijack the form submission
$('form').on('submit', function (e) {
  e.preventDefault();
  $('#mesage').html('');
  //payload
  var payload = {
    name: $('#name').val(),
    description: $('#description').val(),
    tags: $('#tags').val()
  };
  //post request to server
  $.post('/api/v1/exercises', payload, function(data) {
    // append 'Added' to DOM
    $('.message-section').show();
    $('#message').html('Added a new exercise.');
    // get all exercises
    getExercises();
  });
});



//delete single exercise
$(document).on('click', '.delete-button', function(){

  $.ajax({
    method: "DELETE",
    url: '/api/v1/exercise/'+$(this).attr('id')
  }).done(function(data) {
    $("#all-exercises").html("");
    $('#message').html('Exercise has been deleted successfully.');
    getExercises();
  });

});



//edit button, getting the right exercise to update (GET requeset)
$(document).on('click', '.edit-button', function(){


  $.get('/api/v1/exercise/'+$(this).attr('id'), function(data){
    $('#edit-title').html('Edit '+data.name);
    $('#edit-name').val(data.name);
    $('#edit-description').val(data.description);
    $('#edit-tags').val(data.tags);
    $('.update-button').attr('id', data._id);
    console.log(data);
  });

  $('.edit-section').show();
  $('#all-exercises').hide();

});

//update button from edit form (PUT request)
$(document).on('click', '.update-button', function(e){
  e.preventDefault();
  // form inputs
  var $updatedExerciseName = $('#edit-name').val();
  var $updatedExerciseDescription = $('#edit-description').val();
  var $updatedExerciseTags = $('#edit-tags').val();
  // creating payload
  var payload = {
    name: $updatedExerciseName,
    description: $updatedExerciseDescription,
    tags: $updatedExerciseTags
  };

  $.ajax({
    method: "PUT",
    url: '/api/v1/exercise/'+$(this).attr('id'),
    data: payload
  }).done(function(data) {
    $("#all-exercises").html("");
    getExercises();
    $('.edit-section').hide();
    $('#all-exercises').show();
    console.log('update button working')
  });


});



//helper function to render all of the exercises
function getExercises() {
  // clear exercises render
  $('#all-exercises').html('');
  // send get request to server
  $.get('/api/v1/exercises', function(data) {
    if(data.length === 0) {
      console.log(data);
      $('.exercise-section h2').html('No colleges! Add an exercise above.');
    } else {
      $('.exercise-section h2').html('All exercises');
      // loop through array of objects, appending each to the DOM
      for (var i = 0; i < data.length; i++) {
        $('#all-exercises').append('<tr>'+
          '<td>'+data[i].name+'</td>'+
          '<td>'+data[i].description+'</td>'+
          '<td>'+data[i].tags+'</td>'+
          '<td><a class="btn btn-danger btn-xs delete-button" id="'+data[i]._id+'" role="button">Delete</a>'+
          '&nbsp;<a class="btn btn-primary btn-xs edit-button" id="'+data[i]._id+'" role="button">Edit</a></td>'+
          '<tr>'
        );
      }
      $('form input').val('');
    }
  });
}
