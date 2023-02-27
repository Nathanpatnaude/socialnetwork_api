//imports
const router = require('express').Router();
const {
    getAllThought,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

// api/thoughts
// GET / POST 
router.route('/')
.get(getAllThought)
.post(createThought);

// api/thoughts/:id 
// GET / PUT / DELETE
router.route('/:thoughtId')
.get(getOneThought)
.put(updateThought)
.delete(deleteThought);

// api/thoughts/:thoughtId/reactions/
// POST
router.route('/:thoughtId/reactions')
.post(addReaction);

// api/thoughts/:thoughtId/reactions/:reactionId
//  DELETE
router.route('/:thoughtId/reactions/reactionId')
.post(deleteReaction);

module.exports = router;