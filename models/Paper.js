const mongoose = require('mongoose');

const PaperSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'college',
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
  semester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'semester',
    required: true
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subject',
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'admin',
    required: true
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('paper', PaperSchema);