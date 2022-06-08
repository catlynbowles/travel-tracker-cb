class Destination {
  constructor(destinationData) {
    this.data = destinationData;
  }

  returnLocationName(data) {
    let locationNames = data.reduce((acc, cur) => {
      acc.push(cur.destination)
      return acc
    }, [])
    return locationNames
    // return this.name.split(" ")[0];
  }
}

export default Destination;
