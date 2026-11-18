// ============================================================================
// RIT CAREERHUB AI - ENTERPRISE BACKEND SERVER
// CODESTORM 2026 | Rajeev Institute of Technology (RIT), Hassan
// ============================================================================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://admin:rit2026@cluster0.mongodb.net/rit-careerhub-ai?retryWrites=true&w=majority';

// ============================================================================
// 1. MONGODB DATABASE SCHEMAS & MODELS
// ============================================================================

// Certificate Verification Schema
const certificateSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  usn: { type: String, required: true, uppercase: true },
  title: { type: String, required: true },
  category: { type: String, required: true }, // Hackathon, Internship, Coursework
  issuer: { type: String, required: true },
  status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' },
  adminFeedback: String
}, { timestamps: true });

// Payment Transaction Schema
const transactionSchema = new mongoose.Schema({
  transactionId: { type: String, required: true, unique: true }, // 12-digit UTR
  studentName: { type: String, required: true },
  usn: { type: String, required: true },
  eventName: { type: String, required: true, default: 'CodeStorm 2026' },
  amount: { type: Number, required: true, default: 100 },
  status: { type: String, enum: ['PENDING', 'VERIFIED', 'REJECTED'], default: 'PENDING' },
  adminNotes: String
}, { timestamps: true });

const Certificate = mongoose.model('Certificate', certificateSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

// ============================================================================
// 2. REST API CONTROLLERS & ENDPOINTS FOR JUDGES
// ============================================================================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ONLINE', system: 'RIT CareerHub AI Backend Engine', timestamp: new Date() });
});

// A. CERTIFICATE MANAGEMENT ENDPOINTS
app.get('/api/certificates', async (req, res) => {
  try {
    const certs = await Certificate.find().sort({ createdAt: -1 });
    res.json({ success: true, count: certs.length, data: certs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/certificates', async (req, res) => {
  try {
    const { studentName, usn, title, category, issuer } = req.body;
    const newCert = new Certificate({ studentName, usn, title, category, issuer, status: 'PENDING' });
    await newCert.save();
    res.status(201).json({ success: true, message: 'Certificate submitted successfully for admin review.', data: newCert });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.put('/api/certificates/:id', async (req, res) => {
  try {
    const { status, adminFeedback } = req.body; // APPROVED or REJECTED
    const updatedCert = await Certificate.findByIdAndUpdate(
      req.params.id,
      { status, adminFeedback },
      { new: true }
    );
    res.json({ success: true, message: `Certificate status updated to ${status}`, data: updatedCert });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// B. PAYMENT & TRANSACTION AUDITING ENDPOINTS
app.get('/api/transactions', async (req, res) => {
  try {
    const txns = await Transaction.find().sort({ createdAt: -1 });
    res.json({ success: true, count: txns.length, data: txns });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/payments/submit-utr', async (req, res) => {
  try {
    const { transactionId, studentName, usn, eventName, amount } = req.body;
    
    const existing = await Transaction.findOne({ transactionId });
    if (existing) {
      return res.status(400).json({ success: false, error: 'Duplicate UTR detected. Already submitted.' });
    }

    const newTxn = new Transaction({ transactionId, studentName, usn, eventName: eventName || 'CodeStorm 2026', amount: amount || 100, status: 'PENDING' });
    await newTxn.save();
    
    res.status(201).json({ success: true, message: 'UTR submitted successfully. Pending admin verification.', data: newTxn });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.put('/api/transactions/:id', async (req, res) => {
  try {
    const { status, adminNotes } = req.body; // VERIFIED or REJECTED
    const updatedTxn = await Transaction.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes },
      { new: true }
    );
    res.json({ success: true, message: `Transaction marked as ${status}`, data: updatedTxn });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// ============================================================================
// 3. DATABASE CONNECTION & SERVER STARTUP
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
