const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Paper = require('../models/Paper');
const College = require('../models/College');
const Course = require('../models/Course');
const Semester = require('../models/Semester');
const Subject = require('../models/Subject');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/papers';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  }
});

// Check file type
const checkFileType = (file, cb) => {
  // Allowed extensions
  const filetypes = /pdf/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: PDFs Only!');
  }
};

// Initialize upload
const upload = multer({
  storage,
  limits: { fileSize: 10000000 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
});

// @route   GET api/papers
// @desc    Get all papers
// @access  Public
router.get('/', async (req, res) => {
  try {
    const papers = await Paper.find()
      .populate('college', ['name', 'code'])
      .populate('course', ['name', 'code'])
      .populate('semester', ['name', 'number'])
      .populate('subject', ['name', 'code'])
      .sort({ createdAt: -1 });
    res.json(papers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/papers/filter
// @desc    Get papers by filter
// @access  Public
router.get('/filter', async (req, res) => {
  try {
    const { college, course, year, semester, subject } = req.query;
    
    const filter = {};
    
    if (college) filter.college = college;
    if (course) filter.course = course;
    if (year) filter.year = year;
    if (semester) filter.semester = semester;
    if (subject) filter.subject = subject;
    
    const papers = await Paper.find(filter)
      .populate('college', ['name', 'code'])
      .populate('course', ['name', 'code'])
      .populate('semester', ['name', 'number'])
      .populate('subject', ['name', 'code'])
      .sort({ createdAt: -1 });
      
    res.json(papers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/papers/:id
// @desc    Get paper by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id)
      .populate('college', ['name', 'code'])
      .populate('course', ['name', 'code'])
      .populate('semester', ['name', 'number'])
      .populate('subject', ['name', 'code'])
      .populate('uploadedBy', ['name']);

    if (!paper) {
      return res.status(404).json({ msg: 'Paper not found' });
    }

    res.json(paper);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Paper not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/papers
// @desc    Upload a paper
// @access  Private
router.post(
  '/',
  [auth, upload.single('file')],
  async (req, res) => {
    try {
      const { title, description, college, course, year, semester, subject } = req.body;

      // Validate required fields
      if (!title || !college || !course || !year || !semester || !subject || !req.file) {
        // Remove uploaded file if validation fails
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(400).json({ msg: 'Please provide all required fields' });
      }

      // Check if college exists
      const collegeExists = await College.findById(college);
      if (!collegeExists) {
        // Remove uploaded file if validation fails
        fs.unlinkSync(req.file.path);
        return res.status(404).json({ msg: 'College not found' });
      }

      // Check if course exists
      const courseExists = await Course.findById(course);
      if (!courseExists) {
        // Remove uploaded file if validation fails
        fs.unlinkSync(req.file.path);
        return res.status(404).json({ msg: 'Course not found' });
      }

      // Check if semester exists
      const semesterExists = await Semester.findById(semester);
      if (!semesterExists) {
        // Remove uploaded file if validation fails
        fs.unlinkSync(req.file.path);
        return res.status(404).json({ msg: 'Semester not found' });
      }

      // Check if subject exists
      const subjectExists = await Subject.findById(subject);
      if (!subjectExists) {
        // Remove uploaded file if validation fails
        fs.unlinkSync(req.file.path);
        return res.status(404).json({ msg: 'Subject not found' });
      }

      const paper = new Paper({
        title,
        description,
        college,
        course,
        year,
        semester,
        subject,
        fileUrl: req.file.path,
        fileName: req.file.originalname,
        fileSize: req.file.size,
        uploadedBy: req.admin.id
      });

      await paper.save();

      res.json(paper);
    } catch (err) {
      console.error(err.message);
      // Remove uploaded file if error occurs
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/papers/:id
// @desc    Update a paper
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, college, course, year, semester, subject } = req.body;

    // Check if paper exists
    let paper = await Paper.findById(req.params.id);

    if (!paper) {
      return res.status(404).json({ msg: 'Paper not found' });
    }

    // Check if admin is the uploader
    if (paper.uploadedBy.toString() !== req.admin.id) {
      return res.status(401).json({ msg: 'Not authorized to update this paper' });
    }

    // Update fields if provided
    if (title) paper.title = title;
    if (description !== undefined) paper.description = description;
    if (college) {
      // Check if college exists
      const collegeExists = await College.findById(college);
      if (!collegeExists) {
        return res.status(404).json({ msg: 'College not found' });
      }
      paper.college = college;
    }
    if (course) {
      // Check if course exists
      const courseExists = await Course.findById(course);
      if (!courseExists) {
        return res.status(404).json({ msg: 'Course not found' });
      }
      paper.course = course;
    }
    if (year) paper.year = year;
    if (semester) {
      // Check if semester exists
      const semesterExists = await Semester.findById(semester);
      if (!semesterExists) {
        return res.status(404).json({ msg: 'Semester not found' });
      }
      paper.semester = semester;
    }
    if (subject) {
      // Check if subject exists
      const subjectExists = await Subject.findById(subject);
      if (!subjectExists) {
        return res.status(404).json({ msg: 'Subject not found' });
      }
      paper.subject = subject;
    }

    await paper.save();

    res.json(paper);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Paper not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/papers/:id
// @desc    Delete a paper
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id);

    if (!paper) {
      return res.status(404).json({ msg: 'Paper not found' });
    }

    // Check if admin is the uploader
    if (paper.uploadedBy.toString() !== req.admin.id) {
      return res.status(401).json({ msg: 'Not authorized to delete this paper' });
    }

    // Delete file from storage
    if (fs.existsSync(paper.fileUrl)) {
      fs.unlinkSync(paper.fileUrl);
    }

    await paper.remove();

    res.json({ msg: 'Paper removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Paper not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET api/papers/download/:id
// @desc    Download a paper and increment download count
// @access  Public
router.get('/download/:id', async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id);

    if (!paper) {
      return res.status(404).json({ msg: 'Paper not found' });
    }

    // Increment download count
    paper.downloadCount += 1;
    await paper.save();

    // Check if file exists
    if (!fs.existsSync(paper.fileUrl)) {
      return res.status(404).json({ msg: 'File not found' });
    }

    // Send file for download
    res.download(paper.fileUrl, paper.fileName);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Paper not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;