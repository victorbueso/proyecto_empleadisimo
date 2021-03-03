const mongoose = require('mongoose');

let db = 'EmpleosDB';
let port = '27017';
let host = 'localhost';

class Database {
    constructor () {
            mongoose.connect(`mongodb://${host}:${port}/${db}`, {useNewUrlParser:true, useUnifiedTopology:true})
            .then(result => console.log(`Se conectó a MongoDB`))
            .catch(error => console.log(error));
        }
}

module.exports = new Database();