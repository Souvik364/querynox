const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const College = require('../models/College');

// @route   GET api/colleges
// @desc    Get all colleges
// @access  Public
router.get('/', async (req, res) => {
  try {
    const colleges = await College.find().sort({ name: 1 });
    res.json(colleges);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/colleges/:id
// @desc    Get college by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const college = await College.findById(req.params.id);

    if (!college) {
      return res.status(404).json({ msg: 'College not found' });
    }

    res.json(college);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'College not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/colleges
// @desc    Create a college
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('code', 'Code is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, code, location } = req.body;

      // Check if college already exists
      let college = await College.findOne({ $or: [{ name }, { code }] });

      if (college) {
        return res.status(400).json({ msg: 'College already exists' });
      }

      college = new College({
        name,
        code,
        location
      });

      await college.save();

      res.json(college);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/colleges/:id
// @desc    Update a college
// @access  Private
router.put(
  '/:id',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('code', 'Code is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, code, location } = req.body;

      // Check if college exists
      let college = await College.findById(req.params.id);

      if (!college) {
        return res.status(404).json({ msg: 'College not found' });
      }

      // Check if name or code already exists for another college
      const existingCollege = await College.findOne({
        $or: [{ name }, { code }],
        _id: { $ne: req.params.id }
      });

      if (existingCollege) {
        return res.status(400).json({ msg: 'College with that name or code already exists' });
      }

      college.name = name;
      college.code = code;
      college.location = location;

      await college.save();

      res.json(college);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'College not found' });
      }
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/colleges/:id
// @desc    Delete a college
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const college = await College.findById(req.params.id);

    if (!college) {
      return res.status(404).json({ msg: 'College not found' });
    }

    await college.remove();

    res.json({ msg: 'College removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'College not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;