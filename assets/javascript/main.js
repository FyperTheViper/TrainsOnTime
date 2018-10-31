$(document).ready(function() {

let l = console.log()
var config = {
    apiKey: "AIzaSyD_YOyZU-QxptbHgIMs7-_ncQNAdujhwgs",
    authDomain: "ride-the-train-90321.firebaseapp.com",
    databaseURL: "https://ride-the-train-90321.firebaseio.com",
    projectId: "ride-the-train-90321",
    storageBucket: "ride-the-train-90321.appspot.com",
    messagingSenderId: "741549140791"
  };

  firebase.initializeApp(config);

let database = firebase.database();

$("#gimme-train").on("click", function() {

  let trainName = $("#name-here").val().trim();
  let trainPlace = $("#place-here").val().trim();
  let trainTime = $("#time-here").val().trim();
  let trainFrequency = $("#frequency-here").val().trim();

})

})