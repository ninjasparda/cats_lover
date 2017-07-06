require('es6-promise').polyfill();
import 'isomorphic-fetch';

const _ = require('lodash');
const dataURL = 'http://agl-developer-test.azurewebsites.net/people.json';
const myInterestPet = 'Cat';

const fetchData = () => {
    return fetch(dataURL)
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        });
};

const organizeCatsByGender = (cats) => {
    //re-organize cats data close to end result structure
    //{Male:['name1','name2], Female:['name1','name2']
    let organizedCats = _.reduce(cats, (result, cat) => {
        _.filter(cat.pets, pet => pet.type === myInterestPet).forEach(pet => {
            result[cat.gender] = result[cat.gender] || [];
            result[cat.gender].push(pet.name);
        });
        return result;
    }, {});

    //order cats in male/female group
    _.forOwn(organizedCats, (cats) => {
        cats.sort((a, b) => a !== b ? a < b ? -1 : 1 : 0);
    });

    return organizedCats;

};

const printCats = cats => {
    let catsOutput = '';
    _.forOwn(cats, (value, key) => {
        catsOutput += `****    ${key}\n`;
        catsOutput += `****       ${value}\n`;
    });
    return catsOutput;
};

export {
    fetchData,
    organizeCatsByGender,
    printCats
};


