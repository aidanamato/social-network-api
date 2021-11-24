const { User, Thought } = require('../models');

const userController = {
  // '/' methods
  getAllUsers(req, res) {
    User.find({})
      .populate({ path: 'thoughts', select: '-__v'})
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

  // '/:id' methods
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
  async deleteUser({ params }, res) {
    const user = await User.findOne({ _id: params.id });
    if (!user) {
      res.status(404).json({ message: 'No user found with this id!' });
      return; 
    }
    const deletedThoughts = await Thought.deleteMany({ username: user.username });
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        
        const response = {
          thoughts: deletedThoughts,
          user: {
            _id: dbUserData._id.toString(),
            username: dbUserData.username,
            email: dbUserData.email
          }
        }

        res.json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // '/:userId/friends/:friendId' methods
  async addFriend({ params }, res) {
    const friendOne = await User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    );
    if (!friendOne) {
      res.status(404).json({ message: `No friend found with an id of ${params.userId}`});
      return;  
    }
    
    const { 
      _id: friendOneId, 
      username: friendOneUsername, 
      email: friendOneEmail,
      friends: friendOneFriends
    } = friendOne;

    const friendTwo = await User.findOneAndUpdate(
      { _id: params.friendId },
      { $addToSet: { friends: params.userId } },
      { new: true, runValidators: true }
    );
    if (!friendTwo) {
      res.status(404).json({ message: `No friend found with an id of ${params.friendId}`});
      return;
    }

    const { 
      _id: friendTwoId, 
      username: friendTwoUsername, 
      email: friendTwoEmail,
      friends: friendTwoFriends
    } = friendTwo;
    
    const response = { 
      friendOne: {
        _id: friendOneId,
        username: friendOneUsername,
        email: friendOneEmail,
        friends: friendOneFriends
      }, 
      friendTwo: {
        _id :friendTwoId,
        username: friendTwoUsername,
        email: friendTwoEmail,
        friends: friendTwoFriends
      }
    }
    res.json(response);
  },
  async deleteFriend({ params }, res) {
    const friendOne = await User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true, runValidators: true }
    );
    if (!friendOne) {
      res.status(404).json({ message: `No friend found with an id of ${params.userId}`});
      return;  
    }
    
    const { 
      _id: friendOneId, 
      username: friendOneUsername, 
      email: friendOneEmail
    } = friendOne;

    const friendTwo = await User.findOneAndUpdate(
      { _id: params.friendId },
      { $pull: { friends: params.friendId } },
      { new: true, runValidators: true }
    );
    if (!friendTwo) {
      res.status(404).json({ message: `No friend found with an id of ${params.friendId}`});
      return;
    }

    const { 
      _id: friendTwoId, 
      username: friendTwoUsername, 
      email: friendTwoEmail
    } = friendTwo;

    const response = { 
      friendOne: {
        _id: friendOneId,
        username: friendOneUsername,
        password: friendOneEmail
      }, 
      friendTwo: {
        _id :friendTwoId,
        username: friendTwoUsername,
        password: friendTwoEmail
      }
    }
    res.json(response);
  }
}

module.exports = userController;