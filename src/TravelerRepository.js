import Traveler from '../src/Traveler'

class TravelerRepository {
  constructor(travelerData) {
    this.data = travelerData;
  }

  getDataById(id) {
    const singleTraveler = this.data.find(traveler => traveler.id === id);
    const traveler = new Traveler(singleTraveler);
    return traveler;
  }
}

export default TravelerRepository;
