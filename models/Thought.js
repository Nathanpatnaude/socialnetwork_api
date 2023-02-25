// imports mongoose methods & moment
const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// add thoughtSchema
const thoughtSchema = new Schema (
    { //definitions thoughtText, createdAt, username, reactions


    },
    { //options

    }
)

// add reactionSchema
const reactionSchema = new Schema (
    { //definitions reactionId, reactionBody, username, createdAt


    },
    { //options

    }
)

// add reactionCount virtual

//define model

module.exports = Thought;