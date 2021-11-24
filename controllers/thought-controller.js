const { Thought, User } = require('../models');
const { format_date } = require('../utils/helpers');

const thoughtController = {
  // '/' methods
  getAllThoughts(req, res) {
    Thought.find({})
      .select('-__v')
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  async createThought({ body }, res) {
    const user = await User.findOne({ username: body.username });
    if (!user) {
      res.status(404).json({ message: 'No user found with this id!' });
      return; 
    }

    const thought = await Thought.create(body);
    User.findOneAndUpdate(
      { username: body.username },
      { $push: { thoughts: thought._id.toString() }},
      { new: true, runValidators: true }
    )
      .then(() => {
        const response = {
          ...thought._doc,
          createdAt: format_date(thought._doc.createdAt),
          userId: user._id.toString()
        };
        delete response.__v;
        delete response.reactions;
        res.json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // '/:id' methods
  getSingleThought({ params }, res) {
    Thought.findOne({ _id: params.id })
      .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({message: 'No thought found with this id!'});
          return;
        }

        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({message: 'No thought found with this id!'});
          return;
        }

        const response = {
          ...dbThoughtData._doc,
          createdAt: format_date(dbThoughtData._doc.createdAt),
        }
        delete response.__v;

        res.json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({message: 'No thought found with this id!'});
          return;
        }

        const response = {
          ...dbThoughtData._doc,
          createdAt: format_date(dbThoughtData._doc.createdAt),
        }
        delete response.__v;

        res.json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // '/api/thoughts/:thoughtId/reactions' methods
  async createReaction({ params, body }, res) {
    const user = await User.findOne({ username: body.username });
    if (!user) {
      res.status(400).json({message: 'No user found with this username!'});
      return;
    }

    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body }},
      { new: true, runValidators: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(400).json({message: 'No thought found with this id!'});
          return;
        }

        const response = {
          ...dbThoughtData._doc,
          createdAt: format_date(dbThoughtData._doc.createdAt),
        }
        delete response.__v;

        res.json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId},
      { $pull: { reactions: { reactionId: params.reactionsId } } },
      { new: true, runValidators: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(400).json({message: 'No thought found with this id!'});
          return;
        }

        const response = {
          ...dbThoughtData._doc,
          createdAt: format_date(dbThoughtData._doc.createdAt),
        }
        delete response.__v;

        res.json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
};

module.exports = thoughtController;