const { User, Thought } = require('../models');

const userController = {
  // '/' methods
  getAllUsers(req, res) {
    User.find({})
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
  },
  createUser({ body }, res) {
    User.create(body)
      .then(({ _id, username, email }) => res.json({ _id, username, email }))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // /:id methods
  getSingleUser({ params }, res) {
    User.findOne({ _id: params.id })
      .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;  
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;  
        }

        const { _id, username, email } = dbUserData;
        res.json({ _id, username, email });
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;  
        }

        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
}

module.exports = userController;