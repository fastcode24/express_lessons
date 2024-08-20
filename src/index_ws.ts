import WebSocket from 'ws';

const server = new WebSocket.Server({ port: 8000});

server.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('recieved:', message);
    server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
  ws.send('Welcome to the WebSocket server!');
});

console.log('WebSocket server is running on ws://localhost:8000');
