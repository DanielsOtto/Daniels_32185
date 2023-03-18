// la biblioteca pino-pretty hace mas legible el mensaje, pero no usa JSON.
// configuracion obtenida en
// https://www.youtube.com/watch?v=2kKeQl_m8iY


import pino from 'pino';
import fs from 'fs'


const logToConsole = pino({
  level: 'debug',
  formatters: {
    level(label) {
      return { level: label };
    }
  },
  timestamp: () => {
    const date = new Date();
    return `[${date.toLocaleString()}]`;
  },
  messageKey: 'msg'
});

const logToFile = pino({
  level: 'debug',
  formatters: {
    level(label) {
      return { level: label };
    }
  },
  timestamp: () => {
    const date = new Date();
    return `[${date.toLocaleString()}]`;
  },
  messageKey: 'msg'
}, pino.destination('./logs/info.log'));

const warnToFile = pino({
  level: 'debug',
  formatters: {
    level(label) {
      return { level: label };
    }
  },
  timestamp: () => {
    const date = new Date();
    return `[${date.toLocaleString()}]`;
  },
  messageKey: 'msg'
}, pino.destination('./logs/warn.log'));

const errorToFile = pino({
  level: 'debug',
  formatters: {
    level(label) {
      return { level: label };
    }
  },
  timestamp: () => {
    const date = new Date();
    return `[${date.toLocaleString()}]`;
  },
  messageKey: 'msg'
}, pino.destination('./logs/error.log'));


export const logger = {
  info: (message) => {
    logToConsole.info(message);
    // logToFile.info(message);
  },
  warn: (message) => {
    logToConsole.warn(message);
    warnToFile.warn(message);
  },
  error: (message) => {
    // logToConsole.error(message);
    errorToFile.error(message);
  },
};



// import pino from 'pino';


// export const logger = pino({
//   level: 'debug',
//   formatters: {
//     level(label) {
//       return { level: label };
//     }
//   },
//   timestamp: () => {
//     const date = new Date();
//     return `[${date.toLocaleString()}]`;
//   },
//   messageKey: 'msg'
// }); //pino.destination('./loggers.log')




// export const logger = pino({
//   transport: pinoTee({
//     target: 'pino-pretty', // va a utilizar la biblioteca → pino-pretty
//     options: {
//       translateTime: 'SYS:dd-mm-yyyy H:MM:ss TT', //formatea el tiempo -- TT indica si es PM/AM
//       ignore: "pid,hostname" // va con , y no . - ignora el id de proceso
//     }
//   }, pino.destination('./loggers.log'))
// });



// SIN TRANSPORT -- MENSAJE SIN FORMATEO

// const customFormat = (obj) => {
//   const date = new Date(obj.time).toTimeString();
//   let formattedMessage = `${date} [${obj.level.label}] ${obj.msg}`;
//   for (const key in obj.fields) {
//     formattedMessage += `\n\t${key}: ${obj.fields[key]}`;
//   }
//   return formattedMessage;
// };


// export const logger = pino({
//   formatters: {
//     level: 'debug',
//     level(label, number) {
//       return { level: label, message: `[${label}]` };
//     },
//     prettyPrint: {
//       formatter: obj => {
//         return customFormat(obj);
//       }
//     }
//   }
// }, pino.destination('./loggers.log'));

