const { Thought, User } = require('../models');

const thoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughtData = await Thought.find({}, '-__v').sort({ _id: -1 });
      res.status(200).json(thoughtData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to get thoughts' });
    }
  },

  getThoughtById: async (req, res) => {
    try {
      const thoughtData = await Thought.findById(req.params.id, '-__v');
      if (!thoughtData) {
        res.status(404).json({ message: 'No thought found' });
        return;
      }
      res.status(200).json(thoughtData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to get thought' });
    }
  },

  createThought: async (req, res) => {
    try {
      const thoughtData = await Thought.create(req.body);
      const userData = await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { thoughts: thoughtData._id } },
        { new: true }
      );
      if (!userData) {
        res.status(404).json({ message: 'No user found' });
        return;
      }
      res.status(200).json(thoughtData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create thought' });
    }
  },

  updateThought: async (req, res) => {
    try {
      const thoughtData = await Thought.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!thoughtData) {
        res.status(404).json({ message: 'No thought found' });
        return;
      }
      res.status(200).json(thoughtData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update thought' });
    }
  },

  deleteThought: async (req, res) => {
    try {
      const thoughtData = await Thought.findByIdAndDelete(req.params.id);
      if (!thoughtData) {
        res.status(404).json({ message: 'No thought found' });
        return;
      }
      res.status(200).json({ message: 'Thought deleted successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete thought' });
    }
  },

  addReaction: async (req, res) => {
    try {
      const thoughtData = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      );
      if (!thoughtData) {
        res.status(404).json({ message: 'No thought found' });
        return;
      }
      res.status(200).json(thoughtData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add reaction' });
    }
  },

  removeReaction: async (req, res) => {
    try {
      const thoughtData = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true, runValidators: true }
      );
      if (!thoughtData) {
        res.status(404).json({ message: 'No thought or reaction found' });
        return;
      }
      res.status(200).json(thoughtData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to remove reaction' });
    }
  }
};

module.exports = thoughtController;
