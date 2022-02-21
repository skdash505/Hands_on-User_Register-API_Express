import { Express } from "express";
import log from "../logger";

export default function (app: Express, port: number, host: string): boolean {

    
    // app.set('port', port);
    var debug = require('debug')('userregister:server');
    
    /**
     * Create HTTP server.
     */
    
    var http = require('http');
    var server = http.createServer(app);
    
    /**
     * Listen on provided port, on all network interfaces.
     */
    
    server.listen(port, host);

    let isServerRunning = null as unknown as boolean;
    isServerRunning = server.on('error', onError);
    isServerRunning = server.on('listening', onListening);

    return isServerRunning;
        
    /**
     * Event listener for HTTP server "listening" event.
     */
    
    function onListening() {
        var addr = server.address();
        var bind = typeof addr === 'string'
          ? 'pipe ' + addr
          : 'port ' + addr.port;
        debug('Listening on ' + bind);
        return true;
      }
    
      
    /**
     * Event listener for HTTP server "error" event.
     */
    
    function onError(error:any) {
      if (error.syscall !== 'listen') {
        throw error;
      }
    
      var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    
      // handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          console.error(bind + ' requires elevated privileges');
          process.exit(1);
          return false;
        case 'EADDRINUSE':
          console.error(bind + ' is already in use');
          process.exit(1);
          return false;
        default:
          throw error;
      }
    }
    

};