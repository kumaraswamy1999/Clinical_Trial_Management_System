
import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other'],
  },
}, {
  timestamps: true,
});

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;
