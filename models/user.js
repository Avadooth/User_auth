import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true, 
  },
});

const User = mongoose.model('User', UserSchema);
export default  User;