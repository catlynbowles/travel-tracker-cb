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
  // getCurrentDate() doesn't belong here.

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

findPresentTrips(tripArrs, today) {
    // var today = new Date();
    // var formattedToday = formatDate(today)
    let presentTripDate = tripArrs.reduce((acc, trip) => {
      if (trip.includes(today)) {
        acc = trip[0]
      }
      return acc
    }, '')
    if (presentTripDate) {
      console.log(presentTripDate)
    } else {
      console.log('nopresentTrips')
    }
    return presentTripDate;
  }

returnPresentTrip(tripStartDate, tripData) {
    let presentTrip = tripData.find(trip => {
      return tripData.date === tripStartDate
    })
    return [presentTrip]
  }

}


export default Trip;
