const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'college',
    required: true
  },
  duration: {
    type: Number,  // in years
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index to ensure uniqueness of course within a college
CourseSchema.index({ code: 1, college: 1 }, { unique: true });

module.exports = mongoose.model('course', CourseSchema);