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
export default Traveler;
