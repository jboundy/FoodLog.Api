
const client = require('../database.js');
const path = require('path');
const redline = require('readline');
const fs = require('fs');


function filename(argv) {
    if (argv.length != 1) {
        throw "filename to data is required!";
    }

    return argv[0];
}

function readlines(path) {
    try {
        const data = fs.readFileSync(path, 'UTF-8');
        return data.split(/\r?\n/);
    } catch(err) {
        console.error(err);
        throw err;
    }
}


let dataFile = filename(process.argv.slice(2))
const data = readlines(dataFile);


console.log(dataFile);
console.log("Data file number of lines: " + data.length);
console.log(data[0]);

client.quit();