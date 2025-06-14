const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Subject = require('../models/Subject');
const Semester = require('../models/Semester');
const Course = require('../models/Course');

// @route   GET api/subjects
// @desc    Get all subjects
// @access  Public
router.get('/', async (req, res) => {
  try {
    const subjects = await Subject.find()
      .populate('semester', ['name', 'number'])
      .populate('course', ['name', 'code'])
      .sort({ name: 1 });
    res.json(subjects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/subjects/semester/:semesterId
// @desc    Get all subjects for a specific semester
// @access  Public
router.get('/semester/:semesterId', async (req, res) => {
  try {
    const subjects = await Subject.find({ semester: req.params.semesterId })
      .populate('semester', ['name', 'number'])
      .populate('course', ['name', 'code'])
      .sort({ name: 1 });
    res.json(subjects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/subjects/course/:courseId
// @desc    Get all subjects for a specific course
// @access  Public
router.get('/course/:courseId', async (req, res) => {
  try {
    const subjects = await Subject.find({ course: req.params.courseId })
      .populate('semester', ['name', 'number'])
      .populate('course', ['name', 'code'])
      .sort({ name: 1 });
    res.json(subjects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/subjects/:id
// @desc    Get subject by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id)
      .populate('semester', ['name', 'number'])
      .populate('course', ['name', 'code']);

    if (!subject) {
      return res.status(404).json({ msg: 'Subject not found' });
    }

    res.json(subject);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Subject not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/subjects
// @desc    Create a subject
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('code', 'Code is required').not().isEmpty(),
      check('semester', 'Semester is required').not().isEmpty(),
      check('course', 'Course is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, code, semester, course, credits } = req.body;

      // Check if semester exists
      const semesterExists = await Semester.findById(semester);
      if (!semesterExists) {
        return res.status(404).json({ msg: 'Semester not found' });
      }

      // Check if course exists
      const courseExists = await Course.findById(course);
      if (!courseExists) {
        return res.status(404).json({ msg: 'Course not found' });
      }

      // Check if subject already exists in this semester
      let subject = await Subject.findOne({ code, semester });

      if (subject) {
        return res.status(400).json({ msg: 'Subject already exists in this semester' });
      }

      subject = new Subject({
        name,
        code,
        semester,
        course,
        credits
      });

      await subject.save();

      res.json(subject);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/subjects/:id
// @desc    Update a subject
// @access  Private
router.put(
  '/:id',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('code', 'Code is required').not().isEmpty(),
      check('semester', 'Semester is required').not().isEmpty(),
      check('course', 'Course is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, code, semester, course, credits } = req.body;

      // Check if subject exists
      let subject = await Subject.findById(req.params.id);

      if (!subject) {
        return res.status(404).json({ msg: 'Subject not found' });
      }

      // Check if semester exists
      const semesterExists = await Semester.findById(semester);
      if (!semesterExists) {
        return res.status(404).json({ msg: 'Semester not found' });
      }

      // Check if course exists
      const courseExists = await Course.findById(course);
      if (!courseExists) {
        return res.status(404).json({ msg: 'Course not found' });
      }

      // Check if code already exists for another subject in the same semester
      const existingSubject = await Subject.findOne({
        code,
        semester,
        _id: { $ne: req.params.id }
      });

      if (existingSubject) {
        return res.status(400).json({ msg: 'Subject with that code already exists in this semester' });
      }

      subject.name = name;
      subject.code = code;
      subject.semester = semester;
      subject.course = course;
      subject.credits = credits;

      await subject.save();

      res.json(subject);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Subject not found' });
      }
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/subjects/:id
// @desc    Delete a subject
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);

    if (!subject) {
      return res.status(404).json({ msg: 'Subject not found' });
    }

    await subject.remove();

    res.json({ msg: 'Subject removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Subject not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;