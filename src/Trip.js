class Trip {
  constructor(tripData) {
    this.data = tripData;
  }

  getUserTripData(id) {
    let userTripData = this.data.filter(trip => {
      return trip.userID === id
    })
    console.log(userTripData)
    return userTripData
  }
}

export default Trip;
