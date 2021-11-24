const router = require('express').Router();
const {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser
} = require('../../controllers/user-controller');

router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/:id')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

router.route('/:userId/friends/:friendId')
  .post(createFriend)
  .put(removeFriend)

module.exports = router;