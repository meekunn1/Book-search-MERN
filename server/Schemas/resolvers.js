const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const loginError = new AuthenticationError(
  "email does not exist or password does not match"
);

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      return User.find({ _id: context.user._id });
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw loginError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw loginError;
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { userId, body }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { saveBooks: body } },
        { new: true, runValidators: true }
      );
    },
    removeBook: async (parent, { userId, bookId }) => {
      return User.findOneAndDelete(
        { _id: userId },
        { $pull: { saveBooks: { _id: bookId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers