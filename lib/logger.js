import fs from 'fs';
import winston from 'winston';

const LOG_FOLDER = 'logs';

if (!fs.existsSync(LOG_FOLDER)) {
  fs.mkdirSync(LOG_FOLDER);
}

module.exports = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: `${LOG_FOLDER}/app.log`,
      maxsize: 1048576,
      colorize: false,
    }),
  ],
});
