const App = () => {
  const [activeView, setActiveView] = React.useState('home');
  const [toast, setToast] = React.useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // --- SVG ICONS COLLECTION ---
  const Icons = {
    Home: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>,
    User: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>,
    Briefcase: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>,
    Shield: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>,
    CreditCard: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>,
    CheckCircle: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
    FileText: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>,
    Sparkles: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>,
    Calendar: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>,
  };

  // --- MOCK DATA ---
  const mockTransactions = [
    { id: 'TXN1001', utr: '312345678901', student: 'Rahul Sharma', usn: '4RH21CS001', event: 'CodeStorm 2026', amount: 100, status: 'PENDING' },
    { id: 'TXN1002', utr: '312345678902', student: 'Priya Patel', usn: '4RH21IS042', event: 'CodeStorm 2026', amount: 100, status: 'VERIFIED' },
    { id: 'TXN1003', utr: '312345678903', student: 'Amit Kumar', usn: '4RH22EC015', event: 'CodeStorm 2026', amount: 100, status: 'REJECTED' },
  ];

  const mockJobs = [
    { id: 1, company: 'TechCorp India', role: 'Software Engineer Intern', type: 'Internship', stipend: '₹15,000/mo', location: 'Bangalore' },
    { id: 2, company: 'DataFlow Systems', role: 'Data Analyst', type: 'Full-time', stipend: '7 LPA', location: 'Hyderabad' },
  ];

  // --- RENDER VIEWS ---

  const renderHome = () => (
    <div className="space-y-16 animate-fadeIn">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
        <div className="absolute inset-0 bg-slate-900">
          <img src="codestorm_2026_banner_4k.jpg" className="w-full h-full object-cover opacity-40 mix-blend-overlay" onError={(e) => e.target.style.display='none'}/>
        </div>
        <div className="relative px-8 py-24 md:py-32 text-center flex flex-col items-center">
          <div className="inline-flex items-center space-x-2 bg-violet-600/20 text-violet-300 border border-violet-500/30 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
            <Icons.Sparkles /> <span>Welcome to the Future of RIT Placements</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
            One College. <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Every Student.</span><br/>A Better Career.
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-10 drop-shadow">
            The all-in-one AI platform for internships, portfolios, resume building, and hackathon management at RIT Hassan.
          </p>
          <div className="flex gap-4">
            <button onClick={() => setActiveView('student')} className="bg-violet-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-violet-700 transition shadow-lg shadow-violet-600/30">Get Started</button>
            <button onClick={() => setActiveView('portfolio')} className="bg-white/10 text-white border border-white/20 px-8 py-3 rounded-lg font-bold hover:bg-white/20 transition backdrop-blur-sm">View Demo Portfolio</button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <Icons.FileText />, title: 'AI Resume Builder', desc: 'Generate ATS-friendly resumes instantly tailored to your dream role.' },
          { icon: <Icons.User />, title: 'MyRITfolio', desc: 'Get a personalized, shareable portfolio website showcasing your verified achievements.' },
          { icon: <Icons.Calendar />, title: 'Event Management', desc: 'Register for hackathons, pay fees securely, and form teams seamlessly.' },
        ].map((feat, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition">
            <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-xl flex items-center justify-center mb-6">{feat.icon}</div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">{feat.title}</h3>
            <p className="text-slate-600 leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>

      {/* Partners */}
      <div className="py-12 border-t border-slate-200 text-center">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Official Platform Partners</h3>
        <div className="flex flex-wrap justify-center items-center gap-12">
          <img src="cse_dept_rit_logo_4k.jpg" className="h-20 grayscale hover:grayscale-0 transition duration-300" onError={(e) => e.target.style.display='none'}/>
          <img src="gdg_on_campus_rit_hassan_logo_4k.jpg" className="h-20 grayscale hover:grayscale-0 transition duration-300" onError={(e) => e.target.style.display='none'}/>
        </div>
      </div>
    </div>
  );

  const renderStudent = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center text-3xl font-bold text-slate-400 border-4 border-white shadow-lg">RS</div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold text-slate-800">Rahul Sharma</h2>
          <p className="text-slate-500 font-medium">USN: 4RH21CS001 • Computer Science (CSE) • 6th Sem</p>
          <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-bold">Profile 100% Complete</span>
            <span className="bg-violet-100 text-violet-700 text-xs px-3 py-1 rounded-full font-bold">2 Certificates Verified</span>
          </div>
        </div>
        <button onClick={() => setActiveView('portfolio')} className="bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition">View MyRITfolio</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Icons.Sparkles /> Career Tools</h3>
          </div>
          <div className="space-y-3">
            <button onClick={() => setActiveView('resume')} className="w-full text-left p-4 rounded-xl border border-slate-100 hover:border-violet-200 hover:bg-violet-50 transition flex justify-between items-center">
              <div>
                <h4 className="font-bold text-slate-800">AI Resume Builder</h4>
                <p className="text-sm text-slate-500">Update your ATS-friendly resume.</p>
              </div>
              <Icons.FileText />
            </button>
            <button onClick={() => setActiveView('payment')} className="w-full text-left p-4 rounded-xl border border-slate-100 hover:border-violet-200 hover:bg-violet-50 transition flex justify-between items-center">
              <div>
                <h4 className="font-bold text-slate-800">Event Registrations</h4>
                <p className="text-sm text-slate-500">Pay fees for CodeStorm 2026.</p>
              </div>
              <Icons.CreditCard />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2"><Icons.CheckCircle /> Recent Achievements</h3>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center p-3 border border-slate-100 rounded-lg">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mr-4"><Icons.CheckCircle /></div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">React Hackathon Winner</h4>
                  <p className="text-xs text-slate-500">Verified by Admin • Oct 2025</p>
                </div>
              </div>
            ))}
            <button className="w-full py-2 border-2 border-dashed border-slate-300 text-slate-500 rounded-lg text-sm font-bold hover:bg-slate-50 transition">
              + Upload New Certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdmin = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Students', val: '1,245', color: 'blue' },
          { label: 'Pending Payments', val: '42', color: 'amber' },
          { label: 'Pending Certificates', val: '18', color: 'violet' },
          { label: 'Active Jobs', val: '24', color: 'green' },
        ].map((stat, i) => (
          <div key={i} className={`bg-white p-6 rounded-2xl shadow-sm border-l-4 border-${stat.color}-500 border-y border-r border-slate-200`}>
            <p className="text-sm font-semibold text-slate-500 mb-1">{stat.label}</p>
            <h3 className={`text-3xl font-extrabold text-${stat.color}-600`}>{stat.val}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-bold text-slate-800">Payment Verification Center</h2>
          <button className="text-sm font-semibold text-violet-600 hover:text-violet-800">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="p-4 border-b">UTR / Trans ID</th>
                <th className="p-4 border-b">Student</th>
                <th className="p-4 border-b">Event</th>
                <th className="p-4 border-b">Status</th>
                <th className="p-4 border-b text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 font-mono text-sm text-slate-600">{tx.utr}</td>
                  <td className="p-4">
                    <p className="font-bold text-slate-800">{tx.student}</p>
                    <p className="text-xs text-slate-500">{tx.usn}</p>
                  </td>
                  <td className="p-4 text-sm text-slate-600">{tx.event}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      tx.status === 'VERIFIED' ? 'bg-green-100 text-green-700' : 
                      tx.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>{tx.status}</span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {tx.status === 'PENDING' && (
                      <>
                        <button onClick={() => showToast(`Verified ${tx.utr}`)} className="px-3 py-1 bg-green-50 text-green-600 border border-green-200 rounded text-sm font-semibold hover:bg-green-100">Verify</button>
                        <button onClick={() => showToast(`Rejected ${tx.utr}`)} className="px-3 py-1 bg-red-50 text-red-600 border border-red-200 rounded text-sm font-semibold hover:bg-red-100">Reject</button>
                      </>
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

  const renderRecruiter = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Recruiter Portal</h2>
        <p className="text-slate-400">Discover top engineering talent from RIT Hassan.</p>
        <div className="mt-6 flex gap-4">
          <input type="text" placeholder="Search skills, USN, or roles..." className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-violet-500 focus:outline-none" />
          <button className="bg-violet-600 px-6 py-3 rounded-lg font-bold hover:bg-violet-700 transition">Search</button>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-slate-800">Your Active Job Postings</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockJobs.map(job => (
          <div key={job.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-lg text-slate-800">{job.role}</h4>
                <p className="text-slate-500">{job.company}</p>
              </div>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">{job.type}</span>
            </div>
            <div className="text-sm text-slate-600 mb-6 space-y-1">
              <p>📍 {job.location}</p>
              <p>💰 {job.stipend}</p>
            </div>
            <button className="w-full py-2 bg-slate-50 border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition">View Applicants (12)</button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPortfolio = () => (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden animate-fadeIn">
      <div className="h-48 bg-gradient-to-r from-violet-600 to-fuchsia-600"></div>
      <div className="px-8 pb-8">
        <div className="relative flex justify-between items-end -mt-16 mb-8">
          <div className="w-32 h-32 bg-white rounded-2xl p-2 shadow-lg border border-slate-100">
            <div className="w-full h-full bg-slate-200 rounded-xl flex items-center justify-center text-4xl font-bold text-slate-400">RS</div>
          </div>
          <button className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg flex items-center gap-2 hover:bg-slate-800">
            <Icons.FileText /> Download Resume
          </button>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Rahul Sharma</h1>
        <p className="text-xl text-slate-600 mb-6">Full-Stack Web Developer • AI Enthusiast</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4">About Me</h3>
              <p className="text-slate-600 leading-relaxed">Computer Science student at RIT Hassan passionate about building scalable web applications and exploring artificial intelligence. Proven track record in hackathons.</p>
            </section>
            <section>
              <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4">Verified Projects</h3>
              <div className="p-4 border border-slate-200 rounded-xl">
                <h4 className="font-bold text-slate-800 mb-1">RIT CareerHub AI</h4>
                <p className="text-sm text-slate-600 mb-3">A centralized platform for placements and hackathons.</p>
                <div className="flex gap-2">
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">React</span>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">Tailwind</span>
                </div>
              </div>
            </section>
          </div>
          <div className="space-y-8">
            <section>
              <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4">Education</h3>
              <div>
                <p className="font-bold text-slate-800">B.E. Computer Science</p>
                <p className="text-sm text-slate-600">Rajeev Institute of Technology</p>
                <p className="text-xs text-slate-400 mt-1">2021 - 2025</p>
              </div>
            </section>
            <section>
              <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'React', 'Node.js', 'MongoDB', 'Python'].map(skill => (
                  <span key={skill} className="bg-violet-50 text-violet-700 border border-violet-200 px-3 py-1 rounded-full text-xs font-bold">{skill}</span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPayment = () => (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-fadeIn">
      <div className="bg-slate-900 text-white p-6 text-center">
        <h2 className="text-2xl font-bold mb-1">Event Registration</h2>
        <p className="text-violet-300 text-sm font-medium">DEMO PAYMENT MODE</p>
      </div>
      <div className="p-8 text-center">
        <p className="text-slate-600 mb-2">Registration for</p>
        <p className="text-xl font-extrabold text-slate-900 mb-6">CodeStorm 2026</p>
        
        <div className="flex justify-center mb-6">
          <div className="w-56 h-56 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center p-4">
             <div className="w-full h-full bg-slate-200 rounded flex items-center justify-center text-slate-400 font-bold text-sm text-center">
               [Upload actual<br/>QR Code Here]
             </div>
          </div>
        </div>
        
        <div className="bg-blue-50 text-blue-700 text-xs p-3 rounded-lg text-left mb-6 font-medium">
          Scan the QR above. After paying, enter your 12-digit UTR/Transaction ID below to verify your registration.
        </div>

        <form onSubmit={(e) => { e.preventDefault(); showToast('Payment details submitted for verification!'); setTimeout(()=>setActiveView('student'), 2000); }}>
          <div className="text-left mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">Transaction ID / UTR (12 Digits)</label>
            <input type="text" required minLength={12} maxLength={12} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:bg-white outline-none transition" placeholder="e.g. 312345678901" />
          </div>
          <button type="submit" className="w-full bg-violet-600 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-violet-700 transition shadow-lg shadow-violet-600/30">Submit for Verification</button>
        </form>
      </div>
    </div>
  );

  const renderResume = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center max-w-3xl mx-auto animate-fadeIn">
      <div className="w-16 h-16 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center mx-auto mb-6"><Icons.Sparkles /></div>
      <h2 className="text-3xl font-bold text-slate-900 mb-4">AI Resume Builder</h2>
      <p className="text-slate-600 mb-8 max-w-lg mx-auto">Our AI analyzes your MyRITfolio data to generate an ATS-optimized resume for your target role.</p>
      
      <div className="text-left max-w-md mx-auto space-y-4 mb-8">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Target Job Role</label>
          <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none">
            <option>Software Engineer</option>
            <option>Data Analyst</option>
            <option>Cybersecurity</option>
          </select>
        </div>
      </div>
      
      <button onClick={() => showToast('AI is generating your resume... (Demo)')} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg">Generate Resume Magic</button>
    </div>
  );

  // --- MAIN LAYOUT ---
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-violet-200">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-4 right-4 bg-slate-900 text-white px-6 py-3 rounded-lg shadow-2xl z-50 flex items-center gap-3 animate-fadeIn">
          <Icons.CheckCircle /> {toast}
        </div>
      )}

      {/* Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveView('home')}>
              <img src="rit_college_logo_4k.png" alt="RIT Logo" className="h-10 w-10 object-contain bg-slate-50 rounded-full p-1 border border-slate-200" onError={(e) => e.target.style.display='none'} />
              <span className="font-extrabold text-xl tracking-tight text-slate-800">CareerHub <span className="text-violet-600">AI</span></span>
            </div>
            
            {/* Desktop Tabs */}
            <div className="hidden md:flex space-x-2 bg-slate-100 p-1 rounded-xl">
              {[
                { id: 'home', label: 'Home', icon: <Icons.Home /> },
                { id: 'student', label: 'Student', icon: <Icons.User /> },
                { id: 'admin', label: 'Admin', icon: <Icons.Shield /> },
                { id: 'recruiter', label: 'Recruiter', icon: <Icons.Briefcase /> },
              ].map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)} 
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2 ${
                    activeView === tab.id ? 'bg-white text-violet-700 shadow-sm' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                  }`}
                >
                  <span className="[&>svg]:w-4 [&>svg]:h-4">{tab.icon}</span> {tab.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button (Visual Only for Demo) */}
            <div className="md:hidden flex items-center">
              <button className="text-slate-500 hover:text-slate-800 focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Rendering */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {activeView === 'home' && renderHome()}
        {activeView === 'student' && renderStudent()}
        {activeView === 'admin' && renderAdmin()}
        {activeView === 'recruiter' && renderRecruiter()}
        {activeView === 'portfolio' && renderPortfolio()}
        {activeView === 'payment' && renderPayment()}
        {activeView === 'resume' && renderResume()}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm">
          <p>© 2026 RIT CareerHub AI. Built for CodeStorm 2026.</p>
          <p className="mt-2 text-xs">Rajeev Institute of Technology, Hassan, Karnataka.</p>
        </div>
      </footer>
    </div>
  );
};
