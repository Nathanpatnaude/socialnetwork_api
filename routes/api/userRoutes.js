//imports
const router = require('express').Router();
const {
    getAllUser,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

// /api/users 
// GET / POST
router.route('/')
.get(getAllUser)
.post(createUser);

//  /api/users/:id 
// GET / PUT / DELETE
router.route('/:userId')
.get(getOneUser)
.put(updateUser)
.delete(deleteUser);


// api/users/:userId/friends/:friendId
// POST / DELETE
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;