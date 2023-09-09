const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const loginError = new AuthenticationError(
  "email does not exist or password does not match"
);

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id });

        return userData;
      }

      throw new AuthenticationError('Not logged in');
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
    saveBook: async (parent, { body }, context) => {
      return User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { saveBooks: body } },
        { new: true }
      );
    },
    removeBook: async (parent, { bookId }, context) => {
      return User.findOneAndDelete(
        { _id: context.user._id },
        { $pull: { saveBooks: { bookId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
