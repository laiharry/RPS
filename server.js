const WebSocket = require('ws');
const http = require('http');
const url = require('url');

/*
const hserver = http.createServer({
});
*/

const hserver = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World!');
  res.end();
}).listen(8080);

//const server = new WebSocket.Server({server : hserver, port: 8080 });
//const server = new WebSocket.Server({server : hserver, port: 8000 });

const server = new WebSocket.Server({ noServer: true });
const server2 = new WebSocket.Server({ noServer: true });

server.on('open', function open() {
  console.log('connected');
});

server.on('close', function close() {
  console.log('disconnected');
});

server.on('connection', function connection(ws, req) {
  const ip = req.connection.remoteAddress;
  const port = req.connection.remotePort;
  const clientName = ip + port;

  console.log('%s is connected', clientName)

  // 发送欢迎信息给客户端
  ws.send("Welcome " + clientName);

  ws.on('message', function incoming(message) {
    console.log('received: %s from %s', message, clientName);
    
    // 广播消息给所有客户端
    server.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send( clientName + " -> " + message);
      }
    });

  });

});


hserver.on('upgrade', function upgrade(request, socket, head) {
  const pathname = url.parse(request.url).pathname;
 
  if (pathname === '/ws') {
    server.handleUpgrade(request, socket, head, function done(ws) {
      server.emit('connection', ws, request);
    });
  } else if (pathname === '/bar') {
    server2.handleUpgrade(request, socket, head, function done(ws) {
      server2.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

/*
hserver.listen(8080);
*/

console.log(process.env)
console.log(server);
