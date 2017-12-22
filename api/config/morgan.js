const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');

const morgan = require('morgan');

/* eslint-disable no-sync */
const logDirectory = path.join(__dirname, '../log');
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

const accessLogStream = rfs('access.log', {
    interval: '1d',
    path: logDirectory,
});
const morganConfig = morgan('dev', { stream: accessLogStream });


module.exports = morganConfig;
