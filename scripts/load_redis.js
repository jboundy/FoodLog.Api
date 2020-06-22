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
 * @param {String} line line of column names separated by commas. The first value is always empty and second is always name.
 * @returns {Array<String>} column names
 */
function parseHeader(line) {
    const values = line.split(",");
    values.shift(); // Remove the row number

    return values;
}

/**
 * Lightweight csv parser. Will return null if doesn't match this function
 * The first column is always the row number. We can discard this number.
 * The second column is always the name of the item of interest. This column may contain a comma in a quoted string. 
 * The rest of the column are data columns. 
 * 
 * @param {String} line 
 * @param {Array<String>}
 * @param {Int16} size of header
 * @returns {Array<String>} list of all the values in the field. 
 */
function parseNutritionCsv(line, columnNames, dataColumnWidth) {
    const split = line.split(",");
    const columnStartValue = split.length - dataColumnWidth; // Find the optimal start column . 
    const columnDatas = split.slice(columnStartValue, split.length);

    const dataDict = Object.assign({}, ...columnNames.map((name, idx) => ({[name]: columnDatas[idx]}) ));
    
    return dataDict;
}

/**
 * 
 * @param {Array<String>} args list of command line args. This will run the comands in the correct sequence to parse the data correctly. 
 * @returns {Map} data is a key value map of nutrition data.
 */
function createDataFromArgs(args) {
    const values = Monet.Maybe.of(args)
        .map(getFilename)
        .map(readlines)
        .getOrElse([])

    const headerColumnNames = values.shift();
    const dataColumnWidth = headerColumnNames.split(",").length - 1; // Subtract for row number and the name field.
    const columnNames = parseHeader(headerColumnNames);

    return values.map(value => parseNutritionCsv(value, columnNames, dataColumnWidth));
}

const data = createDataFromArgs(process.argv.slice(2));

console.log(data.slice(0, 5));

client.quit();