const mongoose = require('mongoose');
const dbHandler = require('./db-handler');
const municipalityController = require('../db/controllers/municipality.controller');
const municipalityModel = require('../db/models/municipality.model');

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

describe('Municipality ', () => {

    // Lägg till toThrow() kanske möjligtvis litegrann
    it('Can post municipality', async () => {
        expect(() => municipalityController.postMunicipality(municipality, res))
            .not
            .toThrow();
    });

    it('Can get municipalities', async () => {
        expect(() => municipalityController.getMunicipalities(municipality, res))
            .not
            .toThrow();
    });

    it('Can patch municipalities', async () => {
        expect(() => municipalityController.patchMunicipality(municipality, res))
            .not
            .toThrow();
    });

    it('Can delete municipalities', async () => {
        expect(() => municipalityController.deleteMunicipality(municipality, res))
            .not
            .toThrow();
    });
});

const municipality = {
    body: {id: mongoose.Types.ObjectId(), municipalityName: 'Bjur',
    schools: [] },
    params: {id: mongoose.Types.ObjectId()}
};
const res = {
    send(doc) {},
    sendStatus(statusNumber){}
}