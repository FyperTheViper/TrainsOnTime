$(document).ready(function() {

let l = console.log
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

$("#gimme-train").on("click", function() {

  let trainName = $("#name-here").val().trim();
  let trainPlace = $("#place-here").val().trim();
  let trainTime = $("#time-here").val().trim();
  let trainFrequency = $("#frequency-here").val().trim();

  let trainAdded = {
    name: trainName,
    destination: trainPlace,
    time: trainTime,
    frequency: trainFrequency,
  }

  trainDatabase.ref().push(trainAdded);

  $("#name-here").val("");
  $("#place-here").val("");
  $("#time-here").val("");
  $("#frequency-here").val("");

  //Added to prevent the page from reloading on submit
  return false;

})

trainDatabase.ref().on("child_added", function(childSnapshot){

let trainName = childSnapshot.val().name;
let trainPlace = childSnapshot.val().destination;
let trainTime = childSnapshot.val().time;
let trainFrequency = childSnapshot.val().frequency;

let timeCalc = moment(childSnapshot.val().trainTime, "hh:mm").subtract(1, "years");
l(timeCalc);
let minuteTime = moment().diff(moment(timeCalc), "minutes");
l(minuteTime);
let remainder = minuteTime % childSnapshot.val().trainFrequency;
l(remainder);
let minAway = childSnapshot.val().trainFrequency - remainder;
l(minAway);
let nextTrain = moment().add(minAway, "minutes");
l(nextTrain);
nextTrain = moment(nextTrain).format("hh:mm");



$("#time-table").append("<tr><td>" + trainName + 
  "</td><td>" + trainPlace + 
  "</td><td>" + trainFrequency + 
  "</td><td>" + nextTrain +
  "</td><td>" + minAway + "</td></tr>");

}, function(errorObject) {
  l("Errors handled: " + errorObject.code);

});



})