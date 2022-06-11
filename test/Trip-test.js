import { expect } from 'chai';
import Trip from '../src/Trip';
import {tripData, presentTripData} from '../test-data/Trip-data';
// import presentTripData from '../test-data/Trip-data'

describe('Trip', () => {
  let trip;
  let userTripData1, userTripData2, userTripData3, userTripData4, userTripData5;
  let date;

  beforeEach(() => {

    trip = new Trip(tripData);
    userTripData1 = trip.getUserTripData(22);
    userTripData2 = trip.getUserTripData(18);
    userTripData3 = trip.getUserTripData(50);
    userTripData4 = trip.getUserTripData(2);
    userTripData5 = trip.getUserTripData(29);

    function getToday() {
      let day = new Date();
      var dd = String(day.getDate()).padStart(2, '0');
      var mm = String(day.getMonth() + 1).padStart(2, '0');
      var yyyy = day.getFullYear();
      var formattedDay = yyyy + '/' + mm + '/' + dd;
      return formattedDay;
    }
    date = getToday();
  })

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

  it('should be able find all upcoming trips for the user', () => {
    let upcomingTrips1 = trip.getUpcomingTrips(userTripData1, date);
    expect(upcomingTrips1).to.be.an('array');
    expect(upcomingTrips1).to.deep.equal([
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
    ]);

    let upcomingTrips2 = trip.getUpcomingTrips(userTripData2, date);
    expect(upcomingTrips2).to.be.an('array');
    expect(upcomingTrips2).to.deep.equal([
      {
        id: 18,
        userID: 18,
        destinationID: 2,
        travelers: 2,
        date: '2022/09/25',
        duration: 17,
        status: 'approved',
        suggestedActivities: []
      }
    ]);
  });

  it('should be able to find all pending trips for the user', () => {
    let pendingTrips3 = trip.getPendingTrips(userTripData3, date);
    expect(pendingTrips3).to.be.an('array');
    expect(pendingTrips3).to.deep.equal([
      {
        id: 71,
        userID: 50,
        destinationID: 28,
        travelers: 1,
        date: '2020/05/26',
        duration: 11,
        status: 'pending',
        suggestedActivities: []
      }
    ]);

    let pendingTrips4 = trip.getPendingTrips(userTripData4, date);
    expect(pendingTrips4).to.be.an('array');
    expect(pendingTrips4).to.deep.equal([
      {
        id: 84,
        userID: 2,
        destinationID: 1,
        travelers: 1,
        date: '2020/11/23',
        duration: 19,
        status: 'pending',
        suggestedActivities: []
      }
    ]);
  });

  it('should take in a list of trip dates and return the trip start date if it finds a match within the duration of the trip', () => {
    let presentDateMatch = trip.findPresentTrips(presentTripData, date);
    expect(presentDateMatch).to.be.an('array');
    expect(presentDateMatch).to.deep.equal(["2022/06/07"])
  });

  it('should take in the start date of the present trip found, and return the information of that trip.', () => {
    let presentDateMatch = trip.findPresentTrips(presentTripData, date);
    let tripMatch = trip.returnPresentTrip(presentDateMatch);
    expect(tripMatch).to.be.an('array');
    expect(tripMatch).to.deep.equal([
      {
        id: 200,
        userID: 29,
        destinationID: 23,
        travelers: 6,
        date: '2022/06/07',
        duration: 30,
        status: 'approved',
        suggestedActivities: []
      }
    ]);
  });
});
