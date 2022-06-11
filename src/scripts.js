// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import {fetchAllData, addUserTravelData} from './apiCalls.js'
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
let yearlyCostValue = document.getElementById('yearlyCostValue');
let tripConfirmation = document.getElementById('tripConfirmation');
let noTripsDisplay = document.getElementById('noTripsDisplay')

//inputs
let bookingDateInput = document.getElementById('bookingDateInput');
let durationInput = document.getElementById('durationInput');
let numTravelersInput = document.getElementById('numTravelersInput');
let destinationsDropdownInput = document.getElementById('destinationsDropdownInput');
let datalist = document.getElementById('datalist');

// form selectors
let tripForm = document.getElementById('tripForm');
let addTripForm = document.getElementById('addTripSubmit');
let tripPlanFieldset = document.getElementById('tripPlanFieldset');
let priceAgreement = document.getElementById('priceAgreement');
let priceEstimateField = document.getElementById('priceEstimateField');
let tripCost = document.getElementById('cost');

// event listeners
window.addEventListener('load', displayResolvedData);

clickPastTrips.addEventListener('click', displayPastTrips);
clickPresentTrips.addEventListener('click', displayPresentTrips);
clickUpcomingTrips.addEventListener('click', displayUpcomingTrips);
clickPendingTrips.addEventListener('click', displayPendingTrips);

homeButton.addEventListener('click', loadUserDashboard);
tripForm.addEventListener('submit', displayCosts);
addTripForm.addEventListener('submit', displayTripConfirmation);

function displayTripConfirmation() {
  event.preventDefault();
  addHidden(priceEstimateField);
  removeHidden(tripConfirmation);
}

function clearInputFields() {
  bookingDateInput.value = '';
  durationInput.value = '';
  numTravelersInput.value = '';
  priceAgreement.checked = false;
  destinationsDropdownInput.value = ''
  // document.getElementById(priceAgreement).value = '';
  console.log('priceagree', priceAgreement)
  tripCost.innerText = '';
}

function displayCosts() {
  event.preventDefault()
  removeHidden(priceEstimateField);
  addHidden(tripPlanFieldset);
  let tripExpense = calculateTripCosts();
  tripCost.innerText = `$${tripExpense} USD`
}

function calculateTripCosts() {
  // const bookingDate = bookingDateInput.value;
  // let formattedDate = bookingDate.split('-').join('/')
  const duration = Number(durationInput.value);
  const numTravelers = Number(numTravelersInput.value);
  const destination = destinationsDropdownInput.value;
  const destinationID = globalDestination.findDestinationByName(destination);
  // let tripID = tripData.length + 1;
  let tripExpense = globalDestination.calculateTripExpense(duration, numTravelers, destinationID);
  console.log(tripExpense)
  return tripExpense.toFixed(2)
}

// Fetch API
function displayResolvedData() {
  fetchAllData()
  .then((allData) => {
    getAllTravelerData(allData[0].travelers)
    getAllTripData(allData[1].trips)
    getAllDestinationData(allData[2].destinations)
    console.log(allData)
  })
}

const getAllTravelerData = (data) => {
  travelerData = data;
  console.log('travelerData', travelerData)
  travelerRepository = new TravelerRepository(travelerData);
}

const getAllTripData = (data) => {
  tripData = data;
  console.log('tripData', tripData)
  globalTrip = new Trip(tripData);
}

const getAllDestinationData = (data) => {
  destinationData = data;
  console.log('tripData', destinationData)
  globalDestination = new Destination(destinationData);
  loadUserDashboard();
}

//posts
function addUserTripFromInput() {
  event.preventDefault();
  const bookingDate = bookingDateInput.value;
  let formattedDate = bookingDate.split('-').join('/')
  const duration = Number(durationInput.value);
  const numTravelers = Number(numTravelersInput.value);
  const destination = destinationsDropdownInput.value;
  const destinationID = globalDestination.findDestinationByName(destination);
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
  console.log(dataToTransmit)
  // var response = addUserTravelData(dataToTransmit).then((res) => displayResolvedData());
  loadUserDashboard();
}

//functions
function removeHidden(ele) {
  ele.classList.remove('hidden');
}

function addHidden(ele) {
  ele.classList.add('hidden');
}

function loadUserDashboard() {
  // refactored upon creation of login page.
  // let travelerInformation = blabla.value of the input
  backToHome();
  clearInputFields();
  clearCostValue();
  let today = getTodaysDate();
  let calendarMin = today.split('/').join('-');
  bookingDateInput.min = calendarMin;
  // let travelerId = getRandomUserId(travelerData);
  let newTraveler = travelerRepository.getDataById(22);
  globalTraveler = newTraveler;
  displayFirstName();
  displayYearlyCosts();
  supplyDestinationDropDown();
  console.log(newTraveler)
}

function clearCostValue() {
  clearGrid();
  yearlyCostValue.innerHTML = '';
}

function supplyDestinationDropDown() {
  let destinationNames = globalDestination.returnDestinationNames(tripData);
  let alphabeticallySorted = destinationNames.sort();
  let dropDownDestinations = alphabeticallySorted.forEach(destination => {
    if (!datalist.innerHTML.includes(`<option value="${destination}">${destination}</option>`)) {
      datalist.innerHTML += `<option value="${destination}">${destination}</option>`
    }
  });
  console.log('dropdowns', dropDownDestinations)
  return dropDownDestinations
}

function getTodaysDate() {
  let todaysDate = new Date();
  let formattedToday = formatDate(todaysDate);
  today = formattedToday;
  console.log(today)
  return today;
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

function backToHome() {
  removeHidden(tripRequestBox);
  removeHidden(tripPlanFieldset);
  addHidden(tripConfirmation);
  addHidden(userSelectedTrips);
  addHidden(priceEstimateField);
}

function displayTripSelection() {
  addHidden(tripPlanFieldset);
  addHidden(tripRequestBox);
  removeHidden(userSelectedTrips);
  addHidden(priceEstimateField);
  addHidden(tripConfirmation);
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
  clearGrid();
  let travelerTrips = globalTrip.getUserTripData(globalTraveler.id);
  let tripDates = getAllTripDates(travelerTrips);
  let presentTripDateMatch = globalTrip.findPresentTrips(tripDates, today);
  if (!presentTripDateMatch) {
    noPresentTrips();
  } else {
    displayTripSelection();
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
    addHidden(grid);
    addHidden(userSelectedTrips);
    removeHidden(tripRequestBox);
    removeHidden(noTripsDisplay);
    addHidden(tripPlanFieldset);
  }
}

function noPresentTrips() {
      addHidden(grid);
      addHidden(userSelectedTrips);
      removeHidden(tripRequestBox);
      removeHidden(noTripsDisplay);
      addHidden(tripPlanFieldset);
}

function clearGrid() {
  addHidden(noTripsDisplay);
  grid.innerHTML = '';
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
