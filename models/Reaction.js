 const { Schema, Types } = require('mongoose');

 const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 100,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => createdAtVal.toISOString(),
    },
},
    {
        toJSON: {
            getters: true,
        },
        _id: false,
    });
 

 module.exports = ReactionSchema