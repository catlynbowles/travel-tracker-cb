import { expect } from 'chai';
import TravelerRepository from '../src/TravelerRepository'
import Traveler from '../src/Traveler';

describe('Traveler Repository', () => {
  let singleTraveler
  let traveler;
  let travelerRepo
  let travelerData;

  beforeEach(() => {
    travelerData = [{
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
    travelerRepo = new TravelerRepository(travelerData);
    traveler = new Traveler(singleTraveler)
  });

  it('should be a function', function () {
    expect(TravelerRepository).to.be.a('function');
  });

  it('should be an instance of Traveler Repository', () => {
    expect(travelerData).to.be.an('array');
    expect(travelerRepo).to.be.an.instanceof(TravelerRepository);
  });

  it('should be able to take in traveler data', () => {
    expect(travelerRepo.data).to.be.an('array');
    expect(travelerRepo.data).to.deep.equal(travelerData);
  });

  it('should be able to create a new traveler instance', () => {
    expect(traveler).to.be.an.instanceof(Traveler);
    expect(travelerRepo.getDataById(22)).to.deep.equal(traveler);
  });
});
