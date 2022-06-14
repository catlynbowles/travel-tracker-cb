import './css/styles.css';
import {fetchAllData, addUserTravelData, catchError} from './apiCalls.js';
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
var grid = document.getElementById('grid');
var allUserTrips = document.getElementById('allUserTrips');

//messages
var messageDisplay = document.getElementById('messageDisplay');
var yearlyCostValue = document.getElementById('yearlyCostValue');
var tripConfirmation = document.getElementById('tripConfirmation');
var noTripsDisplay = document.getElementById('noTripsDisplay');

//inputs
var bookingDateInput = document.getElementById('bookingDateInput');
var durationInput = document.getElementById('durationInput');
var numTravelersInput = document.getElementById('numTravelersInput');
var destinationsDropdownInput = document.getElementById('destinationsDropdownInput');
var datalist = document.getElementById('datalist');
var passwordInput = document.getElementById('passwordInput');
var usernameInput = document.getElementById('usernameInput');

// form selectors
var tripPlanFieldset = document.getElementById('tripPlanFieldset');
var priceEstimateField = document.getElementById('priceEstimateField');

//price agreement
var tripCost = document.getElementById('cost');
var priceAgreement = document.getElementById('priceAgreement');

//login pg
var loginPageField = document.getElementById('loginPageField');
var loginErrorMsg = document.getElementById('loginErrorMsg');

// buttons
var tripForm = document.getElementById('tripForm');
var logout = document.getElementById('logoutButton');
var addTripForm = document.getElementById('addTripSubmit');
var loginForm = document.getElementById('loginForm');
var logoutButton = document.getElementById('logoutButton');
var bookNewTrip = document.getElementById('bookNew');

// event listeners
window.addEventListener('load', displayResolvedData);
clickPastTrips.addEventListener('click', displayPastTrips);
clickPresentTrips.addEventListener('click', displayPresentTrips);
clickUpcomingTrips.addEventListener('click', displayUpcomingTrips);
clickPendingTrips.addEventListener('click', displayPendingTrips);
bookNewTrip.addEventListener('click', bookTripDisplay);
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

//login page functions
function checkValidLogin() {
  event.preventDefault();
  let username = usernameInput.value;
  let password = passwordInput.value;
  let validityCheck1 = (password === 'travel');
  let id = Number(splitIdValue(username));
  let validityCheck2 = checkIdIsValid(id);
  if (validityCheck1 && validityCheck2) {
    loadTraveler(id)
  } else {
    respondToFalseLogin();
  }
}

function respondToFalseLogin() {
  loginErrorMsg.classList.remove('hidden');
  usernameInput.value = '';
  passwordInput.value = '';
  setTimeout(displayLoginDashboard, 3000);
}

function fireLogoutEvent() {
  window.location.reload();
}

function splitIdValue(usernameString) {
  let ID = usernameString.split(/(\d+)/);
  if (ID[0] !== 'traveler') {
    respondToFalseLogin();
  } else {
    return ID[1];
  }
}

function checkIdIsValid(id) {
  return (id >= 1 && id <= 50)
}

//login page display
function displayLoginDashboard() {
  addHidden(allUserTrips);
  addHidden(loginErrorMsg);
}



// dashboard display
function hideLogin() {
  addHidden(loginPageField);
}

function showDashboard() {
  removeHidden(tripRequestBox);
  removeHidden(allUserTrips);
  addHidden(messageDisplay);
  addHidden(userSelectedTrips);
}

function loadTraveler(id) {
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

function clearTripSelection() {
  addHidden(priceEstimateField);
  addHidden(noTripsDisplay);
  clearInputFields();
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
  clearTripSelection();
  removeHidden(tripPlanFieldset);
  removeHidden(tripRequestBox);
  addHidden(userSelectedTrips);
  addHidden(messageDisplay);
}

function checkForEmptyDisplay(trips) {
  if (trips.length === 0) {
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
  clearTripSelection();
  displayTripSelection();
  clearGrid();
  let travelerTrips = globalTrip.getUserTripData(globalTraveler.id);
  let pastTrips = globalTrip.getPastTrips(travelerTrips, today);
  let pastTripProperties = globalDestination.returnLocationProperties(pastTrips);
  checkForEmptyDisplay(pastTripProperties);
  modifyTripsToCards(pastTripProperties);
}

function displayPresentTrips() {
  clearTripSelection();
  displayTripSelection();
  clearGrid();
  let travelerTrips = globalTrip.getUserTripData(globalTraveler.id);
  let tripDates = getAllTripDates(travelerTrips);
  let presentTripMatches = globalTrip.findPresentTrips(tripDates, today);
  console.log(presentTripMatches)
  let presentTrips = globalTrip.returnPresentTrip(presentTripMatches, globalTraveler.id);
  let presentTripProperties = globalDestination.returnLocationProperties(presentTrips);
  checkForEmptyDisplay(presentTripProperties);
  modifyTripsToCards(presentTripProperties);
}

function displayUpcomingTrips() {
  clearTripSelection();
  displayTripSelection();
  clearGrid();
  let travelerTrips = globalTrip.getUserTripData(globalTraveler.id);
  let upcomingTrips = globalTrip.getUpcomingTrips(travelerTrips, today);
  let upcomingTripsProperties = globalDestination.returnLocationProperties(upcomingTrips);
  checkForEmptyDisplay(upcomingTripsProperties);
  modifyTripsToCards(upcomingTripsProperties);
}

function displayPendingTrips() {
  clearTripSelection();
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

export function displayAPIError(error) {
  loginErrorMsg.innerHTML = `${error}`
  loginErrorMsg.classList.remove('hidden');
  usernameInput.value = '';
  passwordInput.value = '';
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
    let tripDates = stringDatesOfTrip(trip);
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
