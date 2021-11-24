const router = require('express').Router();
const {
  getAllUsers,
  createUser,
  deleteAllUsers,
  getSingleUser
} = require('../../controllers/user-controller');

router.route('/')
  .get(getAllUsers)
  .post(createUser)
  .delete(deleteAllUsers);

router.route('/:id')
  .get(getSingleUser);

module.exports = router;