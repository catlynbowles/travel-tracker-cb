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
var travelerData;
var tripData;
var destinationData;
var travelerRepository;
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
    console.log(allData)
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
  removeHidden(tripRequestBox);
  addHidden(userSelectedTrips);
  let travelerInformation = getRandomUserId(travelerData);
  let newTraveler = travelerRepository.getDataById(travelerInformation);
  let travelerFirstName = newTraveler.returnFirstName();
  welcomeText.innerText = `Welcome, ${travelerFirstName}!`;
  // displayIdCardInfo(newUser);
  // displayStepsInfo(newUser);
  // displayHydrationInfo(newUser);
  // displaySleepInfo(newUser);
}

function backToHome() {
  removeHidden(tripRequestBox);
  addHidden(userSelectedTrips);
}

function displayPastTrips() {
  addHidden(tripRequestBox);
  removeHidden(userSelectedTrips);
  console.log('hi')
}

function displayPresentTrips() {
  addHidden(tripRequestBox);
  removeHidden(userSelectedTrips);
}

function displayUpcomingTrips() {
  addHidden(tripRequestBox);
  removeHidden(userSelectedTrips);
}

function displayPendingTrips() {
  addHidden(tripRequestBox);
  removeHidden(userSelectedTrips);
}

function getRandomUserId (anyUserData) {
  return anyUserData[Math.floor(Math.random()*anyUserData.length)].id;
}
