import { expect } from 'chai';
import Destination from '../src/Destination';
import {destinationData, tripData} from '../test-data/Destination-data.js';

describe('Destination', () => {
  let destination;
  let destinationData;
  let tripData;

  beforeEach(() => {
    destination = new Destination(destinationData);

  it('should be a function', function () {
    expect(Destination).to.be.a('function');
  });

  it('should be an instance of a Destination', () => {
    expect(destinationData).to.be.an('array');
    expect(destination).to.be.an.instanceof(Destination);
  });

  it('should be able to take in an array of destinations and trip data and return the name of the location the date, picture and alt text of each associated location.', () => {
    let locationInformation = destination.returnLocationProperties(tripData)
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

  it('should take in past trip data for the user and calculate the price spent for the year', () => {
    let yearlyPrice = destination.calculateYearlyPrice(tripData)
    expect(yearlyPrice).to.be.a('number');
    // expect(locationInformation).to.deep.equal(
  });
});
})
