const net = require('net');
const fs = require('fs');
const shuffle = require('shuffle-array');
const port = 8124;

const string = 'QA'; //QA
const bad = 'DEC';
const good = 'ACK';

const client = new net.Socket();
let questions;
client.setEncoding('utf8');

client.connect({port: port, host: '127.0.0.1'}, () => {
    client.write(string);
});

client.on('data', (data) => {
    if (data === bad)
        client.destroy();
    if (data === good)
    {
        readJSON();
    }
});

client.on('close', function () {
    console.log('Connection closed');
});


function readJSON()
{
    fs.readFile("qa.json", (err, text) =>
    {
        if (!err)
        {
            questions = JSON.parse(text);
            shuffle(questions);
            client.write(questions[getRandomArbitrary(0, questions.length)]);
        }
        else console.error(err);
    });
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}