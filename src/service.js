require('es6-promise').polyfill();
import 'isomorphic-fetch';

const _ = require('lodash');


const fetchData = url => {
    return fetch(url)
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        });
};

const organizePetsByGenderAndType = (peoples, myInterestPet) => {
    //re-organize pets data close to end result structure
    //{Male:['name1','name2], Female:['name1','name2']
    let organizedPets = _.reduce(peoples, (result, people) => {
        _.filter(people.pets, pet => pet.type === myInterestPet).forEach(pet => {
            result[people.gender] = result[people.gender] || [];
            result[people.gender].push(pet.name);
        });
        return result;
    }, {});

    //order pets in male/female group
    _.forOwn(organizedPets, pets => {
        pets.sort((a, b) => a !== b ? a < b ? -1 : 1 : 0);
    });

    return organizedPets;

};

const printPets = pets => {
    let petsOutput = '';
    _.forOwn(pets, (value, key) => {
        petsOutput += `****    ${key}\n`;
        petsOutput += `****       ${value}\n`;
    });
    return petsOutput;
};

export {
    fetchData,
    organizePetsByGenderAndType,
    printPets
};


