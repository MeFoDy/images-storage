const init = (mongoose, config) => {
    const db = mongoose.connection;
    mongoose.Promise = Promise;

    mongoose.connect(config.database, {
        useMongoClient: true,
        promiseLibrary: global.Promise,
    });

    db.on('error', error => console.error(`Connection to ImageStorage database failed: ${error}`));

    db.on('connected', () => console.log('Connected to ImageStorage database'));

    db.on('disconnected', () => console.log('Disconnected from ImageStorage database'));

    process.on('SIGINT', () => {
        db.close(() => {
            console.log('ImageStorage terminated, connection closed');
            process.exit(0);
        });
    });
};

module.exports = init;
