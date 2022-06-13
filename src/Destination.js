class Destination {
  constructor(destinationData) {
    this.data = destinationData;
  }

  returnDestinationNames(allTrips) {
    let destinationNames = allTrips.reduce((acc, trip) => {
      let namesByID = this.data.forEach(destination => {
        if (trip.destinationID === destination.id) {
          acc.push(destination.destination)
        }
      })
      return acc
    }, []);
    console.log(destinationNames)
    return destinationNames;
  }

  calculateTripExpense(duration, numTravelers, destId) {
      let userTrip = this.data.filter(destination => destination.id === destId);
        let tripExpense = userTrip.reduce((acc, destination) => {
          acc += destination.estimatedLodgingCostPerDay * duration;
          acc += destination.estimatedFlightCostPerPerson * numTravelers;
          return acc
        }, 0);
    let travelAgentFee = tripExpense * .10
    return tripExpense + travelAgentFee
  }

  getCurrentYear() {
    var today = new Date();
    var yyyy = today.getFullYear();
    return yyyy;
  }

  calculateYearlyTravelExpenses(userTrips) {
    let currentYear = this.getCurrentYear();
    let yearlyTravelExpense = userTrips.reduce((acc, trip) => {
      let destinations = this.data.forEach(destination => {
        if (trip.destinationID === destination.id && trip.date.includes(currentYear)) {
          acc += destination.estimatedLodgingCostPerDay * trip.duration;
          acc += destination.estimatedFlightCostPerPerson * trip.travelers;
        }
      });
      return acc
    }, 0);
    let travelAgentFee = yearlyTravelExpense * .10
    return yearlyTravelExpense + travelAgentFee
  }

  findDestinationByName(name) {
    let travelerDestination = this.data.find(destination => {
      return destination.destination === name
    });
    return travelerDestination.id;
  }

  returnLocationProperties(tripsArr) {
    let locationProperties = tripsArr.reduce((acc, trip) => {
      let destProperties = this.data.forEach(destination => {
        if (trip.destinationID === destination.id) {
          acc.push({location: destination.destination, date: trip.date, img: destination.image, alt: destination.alt, duration: trip.duration
          })
        }
      })
      return acc
    }, []);
    return locationProperties;
  }
}

export default Destination;
