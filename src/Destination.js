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
  returnLocationName(idsArr) {
    let locationNames = idsArr.reduce((acc, id) => {
      this.data.forEach(destination => {
        if (destination.id === id) {
          acc.push(destination.destination)
        }
      })
      return acc
    }, [])
    return locationNames
  }
}

export default Destination;
