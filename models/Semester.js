const mongoose = require('mongoose');

const SemesterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'course',
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index to ensure uniqueness of semester within a course
SemesterSchema.index({ number: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('semester', SemesterSchema);