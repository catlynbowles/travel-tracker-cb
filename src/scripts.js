// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import {fetchAllData, addUserTravelData} from './apiCalls.js'
import TravelerRepository from './TravelerRepository';
import Traveler from './Traveler';
import Trip from './Trip';
import Destination from './Destination';
import './images/meteor-rain.gif'

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
var yearlyCostValue = document.getElementById('yearlyCostValue');
var tripConfirmation = document.getElementById('tripConfirmation');
var noTripsDisplay = document.getElementById('noTripsDisplay');
var messageDisplay = document.getElementById('messageDisplay');
var boardDisplay = document.getElementById('boardDisplay')
var allUserTrips = document.getElementById('allUserTrips');
// loginForm.addEventListener('click', loadboard);

//inputs
var bookingDateInput = document.getElementById('bookingDateInput');
var durationInput = document.getElementById('durationInput');
var numTravelersInput = document.getElementById('numTravelersInput');
var destinationsDropdownInput = document.getElementById('destinationsDropdownInput');
var datalist = document.getElementById('datalist');

// form selectors
let tripForm = document.getElementById('tripForm');
let addTripForm = document.getElementById('addTripSubmit');
let tripPlanFieldset = document.getElementById('tripPlanFieldset');
let priceAgreement = document.getElementById('priceAgreement');
let priceEstimateField = document.getElementById('priceEstimateField');
let tripCost = document.getElementById('cost');

var loginPageField = document.getElementById('loginPageField')
var loginLegend = document.getElementById('loginLegend')
var loginPageSection = document.getElementById('loginPageSection');
var loginStyling = document.getElementById('loginStyling')

var loginErrorMsg = document.getElementById('loginErrorMsg')
var loginForm = document.getElementById('loginForm');
var loginFormStyling = document.getElementById('loginStyling')
var passwordInput = document.getElementById('passwordInput');
var usernameInput = document.getElementById('usernameInput');
loginForm.addEventListener('submit', checkValidLogin);

// event listeners
window.addEventListener('load', displayResolvedData);

clickPastTrips.addEventListener('click', displayPastTrips);
clickPresentTrips.addEventListener('click', displayPresentTrips);
clickUpcomingTrips.addEventListener('click', displayUpcomingTrips);
clickPendingTrips.addEventListener('click', displayPendingTrips);

homeButton.addEventListener('click', loadUserDashboard);
tripForm.addEventListener('submit', displayCosts);
addTripForm.addEventListener('submit', displayTripConfirmation);


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


function displayLoginDashboard() {
  // removeHidden(loginStyling);

  addHidden(tripConfirmation);
  addHidden(messageDisplay);
  addHidden(userSelectedTrips);
  addHidden(priceEstimateField);
  addHidden(tripRequestBox);
  addHidden(tripPlanFieldset);
  addHidden(allUserTrips);
  addHidden(userDashboardDisplay);
  addHidden(loginErrorMsg);

  removeHidden(loginPage);
  removeHidden(loginForm);
  removeHidden(loginPage);
  removeHidden(loginPageField)
  removeHidden(loginLegend)
  removeHidden(loginPage)

  // addHidden(loginPage);
  // addHidden(loginPageField)
  // addHidden(loginLegend)
  // addHidden(loginErrorMsg);
}

function reverseLogin() {
  removeHidden(userSelectedTrips);
  addHidden(priceEstimateField);
  addHidden(tripRequestBox);
  addHidden(tripPlanFieldset);
  // addHidden(loginForm);
  // removeHidden(loginPage);
  removeHidden(allUserTrips);
  addHidden(loginErrorMsg);
}

function checkValidLogin() {
  event.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;
  let validityCheck1 = (password === 'travel');
  let phase1 = checkForFalse(validityCheck1);
  let id = Number(splitIdValue(username));
  let validityCheck2 = checkIdIsValid(id);
  let phase2 = checkForFalse(validityCheck2);
  loadUserDashboard(id)
  console.log(validityCheck2)
}

function checkForFalse(ele) {
  if (!ele) {
    console.log('hi')
    loginErrorMsg.classList.remove('hidden')
    usernameInput.value = ''
    passwordInput.value = ''
    setTimeout(displayLoginDashboard, 3000)
    return
  }
}
function loadUserDashboard(id) {

  removeHidden(tripConfirmation);
  // removeHidden(messageDisplay);
  removeHidden(userSelectedTrips);
  // removeHidden(priceEstimateField);
  removeHidden(tripRequestBox);
  removeHidden(tripPlanFieldset);
  removeHidden(allUserTrips);
  removeHidden(userDashboardDisplay);
  // removeHidden(loginErrorMsg);
  // refactored upon creation of login page.
  // let travelerInformation = blabla.value of the input
  // addHidden(loginStyling)
  // addHidden(loginLegend)
  removeHidden(tripPlanFieldset)
  removeHidden(tripRequestBox)
  // removeHidden(allUserTrips)
  removeHidden(userDashboardDisplay);
  removeHidden(userSelectedTrips);
  // removeHidden(userTrip)
  addHidden(loginPage);
  // addHidden(loginPageSection)
  addHidden(userSelectedTrips)
  addHidden(loginPageField)
  addHidden(loginLegend)
  addHidden(loginErrorMsg);
  loginForm.removeEventListener('submit', checkValidLogin)
  addHidden(loginForm);
  // removeHidden(loginPage);
  // removeHidden(loginForm);
  // removeHidden(loginPage);
  // addHidden(loginPage);
  addHidden(loginPageSection);
  // addHidden(loginPageField)
  backToHome();
  clearInputFields();
  clearCostValue();
  addHidden(messageDisplay);
  let today = getTodaysDate();
  let calendarMin = today.split('/').join('-');
  bookingDateInput.min = calendarMin;
  // let travelerId = getRandomUserId(travelerData);
  let newTraveler = travelerRepository.getDataById(id);
  globalTraveler = newTraveler;
  displayFirstName();
  displayYearlyCosts();
  supplyDestinationDropDown();
  console.log(newTraveler)
}

function splitIdValue(usernameString) {
  let ID = usernameString.split(/(\d+)/);
  console.log(ID)
  return ID[1]
}

function checkIdIsValid(id) {
  if (id >= 1 && id <= 50) {
    return true
  } else {
    return false
  }
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
  displayLoginDashboard();
  // loadUserDashboard();
}

//posts
function addUserTripFromInput() {
  // event.preventDefault();
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
  var response = addUserTravelData(dataToTransmit).then((res) => displayResolvedData());
}

//functions
function removeHidden(ele) {
  ele.classList.remove('hidden');
}

function addHidden(ele) {
  ele.classList.add('hidden');
}

function backToHome() {
  removeHidden(tripRequestBox);
  removeHidden(tripPlanFieldset);
  addHidden(tripConfirmation);
  addHidden(messageDisplay);
  addHidden(userSelectedTrips);
  addHidden(priceEstimateField);
}

// function loginPageView() {
//   addHidden(tripConfirmation);
//   addHidden(messageDisplay);
//   addHidden(userSelectedTrips);
//   addHidden(priceEstimateField);
//   addHidden(tripRequestBox);
//   addHidden(tripPlanFieldset);
//   removeHidden(loginPage);
// }

function displayTripSelection() {
  addHidden(tripPlanFieldset);
  addHidden(tripRequestBox);
  removeHidden(userSelectedTrips);
  addHidden(messageDisplay)
  addHidden(priceEstimateField);
  addHidden(tripConfirmation);
}

function clearCostValue() {
  clearGrid();
  yearlyCostValue.innerHTML = '';
}

function clearInputFields() {
  bookingDateInput.value = '';
  durationInput.value = '';
  numTravelersInput.value = '';
  priceAgreement.checked = false;
  destinationsDropdownInput.value = ''
  tripCost.innerText = '';
}

function getTodaysDate() {
  let todaysDate = new Date();
  let formattedToday = formatDate(todaysDate);
  today = formattedToday;
  return today;
}

function displayFirstName() {
  let travelerFirstName = globalTraveler.returnFirstName();
  welcomeText.innerText = `Welcome, ${travelerFirstName}!`;
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


function displayYearlyCosts() {
  let travelerTrips = globalTrip.getUserTripData(globalTraveler.id);
  let yearlyExpense = globalDestination.calculateYearlyTravelExpenses(travelerTrips);
  yearlyCostValue.innerText = ` $${yearlyExpense}`;
  // if the cost is 0, should i say something else?
  console.log(yearlyExpense)
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

function displayCosts() {
  event.preventDefault()
  removeHidden(priceEstimateField);
  addHidden(tripPlanFieldset);
  addHidden(tripConfirmation);
  let tripExpense = calculateTripCosts();
  tripCost.innerText = `$${tripExpense} USD`
}

function displayTripConfirmation() {
  event.preventDefault();
  addHidden(priceEstimateField);
  tripConfirmation.innerHTML = `<img src='../images/meteor-rain.gif' height='75' width='75'></img><p class='trip-confirmation-message' id="tripConfirmation"><br> ${globalTraveler.returnFirstName()}: <br> We are booking your trip to ${destinationsDropdownInput.value} on ${bookingDateInput.value.split('-').join('/')}! </br><br>You will be redirected back to the main page.</p>`
  removeHidden(tripConfirmation);
  removeHidden(messageDisplay);
  setTimeout(addUserTripFromInput, 3000);
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
  let presentTripMatches = globalTrip.findPresentTrips(tripDates, today);
  let presentTrips = globalTrip.returnPresentTrip(presentTripMatches, tripData);
  let presentTripProperties = globalDestination.returnLocationProperties(presentTrips);
  checkForEmptyDisplay(presentTripProperties);
  modifyTripsToCards(presentTripProperties);
  console.log(presentTripProperties)
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

function checkForEmptyDisplay(trips) {
  if (trips.length === 0) {
    addHidden(grid);
    addHidden(userSelectedTrips);
    addHidden(tripPlanFieldset);
    removeHidden(tripRequestBox);
    removeHidden(noTripsDisplay);
  }
}

function clearGrid() {
  addHidden(noTripsDisplay);
  grid.innerHTML = '';
}

//date helpers
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
  // console.log(formattedTripDays)
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
