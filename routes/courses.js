const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Course = require('../models/Course');
const College = require('../models/College');

// @route   GET api/courses
// @desc    Get all courses
// @access  Public
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('college', ['name', 'code']).sort({ name: 1 });
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/courses/college/:collegeId
// @desc    Get all courses for a specific college
// @access  Public
router.get('/college/:collegeId', async (req, res) => {
  try {
    const courses = await Course.find({ college: req.params.collegeId })
      .populate('college', ['name', 'code'])
      .sort({ name: 1 });
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/courses/:id
// @desc    Get course by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('college', ['name', 'code']);

    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    res.json(course);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Course not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/courses
// @desc    Create a course
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('code', 'Code is required').not().isEmpty(),
      check('college', 'College is required').not().isEmpty(),
      check('duration', 'Duration is required').isNumeric()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, code, college, duration } = req.body;

      // Check if college exists
      const collegeExists = await College.findById(college);
      if (!collegeExists) {
        return res.status(404).json({ msg: 'College not found' });
      }

      // Check if course already exists in this college
      let course = await Course.findOne({ code, college });

      if (course) {
        return res.status(400).json({ msg: 'Course already exists in this college' });
      }

      course = new Course({
        name,
        code,
        college,
        duration
      });

      await course.save();

      res.json(course);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/courses/:id
// @desc    Update a course
// @access  Private
router.put(
  '/:id',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('code', 'Code is required').not().isEmpty(),
      check('college', 'College is required').not().isEmpty(),
      check('duration', 'Duration is required').isNumeric()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, code, college, duration } = req.body;

      // Check if course exists
      let course = await Course.findById(req.params.id);

      if (!course) {
        return res.status(404).json({ msg: 'Course not found' });
      }

      // Check if college exists
      const collegeExists = await College.findById(college);
      if (!collegeExists) {
        return res.status(404).json({ msg: 'College not found' });
      }

      // Check if code already exists for another course in the same college
      const existingCourse = await Course.findOne({
        code,
        college,
        _id: { $ne: req.params.id }
      });

      if (existingCourse) {
        return res.status(400).json({ msg: 'Course with that code already exists in this college' });
      }

      course.name = name;
      course.code = code;
      course.college = college;
      course.duration = duration;

      await course.save();

      res.json(course);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Course not found' });
      }
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/courses/:id
// @desc    Delete a course
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    await course.remove();

    res.json({ msg: 'Course removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Course not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;