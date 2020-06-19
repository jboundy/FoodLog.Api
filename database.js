const fs = require('fs');
const csv = require('csv-parser');  
const path = require('path');
const redis = require('redis');
const client = redis.createClient(7001,'localhost');;
//var Redis = require("ioredis");
//var redis = new Redis();



client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

function GetAll(){
    return client.get('0');
}

module.exports = client;