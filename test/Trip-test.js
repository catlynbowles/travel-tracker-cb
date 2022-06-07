import { expect } from 'chai';
import Trip from '../src/Trip';

describe('Trip', () => {
  let trip;
  let tripData;

  beforeEach(() => {
    tripData = [{
      "id": 15,
      "userID": 50,
      "destinationID": 13,
      "travelers": 3,
      "date": "2022/07/04",
      "duration": 6,
      "status": "approved",
      "suggestedActivities": []
    },
      {
      "id": 22,
      "userID": 22,
      "destinationID": 9,
      "travelers": 4,
      "date": "2022/05/01",
      "duration": 19,
      "status": "approved",
      "suggestedActivities": []
    },
    {
      "id": 18,
      "userID": 18,
      "destinationID": 2,
      "travelers": 2,
      "date": "2022/09/25",
      "duration": 17,
      "status": "approved",
      "suggestedActivities": []
    },
    {
      "id": 86,
      "userID": 22,
      "destinationID": 46,
      "travelers": 4,
      "date": "2020/10/31",
      "duration": 17,
      "status": "approved",
      "suggestedActivities": []
    }]
    // trip1 = new Trip(tripData1);
    // trip2 = new Trip(tripData2);
    // what's going on here?
    // the constructor will take in all the data?
    // i think we will need this to display all the users trip,
    // method: get all user trips by userID.
    // with that in mind, how do you want to setup your constructor?
    // input: an array of all trips
    // output: specific trips/ trip needed which will always be an arr.
    // do we want a travelerRepo?
    trip = new Trip(tripData);
  });

  it('should be a function', function () {
    expect(Trip).to.be.a('function');
  });

  it('should be an instance of a Trip', () => {
    expect(tripData).to.be.an('array');
    expect(trip).to.be.an.instanceof(Trip);
  });
});
