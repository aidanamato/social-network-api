const { Thought, User } = require('../models');

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
          ...thought._doc
        };
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