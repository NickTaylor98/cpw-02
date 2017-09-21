const net = require('net');
const port = 8124;
const clientString = 'QA';
const good = 'ACK';
const bad = 'DEC';
let seed = 0;

const server = net.createServer((client) => {
    console.log('Client connected');
    client.setEncoding('utf8');

    client.on('data', (data, err) =>
    {
        if (!err)
            client.id = Date.now() + seed++;
        console.log(client.id);
        client.write(data === clientString ? good : bad);
    });
    client.on('end', () => console.log('Client disconnected'));
});
server.listen(port, () => {
    console.log(`Server listening on localhost: ${port}`);
});