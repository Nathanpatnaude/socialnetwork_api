// add imports
const { Schema, model, Types } = require('mongoose');

// add userSchema
const userSchema = new Schema(
    { 
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "A valid email address is required!"
            ],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// add friendCount virtual
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

//define User model
const User = model('User', userSchema);

module.exports = User;