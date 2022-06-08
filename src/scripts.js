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

console.log('This is the JavaScript entry file - your code begins here.');
window.addEventListener('load', displayResolvedData)

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
  travelerData = data;
  globalTrip = new Trip(tripData);
}

const getAllDestinationData = (data) => {
  destinationData = data;
  globalDestination = new Destination(destinationData);
}

const getRandomUserId = (anyUserData) => {
  return anyUserData[Math.floor(Math.random()*anyUserData.length)].id;
}
