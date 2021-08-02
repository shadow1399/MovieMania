const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rateSchema = new Schema({
    movieId: {
        type: String
    },
    rating: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserCollection"
    }
});

const rateModel = mongoose.model("RatedCollection", rateSchema);

module.exports = rateModel;