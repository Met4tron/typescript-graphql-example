import app from './app';
import db from './models/';
import * as Http from 'http';
import { normalizePort, onListening, onError } from './utils/utils';

const port = normalizePort(process.env.port || 3000);
const server = Http.createServer(app);

db.sequelize
  .sync()
  .then(() => {
    server.listen(port);
    server.on('error', onError(server));
    server.on('listening', onListening(server));
  })
  .then((err) => console.error(err));
