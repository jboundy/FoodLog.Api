const client = require('../database.js');
const path = require('path');
const redline = require('readline');
const fs = require('fs');
const Monet = require('monet');

/**
 * This function takes in an array of arguments. Validate that there is exactly one value or error out.
 * @param {Array<String>} argv - This should only be one value. 
 * @returns {string} the path name.
 */
function getFilename(argv) {
    if (argv.length != 1) {
        throw new Error("Expected syntax: load_redis.js <filename>.  Only one argument expected!");
    }

    return argv[0];
}
/**
 * Reads the lines from the path and removes return characters and new lines.
 * @param {string} path 
 * @returns {Array<String>} Each row of the csv file. 
 */
function readlines(path) {
    try {
        const data = fs.readFileSync(path, 'UTF-8');
        return data.split(/\r?\n/);
    } catch(err) {
        console.error(err);
        throw err;
    }
}


/**
 * Lightweight csv parser. Will return null if doesn't match this function
 * @param {String} line 
 * @returns {Array<String>} list of all the values in the field. 
 */
function parseCsv(line) {
    // TODO: THis doesn't work as intended. For example 100 g -> the 100 is stripped and only g remains.
    return line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
}

/**
 * Parse a line from the nutritions dataset. For each row, we need to discard the first column since it's just
 * the row number. The second column is the name of nutritional item. For example: Lebanon bologna
 * @param {Array<String>} valueArray 
 * @returns {{name, values}}
 */
function parseNutritionArray(valueArray) {
    valueArray.shift(); // Discarding the first row due to it being row number
    let name = valueArray.shift().replace(/['"]+/g, '');
    let values = valueArray.toString();

    return {
        name: name,
        values: values
    };
}

const data = Monet.Maybe.of(process.argv.slice(2))
    .map(getFilename)
    .map(readlines)
    .getOrElse([])
    .map(parseCsv)
    .filter(function(value) { return value != null; })
    .map(parseNutritionArray);

console.log(data.slice(0, 5));
    
client.quit();