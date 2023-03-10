//imports User + Thought
const { User, Thought } = require('../models');

module.exports = {
    //getAllUser
    getAllUser(req, res) {
        User.find({})
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    //getOneUser
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate("thoughts")
            .populate("friends")
            .select("-__v")
            .then((user) =>
                !user
                    ? req.status(404).json({ message: 'No User with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    //createUser
     createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    //updateUser
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No User wih that ID" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    //deleteUser
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No User with that ID" })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: "User Deleted" }))
            .catch((err) => res.status(500).json(err));
    },

    //addFriend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with that ID" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    //deleteFriend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No User with that ID" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
}