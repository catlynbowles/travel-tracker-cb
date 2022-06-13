// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import {fetchAllData, addUserTravelData} from './apiCalls.js';
import TravelerRepository from './TravelerRepository';
import Traveler from './Traveler';
import Trip from './Trip';
import Destination from './Destination';
import './images/meteor-rain.gif';

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
var bookNewTrip = document.getElementById('bookNew');
var location = document.getElementById('location');
var tripDate = document.getElementById('tripDate');
var boxImage = document.getElementById('boxImg');
var grid = document.getElementById('grid');
var yearlyCostValue = document.getElementById('yearlyCostValue');
var tripConfirmation = document.getElementById('tripConfirmation');
var noTripsDisplay = document.getElementById('noTripsDisplay');
var messageDisplay = document.getElementById('messageDisplay');
var boardDisplay = document.getElementById('boardDisplay')
var allUserTrips = document.getElementById('allUserTrips');

//inputs
var bookingDateInput = document.getElementById('bookingDateInput');
var durationInput = document.getElementById('durationInput');
var numTravelersInput = document.getElementById('numTravelersInput');
var destinationsDropdownInput = document.getElementById('destinationsDropdownInput');
var datalist = document.getElementById('datalist');

// form selectors
let tripForm = document.getElementById('tripForm');
let tripPlanFieldset = document.getElementById('tripPlanFieldset');

//price agreement
let addTripForm = document.getElementById('addTripSubmit');
let tripCost = document.getElementById('cost');
let priceAgreement = document.getElementById('priceAgreement');
let priceEstimateField = document.getElementById('priceEstimateField');

//login pg
var loginPageField = document.getElementById('loginPageField');
var loginPageSection = document.getElementById('loginPageSection');

var loginErrorMsg = document.getElementById('loginErrorMsg');
var loginForm = document.getElementById('loginForm');
var passwordInput = document.getElementById('passwordInput');
var usernameInput = document.getElementById('usernameInput');

var logout = document.getElementById('logoutButton');

// event listeners
window.addEventListener('load', displayResolvedData);
clickPastTrips.addEventListener('click', displayPastTrips);
clickPresentTrips.addEventListener('click', displayPresentTrips);
clickUpcomingTrips.addEventListener('click', displayUpcomingTrips);
clickPendingTrips.addEventListener('click', displayPendingTrips);
bookNewTrip.addEventListener('click', bookTripDisplay)

// bookTripButton.addEventListener('click', );
tripForm.addEventListener('submit', displayCosts);
addTripForm.addEventListener('submit', displayTripConfirmation);
loginForm.addEventListener('submit', checkValidLogin);

logout.addEventListener('click', fireLogoutEvent)

// Fetch API
function displayResolvedData() {
  fetchAllData()
  .then((allData) => {
    getAllTravelerData(allData[0].travelers)
    getAllTripData(allData[1].trips)
    getAllDestinationData(allData[2].destinations)
  })
}

function getAllTravelerData(data) {
  travelerData = data;
  travelerRepository = new TravelerRepository(travelerData);
}

function getAllTripData (data) {
  tripData = data;
  globalTrip = new Trip(tripData);
}
//4
function getAllDestinationData(data) {
  destinationData = data;
  globalDestination = new Destination(destinationData);
  if (globalTraveler) {
    loadTraveler(globalTraveler.id)
  } else {
    displayLoginDashboard();
  }
}
// step 1 completed
// on step 2, the user will login.
// the first step of this login, is to check whether or not the information is valid.
// if it is not, reset the values, show an error message ,and go back to the dashboard.

//login page functions
function checkValidLogin() {
  event.preventDefault();
  let username = usernameInput.value;
  let password = passwordInput.value;
  console.log(password)
  let validityCheck1 = (password === 'travel');
  let phase1 = checkForFalse(validityCheck1);
  let id = Number(splitIdValue(username));
  let validityCheck2 = checkIdIsValid(id);
  let phase2 = checkForFalse(validityCheck2);
  if (validityCheck1 && validityCheck2) {
    loadTraveler(id)
  }
  console.log(validityCheck2)
}

function travelerLogout() {
  loginErrorMsg.classList.remove('hidden');
  usernameInput.value = '';
  passwordInput.value = '';
  setTimeout(displayLoginDashboard, 3000);
}

function checkForFalse(ele) {
  if (!ele) {
    travelerLogout();
  }
}

function fireLogoutEvent() {
  window.location.reload();
  return false;
}

function splitIdValue(usernameString) {
  let ID = usernameString.split(/(\d+)/);
  if (ID[0] !== 'traveler') {
    travelerLogout();
  } else {
    console.log(ID);
    return ID[1];
  }
}

function checkIdIsValid(id) {
  if (id >= 1 && id <= 50) {
    return true
  } else {
    return false
  }
}

// if the id is valid, and password correct, take them to the login
// dashboard, where the trips menu bar and the dream trip box
// are displayed.
// load the new traveler from the data
// step 2 complete
// step 3, display dashboard.

//login page display
function displayLoginDashboard() {
  removeHidden(loginPage);
  addHidden(allUserTrips);
  addHidden(loginErrorMsg);
}


function hideLogin() {
  addHidden(loginPage);
  addHidden(loginPageField);
}

function showDashboard() {
  removeHidden(tripRequestBox);
  removeHidden(allUserTrips);
  addHidden(messageDisplay);
  addHidden(userSelectedTrips);
}

function loadTraveler(id) {
  console.log(id)
  let newTraveler = travelerRepository.getDataById(id);
  globalTraveler = newTraveler;
  displayFirstName();
  displayYearlyCosts();
  loadUserDashboard();
}

function displayFirstName() {
  let travelerFirstName = globalTraveler.returnFirstName();
  welcomeText.innerText = `Welcome, ${travelerFirstName}!`;
}

function displayYearlyCosts() {
  let travelerTrips = globalTrip.getUserTripData(globalTraveler.id);
  let yearlyExpense = globalDestination.calculateYearlyTravelExpenses(travelerTrips);
  yearlyCostValue.innerText = ` $${yearlyExpense}`;
  // if the cost is 0, should i say something else?
  console.log(yearlyExpense)
}

function loadUserDashboard() {
  showDashboard();
  bookTripDisplay();
  hideLogin();
  let today = getTodaysDate();
  let calendarMin = today.split('/').join('-');
  bookingDateInput.min = calendarMin;
  clearInputFields();
  supplyDestinationDropDown();
}

function getTodaysDate() {
  let todaysDate = new Date();
  let formattedToday = formatDate(todaysDate);
  today = formattedToday;
  return today;
}

function supplyDestinationDropDown() {
  let destinationNames = globalDestination.returnDestinationNames(tripData);
  let alphabeticallySorted = destinationNames.sort();
  let dropDownDestinations = alphabeticallySorted.forEach(destination => {
    if (!datalist.innerHTML.includes(`<option value="${destination}">${destination}</option>`)) {
      datalist.innerHTML += `<option value="${destination}">${destination}</option>`
    }
  });
  return dropDownDestinations
}

function clearInputFields() {
  bookingDateInput.value = '';
  durationInput.value = '';
  numTravelersInput.value = '';
  priceAgreement.checked = false;
  destinationsDropdownInput.value = '';
  tripCost.innerText = '';
}

//trip selection bar//
function displayTripSelection() {
  addHidden(tripPlanFieldset);
  addHidden(tripRequestBox);
  removeHidden(userSelectedTrips);
}

function clearGrid() {
  addHidden(noTripsDisplay);
  grid.innerHTML = '';
}

function bookTripDisplay() {
  removeHidden(tripPlanFieldset);
  removeHidden(tripRequestBox);
  addHidden(userSelectedTrips);
  addHidden(messageDisplay);
}

function checkForEmptyDisplay(trips) {
  if (trips.length === 0) {
    console.log('empty')
    removeHidden(messageDisplay);
    removeHidden(noTripsDisplay);
    addHidden(userSelectedTrips);
    removeHidden(tripRequestBox);
    addHidden(tripConfirmation)
    // THE TRIP REQUEST BOX was in the way of the messages.
  }
}

function modifyTripsToCards(trips) {
  let displayCards = trips.map(trip => {
    grid.innerHTML +=
    `<article class="box zoom" id="${trips.indexOf(trip)}">
    <div tabindex=0 class='img-container'>
    <img class='box-img' id='boxImg' alt=${trip.alt} src=${trip.img} width='150' height='150'></img>
    </div>
    <div tabindex=0 class='text-container'>
    <p class='location text' id='location'><b>Location: </b>${trip.location}</p>
    <p class='trip-date text' id='tripDate'><b>Date of Your Trip: </b> ${trip.date}</p>
    <p class='length-stay text' id='lengthStay'><b>Duration of Your Trip: </b> ${trip.duration} days</p>
    </div>
    </article>`
  });
}

// trip displays

function displayPastTrips() {
  displayTripSelection();
  clearGrid();
  let travelerTrips = globalTrip.getUserTripData(globalTraveler.id);
  let pastTrips = globalTrip.getPastTrips(travelerTrips, today);
  let pastTripProperties = globalDestination.returnLocationProperties(pastTrips);
  checkForEmptyDisplay(pastTripProperties);
  modifyTripsToCards(pastTripProperties);
}

function displayPresentTrips() {
  displayTripSelection();
  clearGrid();
  let travelerTrips = globalTrip.getUserTripData(globalTraveler.id);
  let tripDates = getAllTripDates(travelerTrips);
  let presentTripMatches = globalTrip.findPresentTrips(tripDates, today);
  let presentTrips = globalTrip.returnPresentTrip(presentTripMatches, tripData);
  let presentTripProperties = globalDestination.returnLocationProperties(presentTrips);
  checkForEmptyDisplay(presentTripProperties);
  modifyTripsToCards(presentTripProperties);
}

function displayUpcomingTrips() {
  displayTripSelection();
  clearGrid();
  let travelerTrips = globalTrip.getUserTripData(globalTraveler.id);
  let upcomingTrips = globalTrip.getUpcomingTrips(travelerTrips, today);
  let upcomingTripsProperties = globalDestination.returnLocationProperties(upcomingTrips);
  checkForEmptyDisplay(upcomingTripsProperties);
  modifyTripsToCards(upcomingTripsProperties);
}

function displayPendingTrips() {
  displayTripSelection();
  clearGrid();
  let travelerTrips = globalTrip.getUserTripData(globalTraveler.id);
  let pendingTrips = globalTrip.getPendingTrips(travelerTrips, today);
  let pendingTripsProperties = globalDestination.returnLocationProperties(pendingTrips);
  checkForEmptyDisplay(pendingTripsProperties);
  modifyTripsToCards(pendingTripsProperties);
}

//post
function addUserTripFromInput() {
  let bookingDate = bookingDateInput.value;
  let formattedDate = bookingDate.split('-').join('/');
  let duration = Number(durationInput.value);
  let numTravelers = Number(numTravelersInput.value);
  let destination = destinationsDropdownInput.value;
  let destinationID = globalDestination.findDestinationByName(destination);
  let tripID = tripData.length + 1;
  let dataToTransmit = {id: tripID,
    userID: globalTraveler.id,
    destinationID: destinationID,
    travelers: numTravelers,
    date: formattedDate,
    duration: duration,
    status: 'pending',
    suggestedActivities: []
  };
  var response = addUserTravelData(dataToTransmit).then((res) => displayResolvedData());
}

function calculateTripCosts() {
  let duration = Number(durationInput.value);
  let numTravelers = Number(numTravelersInput.value);
  let destination = destinationsDropdownInput.value;
  let destinationID = globalDestination.findDestinationByName(destination);
  let tripExpense = globalDestination.calculateTripExpense(duration, numTravelers, destinationID);
  console.log(tripExpense)
  return tripExpense.toFixed(2);
}

function displayCosts() {
  event.preventDefault();
  removeHidden(priceEstimateField);
  addHidden(tripPlanFieldset);
  addHidden(tripConfirmation);
  let tripExpense = calculateTripCosts();
  tripCost.innerText = `$${tripExpense} USD`;
}

function displayTripConfirmation() {
  event.preventDefault();
  addHidden(priceEstimateField);
  addHidden(noTripsDisplay);
  tripConfirmation.innerHTML = `<img src='../images/meteor-rain.gif' height='75' width='75'></img><p class='trip-confirmation-message' id="tripConfirmation"><br> ${globalTraveler.returnFirstName()}: <br> We are booking your trip to ${destinationsDropdownInput.value} on ${bookingDateInput.value.split('-').join('/')}! </br><br>You will be redirected back to the main page shortly.</p>`
  removeHidden(tripConfirmation);
  removeHidden(messageDisplay);
  setTimeout(addUserTripFromInput, 3000);
}

//helper functions
function removeHidden(ele) {
  ele.classList.remove('hidden');
}

function addHidden(ele) {
  ele.classList.add('hidden');
}

//date helpers
function getAllTripDates(allTripData) {
  let allTripDates = allTripData.map(trip => {
    let tripDates = stringDatesOfTrip(trip)
    return tripDates
  })
  return allTripDates;
}

function stringDatesOfTrip(trip) {
  let endDate = calculateEndDate(trip.date, trip.duration);
  let allTripDays = getDaysInTrip(new Date(trip.date), endDate);
  let formattedTripDays = formatDatesList(allTripDays);
  return formattedTripDays;
}

function calculateEndDate(startDate, tripDuration) {
  let endDate = new Date(startDate);
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
    let dd = String(day.getDate()).padStart(2, '0');
    let mm = String(day.getMonth() + 1).padStart(2, '0');
    let yyyy = day.getFullYear();
    return day = yyyy + '/' + mm + '/' + dd;
  })
    return formattedDaylist;
}

function formatDate(day) {
    let dd = String(day.getDate()).padStart(2, '0');
    let mm = String(day.getMonth() + 1).padStart(2, '0');
    let yyyy = day.getFullYear();
    let formattedDay = yyyy + '/' + mm + '/' + dd;
    return formattedDay;
}
