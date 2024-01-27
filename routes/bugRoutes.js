const express = require('express');
const { Bugs } = require('../models/bug');
const bugRouter = express.Router();

// Get all bugs
bugRouter.get('/api/bugs/', async (req, res) => {
  try {
    const bugs = await Bugs.find();
    res.json(bugs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get bug by ID
bugRouter.get('/api/bugs/:id', async (req, res) => {
  try {
    const bug = await Bugs.findById(req.params.id);
    if (!bug) return res.status(404).json({ message: 'Bug not found' });
    res.json(bug);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create a new bug
bugRouter.post('/api/bugs/', async (req, res) => {
  try {
    const { title, description, source, severity, raised_by } = req.body;
    const bug = new Bugs({ title, description, source, severity, raised_by });
    await bug.save();
    res.status(201).json({ message: 'Bug reported successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update a bug by ID
bugRouter.patch('/api/bugs/:id', async (req, res) => {
  try {
    const bug = await Bugs.findByIdAndUpdate(req.params.id, { ...req.body, updated_at: Date.now() });
    if (!bug) return res.status(404).json({ message: 'Bug not found' });
    res.json({ message: 'Bug updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a bug by ID
bugRouter.delete('/api/bugs/:id', async (req, res) => {
  try {
    const bug = await Bugs.findByIdAndDelete(req.params.id);
    if (!bug) return res.status(404).json({ message: 'Bug not found' });
    res.json({ message: 'Bug deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = {bugRouter};
