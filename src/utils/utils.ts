import { Server } from 'http';
import * as Chalk from 'chalk';

export const normalizePort = (val: number | string): number | string | boolean => {
  let port: number = (typeof val === 'string') ? parseInt(val) : val;
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else return false;
}

const chalkMessage = (message: string, color: string) => {
  return console.log(Chalk.default[color](message));
}

export const onError = (server: Server) => {
  return (error: NodeJS.ErrnoException): void => {
    let port: number | string = server.address().port;
    if (error.syscall !== 'listen') { 
      throw error;
    }
    let bind = (typeof port === 'string') ? `pipe ${port}` : `port: ${port}`;

    switch (error.code) {
      case 'EACCES':
        chalkMessage(`${bind} requires elevated privileges`, 'red');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        chalkMessage(`${bind} is already in use`, 'red');
        process.exit(1);
        break;
      default:
        throw error;
    } 
  }
}

export const onListening = (server: Server) =>  {
  return (): void => {
    let addr = server.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`
    chalkMessage(`Listening at ${bind}`, 'cyan');
  }
}