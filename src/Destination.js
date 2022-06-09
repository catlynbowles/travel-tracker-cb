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
  // what do I want in there?
  // what kind of data? could it be an object with three key values?
  // destination, date,and image?
  // returnLocationName(idsArr) {
  //   let locationNames = idsArr.reduce((acc, id) => {
  //     this.data.forEach(destination => {
  //       if (destination.id === id) {
  //         acc.push(destination.destination)
  //       }
  //     })
  //     return acc
  //   }, [])
  //   return locationNames
  // }

  // returnLocationName(destArr, tripsArr) {
  //   let tripsObj = tripsArr.reduce((acc, trip) => {
  //     let destGuys = destArr.forEach(destination => {
  //       console.log('dest', destination)
  //     })
  //     console.log('trip', trip)
  //     return acc
  //   }, [])
  //   return tripsObj
  // }

  returnLocationProperties(destArr, tripsArr) {
    let locationProperties = tripsArr.reduce((acc, trip) => {
      let destProperties = destArr.forEach(destination => {
        if (trip.destinationID === destination.id) {
          acc.push({location: destination.destination, date: trip.date, img: destination.image, alt: destination.alt})
        }
      })
        // console.log('dest', destination)
      // console.log('trip', trip)
      return acc
    }, []);
    // console.log(locationProperties);
    return locationProperties;
  }
}

export default Destination;
