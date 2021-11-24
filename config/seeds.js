const faker = require('faker');

const db = require('../config/connection');
const { Thought, User } = require('../models');

db.once('open', async () => {
  await Thought.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 25; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);

    userData.push({ username, email });
  }

  await User.collection.insertMany(userData);
  
  const users = await User.find({});

  // create friends
  for (let i = 0; i < 50; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * users.length);
    const userId = users[randomUserIndex]._id.toString();

    let friendId = userId;

    while (friendId === userId) {
      const randomUserIndex = Math.floor(Math.random() * users.length);
      friendId = users[randomUserIndex]._id.toString();
    }

    await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
  }

  // create thoughts
  let createdThoughts = [];
  for (let i = 0; i < 50; i += 1) {
    const thoughtText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * users.length);
    const { username } = users[randomUserIndex];
    const userId = users[randomUserIndex]._id.toString();

    const createdThought = await Thought.create({ thoughtText, username });

    await User.updateOne(
      { _id: userId },
      { $push: { thoughts: createdThought._id } }
    );

    createdThoughts.push(createdThought);
  }

  console.log('createdThoughts:', createdThoughts);
  
  console.log('all done!');
  process.exit(0);
});