import { expect } from 'chai';
import Destination from '../src/Destination';
import tripData from '../test-data/Trip-data';

describe('Destination', () => {
  let destination;
  let destinationData;
  let tripData;

  beforeEach(() => {
    tripData = [
      {
        "id": 15,
        "userID": 50,
        "destinationID": 49,
        "travelers": 3,
        "date": "2022/07/04",
        "duration": 6,
        "status": "approved",
        "suggestedActivities": []
      },
        {
        "id": 22,
        "userID": 22,
        "destinationID": 44,
        "travelers": 4,
        "date": "2022/05/01",
        "duration": 19,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 71,
        "userID": 50,
        "destinationID": 25,
        "travelers": 1,
        "date": "2020/05/26",
        "duration": 11,
        "status": "pending",
        "suggestedActivities": []
      },
      {
        "id": 84,
        "userID": 2,
        "destinationID": 32,
        "travelers": 1,
        "date": "2020/11/23",
        "duration": 19,
        "status": "pending",
        "suggestedActivities": []
      }]
    destinationData = [{
      "id": 25,
      "destination": "New York, New York",
      "estimatedLodgingCostPerDay": 175,
      "estimatedFlightCostPerPerson": 200,
      "image": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      "alt": "people crossing the street during the day surrounded by tall buildings and advertisements"
    },
    {
      "id": 32,
      "destination": "Kathmandu, Nepal",
      "estimatedLodgingCostPerDay": 45,
      "estimatedFlightCostPerPerson": 1200,
      "image": "https://images.unsplash.com/photo-1558799401-1dcba79834c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
      "alt": "temple with buntings during daytime"
    },
    {
      "id": 44,
      "destination": "Caye Caulker, Belize",
      "estimatedLodgingCostPerDay": 450,
      "estimatedFlightCostPerPerson": 80,
      "image": "https://images.unsplash.com/photo-1544525977-0a3bca9e560d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      "alt": "boat on dock during daytime"
    },
    {
      "id": 49,
      "destination": "Castries, St Lucia",
      "estimatedLodgingCostPerDay": 650,
      "estimatedFlightCostPerPerson": 90,
      "image": "https://images.unsplash.com/photo-1524478075552-c2763ea171b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
      "alt": "aerial photography of rocky mountain under cloudy sky"
    }];
    // should have a method that takes in a destinationd ID
    // and returns the name, aka 'destination' of that ID.
    // ex:
    destination = new Destination(destinationData);
  });

  it('should be a function', function () {
    expect(Destination).to.be.a('function');
  });

  it('should be an instance of a Destination', () => {
    expect(destinationData).to.be.an('array');
    expect(destination).to.be.an.instanceof(Destination);
  });

  // what if it only took in an array of location ids?
  // it('should be able to take in an array of locations and return the name of that destination', () => {
  //   let locationNames = destination.returnLocationName(destinationData);
  //   expect(locationNames).to.be.an('array');
  //   expect(locationNames).to.deep.equal([
  //     'New York, New York',
  //     'Kathmandu, Nepal',
  //     'Caye Caulker, Belize',
  //     'Castries, St Lucia'
  //   ]);
  // });

  it('should be able to take in an array of destinations and trip data and return the name of the location the date, picture and alt text of each associated location.', () => {
    // let locationIDs = destinationData.map(destination => destination.id)
    let locationInformation = destination.returnLocationProperties(destinationData, tripData)
    expect(locationInformation).to.be.an('array');
    expect(locationInformation).to.deep.equal([
  {
    location: 'Castries, St Lucia',
    date: '2022/07/04',
    img: 'https://images.unsplash.com/photo-1524478075552-c2763ea171b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80',
    alt: 'aerial photography of rocky mountain under cloudy sky'
  },
  {
    location: 'Caye Caulker, Belize',
    date: '2022/05/01',
    img: 'https://images.unsplash.com/photo-1544525977-0a3bca9e560d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    alt: 'boat on dock during daytime'
  },
  {
    location: 'New York, New York',
    date: '2020/05/26',
    img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    alt: 'people crossing the street during the day surrounded by tall buildings and advertisements'
  },
  {
    location: 'Kathmandu, Nepal',
    date: '2020/11/23',
    img: 'https://images.unsplash.com/photo-1558799401-1dcba79834c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
    alt: 'temple with buntings during daytime'
  }
]);
  });
});
