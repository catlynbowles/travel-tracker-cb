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

returnPresentTrip(tripStartDates) {
    let presentTrips = this.data.reduce((acc, trip) => {
      tripStartDates.forEach(date => {
        if (trip.date === date && !acc.includes(trip)) {
          acc.push(trip)
        }
      })
      return acc
    }, [])
    console.log('there is one!', presentTrips)
    return presentTrips
  }
}


export default Trip;
