import { expect } from 'chai';
import Traveler from '../src/Traveler';

describe('Traveler', () => {
  let traveler1, traveler2, traveler3;
  let travelerData1, travelerData2, travelerData3;

  beforeEach(() => {
    travelerData1 = {
      "id": 45,
      "name": "Ofilia Titman",
      "travelerType": "thrill-seeker"
    };
    travelerData2 = {
      "id": 40,
      "name": "Melisent Pavolini",
      "travelerType": "photographer"
    };
    travelerData3 = {
      "id": 22,
      "name": "Gus Courtenay",
      "travelerType": "foodie"
    };
    traveler1 = new Traveler(travelerData1);
    traveler2 = new Traveler(travelerData2);
    traveler3 = new Traveler(travelerData3);
  });

  it('should be a function', function () {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of Traveler', () => {
    expect(travelerData1).to.be.an('object');
    expect(traveler1).to.be.an.instanceof(Traveler);
    expect(traveler2).to.be.an.instanceof(Traveler);
    expect(traveler3).to.be.an.instanceof(Traveler);
  });

  it('should be able to return traveler\'s first name', function () {
    expect(traveler1.returnFirstName()).to.equal('Ofilia');
    expect(traveler2.returnFirstName()).to.equal('Melisent');
    expect(traveler3.returnFirstName()).to.equal('Gus');
  });

  it('should be able to store a traveler\'s id', () => {
    expect(traveler1.id).to.be.a('number');
    expect(traveler1.id).to.equal(45);

    expect(traveler2.id).to.be.a('number');
    expect(traveler2.id).to.equal(40);

    expect(traveler3.id).to.be.a('number');
    expect(traveler3.id).to.equal(22);
  });

  it('should be able to store a traveler\'s name', () => {
    expect(traveler1.name).to.be.a('string');
    expect(traveler1.name).to.equal('Ofilia Titman');

    expect(traveler2.name).to.be.a('string');
    expect(traveler2.name).to.equal('Melisent Pavolini');

    expect(traveler3.name).to.be.a('string');
    expect(traveler3.name).to.equal('Gus Courtenay');
  });

  it('should be able to store a traveler\'s type', () => {
    expect(traveler1.travelerType).to.be.a('string');
    expect(traveler1.travelerType).to.equal('thrill-seeker');

    expect(traveler2.travelerType).to.be.a('string');
    expect(traveler2.travelerType).to.equal('photographer');

    expect(traveler3.travelerType).to.be.a('string');
    expect(traveler3.travelerType).to.equal('foodie');
  });
});
