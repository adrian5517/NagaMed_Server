const User = require('../models/usersModel')


const createUser = async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user); // Status 201 for resource creation
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  const readUser =  async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      console.log('Users Not Found', error);
      res.status(404).json({ message: error.message });
    }
  }

  const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndUpdate(id, req.body, { new: true }); // Added { new: true } to return the updated document
      if (!user) {
        return res.status(404).json({ message: `User with ID ${id} not found` });
      }
      res.status(200).json(user);
    } catch (error) {
      console.log('Update error', error);
      res.status(400).json({ message: error.message });
    }
  }

  const readById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: `User with ID ${id} not found` });
      }
      res.status(200).json(user);
    } catch (error) {
      console.log('Find ID error', error);
      res.status(400).json({ message: error.message });
    }
  }

  const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({ message: `User with ID ${id} not found` });
      }
      res.status(200).json({ message: 'User deleted successfully', user });
    } catch (error) {
      console.log('Delete error', error);
      res.status(400).json({ message: error.message });
    }
  }


  module.exports = {
    readUser,
    createUser,
    deleteUser,
    updateUser,
    readById
  }