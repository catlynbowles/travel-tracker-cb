class Destination {
  constructor(destinationData) {
    this.data = destinationData;
  }


  getCurrentYear() {
    var today = new Date();
    var yyyy = today.getFullYear();
    return yyyy;
  }

  calculateYearlyTravelExpenses(pastTrips) {
    let currentYear = this.getCurrentYear();
    let yearlyTravelExpense = pastTrips.reduce((acc, trip) => {
      let destinations = this.data.forEach(destination => {
        if (trip.destinationID === destination.id && trip.date.includes(currentYear)) {
          acc += destination.estimatedLodgingCostPerDay * trip.duration;
          acc += destination.estimatedFlightCostPerPerson * trip.travelers;
        }
      });
      return acc
    }, 0);
    return yearlyTravelExpense;
  }

  returnLocationProperties(tripsArr) {
    let locationProperties = tripsArr.reduce((acc, trip) => {
      let destProperties = this.data.forEach(destination => {
        if (trip.destinationID === destination.id) {
          acc.push({location: destination.destination, date: trip.date, img: destination.image, alt: destination.alt})
        }
      })
      return acc
    }, []);
    return locationProperties;
  }
}

export default Destination;
