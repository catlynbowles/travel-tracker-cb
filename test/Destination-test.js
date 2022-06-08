import { expect } from 'chai';
import Destination from '../src/Destination';

describe('Destination', () => {
  let destination;
  let destinationData;

  beforeEach(() => {
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

  it('should be able to take in an array of locations and return the name of that destination', () => {
    let locationNames = destination.returnLocationName(destinationData);
    expect(locationNames).to.be.an('array');
    expect(locationNames).to.deep.equal([
      'New York, New York',
      'Kathmandu, Nepal',
      'Caye Caulker, Belize',
      'Castries, St Lucia'
    ]);
  });
});
