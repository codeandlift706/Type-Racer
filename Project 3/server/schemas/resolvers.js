const { User, Score, Prompt } = require('../models');
const { AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => { // do we still need? this or query scores can be for scoreboard?
            return User.find().populate('scores');
        },

        user: async (parent, { username }) => { 
            return User.findOne({ username }).populate('scores');
        },

        scores: async (parent, { userId }) => { //REVIEW!!!
            const params = userId ? { userId } : {};
            return Score.find(params).sort({ createdAt: -1 }); //latest score first
        },
        prompts: async () => {
            return Prompt.find();
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('scores');
            }
            throw AuthenticationError;
        },
    },

    Mutation: {
        addUser: async (parent, { firstName, lastName, username, email, password }) => {
            const user = await User.create({ firstName, lastName, username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, { email, password }) => { 
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        },

        removeUser: async (parent, { userId }, context) => { //REVIEW!!!
            if (context.user) {
                await User.findOneAndDelete(
                    { _id: userId }
                );

                return;
            }
            throw AuthenticationError;
            ('You need to be logged in!');
        },

        updateUser: async (parent, { username }, context) => { 
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $set: { username } },
                    //return the newly updated
                    { new: true }
                    );

                return updatedUser;
            }
            throw AuthenticationError;
            ('You need to be logged in!');
        },


        addScore: async (parent, { userId, scoreId }, context) => { //REVIEW!!!
            if (context.user) {
                const score = await Score.create({
                    score
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { scores: score } }
                );

                return score;
            }
            throw AuthenticationError;
        },


        removeScore: async (parent, { userId, scoreId }, context) => { //REVIEW!!!
            if (context.user) {
                const score = await Score.findOneAndDelete({
                    _id: scoreId,
                });

                await User.findOneAndUpdate(
                    { _id: userId },
                    { $pull: { scores: score._id } }
                );

                return score;
            }
            throw AuthenticationError;
        },
    },
};

module.exports = resolvers;
