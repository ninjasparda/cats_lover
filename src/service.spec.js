const service = require("./service");
const people = require("./data").people;
const fetchMock = require('fetch-mock');

describe("organizeCatsByGender()", () => {
    it("should organize sorted Cats by their owner's gender", () => {
        let organizedCats = service.organizeCatsByGender(people);
        expect(organizedCats).toEqual({
            Male: ['Garfield', 'Jim', 'Max', 'Tom'],
            Female: ['Garfield', 'Simba', 'Tabby']
        });
    });
});

describe("printCats()", () => {
    it("should generate the output for cat lists",  () => {
        let organizedCats = service.organizeCatsByGender(people);
        let catsOutput = service.printCats(organizedCats);
        expect(catsOutput).toEqual(
            '****    Male\n****       Garfield,Jim,Max,Tom\n****    Female\n****       Garfield,Simba,Tabby\n');
    });
});

describe("fetchData()", function () {
    it("should call fetch api and get people data", done =>{
        fetchMock.get('*', people);
        service.fetchData()
            .then(data => {
                expect(data).toEqual(people);
                expect(fetchMock.called()).toBe(true);
                done();
            });
    });
});