const fs = require('fs');
const csv = require('csv-parser');  
const redis = require('redis');
const client = redis.createClient();

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
 });

 fs.createReadStream('\\data\\nutrition.csv')  
    .pipe(csv())
    .on('data', (row) => {
        //do redis stuff here
    })
    .on('end', () => {
        //close the stream
    }); 

module.exports = client;