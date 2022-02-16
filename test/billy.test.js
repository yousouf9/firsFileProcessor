const app = require("../app")
const supertest = require("supertest")
const request = supertest(app)
const {getVAT, getMinutes, convertToNaira} = require("../billyronks/helper");

describe('test billyronks helper function', () => {

    const seconds = '60';
    const kobo    = 100;
    let amountInNaira;

    it('it should resturn  minutes', () => {
       const minutes = getMinutes(seconds);
       expect(minutes).toBe(1); 
    });
    it('it should return naira', () => {
        const naira = convertToNaira(kobo);
        amountInNaira = naira;
        expect(naira).toBe(1);
    });
    it('it should return vat', () => {
        const vat = getVAT(amountInNaira);
        expect(vat).toBe(0.075);
    });
});