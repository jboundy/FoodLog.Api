const fs = require('fs');
const csv = require('csv-parser');  
const path = require('path');
const redis = require('redis');
const client = redis.createClient(6379,'redis');;
//var Redis = require("ioredis");
//var redis = new Redis();

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
 });

 fs.createReadStream(path.join(__dirname, 'data/nutrition.csv'))  
    .pipe(csv())
    .on('data', (row) => {
        client.set('docid:', JSON.stringify(row));
    })
    .on('end', () => {
        client.end(false);
    }); 

function GetAll(){
    return client.get('0');
}

module.exports = client;