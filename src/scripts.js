// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import {fetchAllData} from './apiCalls.js'
import TravelerRepository from './TravelerRepository';
import Traveler from './Traveler';
import Trip from './Trip';
import Destination from './Destination';



// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

// global variables
var today;
var travelerData;
var dashboardTravelerTrips;
var tripData;
var destinationData;
var travelerRepository;
var globalTraveler;
var globalTravelerInfo;
var globalTrip;
var globalDestination;


// query selectors
var clickPastTrips = document.getElementById('pastTrips');
var clickPresentTrips = document.getElementById('presentTrips');
var clickUpcomingTrips = document.getElementById('upcomingTrips');
var clickPendingTrips = document.getElementById('pendingTrips');
var tripRequestBox = document.getElementById('tripRequestBox');
var userSelectedTrips = document.getElementById('userSelectedTrips');
var logoutButton = document.getElementById('logoutButton');
var homeButton = document.getElementById('homeButton');
var location = document.getElementById('location');
var tripDate = document.getElementById('tripDate');
var boxImage = document.getElementById('boxImg');
var grid = document.getElementById('grid');
var yearlyCost = document.getElementById('yearlyCost');

//inputs
let bookingDateInput = document.getElementById('bookingDateInput');

// event listeners
window.addEventListener('load', displayResolvedData);
clickPastTrips.addEventListener('click', displayPastTrips);
clickPresentTrips.addEventListener('click', displayPresentTrips);
clickUpcomingTrips.addEventListener('click', displayUpcomingTrips);
clickPendingTrips.addEventListener('click', displayPendingTrips);
homeButton.addEventListener('click', backToHome)


// Fetch API
function displayResolvedData() {
  fetchAllData()
  .then((allData) => {
    getAllTravelerData(allData[0].travelers);
    getAllTripData(allData[1].trips)
    getAllDestinationData(allData[2].destinations)
    // console.log(allData)
  })
}

const getAllTravelerData = (data) => {
  travelerData = data;
  travelerRepository = new TravelerRepository(travelerData);
}

const getAllTripData = (data) => {
  tripData = data;
  globalTrip = new Trip(tripData);
}

const getAllDestinationData = (data) => {
  destinationData = data;
  globalDestination = new Destination(destinationData);
  loadUserDashboard();
}

//functions
function removeHidden(ele) {
  ele.classList.remove('hidden')
}

function addHidden(ele) {
  ele.classList.add('hidden')
}

function loadUserDashboard() {
  // refactored upon creation of login page.
  // let travelerInformation = blabla.value of the input
  backToHome();
  let today = getTodaysDate();
  let calendarMin = today.split('/').join('-');
  console.log(calendarMin)
  bookingDateInput.min = calendarMin;
  console.log(bookingDateInput)
  let travelerId = getRandomUserId(travelerData);
  let newTraveler = travelerRepository.getDataById(travelerId);
  globalTraveler = newTraveler;
  displayFirstName();
  displayYearlyCosts();
  console.log(newTraveler)
}

function getTodaysDate() {
  let todaysDate = new Date();
  let formattedToday = formatDate(todaysDate);
  today = formattedToday;
  console.log(today)
  return today
}

function displayFirstName() {
  let travelerFirstName = globalTraveler.returnFirstName();
  welcomeText.innerText = `Welcome, ${travelerFirstName}!`;
}

function displayYearlyCosts() {
  let travelerTrips = globalTrip.getUserTripData(globalTraveler.id);
  let yearlyExpense = globalDestination.calculateYearlyTravelExpenses(travelerTrips);
  yearlyCost.innerText += ` $${yearlyExpense}`;
  // if the cost is 0, should i say something else?
  console.log(yearlyExpense)
}

function backToHome() {
  removeHidden(tripRequestBox);
  addHidden(userSelectedTrips);
}

function displayTripSelection() {
  addHidden(tripRequestBox);
  removeHidden(userSelectedTrips);
}

function displayPastTrips() {
  displayTripSelection();
  clearGrid();
  let travelerTrips = globalTrip.getUserTripData(globalTraveler.id);
  let pastTrips = globalTrip.getPastTrips(travelerTrips, today);
  let pastTripProperties = globalDestination.returnLocationProperties(pastTrips);
  checkForEmptyDisplay(pastTripProperties);
  modifyTripsToCards(pastTripProperties);
  console.log(pastTripProperties);
}

function displayPresentTrips() {
  displayTripSelection();
  clearGrid();
  let travelerTrips = globalTrip.getUserTripData(globalTraveler.id);
  let tripDates = getAllTripDates(travelerTrips);
  let presentTripDateMatch = globalTrip.findPresentTrips(tripDates, today);
  if (!presentTripDateMatch) {
    grid.innerHTML = 'Sorry, no trips match the selected criteria. Return home to book a trip, or select another category!'
  } else {
    console.log('there is a present trip')
    let presentTrip = globalTrip.returnPresentTrip(presentTripDateMatch, tripData);
    let presentTripProperties = globalDestination.returnLocationProperties(presentTrip);
    modifyTripsToCards(presentTripProperties);
  }
}

function displayUpcomingTrips() {
  displayTripSelection();
  clearGrid();
  let travelerTrips = globalTrip.getUserTripData(globalTraveler.id);
  let upcomingTrips = globalTrip.getUpcomingTrips(travelerTrips, today);
  let upcomingTripsProperties = globalDestination.returnLocationProperties(upcomingTrips);
  checkForEmptyDisplay(upcomingTripsProperties);
  modifyTripsToCards(upcomingTripsProperties);
  console.log(upcomingTrips)
}

function displayPendingTrips() {
  displayTripSelection();
  clearGrid();
  let travelerTrips = globalTrip.getUserTripData(globalTraveler.id);
  let pendingTrips = globalTrip.getPendingTrips(travelerTrips, today);
  let pendingTripsProperties = globalDestination.returnLocationProperties(pendingTrips);
  checkForEmptyDisplay(pendingTripsProperties);
  modifyTripsToCards(pendingTripsProperties);
  console.log(pendingTrips)
}

function modifyTripsToCards(trips) {
  let displayCards = trips.map(trip => {
    grid.innerHTML +=
    `<article class="box" id="${trips.indexOf(trip)}">
    <img class='box-img' id='boxImg' alt=${trip.alt} src=${trip.img} width='150' height='150'></img>
    <p class='location' id='location'>${trip.location}</p>
    <p date='trip-date' id='tripDate'>${trip.date}</p>
    </article>`
  });
}

function checkForEmptyDisplay(trips) {
  if (trips.length === 0) {
    grid.innerHTML = 'Sorry, no trips match the selected criteria. Return home to book a trip, or select another category!'
  }
}

function clearGrid() {
  grid.innerHTML = ''
}

//date functions
function getAllTripDates(allTripData) {
  let allTripDates = allTripData.map(trip => {
    let tripDates = stringDatesOfTrip(trip)
    return tripDates
  })
  return allTripDates
}

function stringDatesOfTrip(trip) {
  let endDate = calculateEndDate(trip.date, trip.duration);
  let allTripDays = getDaysInTrip(new Date(trip.date), endDate);
  let formattedTripDays = formatDatesList(allTripDays);
  console.log(formattedTripDays)
  return formattedTripDays;
}

function calculateEndDate(startDate, tripDuration) {
  var endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + tripDuration);
  return endDate;
}

function getDaysInTrip(startDate, endDate) {
    for(var days = [], date = new Date(startDate); date <= new Date(endDate); date.setDate(date.getDate() + 1)) {
        days.push(new Date(date));
    }
    return days;
};

function formatDatesList(daylist) {
  let formattedDaylist = daylist.map(day => {
    var dd = String(day.getDate()).padStart(2, '0');
    var mm = String(day.getMonth() + 1).padStart(2, '0');
    var yyyy = day.getFullYear();
    return day = yyyy + '/' + mm + '/' + dd;
  })
    return formattedDaylist
}

function formatDate(day) {
    var dd = String(day.getDate()).padStart(2, '0');
    var mm = String(day.getMonth() + 1).padStart(2, '0');
    var yyyy = day.getFullYear();
    var formattedDay = yyyy + '/' + mm + '/' + dd;
    return formattedDay;
}

//get random user
function getRandomUserId (anyUserData) {
  return anyUserData[Math.floor(Math.random()*anyUserData.length)].id;
}
