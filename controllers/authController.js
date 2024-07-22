import User from '../models/user.js';
import OTP from '../models/OTP.js';
import jwt from 'jsonwebtoken';
// import transporter from '../config/nodemailer.js';

// Register user
export const register = async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    user = new User({ email });
    await user.save();
    res.status(201).json({ message: 'Registration successful. Please verify your email.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Request OTP
export const requestOTP = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Email not registered' });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const newOTP = new OTP({ user: user._id, otp ,email });
    await newOTP.save();
    
    // mailSend(otp);
    console.log(`Sending OTP ${otp} to email ${email}`);
    res.status(200).json({ message: 'OTP sent to your email.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Email not registered' });
    }
    const otpRecord = await OTP.findOne({ user: user._id, otp });
    if (!otpRecord) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful.', token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// async function mailSend(otp) {
//   const info = await transporter.sendMail({
//     from: '<freeyoutpremium@gmail.com>', 
//     to: "avadoothjoshi2001@gmail.com", 
//     subject: "OTP ", 
//     text: `Your OTP-${otp}`, 
//   });
//   console.log("Message sent: %s", info.messageId);
 
// }
