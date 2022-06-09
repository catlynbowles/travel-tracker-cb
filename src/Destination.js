class Destination {
  constructor(destinationData) {
    this.data = destinationData;
  }

  // returnLocationName(data) {
  //   let locationNames = data.reduce((acc, cur) => {
  //     acc.push(cur.destination)
  //     return acc
  //   }, [])
  //   return locationNames
  //   // return this.name.split(" ")[0];
  // }

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
