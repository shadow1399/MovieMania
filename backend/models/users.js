
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "FavoritesCollection"
    }],
    rated: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatedCollection"
        }
    ]
},
    {
        timestamps: true
    }
);

const userModel = mongoose.model("UserCollection", userSchema);
module.exports = userModel;