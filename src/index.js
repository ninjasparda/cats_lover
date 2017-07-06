const service = require("./service");

service.fetchData().then(function(people){
    var cats = service.organizeCatsByGender(people);
    var catsOutput = service.printCats(cats);
    console.log(catsOutput);
});