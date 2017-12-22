const spdy = require('spdy');
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const config = require('./config/settings');
const morganConfig = require('./config/morgan');
const logger = require('./utils/logger');

require('./config/passport')(passport);
require('./config/database')(mongoose, config);

const app = express();

app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morganConfig);
app.use(cors());
app.use(passport.initialize());

const port = process.env.PORT || 3001;

const options = {
    key: fs.readFileSync(path.join(__dirname, '../crt/server.key')), // eslint-disable-line no-sync
    cert: fs.readFileSync(path.join(__dirname, '../crt/server.crt')), // eslint-disable-line no-sync
};

const v1Api = require('./v1');
app.use('/v1', v1Api);

spdy
    .createServer(options, app)
    .listen(port, (error) => {
        if (error) {
            logger.error('API not starter', error);
            return process.exit(1);
        }
        logger.info(`Image Storage API is running on ${port}`);
    });
