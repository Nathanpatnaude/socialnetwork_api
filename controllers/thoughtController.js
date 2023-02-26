//imports User + Thought
const { User, Thought } = require('../models');

module.exports = {
    //getAllThought
    getAllThought(req, res) {
        Thought.find({})
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    //getOneThought
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select("-__v")
            .then((thought) =>
                !thought
                    ? req.status(404).json({ message: 'No Thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    //createThought & findOneAndUpdate User & $push to User thoughts[]
    createThought(req, res) {
        Thought.create(req.body)
        .then(({ _id }) => {
            User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'No User with that ID' })
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    //updateThought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }            
        )
        .then((user) =>
        !user
        ? res.status(404).json({ message: "No Thought wih that ID"})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    //deleteThought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
        !thought
        ? resres.status(404).json({ message: "No Thought wih that ID"})
        : User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
        )
        )
        .then((user) =>
        !user
        ? res.json({ message: 'Thought Deleted'})
        : res.json({ message: `Thought Deleted from ${user.username}`})
        )
        .catch((err) => res.status(500).json(err));
    },

    //addReaction
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: "No Thought with that ID"})
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err)); 
    },

    //deleteReaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId }}},
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: "No Thought with that ID"})
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err)); 
    },
};

