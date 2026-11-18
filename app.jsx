import React, { useState } from 'react';
import { 
  Trophy, 
  BookOpen, 
  Briefcase, 
  User, 
  LayoutDashboard, 
  Upload, 
  Search, 
  Filter, 
  Clock, 
  Copy, 
  AlertTriangle,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateTo = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      {/* NAVIGATION BAR */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="mr-3 flex items-center">
                <img src="rit_college_logo_4k.png" alt="RIT Logo" className="h-10 w-10 object-contain" />
              </div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">
                RIT CareerHub <span className="text-violet-600">AI</span>
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <button onClick={() => navigateTo('home')} className="text-slate-600 hover:text-violet-600 font-medium transition-colors">Home</button>
              <button onClick={() => navigateTo('student-dashboard')} className="text-slate-600 hover:text-violet-600 font-medium transition-colors">Student Dashboard</button>
              <button onClick={() => navigateTo('qr-payment')} className="text-slate-600 hover:text-violet-600 font-medium transition-colors">Pay Demo</button>
              <button onClick={() => navigateTo('admin-transactions')} className="text-slate-600 hover:text-violet-600 font-medium transition-colors">Admin Panel</button>
              <button className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors">
                Sign In
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 hover:text-slate-900">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2 shadow-lg absolute w-full z-40">
            <button onClick={() => navigateTo('home')} className="block w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-violet-600 rounded-md font-medium">Home</button>
            <button onClick={() => navigateTo('student-dashboard')} className="block w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-violet-600 rounded-md font-medium">Student Dashboard</button>
            <button onClick={() => navigateTo('qr-payment')} className="block w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-violet-600 rounded-md font-medium">Pay Demo</button>
            <button onClick={() => navigateTo('admin-transactions')} className="block w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-violet-600 rounded-md font-medium">Admin Panel</button>
          </div>
        )}
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow flex flex-col w-full relative">
        {currentView === 'home' && <HomeView onNavigate={navigateTo} />}
        {currentView === 'student-dashboard' && <StudentDashboardView />}
        {currentView === 'qr-payment' && <QRPaymentView />}
        {currentView === 'admin-transactions' && <AdminTransactionPanel />}
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm w-full mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="bg-white p-1 rounded-full flex items-center justify-center shadow-sm">
              <img src="rit_college_logo_4k.png" alt="RIT Logo" className="h-8 w-8 object-contain" />
            </div>
            <span className="text-white font-semibold text-lg">RIT CareerHub AI</span>
          </div>
          <p>© 2026 RIT Hassan Engineering. All rights reserved.</p>
          <p className="mt-2 text-slate-500">Built for CodeStorm 2026</p>
        </div>
      </footer>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function HomeView({ onNavigate }) {
  return (
    <div className="flex-grow flex flex-col w-full">
      {/* Hero Section */}
      <section 
        className="text-white pt-24 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex-grow flex items-center justify-center bg-slate-900"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.98)), url("codestorm_2026_banner_4k.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-200 text-sm font-medium mb-8 backdrop-blur-sm shadow-lg">
            <span className="flex h-2 w-2 rounded-full bg-violet-400 animate-pulse"></span>
            CodeStorm 2026 Challenge 01
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
            One College. Every Student.<br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400"> A Better Career.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            The centralized AI-powered career development platform for engineering students at RIT Hassan. Build portfolios, prepare for interviews, and land your dream job.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => onNavigate('student-dashboard')}
              className="px-8 py-4 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-500 transition-all shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2"
            >
              Go to Dashboard <ChevronRight size={20} />
            </button>
            <button 
              onClick={() => onNavigate('admin-transactions')}
              className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 backdrop-blur-sm transition-all flex items-center justify-center"
            >
              Admin Portal
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Platform Features</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">Everything you need to accelerate your engineering career, all in one intelligent platform.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-xl hover:shadow-violet-900/5 transition-all duration-300 group">
            <div className="w-14 h-14 bg-violet-100 text-violet-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-violet-600 group-hover:text-white transition-colors">
              <User size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">MyRITfolio</h3>
            <p className="text-slate-600 leading-relaxed">
              Instantly generate personal portfolio websites with your verified achievements, projects, and academic records.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-xl hover:shadow-violet-900/5 transition-all duration-300 group">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <BookOpen size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">AI Readiness Analyzer</h3>
            <p className="text-slate-600 leading-relaxed">
              Get personalized skill gap analysis and custom 30-60-90 day learning roadmaps powered by Google Gemini.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-xl hover:shadow-violet-900/5 transition-all duration-300 group">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Trophy size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Hackathon Manager</h3>
            <p className="text-slate-600 leading-relaxed">
              Discover campus events, find talented teammates, register with seamless QR payments, and track your achievements.
            </p>
          </div>
        </div>
      </section>

      {/* Organizers Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-100 w-full border-t border-slate-200">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Organized & Supported By</h2>
          <p className="text-slate-600 mb-12">Bringing together the best of RIT Hassan</p>
          
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-36 h-36 md:w-44 md:h-44 bg-white rounded-full shadow-md border border-slate-200 p-6 flex items-center justify-center group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 mb-6">
                <img src="cse_dept_rit_logo_4k.jpg" alt="CSE Department Logo" className="max-w-full max-h-full object-contain" />
              </div>
              <span className="text-lg font-bold text-slate-700 group-hover:text-violet-700 transition-colors">Dept of CSE</span>
              <span className="text-sm text-slate-500">RIT Hassan</span>
            </div>
            
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-36 h-36 md:w-44 md:h-44 bg-white rounded-full shadow-md border border-slate-200 p-6 flex items-center justify-center group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 mb-6">
                <img src="gdg_on_campus_rit_hassan_logo_4k.jpg" alt="GDG On Campus RIT Logo" className="max-w-full max-h-full object-contain" />
              </div>
              <span className="text-lg font-bold text-slate-700 group-hover:text-blue-600 transition-colors">GDG On Campus</span>
              <span className="text-sm text-slate-500">RIT Hassan</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StudentDashboardView() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 w-full">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-4 md:sticky md:top-16 md:h-[calc(100vh-64px)] overflow-y-auto">
        <div className="flex items-center gap-3 p-3 mb-6 bg-slate-50 rounded-xl border border-slate-100">
          <div className="w-10 h-10 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-bold">
            RS
          </div>
          <div>
            <p className="font-semibold text-sm text-slate-900">Rahul Sharma</p>
            <p className="text-xs text-slate-500">4RH21CS001</p>
          </div>
        </div>
        
        <nav className="space-y-1">
          <button className="flex items-center gap-3 w-full px-3 py-2.5 bg-violet-50 text-violet-700 rounded-lg text-sm font-medium">
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-2.5 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors">
            <User size={18} /> My Profile
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-2.5 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors">
            <Trophy size={18} /> Achievements
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-2.5 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors">
            <Briefcase size={18} /> Internships
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Welcome back, Rahul</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-violet-600 mb-2"><Trophy size={24} /></div>
            <h3 className="text-slate-500 text-sm font-medium mb-1">Approved Certificates</h3>
            <p className="text-3xl font-bold text-slate-900">4</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-blue-600 mb-2"><BookOpen size={24} /></div>
            <h3 className="text-slate-500 text-sm font-medium mb-1">Active Hackathons</h3>
            <p className="text-3xl font-bold text-slate-900">1</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-emerald-600 mb-2"><Briefcase size={24} /></div>
            <h3 className="text-slate-500 text-sm font-medium mb-1">AI Readiness Score</h3>
            <p className="text-3xl font-bold text-slate-900">78%</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-amber-100 text-amber-600 rounded-lg"><Clock size={20} /></div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">CodeStorm 2026 Registration</p>
                  <p className="text-xs text-slate-500">Payment Pending Verification</p>
                </div>
              </div>
              <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">Pending</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg"><Trophy size={20} /></div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">AWS Cloud Practitioner</p>
                  <p className="text-xs text-slate-500">Certificate Approved by Admin</p>
                </div>
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Approved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QRPaymentView() {
  const [utr, setUtr] = useState('');
  const [screenshot, setScreenshot] = useState(null);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('ritcareerhub@ybl');
    alert('UPI ID Copied to clipboard!');
  };

  return (
    <div className="py-12 px-4 sm:px-6 flex-grow flex items-center justify-center w-full">
      <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 text-white p-5 text-center relative">
          <h2 className="text-xl font-bold relative z-10">Complete Registration</h2>
          <p className="text-violet-300 text-xs mt-1 font-medium tracking-wider uppercase relative z-10">Demo Payment Mode</p>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="mb-6 text-center">
            <p className="text-slate-600 text-sm mb-1">Registration for:</p>
            <p className="font-bold text-lg text-slate-900">CodeStorm 2026 Hackathon</p>
            <p className="text-3xl font-extrabold text-violet-600 mt-3">₹1.00</p>
          </div>

          <div className="flex justify-center mb-6 p-4 rounded-xl bg-slate-50 border-2 border-dashed border-slate-200">
            {/* Fallback styling for QR if image is not present */}
            <div className="w-48 h-48 bg-white border border-slate-200 shadow-sm flex items-center justify-center p-2 rounded-lg overflow-hidden">
               <img src="qr-code.png" alt="Official QR Code" className="w-full h-full object-contain" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
               <div style={{display: 'none'}} className="text-center text-slate-400 text-sm p-4">
                 [PhonePe QR Code Image Placed Here]
               </div>
            </div>
          </div>

          <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-3 rounded-lg mb-8">
            <span className="text-sm font-medium text-slate-700">ritcareerhub@ybl</span>
            <button onClick={handleCopyUpi} className="text-violet-600 hover:text-violet-800 flex items-center text-sm font-semibold transition-colors bg-violet-50 px-3 py-1.5 rounded-md">
              <Copy size={14} className="mr-1.5" /> Copy
            </button>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-5">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Transaction ID / UTR (12 Digits)</label>
              <input 
                type="text" 
                required
                minLength={12}
                maxLength={12}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-shadow bg-slate-50"
                placeholder="e.g. 312345678901"
                value={utr}
                onChange={(e) => setUtr(e.target.value.replace(/\D/g, ''))}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Payment Screenshot</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-6 h-6 text-slate-400 mb-2" />
                    <p className="text-sm text-slate-600 font-medium">
                      {screenshot ? screenshot.name : "Click to upload image"}
                    </p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => setScreenshot(e.target.files?.[0] || null)} />
                </label>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-xs text-amber-800 flex items-start leading-relaxed">
                <AlertTriangle size={16} className="mr-2 shrink-0 mt-0.5" />
                Never enter your UPI PIN or bank passwords on this site. Admin verification typically takes 1-2 hours.
              </p>
            </div>

            <button type="submit" className="w-full bg-slate-900 text-white py-3.5 rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
              Submit Payment Details
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function AdminTransactionPanel() {
  const transactions = [
    { id: '1', utr: '312345678901', student: 'Rahul Sharma', usn: '4RH21CS001', event: 'CodeStorm 2026', amount: 1, status: 'PENDING', date: '2026-11-18' },
    { id: '2', utr: '312345678902', student: 'Priya Patel', usn: '4RH21IS045', event: 'CodeStorm 2026', amount: 1, status: 'VERIFIED', date: '2026-11-18' },
    { id: '3', utr: '312345678903', student: 'Amit Kumar', usn: '4RH22EC012', event: 'CodeStorm 2026', amount: 1, status: 'PENDING', date: '2026-11-17' },
  ];

  return (
    <div className="p-4 md:p-8 bg-slate-50 flex-grow w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Transaction IDs</h1>
            <p className="text-slate-500 mt-1">Manage and verify student event payments</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input type="text" placeholder="Search UTR / USN..." className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 shadow-sm" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 shadow-sm font-medium">
              <Filter size={18} /> <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500 font-medium">Total Transactions</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">1,245</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-amber-500">
            <p className="text-sm text-slate-500 font-medium">Pending Verification</p>
            <p className="text-3xl font-bold text-amber-600 mt-2">42</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-green-500">
            <p className="text-sm text-slate-500 font-medium">Verified Amount</p>
            <p className="text-3xl font-bold text-green-600 mt-2">₹1,203</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-red-500">
            <p className="text-sm text-slate-500 font-medium">Failed / Rejected</p>
            <p className="text-3xl font-bold text-red-600 mt-2">7</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
                <th className="p-4 font-semibold">UTR / Transaction ID</th>
                <th className="p-4 font-semibold">Student Info</th>
                <th className="p-4 font-semibold">Event</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-mono text-sm text-slate-700">{tx.utr}</td>
                  <td className="p-4">
                    <p className="font-semibold text-slate-900">{tx.student}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{tx.usn}</p>
                  </td>
                  <td className="p-4 text-sm text-slate-700">{tx.event}</td>
                  <td className="p-4 font-semibold text-slate-900">₹{tx.amount}</td>
                  <td className="p-4">
                    {tx.status === 'PENDING' ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                        <Clock size={12} className="mr-1.5" /> Pending
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                        Verified
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {tx.status === 'PENDING' && (
                      <>
                        <button className="text-sm px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition-colors font-medium">Approve</button>
                        <button className="text-sm px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors font-medium">Reject</button>
                      </>
                    )}
                    {tx.status === 'VERIFIED' && (
                       <button className="text-sm px-3 py-1.5 bg-slate-100 text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-200 transition-colors font-medium">View</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}