// ============================================================================
// RIT CAREERHUB AI - ENTERPRISE BACKEND SERVER
// CODESTORM 2026 | Rajeev Institute of Technology (RIT), Hassan
// ============================================================================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'rit_codestorm_2026_secure_secret_key';
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://admin:rit2026@cluster0.mongodb.net/rit-careerhub-ai?retryWrites=true&w=majority';

// ============================================================================
// 1. MONGODB DATABASE SCHEMAS & MODELS
// ============================================================================

// User Authentication Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['STUDENT', 'ADMIN', 'RECRUITER'], default: 'STUDENT' },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

// Student Profile & MyRITfolio Schema
const studentProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  usn: { type: String, required: true, unique: true, uppercase: true }, // e.g. 4RH21CS001
  department: { type: String, required: true, default: 'Computer Science & Engineering' },
  semester: { type: Number, required: true, default: 6 },
  skills: [String],
  githubUrl: String,
  linkedinUrl: String,
  bio: String,
  projects: [{
    title: String,
    description: String,
    techStack: [String],
    repoLink: String
  }],
  portfolioVisibility: { type: String, enum: ['PUBLIC', 'PRIVATE'], default: 'PUBLIC' }
}, { timestamps: true });

// Certificate Verification Workflow Schema
const certificateSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentProfile', required: true },
  title: { type: String, required: true },
  category: { type: String, required: true }, // Hackathon, Internship, Coursework
  issuingOrganization: { type: String, required: true },
  fileUrl: { type: String, required: true },
  status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' },
  adminFeedback: String,
  verifiedAt: Date
}, { timestamps: true });

// QR Payment & Transaction Auditing Schema
const transactionSchema = new mongoose.Schema({
  transactionId: { type: String, required: true, unique: true }, // 12-digit UTR
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentProfile', required: true },
  studentName: { type: String, required: true },
  usn: { type: String, required: true },
  eventName: { type: String, required: true, default: 'CodeStorm 2026' },
  amount: { type: Number, required: true, default: 100 },
  status: { type: String, enum: ['PENDING', 'VERIFIED', 'REJECTED'], default: 'PENDING' },
  adminNotes: String,
  verifiedByAdminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// Compile Models
const User = mongoose.model('User', userSchema);
const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);
const Certificate = mongoose.model('Certificate', certificateSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

// ============================================================================
// 2. MIDDLEWARE: ROLE-BASED ACCESS CONTROL (RBAC) & JWT
// ============================================================================
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Access denied. No token provided.' });
  }
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ success: false, error: 'Invalid or expired token.' });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    res.status(403).json({ success: false, error: 'Forbidden: Admin privileges required.' });
  }
};

// ============================================================================
// 3. REST API CONTROLLERS & ENDPOINTS
// ============================================================================

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ONLINE', system: 'RIT CareerHub AI Engine', timestamp: new Date() });
});

// A. AUTHENTICATION ROUTES
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, role, fullName, usn, department, semester } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, error: 'Email already registered.' });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ email, passwordHash, role: role || 'STUDENT', isVerified: true });
    await newUser.save();

    if (newUser.role === 'STUDENT') {
      const newProfile = new StudentProfile({
        userId: newUser._id,
        fullName: fullName || 'RIT Student',
        usn: usn || '4RH21CS000',
        department: department || 'Computer Science & Engineering',
        semester: semester || 6,
        skills: ['JavaScript', 'React', 'Node.js']
      });
      await newProfile.save();
    }

    res.status(201).json({ success: true, message: 'User registered successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, error: 'User not found.' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ success: false, error: 'Invalid credentials.' });

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token, role: user.role, email: user.email });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// B. STUDENT PROFILE & MYRITFOLIO ENDPOINTS
app.get('/api/student/profile/:usn', async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ usn: req.params.usn.toUpperCase() }).populate('userId', 'email');
    if (!profile) return res.status(404).json({ success: false, error: 'Student profile not found.' });
    res.json({ success: true, data: profile });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/student/profile', verifyToken, async (req, res) => {
  try {
    const updated = await StudentProfile.findOneAndUpdate(
      { userId: req.user.id },
      { $set: req.body },
      { new: true }
    );
    res.json({ success: true, message: 'Profile updated successfully!', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// C. PAYMENT & QR UTR AUDITING ENDPOINTS
app.post('/api/payments/submit-utr', verifyToken, async (req, res) => {
  try {
    const { transactionId, eventName, amount } = req.body;
    if (!transactionId || transactionId.length < 12) {
      return res.status(400).json({ success: false, error: 'Valid 12-digit UTR transaction ID is required.' });
    }

    const existingTxn = await Transaction.findOne({ transactionId });
    if (existingTxn) {
      return res.status(400).json({ success: false, error: 'Duplicate UTR detected. This transaction has already been submitted.' });
    }

    const student = await StudentProfile.findOne({ userId: req.user.id });
    if (!student) return res.status(404).json({ success: false, error: 'Student record not found.' });

    const newTxn = new Transaction({
      transactionId,
      studentId: student._id,
      studentName: student.fullName,
      usn: student.usn,
      eventName: eventName || 'CodeStorm 2026',
      amount: amount || 100,
      status: 'PENDING'
    });

    await newTxn.save();
    res.status(201).json({ success: true, message: 'UTR submitted successfully! Pending admin verification.', data: newTxn });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/admin/transactions', verifyToken, requireAdmin, async (req, res) => {
  try {
    const txns = await Transaction.find().sort({ createdAt: -1 });
    res.json({ success: true, count: txns.length, data: txns });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/admin/transactions/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { status, adminNotes } = req.body; // VERIFIED or REJECTED
    const updatedTxn = await Transaction.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes, verifiedByAdminId: req.user.id },
      { new: true }
    );
    res.json({ success: true, message: `Transaction status updated to ${status}`, data: updatedTxn });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// D. CERTIFICATE VERIFICATION ENDPOINTS
app.post('/api/certificates/upload', verifyToken, async (req, res) => {
  try {
    const { title, category, issuingOrganization, fileUrl } = req.body;
    const student = await StudentProfile.findOne({ userId: req.user.id });
    
    const newCert = new Certificate({
      studentId: student._id,
      title,
      category,
      issuingOrganization,
      fileUrl,
      status: 'PENDING'
    });
    
    await newCert.save();
    res.status(201).json({ success: true, message: 'Certificate submitted for verification.', data: newCert });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/admin/certificates/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { status, adminFeedback } = req.body;
    const updatedCert = await Certificate.findByIdAndUpdate(
      req.params.id,
      { status, adminFeedback, verifiedAt: new Date() },
      { new: true }
    );
    res.json({ success: true, message: `Certificate marked as ${status}`, data: updatedCert });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// E. AI CAREER READINESS & RESUME COMPILER ENDPOINT
app.post('/api/ai/compile-resume', verifyToken, async (req, res) => {
  try {
    const { targetRole } = req.body;
    const student = await StudentProfile.findOne({ userId: req.user.id });

    // Simulated Deep LLM / Gemini API Integration for ATS optimization
    const compiledResume = {
      candidateName: student.fullName,
      usn: student.usn,
      targetRole: targetRole || 'Software Engineer',
      atsScore: '96/100 (Optimized)',
      summary: `Dedicated ${student.department} undergraduate at RIT Hassan with strong proficiency in ${student.skills.join(', ')}. Proven track record in full-stack development and hackathons.`,
      coreCompetencies: student.skills,
      recommendedProjects: student.projects
    };

    res.json({ success: true, message: 'ATS Resume successfully compiled!', resume: compiledResume });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================================
// 4. DATABASE CONNECTION & SERVER STARTUP
// ============================================================================
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('📦 Connected successfully to MongoDB Atlas Database.');
    app.listen(PORT, () => {
      console.log(`🚀 RIT CareerHub AI Enterprise Backend running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err.message);
  });
