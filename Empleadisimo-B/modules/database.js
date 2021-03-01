const mongoose = require('mongoose');

let db = 'EmpleodDB';
let port = '27017';
let host = 'localhost';

class Database {
    constructor () {
            mongoose.connect(`mongodb://${host}:${port}/${db}`)
            .then(result => console.log(`Se conectó a MongoDB`))
            .catch(error => console.log(error));
        }


}

module.exports = new Database();