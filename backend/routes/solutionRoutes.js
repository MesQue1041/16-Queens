
const express = require('express');
const router = express.Router();
const Solution = require('../models/Solution');
const Statistics = require('../models/Statistics');

router.post('/check', async (req, res) => {
  const { board, userName } = req.body;

  try {
    const existingSolution = await Statistics.findOne({ solution: board });
    if (!existingSolution) {
      return res.status(400).json({ message: 'Incorrect solution. Try again !' });
    }

    const recognizedSolution = await Solution.findOne({ solution: board });
    if (recognizedSolution) {
      return res.status(400).json({ message: 'This solution has already been recognized by another player.' });
    }

    const newSolution = new Solution({ solution: board, userName });
    await newSolution.save();

    res.json({ message: 'Correct Solution, The solution has been saved !' });
  } catch (error) {
    console.error('Error checking solution:', error);
    res.status(500).json({ message: 'Server error ! Please try again later !' });
  }
});

module.exports = router;
