class Traveler{
  constructor(travelerData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
  }

  returnFirstName() {
    return this.name.split(" ")[0];
  }
  
}
// what is this class going to take in?
// will it be similar to user?
// will it have each individual property?
// or will it just take in data?
export default Traveler;
