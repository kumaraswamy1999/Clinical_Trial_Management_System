// models/Researcher.ts
import mongoose from 'mongoose';

const researcherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
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
    enum: ['male', 'female'],
  },
}, {
  timestamps: true,
});

const Researcher = mongoose.model('Researcher', researcherSchema);
export default Researcher;
