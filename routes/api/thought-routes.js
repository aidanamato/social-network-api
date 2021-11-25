const router = require('express').Router();
const {
  getAllThoughts,
  createThought,
  getSingleThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thought-controller');

router.route('/')
  .get(getAllThoughts)
  .post(createThought);

router.route('/:id')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router.route('/:thoughtId/reactions/')
  .post(createReaction)

router.route('/:thoughtId/reactions/:reactionsId')
  .delete(deleteReaction);

module.exports = router;