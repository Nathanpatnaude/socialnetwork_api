// imports mongoose methods & moment
const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// add thoughtSchema
const thoughtSchema = new Schema(
    { //definitions thoughtText, createdAt, username, reactions
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            mazlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a")

        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],

    },
    { //options
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);

// add reactionSchema
const reactionSchema = new Schema(
    { //definitions reactionId, reactionBody, username, createdAt
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,

        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a")

        },
    },
    { //options
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);

// add reactionCount virtual
thoughtSchema.virtual('reactionCount').get( () => {
    return this.reactions.length;
});

//define model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;