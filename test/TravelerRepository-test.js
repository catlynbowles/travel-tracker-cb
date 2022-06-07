import { expect } from 'chai';
import TravelerRepository from '../src/TravelerRepository'
import Traveler from '../src/Traveler';

describe('Traveler', () => {
  let singleTraveler
  let traveler;
  let travelerRepo
  let travelersData;

  beforeEach(() => {
    travelersData = [{
      "id": 45,
      "name": "Ofilia Titman",
      "travelerType": "thrill-seeker"
    },
    {
      "id": 40,
      "name": "Melisent Pavolini",
      "travelerType": "photographer"
    },
    {
      "id": 22,
      "name": "Gus Courtenay",
      "travelerType": "foodie"
    }];
    singleTraveler = {
      "id": 22,
      "name": "Gus Courtenay",
      "travelerType": "foodie"
    };
    travelerRepo = new TravelerRepository(travelersData);
    traveler = new Traveler(singleTraveler)
  });

  it('should be a function', function () {
    expect(TravelerRepository).to.be.a('function');
  });

  it('should be an instance of Traveler Repository', () => {
    expect(travelersData).to.be.an('array');
    expect(travelerRepo).to.be.an.instanceof(TravelerRepository);
  });

  it('should be able to take in traveler data', () => {
    expect(travelerRepo.data).to.be.an('array');
    expect(travelerRepo.data).to.deep.equal(travelersData);
  });

  it('should be able to create a new user instance', () => {
    expect(traveler).to.be.an.instanceof(Traveler);
    expect(travelerRepo.getDataById(22)).to.deep.equal(traveler);
  });
});
