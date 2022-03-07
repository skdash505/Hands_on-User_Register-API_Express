import { Express } from "express";
import log from "../../utils/log";

export default function (app: Express, port: number, host: string): boolean {
  try {
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
    log.info(`
    Env Port: ${process.env.PORT},\t
    Env Host: ${process.env.HOST}
    `);
    const setPort = process.env.PORT || port;
    const setHost = process.env.HOST || host;
    server.listen(setPort, setHost);
    // server.listen(port, host);

    server.on('error', onError);
    server.on('listening', onListening);

    log.info("Server is Up");
    return true;
  } catch (error) {
    log.error(`Unable to run the server at ${host}${port}`);
    return false;
  }


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

  function onError(error: any) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        log.error(bind + ' requires elevated privileges');
        process.exit(1);
        return false;
      case 'EADDRINUSE':
        log.error(bind + ' is already in use');
        process.exit(1);
        return false;
      default:
        throw error;
    }
  }

};