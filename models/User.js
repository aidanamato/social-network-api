const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+@.+\..+/, 'Must use a valid email address']
    },
    thoughts: {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    },
    friends: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

userSchema.virtual('friendCount').get(function() {
  if (this.friends) {
    return this.friends.length;
  }
  return 0;
});

const User = model('User', userSchema);
module.exports = User;