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
    saveBook: async (parent, { bookData }, context) => {
      if(context.user){
      const updateUser = User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: bookData } },
        { new: true }
      );
      return updateUser;
    }
  throw new AuthenticationError('you need to be logged in!');
  },
    removeBook: async (parent, { bookId }, context) => {
      if(context.user){
        const updateUser = User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: {bookId} } },
          { new: true }
        );
        return updateUser;
      }
    throw new AuthenticationError('you need to be logged in!');
  }},
};

module.exports = resolvers;
