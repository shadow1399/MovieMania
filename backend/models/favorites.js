const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    movieId: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserCollection"
    }
})

const favoriteModel = mongoose.model("FavoritesCollection", favoriteSchema);
module.exports = favoriteModel;