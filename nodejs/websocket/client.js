console.log("WebSocket");


const socket = new WebSocket('ws://localhost:3210/' , ['json', 'xml']);

socket.addEventListener('open', () => {
   // Send a message to the WebSocket server
   socket.send('Hello!');
 });