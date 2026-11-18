const App = () => {
  const [activeTab, setActiveTab] = React.useState('home');

  // Simple SVG Icons to replace Lucide React imports
  const Icons = {
    Home: () => <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>,
    User: () => <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>,
    CreditCard: () => <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>,
    Shield: () => <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>,
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Navigation */}
      <nav className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3">
              <img src="rit_college_logo_4k.png" alt="RIT Logo" className="h-10 w-10 object-contain bg-white rounded-full p-1" onError={(e) => { e.target.style.display = 'none'; }} />
              <span className="font-bold text-xl tracking-tight">CareerHub <span className="text-violet-400">AI</span></span>
            </div>
            <div className="hidden md:flex space-x-1">
              <button onClick={() => setActiveTab('home')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${activeTab === 'home' ? 'bg-violet-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
                <Icons.Home /> Home
              </button>
              <button onClick={() => setActiveTab('student')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${activeTab === 'student' ? 'bg-violet-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
                <Icons.User /> Student
              </button>
              <button onClick={() => setActiveTab('payment')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${activeTab === 'payment' ? 'bg-violet-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
                <Icons.CreditCard /> Pay Fee
              </button>
              <button onClick={() => setActiveTab('admin')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${activeTab === 'admin' ? 'bg-violet-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
                <Icons.Shield /> Admin
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="relative h-64 bg-slate-900 w-full overflow-hidden">
                <img src="codestorm_2026_banner_4k.jpg" alt="CodeStorm 2026" className="w-full h-full object-cover opacity-80" onError={(e) => { e.target.style.display = 'none'; }} />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-t from-slate-900/80 to-transparent">
                  <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">
                    One College. <span className="text-violet-400">Every Student.</span> A Better Career.
                  </h1>
                  <p className="text-lg text-slate-200 max-w-2xl mx-auto drop-shadow">
                    The centralized career development platform for engineering students at RIT Hassan.
                  </p>
                </div>
              </div>
            </div>

            {/* Organizers Section */}
            <div className="text-center space-y-6">
              <h3 className="text-xl font-bold text-slate-800 uppercase tracking-wider">In Partnership With</h3>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                <img src="cse_dept_rit_logo_4k.jpg" alt="CSE Department RIT" className="h-24 md:h-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" onError={(e) => { e.target.style.display = 'none'; }} />
                <img src="gdg_on_campus_rit_hassan_logo_4k.jpg" alt="GDG on Campus RIT Hassan" className="h-24 md:h-32 object-contain grayscale hover:grayscale-0 transition-all duration-300" onError={(e) => { e.target.style.display = 'none'; }} />
              </div>
            </div>
          </div>
        )}

        {/* STUDENT DASHBOARD TAB */}
        {activeTab === 'student' && (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Student Dashboard</h2>
            <p className="text-slate-600 mb-6">Welcome to your personalized CareerHub portal.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 border rounded-lg bg-slate-50 hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-bold text-lg mb-2">MyRITfolio</h3>
                <p className="text-sm text-slate-500">Manage your public portfolio and achievements.</p>
              </div>
              <div className="p-6 border rounded-lg bg-slate-50 hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-bold text-lg mb-2">AI Resume Builder</h3>
                <p className="text-sm text-slate-500">Generate an ATS-friendly professional resume.</p>
              </div>
              <div className="p-6 border rounded-lg bg-slate-50 hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-bold text-lg mb-2">Events & Hackathons</h3>
                <p className="text-sm text-slate-500">Register for upcoming college events.</p>
              </div>
            </div>
          </div>
        )}

        {/* PAYMENT TAB */}
        {activeTab === 'payment' && (
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white p-4 text-center">
              <h2 className="text-xl font-bold">Complete Registration Payment</h2>
              <p className="text-violet-300 text-sm mt-1">DEMO PAYMENT MODE</p>
            </div>
            <div className="p-6 text-center">
              <p className="text-slate-600 mb-4">Registration for: <span className="font-semibold text-slate-900">CodeStorm 2026</span></p>
              <div className="inline-block p-4 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 mb-6">
                <div className="w-48 h-48 bg-slate-200 flex items-center justify-center rounded-lg text-slate-500 text-sm">
                  [ QR Code Image Placehoder ]
                </div>
              </div>
              <div className="text-left mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Transaction ID / UTR (12 Digits)</label>
                <input type="text" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-violet-500" placeholder="e.g. 312345678901" />
              </div>
              <button className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors">Submit Payment Details</button>
            </div>
          </div>
        )}

        {/* ADMIN TAB */}
        {activeTab === 'admin' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 p-6 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">Transaction IDs Management</h2>
            </div>
            <div className="p-6 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-sm uppercase tracking-wider text-slate-500 border-b border-slate-200">
                    <th className="p-4 font-semibold">UTR ID</th>
                    <th className="p-4 font-semibold">Student</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="p-4 font-mono text-sm">312345678901</td>
                    <td className="p-4">Rahul Sharma<br/><span className="text-xs text-slate-500">4RH21CS001</span></td>
                    <td className="p-4"><span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full font-medium">Pending</span></td>
                    <td className="p-4 text-right">
                      <button className="text-xs px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded hover:bg-green-100 mr-2">Verify</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};