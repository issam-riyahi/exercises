const http = require("http");
const static = require("node-static");
const crypto = require("crypto");

const file = new static.Server("./");


const server = http.createServer((req, res) => {
   console.log(req)
   req.addListener("end", () => file.serve(req, res)).resume();
});

server.on("upgrade", (req, socket) => {
   // Make sure that we only handle WebSocket upgrade requests
   if (req.headers["upgrade"] !== "websocket") {
      socket.end("HTTP/1.1 400 Bad Request");
      return;
   }
   // More to come…
   const acceptKey = req.headers["sec-websocket-key"];

   const hash = generateAcceptValue(acceptKey);

   const responseHeaders = [
      "HTTP/1.1 101 Web Socket Protocol Handshake",
      "Upgrade: WebSocket",
      "Connection: Upgrade",
      `Sec-WebSocket-Accept: ${hash}`,
   ];

   const protocol = req.headers["sec-websocket-protocol"];
   // If provided, they'll be formatted as a comma-delimited string of protocol
   // names that the client supports; we'll need to parse the header value, if
   // provided, and see what options the client is offering:
   const protocols = !protocol ? [] : protocol.split(",").map((s) => s.trim());
   // To keep it simple, we'll just see if JSON was an option, and if so, include
   // it in the HTTP response:
   if (protocols.includes("json")) {
      // Tell the client that we agree to communicate with JSON data
      responseHeaders.push(`Sec-WebSocket-Protocol: json`);
   }

   socket.write(responseHeaders.join("\r\n") + "\r\n\r\n");
});

function generateAcceptValue(acceptKey) {
   return crypto
      .createHash("sha1")
      .update(acceptKey + "258EAFA5-E914–47DA-95CA-C5AB0DC85B11", "binary")
      .digest("base64");
}

const port = 3210;

server.listen(port, () =>
   console.log(`Server running at http://localhost:${port}`)
);
