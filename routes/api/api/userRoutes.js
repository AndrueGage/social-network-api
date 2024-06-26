const router = require('express').Router();
const {getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend,} = require('../../../controllers/userController');

// Routes for /api/users
router.route('/')
    .get(getAllUsers)
    .post(createUser);

// Routes for /api/users/:id
router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// Routes for /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;