class Trip {
  constructor(tripData) {
    this.data = tripData;
  }

  getUserTripData(id) {
    let userTripData = this.data.filter(trip => {
      return trip.userID === id
    })
    // console.log(userTripData)
    return userTripData
  }

  getCurrentDate() {
    var today = new Date();
    // console.log('today', today)
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '/' + mm + '/' + dd;
    // console.log(today)
    return today;
  }

  getPastTrips(userTripData, currentDate) {
    let pastTrips = userTripData.filter(trip => {
      return trip.date < currentDate
    });
    // console.log(pastTrips)
    return pastTrips;
  }

  getUpcomingTrips(userTripData, currentDate) {
    let upcomingTrips = userTripData.filter(trip => {
      return trip.date > currentDate
    });
    // console.log(upcomingTrips)
    return upcomingTrips;
  }

  getPendingTrips(userTripData, currentDate) {
    let pendingTrips = userTripData.filter(trip => {
      return trip.status === 'pending'
    });
    // console.log(pendingTrips)
    // also, should I sort these trips?
    return pendingTrips;
  }

  checkForPresentTrips(userTripData, currentDate) {

    // let endDate = currentDate.getDate() + duration
    // what qualifies a present trip?
    // tricky.
    // look at all the user trip data.
    // look at the date,
    // look at the duration
    // make an array of all those dates
    // if the current date is included
    // in that array,
    // then add that trip to the new array.
    // find ?

  }

}


export default Trip;
