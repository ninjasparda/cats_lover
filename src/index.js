const service = require("./service");
const dataURL = 'http://agl-developer-test.azurewebsites.net/people.json';
const myInterestPet = 'Cat';

service.fetchData(dataURL).then(peoples => {
    let organizedPets = service.organizePetsByGenderAndType(peoples, myInterestPet);
    let petsOutput = service.printPets(organizedPets);
    console.log(petsOutput);
});