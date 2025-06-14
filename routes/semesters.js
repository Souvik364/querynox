const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Semester = require('../models/Semester');
const Course = require('../models/Course');

// @route   GET api/semesters
// @desc    Get all semesters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const semesters = await Semester.find()
      .populate('course', ['name', 'code'])
      .sort({ number: 1 });
    res.json(semesters);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/semesters/course/:courseId
// @desc    Get all semesters for a specific course
// @access  Public
router.get('/course/:courseId', async (req, res) => {
  try {
    const semesters = await Semester.find({ course: req.params.courseId })
      .populate('course', ['name', 'code'])
      .sort({ number: 1 });
    res.json(semesters);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/semesters/:id
// @desc    Get semester by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const semester = await Semester.findById(req.params.id).populate('course', ['name', 'code']);

    if (!semester) {
      return res.status(404).json({ msg: 'Semester not found' });
    }

    res.json(semester);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Semester not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/semesters
// @desc    Create a semester
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('number', 'Number is required').isNumeric(),
      check('course', 'Course is required').not().isEmpty(),
      check('year', 'Year is required').isNumeric()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, number, course, year } = req.body;

      // Check if course exists
      const courseExists = await Course.findById(course);
      if (!courseExists) {
        return res.status(404).json({ msg: 'Course not found' });
      }

      // Check if semester already exists in this course
      let semester = await Semester.findOne({ number, course });

      if (semester) {
        return res.status(400).json({ msg: 'Semester already exists in this course' });
      }

      semester = new Semester({
        name,
        number,
        course,
        year
      });

      await semester.save();

      res.json(semester);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/semesters/:id
// @desc    Update a semester
// @access  Private
router.put(
  '/:id',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('number', 'Number is required').isNumeric(),
      check('course', 'Course is required').not().isEmpty(),
      check('year', 'Year is required').isNumeric()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, number, course, year } = req.body;

      // Check if semester exists
      let semester = await Semester.findById(req.params.id);

      if (!semester) {
        return res.status(404).json({ msg: 'Semester not found' });
      }

      // Check if course exists
      const courseExists = await Course.findById(course);
      if (!courseExists) {
        return res.status(404).json({ msg: 'Course not found' });
      }

      // Check if number already exists for another semester in the same course
      const existingSemester = await Semester.findOne({
        number,
        course,
        _id: { $ne: req.params.id }
      });

      if (existingSemester) {
        return res.status(400).json({ msg: 'Semester with that number already exists in this course' });
      }

      semester.name = name;
      semester.number = number;
      semester.course = course;
      semester.year = year;

      await semester.save();

      res.json(semester);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Semester not found' });
      }
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/semesters/:id
// @desc    Delete a semester
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const semester = await Semester.findById(req.params.id);

    if (!semester) {
      return res.status(404).json({ msg: 'Semester not found' });
    }

    await semester.remove();

    res.json({ msg: 'Semester removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Semester not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;