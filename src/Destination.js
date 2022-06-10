class Destination {
  constructor(destinationData) {
    this.data = destinationData;
  }


  getCurrentYear() {
    var today = new Date();
    var yyyy = today.getFullYear();
    return yyyy;
  }

  calculateYearlyPrice() {
    let currentYear = this.getCurrentYear();
    // take in past trips, year?
    // year === 2022
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
