import { expect } from 'chai';
import Trip from '../src/Trip';

describe('Trip', () => {
  let trip;
  let tripData;
  let singleTraveler;
  let userTripData1, userTripData2;
  let date;

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
      "id": 113,
      "userID": 22,
      "destinationID": 6,
      "travelers": 3,
      "date": "2019/08/14",
      "duration": 15,
      "status": "approved",
      "suggestedActivities": []
    },
    {
      "id": 179,
      "userID": 18,
      "destinationID": 21,
      "travelers": 1,
      "date": "2020/10/30",
      "duration": 14,
      "status": "approved",
      "suggestedActivities": []
    },
    {
      "id": 116,
      "userID": 2,
      "destinationID": 7,
      "travelers": 3,
      "date": "2020/04/03",
      "duration": 8,
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
      "id": 160,
      "userID": 41,
      "destinationID": 28,
      "travelers": 6,
      "date": "2019/10/12",
      "duration": 17,
      "status": "approved",
      "suggestedActivities": []
    },
    {
      "id": 25,
      "userID": 18,
      "destinationID": 12,
      "travelers": 6,
      "date": "2019/10/26",
      "duration": 9,
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
    },
    {
      "id": 86,
      "userID": 22,
      "destinationID": 46,
      "travelers": 4,
      "date": "2023/11/27",
      "duration": 10,
      "status": "approved",
      "suggestedActivities": []
    }
  ]
    singleTraveler = {
      "id": 22,
      "name": "Gus Courtenay",
      "travelerType": "foodie"
    };
    // method: get all user trips by userID.
    // with that in mind, how do you want to setup your constructor?
    // input: an array of all trips
    // output: specific trips/ trip needed which will always be an arr.
    // do we want a travelerRepo?
    trip = new Trip(tripData);
    userTripData1 = trip.getUserTripData(22);
    userTripData2 = trip.getUserTripData(18);
    date = trip.getCurrentDate();
  });

  it('should be a function', function () {
    expect(Trip).to.be.a('function');
  });

  it('should be an instance of a Trip', () => {
    expect(tripData).to.be.an('array');
    expect(trip).to.be.an.instanceof(Trip);
  });

  it('should be able to find all user trips based on userID', () => {
    expect(userTripData1).to.be.an('array');
    expect(userTripData1).to.deep.equal([
      {
        id: 22,
        userID: 22,
        destinationID: 9,
        travelers: 4,
        date: '2022/05/01',
        duration: 19,
        status: 'approved',
        suggestedActivities: []
      },
      {
        id: 113,
        userID: 22,
        destinationID: 6,
        travelers: 3,
        date: '2019/08/14',
        duration: 15,
        status: 'approved',
        suggestedActivities: []
      },
      {
        id: 86,
        userID: 22,
        destinationID: 46,
        travelers: 4,
        date: '2020/10/31',
        duration: 17,
        status: 'approved',
        suggestedActivities: []
      },
      {
        id: 86,
        userID: 22,
        destinationID: 46,
        travelers: 4,
        date: '2023/11/27',
        duration: 10,
        status: 'approved',
        suggestedActivities: []
      }
    ])

  expect(userTripData2).to.be.an('array');
  expect(userTripData2).to.deep.equal([
      {
        id: 179,
        userID: 18,
        destinationID: 21,
        travelers: 1,
        date: '2020/10/30',
        duration: 14,
        status: 'approved',
        suggestedActivities: []
      },
      {
        id: 18,
        userID: 18,
        destinationID: 2,
        travelers: 2,
        date: '2022/09/25',
        duration: 17,
        status: 'approved',
        suggestedActivities: []
      },
      {
        id: 25,
        userID: 18,
        destinationID: 12,
        travelers: 6,
        date: '2019/10/26',
        duration: 9,
        status: 'approved',
        suggestedActivities: []
      }
    ])
  });

  // it('should be able to calculate today/s date', () => {
  //   // let date = trip.getCurrentDate()
  //   // expect method to return today's date! how can i do this lol
  // });

  it('should be able find all past trips for the user', () => {
    let pastTrips1 = trip.getPastTrips(userTripData1, date);
    expect(pastTrips1).to.be.an('array');
    expect(pastTrips1).to.deep.equal([
      {
        id: 22,
        userID: 22,
        destinationID: 9,
        travelers: 4,
        date: '2022/05/01',
        duration: 19,
        status: 'approved',
        suggestedActivities: []
      },
      {
        id: 113,
        userID: 22,
        destinationID: 6,
        travelers: 3,
        date: '2019/08/14',
        duration: 15,
        status: 'approved',
        suggestedActivities: []
      },
      {
        id: 86,
        userID: 22,
        destinationID: 46,
        travelers: 4,
        date: '2020/10/31',
        duration: 17,
        status: 'approved',
        suggestedActivities: []
      }
    ]);

    let pastTrips2 = trip.getPastTrips(userTripData2, date);
    expect(pastTrips2).to.be.an('array');
    expect(pastTrips2).to.deep.equal([
      {
        id: 179,
        userID: 18,
        destinationID: 21,
        travelers: 1,
        date: '2020/10/30',
        duration: 14,
        status: 'approved',
        suggestedActivities: []
      },
      {
        id: 25,
        userID: 18,
        destinationID: 12,
        travelers: 6,
        date: '2019/10/26',
        duration: 9,
        status: 'approved',
        suggestedActivities: []
      }
    ]);
  });
});
