import app from './app';
import log from '../utils/log';


const server = new app().startServer()
  .then(port => log.info(`Server running on port ${port}`))
  .catch(error => {
    console.log(error)
    process.exit(1);
  });

export default server;
