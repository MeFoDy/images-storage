const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

const ImageModel = mongoose.model('Image', ImageSchema);

module.exports = {
    model: ImageModel,
    schema: ImageSchema,
};
