$(document).ready(function() {

let l = console.log
// Initialize Firebase
let datetime = null,
        date = null;

let update = function () {
    date = moment(new Date())
    datetime.html(date.format('dddd, MMMM Do YYYY, HH:mm:ss'));
};

datetime = $("#date-time")
    update();
    setInterval(update, 1000);

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
  //converts into unix time
  let trainTime = moment($("#time-here").val().trim(), "HH:mm").format("X");
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

let currentTime = moment();
l(moment(currentTime).format("hh:mm"));

let timeCrunch = moment(trainTime, "hh:mm").subtract(1, "years");
let minTime = moment().diff(moment(timeCrunch), "minutes");
let timeApart = minTime % trainFrequency;
let countDown = trainFrequency - timeApart;
let arriving = moment().add(countDown, "minutes");

$("#time-table").append("<tr><td>" + trainName + 
  "</td><td>" + trainPlace + 
  "</td><td>" + trainFrequency + 
  "</td><td>" + moment(arriving).format("hh:mm A") +
  "</td><td>" + countDown + "</td></tr>");

}, function(errorObject) {
  l("Errors handled: " + errorObject.code);

});

})