$(document).ready(function() {

//for when you get tired of typing console.log
let l = console.log

//adds real time clock
let datetime = null,
        date = null;

let update = function () {
    date = moment(new Date())
    datetime.html(date.format('dddd, MMMM Do YYYY, HH:mm:ss'));
};

datetime = $("#date-time")
    update();
    setInterval(update, 1000);

  // Initialize Firebase
var config = {
    apiKey: "AIzaSyD_YOyZU-QxptbHgIMs7-_ncQNAdujhwgs",
    authDomain: "ride-the-train-90321.firebaseapp.com",
    databaseURL: "https://ride-the-train-90321.firebaseio.com",
    projectId: "ride-the-train-90321",
    storageBucket: "ride-the-train-90321.appspot.com",
    messagingSenderId: "741549140791"
  };

  firebase.initializeApp(config);

let trainDatabase = firebase.database();

//adds a new train, data stored on firebase
$("#gimme-train").on("click", function() {

  let trainName = $("#name-here").val().trim();
  let trainPlace = $("#place-here").val().trim();
  //converts into unix time
  let trainTime = moment($("#time-here").val().trim(), "HH:mm").format("X");
  let trainFrequency = $("#frequency-here").val().trim();

   // Creates a local object for holding data temporarily
  let trainAdded = {
    name: trainName,
    destination: trainPlace,
    time: trainTime,
    frequency: trainFrequency,
  }

  //passes data to the firebase realtime database
  trainDatabase.ref().push(trainAdded);

  //clears submitted data after button click
  $("#name-here").val("");
  $("#place-here").val("");
  $("#time-here").val("");
  $("#frequency-here").val("");

  //Added to prevent the page from reloading on submit
  return false;
})

//function which invokes when child data is added to the parent(firebase main) data
trainDatabase.ref().on("child_added", function(childSnapshot){

//stores the snapshot (ie the data at that particular moment) into variables
let trainName = childSnapshot.val().name;
let trainPlace = childSnapshot.val().destination;
let trainTime = childSnapshot.val().time;
let trainFrequency = childSnapshot.val().frequency;

let currentTime = moment();
l(moment(currentTime).format("hh:mm"));

//calculates next arrival and minutes away
let timeCrunch = moment(trainTime, "hh:mm").subtract(1, "years");
let minTime = moment().diff(moment(timeCrunch), "minutes");
let timeApart = minTime % trainFrequency;
let countDown = trainFrequency - timeApart;
let arriving = moment().add(countDown, "minutes");

//adds the submitted(and calculated) data to a dynamic table
$("#time-table").append("<tr><td>" + trainName + 
  "</td><td>" + trainPlace + 
  "</td><td>" + trainFrequency + 
  "</td><td>" + moment(arriving).format("hh:mm A") +
  "</td><td>" + countDown + "</td></tr>");

//in case of errors
}, function(errorObject) {
  l("Errors handled: " + errorObject.code);

});

})