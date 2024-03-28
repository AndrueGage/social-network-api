const { User, Thought } = require('../models');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const userData = await User.find({})
        .populate('thoughts', '-__v')
        .populate('friends', '-__v')
        .select('-__v')
        .sort({ _id: -1 });

      res.status(200).json(userData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to get users' });
    }
  },

  getUserById: async (req, res) => {
    try {
      const userData = await User.findById(req.params.id)
        .populate('thoughts', '-__v')
        .populate('friends', '-__v')
        .select('-__v');

      if (!userData) {
        res.status(404).json({ message: 'No user found' });
        return;
      }

      res.status(200).json(userData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to get user' });
    }
  },

  createUser: async (req, res) => {
    try {
      const userData = await User.create(req.body);
      res.status(200).json(userData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create user' });
    }
  },

  updateUser: async (req, res) => {
    try {
      const userData = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!userData) {
        res.status(404).json({ message: 'No user found' });
        return;
      }

      res.status(200).json(userData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update user' });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userData = await User.findByIdAndDelete(req.params.id);

      if (!userData) {
        res.status(404).json({ message: 'No user found' });
        return;
      }

      await Thought.deleteMany({ _id: { $in: userData.thoughts } });

      res.status(200).json({ message: 'User and their thoughts deleted!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete user' });
    }
  },

  addFriend: async (req, res) => {
    try {
      const userData = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true, runValidators: true }
      );
      
      if (!userData) {
        res.status(404).json({ message: 'No user found' });
        return;
      }

      res.status(200).json(userData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add friend' });
    }
  },

  removeFriend: async (req, res) => {
    try {
      const userData = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true, runValidators: true }
      );

      if (!userData) {
        res.status(404).json({ message: 'No user found' });
        return;
      }

      res.status(200).json(userData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to remove friend' });
    }
  }
};

module.exports = userController;
