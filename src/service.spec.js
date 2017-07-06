const service = require("./service");
const peoples = require("./data").peoples;
const fetchMock = require('fetch-mock');

describe("organizePetsByGenderAndType()", () => {
    it("should organize sorted pets by their owner's gender", () => {
        let testPet = 'Cat';
        let organizedPets = service.organizePetsByGenderAndType(peoples, testPet);
        expect(organizedPets).toEqual({
            Male: ['Garfield', 'Jim', 'Max', 'Tom'],
            Female: ['Garfield', 'Simba', 'Tabby']
        });
    });
});

describe("printPets()", () => {
    it("should generate the output for pet lists", () => {
        let organizedPets = {
            Male: ['Garfield', 'Jim', 'Max', 'Tom'],
            Female: ['Garfield', 'Simba', 'Tabby']
        };
        let petsOutput = service.printPets(organizedPets);
        expect(petsOutput).toEqual(
            '****    Male\n****       Garfield,Jim,Max,Tom\n****    Female\n****       Garfield,Simba,Tabby\n');
    });
});

describe("fetchData()", function () {
    it("should call fetch api and get data", done => {
        fetchMock.get('*', peoples);
        service.fetchData()
            .then(data => {
                expect(data).toEqual(peoples);
                expect(fetchMock.called()).toBe(true);
                done();
            });
    });
});