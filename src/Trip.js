class Trip {
  constructor(tripData) {
    this.data = tripData;
  }

  getUserTripData(id) {
    let userTripData = this.data.filter(trip => {
      return trip.userID === id
    })
    return userTripData
  }

  getPastTrips(userTripData, currentDate) {
    let pastTrips = userTripData.filter(trip => {
      return trip.date < currentDate
    });
    return pastTrips;
  }

  getUpcomingTrips(userTripData, currentDate) {
    let upcomingTrips = userTripData.filter(trip => {
      return trip.date > currentDate
    });
    return upcomingTrips;
  }

  getPendingTrips(userTripData, currentDate) {
    let pendingTrips = userTripData.reduce((acc, trip) => {
      if (trip.status === 'pending' && !acc.includes(trip)) {
        acc.push(trip)
      }
      return acc
    }, []);
    return pendingTrips;
  }

findPresentTrips(tripArrs, today) {
    let presentTripDate = tripArrs.reduce((acc, trip) => {
      if (trip.includes(today)) {
        acc.push(trip[0])
      }
      return acc
    }, []);
    return presentTripDate;
  }

returnPresentTrip(presentTripDateMatch, userID) {
    let presentTrips = this.data.reduce((acc, trip) => {
      presentTripDateMatch.forEach(date => {
        if (trip.date === date && trip.userID === userID && !acc.includes(trip)) {
          acc.push(trip)
        }
      })
      return acc
    }, []);
    return presentTrips;
  }
}


export default Trip;
