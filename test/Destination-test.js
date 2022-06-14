import { expect } from 'chai';
import Destination from '../src/Destination';
import {destTripData, destinationData} from '../test-data/Destination-data';

describe('Destination', () => {
  let destination;

  beforeEach(() => {
    destination = new Destination(destinationData);
  })

  it('should be a function', function () {
    expect(Destination).to.be.a('function');
  });

  it('should be an instance of a Destination', () => {
    expect(destinationData).to.be.an('array');
    expect(destination).to.be.an.instanceof(Destination);
  });

  it('should be able to take in trip data and return destination names', () => {
    let destinationNames = destination.returnDestinationNames(destTripData);

    expect(destinationNames).to.be.an('array');
    expect(destinationNames).to.be.deep.equal([
      'Castries, St Lucia',
      'Caye Caulker, Belize',
      'New York, New York',
      'Kathmandu, Nepal'
    ]);
  });

  it('should calculate the trip expense for the current traveler booking', () => {
    let tripCalculation = destination.calculateTripExpense(6, 3, 49);

    expect(tripCalculation).to.be.a('number');
    expect(tripCalculation).to.equal(4587);
  });

  it('should calculate the current year', () => {
    let currentYear = destination.getCurrentYear();

    expect(currentYear).to.be.a('number');
    expect(currentYear).to.equal(2022);
  });

  it('should calculate yearly travel expenses based on taking in a list of trips', () => {
    let userExpenses = destination.calculateYearlyTravelExpenses(destTripData);

    expect(userExpenses).to.be.a('number');
    expect(userExpenses).to.equal(14344);
  });

  it('should find a destination by name and return the id of the destination', () => {
    let destinationMatch = destination.findDestinationByName("Caye Caulker, Belize");

    expect(destinationMatch).to.be.a('number');
    expect(destinationMatch).to.deep.equal(44);
  });

  it('should be able to take in an array of destinations and trip data and return the name of the location, the date, the days of the trip, a picture and alt text of each associated location.', () => {
    let locationInformation = destination.returnLocationProperties(destTripData);
    
    expect(locationInformation).to.be.an('array');
    expect(locationInformation).to.deep.equal([
      {
        location: 'Castries, St Lucia',
        date: '2022/03/04',
        duration:  6,
        img: 'https://images.unsplash.com/photo-1524478075552-c2763ea171b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80',
        alt: 'aerial photography of rocky mountain under cloudy sky'
      },
      {
        location: 'Caye Caulker, Belize',
        date: '2022/05/01',
        duration: 19,
        img: 'https://images.unsplash.com/photo-1544525977-0a3bca9e560d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
        alt: 'boat on dock during daytime'
      },
      {
        location: 'New York, New York',
        date: '2020/05/26',
        duration: 11,
        img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
        alt: 'people crossing the street during the day surrounded by tall buildings and advertisements'
      },
      {
        location: 'Kathmandu, Nepal',
        date: '2020/11/23',
        duration: 19,
        img: 'https://images.unsplash.com/photo-1558799401-1dcba79834c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
        alt: 'temple with buntings during daytime'
      }
    ]);
  });
});
