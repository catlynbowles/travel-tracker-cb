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
var gridContents = document.getElementById('gridContents')
var grid = document.getElementById('grid')

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
  let travelerId = getRandomUserId(travelerData);
  let newTraveler = travelerRepository.getDataById(travelerId);
  globalTraveler = newTraveler;
  let todaysDate = globalTrip.getCurrentDate();
  today = todaysDate;
  console.log(newTraveler)
  let travelerFirstName = newTraveler.returnFirstName();
  welcomeText.innerText = `Welcome, ${travelerFirstName}!`;
}

function backToHome() {
  removeHidden(tripRequestBox);
  addHidden(userSelectedTrips);
}

function displayPastTrips() {
  addHidden(tripRequestBox);
  removeHidden(userSelectedTrips);
  let travelerTrips = globalTrip.getUserTripData(globalTraveler.id);
  console.log(travelerTrips)
  let pastTrips = globalTrip.getPastTrips(travelerTrips, today);
  let pastTripProperties = globalDestination.returnLocationProperties(pastTrips);
  console.log(pastTripProperties)
  modifyTripsToCards(pastTripProperties)
  // let pastCards = modifyTripsToCards(pastTrips);
  // console.log(pastCards)
  // console.log(pastTrips[0])
  // let pastTripIDs = pastTrips.map(trip => trip.destinationID)
  // let destinationNames = globalDestination.returnLocationName(pastTripIDs);
  // console.log(destinationNames)
  // console.log(pastTripIDs)
}

function modifyTripsToCards(arr) {
  let displayCards = arr.map(trip => {
    console.log(trip)
    grid.innerHTML +=
    `<article class="box" id="${arr.indexOf(trip)}">
    <img class='box-img' id='boxImg' alt=${trip.alt} src=${trip.img} width='150' height='150'></img>
    <p class='location' id='location'>${trip.location}</p>
    <p date='trip-date' id='tripDate'>${trip.date}</p>
    </article>`
  });
  // gridContents.innerHTML
  console.log(displayCards)
}

function displayPresentTrips() {
  addHidden(tripRequestBox);
  removeHidden(userSelectedTrips);
}

function displayUpcomingTrips() {
  addHidden(tripRequestBox);
  removeHidden(userSelectedTrips);
  let travelerTrips = globalTrip.getUserTripData(globalTraveler.id);
  let upcomingTrips = globalTrip.getUpcomingTrips(travelerTrips, today);
  console.log(upcomingTrips)
}

function displayPendingTrips() {
  addHidden(tripRequestBox);
  removeHidden(userSelectedTrips);
  let travelerTrips = globalTrip.getUserTripData(globalTraveler.id);
  let pendingTrips = globalTrip.getPendingTrips(travelerTrips, today);
  console.log(pendingTrips)
}

function getRandomUserId (anyUserData) {
  return anyUserData[Math.floor(Math.random()*anyUserData.length)].id;
}
