import { useState, useEffect } from 'react';
import {
  Menu, X, MapPin, Phone, Clock, Users, Star,
  Dumbbell, Heart, Zap, Target, Award, ArrowRight, Check, Sparkles, Play, XCircle
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [contactData, setContactData] = useState({ name: '', email: '', phone: '', message: '' });
  const [contactStatus, setContactStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'classes', 'trainers', 'pricing', 'contact'];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('contacts').insert([{ ...contactData, status: 'new' }]);
      if (error) throw error;
      setContactStatus('success');
      setContactData({ name: '', email: '', phone: '', message: '' });
    } catch { setContactStatus('error'); }
    setIsSubmitting(false);
  };

  const features = [
    { icon: <Dumbbell className="w-6 h-6 sm:w-7 sm:h-7" />, title: 'Modern Equipment', description: 'State-of-the-art machines and free weights for every fitness level' },
    { icon: <Users className="w-6 h-6 sm:w-7 sm:h-7" />, title: 'Group Classes', description: 'Over 50 weekly classes from yoga to high-intensity training' },
    { icon: <Target className="w-6 h-6 sm:w-7 sm:h-7" />, title: 'Personal Training', description: 'Certified trainers dedicated to helping you reach your goals' },
    { icon: <Clock className="w-6 h-6 sm:w-7 sm:h-7" />, title: '24/7 Access', description: 'Work out on your schedule with round-the-clock access' }
  ];

  const classes = [
    { name: 'HIIT Extreme', category: 'Cardio', duration: '45 min', level: 'Advanced', description: 'High-intensity intervals to maximize calorie burn', image: 'https://images.pexels.com/photos/4162491/pexels-photo-4162491.jpeg?auto=compress&w=600', schedule: 'Mon, Wed, Fri - 6:00 AM' },
    { name: 'Power Yoga', category: 'Mind & Body', duration: '60 min', level: 'All Levels', description: 'Build strength and flexibility through dynamic flows', image: 'https://images.pexels.com/photos/1812964/pexels-photo-1812964.jpeg?auto=compress&w=600', schedule: 'Tue, Thu - 7:00 AM' },
    { name: 'Strength Circuit', category: 'Strength', duration: '50 min', level: 'Intermediate', description: 'Full-body resistance training', image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&w=600', schedule: 'Mon-Fri - 8:00 AM' },
    { name: 'Spin & Burn', category: 'Cardio', duration: '45 min', level: 'All Levels', description: 'Indoor cycling with energizing music', image: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&w=600', schedule: 'Mon-Sat - 5:30 AM' },
    { name: 'Boxing Fit', category: 'Combat', duration: '55 min', level: 'Intermediate', description: 'Boxing fundamentals with cardio conditioning', image: 'https://images.pexels.com/photos/4761679/pexels-photo-4761679.jpeg?auto=compress&w=600', schedule: 'Tue, Thu, Sat - 10:00 AM' },
    { name: 'Core & Flex', category: 'Recovery', duration: '30 min', level: 'All Levels', description: 'Core strengthening with mobility work', image: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&w=600', schedule: 'Daily - 7:00 AM' }
  ];

  const trainers = [
    { name: 'Marcus Johnson', role: 'Head Trainer & Strength Coach', bio: '15 years experience, NASM certified', specialties: ['Strength Training', 'Athletic Performance'], image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&w=400' },
    { name: 'Sarah Chen', role: 'Yoga & Pilates Instructor', bio: 'RYT-500 certified, 10+ years teaching', specialties: ['Vinyasa Yoga', 'Pilates'], image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&w=400' },
    { name: 'Derek Williams', role: 'HIIT & Cardio Specialist', bio: 'ACE certified, CrossFit Level 2', specialties: ['HIIT', 'CrossFit'], image: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&w=400' },
    { name: 'Elena Rodriguez', role: 'Personal Trainer & Boxing Coach', bio: 'Former competitive boxer, ISSA certified', specialties: ['Boxing', 'Functional Training'], image: 'https://images.pexels.com/photos/3837638/pexels-photo-3837638.jpeg?auto=compress&w=400' }
  ];

  const pricingPlans = [
    { name: 'Basic', price: '29', description: 'Perfect for getting started', features: ['Full gym access', 'Locker room access', 'Free fitness assessment', 'Mobile app access'], popular: false },
    { name: 'Premium', price: '59', description: 'Most popular membership', features: ['All Basic features', 'Unlimited group classes', 'Sauna & steam room', 'Guest passes (2/month)', 'Free parking'], popular: true },
    { name: 'Elite', price: '149', description: 'Ultimate fitness experience', features: ['All Premium features', '4 PT sessions/month', 'Nutrition planning', 'Priority booking', '24/7 access'], popular: false }
  ];

  const stats = [
    { value: '15K+', label: 'Active Members' },
    { value: '50+', label: 'Weekly Classes' },
    { value: '25', label: 'Expert Trainers' },
    { value: '12', label: 'Years Running' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl">
            <button onClick={() => setVideoModalOpen(false)} className="absolute -top-12 right-0 text-white hover:text-cyan-400 transition-colors">
              <XCircle className="w-10 h-10" />
            </button>
            <div className="relative rounded-3xl overflow-hidden bg-slate-900 aspect-video">
              <img
                src="https://images.pexels.com/photos/839463/pexels-photo-839463.jpeg?auto=compress&w=1200"
                alt="Gym tour"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
                <div className="text-center text-white">
                  <Play className="w-20 h-20 mx-auto mb-4 text-cyan-400" />
                  <p className="text-xl font-semibold">Gym Tour Video</p>
                  <p className="text-slate-400 text-sm mt-2">Video placeholder - connect your video here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-gradient-to-br from-cyan-400 to-teal-500 p-2 sm:p-2.5 rounded-lg sm:rounded-xl shadow-lg shadow-cyan-500/30">
                <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-white">APEX<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">FITNESS</span></span>
            </div>
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {['home', 'about', 'classes', 'trainers', 'pricing', 'contact'].map(id => (
                <button key={id} onClick={() => scrollToSection(id)} className={`text-sm font-medium capitalize transition-colors ${activeSection === id ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'}`}>{id}</button>
              ))}
              <button onClick={() => scrollToSection('pricing')} className="bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 px-5 lg:px-6 py-2 lg:py-2.5 rounded-full text-sm font-bold hover:from-amber-500 hover:to-orange-600 transition-all shadow-lg shadow-amber-500/30">Join Now</button>
            </div>
            <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
          </div>
        </div>
        {mobileMenuOpen && <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10 px-4 py-4 space-y-1">{['home', 'about', 'classes', 'trainers', 'pricing', 'contact'].map(id => <button key={id} onClick={() => scrollToSection(id)} className="block w-full text-left px-4 py-3 text-slate-300 hover:text-cyan-400 capitalize rounded-xl hover:bg-white/5">{id}</button>)}</div>}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16 sm:pt-20">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/839463/pexels-photo-839463.jpeg?auto=compress&w=1920" alt="Gym" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-950/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
        </div>
        <div className="absolute top-1/4 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-56 sm:w-80 h-56 sm:h-80 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full mb-6 sm:mb-8">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-300 text-xs sm:text-sm font-semibold">Transform Your Body Today</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight">
              Unleash Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400">Full Potential</span>
            </h1>
            <p className="text-base sm:text-xl text-slate-400 mb-6 sm:mb-10 leading-relaxed">
              State-of-the-art equipment, world-class trainers, and a community that pushes you further. Your transformation starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button onClick={() => scrollToSection('pricing')} className="group bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-bold hover:from-amber-500 hover:to-orange-600 transition-all shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2">
                Start 7-Day Free Trial <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => setVideoModalOpen(true)} className="group border-2 border-slate-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-medium hover:border-cyan-500 hover:bg-cyan-500/10 transition-all flex items-center justify-center gap-2">
                <Play className="w-4 sm:w-5 h-4 sm:h-5" /> Watch Tour
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4 sm:gap-8 mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-slate-800">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">{s.value}</div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-slate-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-slate-600 rounded-full flex items-start justify-center p-1.5 sm:p-2"><div className="w-1 sm:w-1.5 h-2 sm:h-3 bg-cyan-400 rounded-full animate-pulse" /></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-cyan-400 text-xs sm:text-sm font-bold tracking-wider uppercase">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-2 mb-3 sm:mb-4">
              Everything You Need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Succeed</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">Premium equipment, expert guidance, and a motivating atmosphere for your fitness journey.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((f, i) => (
              <div key={i} className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl sm:rounded-3xl p-5 sm:p-7 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300">
                <div className="bg-gradient-to-br from-cyan-500 to-teal-500 w-12 sm:w-14 h-12 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-white mb-4 sm:mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/30">{f.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{f.title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 sm:mt-20 bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-emerald-500/10 border border-cyan-500/20 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-amber-400/10 rounded-full blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4"><Award className="w-6 sm:w-8 h-6 sm:h-8 text-amber-400" /><h3 className="text-2xl sm:text-3xl font-black text-white">Ready to Transform?</h3></div>
              <p className="text-slate-300 max-w-2xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base">Join 15,000+ members who've achieved their fitness goals. Start with a free 7-day trial.</p>
              <button onClick={() => scrollToSection('pricing')} className="bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 px-8 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-bold hover:from-amber-500 hover:to-orange-600 transition-all shadow-xl shadow-amber-500/30">Claim Your Free Trial</button>
            </div>
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section id="classes" className="py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.05),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-cyan-400 text-xs sm:text-sm font-bold tracking-wider uppercase">Our Programs</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-2 mb-3 sm:mb-4">
              Classes That <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Challenge You</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">From high-intensity cardio to mindful yoga, find the perfect class for your journey.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
            {classes.map((c, i) => (
              <div key={i} className="group bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300">
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold shadow-lg">{c.category}</div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-center mb-2 sm:mb-3">
                    <h3 className="text-lg sm:text-xl font-bold text-white">{c.name}</h3>
                    <span className="text-cyan-400 text-xs sm:text-sm font-semibold">{c.duration}</span>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm mb-3 sm:mb-4">{c.description}</p>
                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-slate-700/50">
                    <div className="flex items-center gap-1 sm:gap-2 text-slate-500 text-[10px] sm:text-xs"><Clock className="w-3 sm:w-4 h-3 sm:h-4" />{c.schedule}</div>
                    <span className="text-[10px] sm:text-xs text-slate-400 bg-slate-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">{c.level}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section id="trainers" className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-56 sm:w-80 h-56 sm:h-80 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-cyan-400 text-xs sm:text-sm font-bold tracking-wider uppercase">Meet Our Team</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-2 mb-3 sm:mb-4">
              Expert <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Trainers</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">Certified professionals bringing years of experience to every session.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-7">
            {trainers.map((t, i) => (
              <div key={i} className="group text-center sm:text-left">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden mb-4 sm:mb-5 bg-gradient-to-br from-slate-800 to-slate-900 max-w-xs mx-auto sm:max-w-none">
                  <img src={t.image} alt={t.name} className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 bg-gradient-to-t from-slate-900 to-transparent">
                    <h3 className="text-lg sm:text-xl font-bold text-white">{t.name}</h3>
                    <p className="text-cyan-400 text-xs sm:text-sm font-medium">{t.role}</p>
                  </div>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm mb-2 sm:mb-3">{t.bio}</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center sm:justify-start">{t.specialties.map((s, j) => <span key={j} className="text-[10px] sm:text-xs bg-slate-800/80 text-slate-300 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-slate-700/50">{s}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 sm:py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.05),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-cyan-400 text-xs sm:text-sm font-bold tracking-wider uppercase">Membership Plans</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-2 mb-3 sm:mb-4">
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Plan</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">Flexible options for every fitness goal. All plans include a 7-day free trial.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((p, i) => (
              <div key={i} className={`relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-300 ${p.popular ? 'bg-gradient-to-b from-amber-500/20 via-slate-800/50 to-slate-900/50 border-2 border-amber-400/50 lg:scale-105 shadow-2xl shadow-amber-500/20' : 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-cyan-500/40'}`}>
                {p.popular && <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 px-4 sm:px-5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold shadow-lg">MOST POPULAR</div>}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{p.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl sm:text-5xl font-black text-white">${p.price}</span>
                  <span className="text-slate-500 text-sm sm:text-base">/month</span>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm mb-6 sm:mb-8">{p.description}</p>
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 sm:gap-3 text-slate-300 text-sm sm:text-base">
                      <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center flex-shrink-0"><Check className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-white" /></div>
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => scrollToSection('contact')} className={`w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all ${p.popular ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 hover:from-amber-500 hover:to-orange-600 shadow-xl shadow-amber-500/30' : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'}`}>Start Free Trial</button>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-500 text-xs sm:text-sm mt-8 sm:mt-10">No contracts. Cancel anytime. 30-day money-back guarantee.</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-56 sm:w-80 h-56 sm:h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-cyan-400 text-xs sm:text-sm font-bold tracking-wider uppercase">Success Stories</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-2">Real <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Transformations</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-7">
            {[{ n: 'Jake M.', r: 'Lost 45 lbs', q: 'The trainers push you past your limits safely and effectively. Best decision ever!' }, { n: 'Maria L.', r: 'Gained muscle', q: 'The community is supportive and the classes are always challenging. Highly recommend!' }, { n: 'David K.', r: 'First marathon', q: 'From couch potato to marathon runner in 8 months. Apex made it possible.' }].map((t, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:border-cyan-500/30 transition-all">
                <div className="flex gap-1 mb-3 sm:mb-4">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 sm:w-5 h-4 sm:h-5 text-amber-400 fill-current" />)}</div>
                <p className="text-slate-300 mb-4 sm:mb-6 italic leading-relaxed text-sm sm:text-base">"{t.q}"</p>
                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-slate-700/50">
                  <span className="font-bold text-white text-sm sm:text-base">{t.n}</span>
                  <span className="text-cyan-400 text-xs sm:text-sm font-semibold">{t.r}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative">
        <div className="absolute bottom-0 left-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16">
            <div>
              <span className="text-cyan-400 text-xs sm:text-sm font-bold tracking-wider uppercase">Get In Touch</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-2 mb-4 sm:mb-6">Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Journey</span> Today</h2>
              <p className="text-slate-400 mb-8 sm:mb-10 text-sm sm:text-base">Ready to transform your life? Fill out the form and we'll schedule your free trial.</p>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4 group">
                  <div className="bg-gradient-to-br from-cyan-500/20 to-teal-500/20 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors flex-shrink-0"><MapPin className="w-5 sm:w-6 h-5 sm:h-6 text-cyan-400" /></div>
                  <div><h3 className="font-bold text-white text-sm sm:text-base">Location</h3><p className="text-slate-400 text-xs sm:text-sm">2450 Fitness Avenue, Suite 100</p><p className="text-slate-400 text-xs sm:text-sm">Los Angeles, CA 90015</p></div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4 group">
                  <div className="bg-gradient-to-br from-cyan-500/20 to-teal-500/20 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors flex-shrink-0"><Phone className="w-5 sm:w-6 h-5 sm:h-6 text-cyan-400" /></div>
                  <div><h3 className="font-bold text-white text-sm sm:text-base">Phone</h3><p className="text-slate-400 text-xs sm:text-sm">(323) 555-0199</p></div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4 group">
                  <div className="bg-gradient-to-br from-cyan-500/20 to-teal-500/20 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors flex-shrink-0"><Clock className="w-5 sm:w-6 h-5 sm:h-6 text-cyan-400" /></div>
                  <div><h3 className="font-bold text-white text-sm sm:text-base">Hours</h3><p className="text-slate-400 text-xs sm:text-sm">Mon-Fri: 5AM-11PM | Sat-Sun: 6AM-10PM</p><p className="text-cyan-400 text-xs font-medium">Elite members: 24/7 access</p></div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-700/50">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Contact Us</h3>
              {contactStatus === 'success' && <div className="bg-emerald-500/20 border border-emerald-500/30 px-4 py-3 rounded-xl mb-4 sm:mb-6"><p className="text-emerald-400 text-sm">Message sent! We'll contact you within 24 hours.</p></div>}
              {contactStatus === 'error' && <div className="bg-red-500/20 border border-red-500/30 px-4 py-3 rounded-xl mb-4 sm:mb-6"><p className="text-red-400 text-sm">Something went wrong. Please try again.</p></div>}
              <form onSubmit={handleContactSubmit} className="space-y-4 sm:space-y-5">
                <div><label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1 sm:mb-2">Full Name *</label><input type="text" required value={contactData.name} onChange={e => setContactData({ ...contactData, name: e.target.value })} className="w-full px-4 sm:px-5 py-2.5 sm:py-3.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all text-sm sm:text-base" placeholder="Your name" /></div>
                <div><label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1 sm:mb-2">Email *</label><input type="email" required value={contactData.email} onChange={e => setContactData({ ...contactData, email: e.target.value })} className="w-full px-4 sm:px-5 py-2.5 sm:py-3.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all text-sm sm:text-base" placeholder="your@email.com" /></div>
                <div><label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1 sm:mb-2">Phone</label><input type="tel" value={contactData.phone} onChange={e => setContactData({ ...contactData, phone: e.target.value })} className="w-full px-4 sm:px-5 py-2.5 sm:py-3.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all text-sm sm:text-base" placeholder="(555) 123-4567" /></div>
                <div><label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1 sm:mb-2">Message</label><textarea value={contactData.message} onChange={e => setContactData({ ...contactData, message: e.target.value })} rows={4} className="w-full px-4 sm:px-5 py-2.5 sm:py-3.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all resize-none text-sm sm:text-base" placeholder="Tell us about your fitness goals..." /></div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-3 sm:py-4 rounded-xl font-bold hover:from-cyan-600 hover:to-teal-600 transition-all disabled:opacity-50 shadow-xl shadow-cyan-500/20 text-sm sm:text-base">{isSubmitting ? 'Sending...' : 'Send Message'}</button>
              </form>
            </div>
          </div>
          <div className="mt-12 sm:mt-16 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-700/50 h-64 sm:h-96 relative">
            <img src="https://images.pexels.com/photos/258160/pexels-photo-258160.jpeg?auto=compress&w=1200" alt="Los Angeles city view" className="w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <a href="https://www.google.com/maps/search/2450+Fitness+Ave+Los+Angeles+CA" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold hover:from-cyan-600 hover:to-teal-600 transition-all shadow-xl shadow-cyan-500/30 flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                <MapPin className="w-4 sm:w-5 h-4 sm:h-5" /> Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 sm:gap-3 mb-4"><div className="bg-gradient-to-br from-cyan-400 to-teal-500 p-1.5 sm:p-2 rounded-lg sm:rounded-xl shadow-lg"><Dumbbell className="w-4 sm:w-5 h-4 sm:h-5 text-white" /></div><span className="text-lg sm:text-xl font-bold text-white">APEX<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">FITNESS</span></span></div>
              <p className="text-slate-500 text-xs sm:text-sm mb-6">Transforming lives through fitness since 2012.</p>
              <div className="flex gap-2 sm:gap-3">
                <a href="#" className="bg-slate-800/50 p-2 sm:p-2.5 rounded-lg sm:rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-all border border-slate-700/50"><Facebook className="w-4 sm:w-5 h-4 sm:h-5" /></a>
                <a href="#" className="bg-slate-800/50 p-2 sm:p-2.5 rounded-lg sm:rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-all border border-slate-700/50"><Instagram className="w-4 sm:w-5 h-4 sm:h-5" /></a>
                <a href="#" className="bg-slate-800/50 p-2 sm:p-2.5 rounded-lg sm:rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-all border border-slate-700/50"><Heart className="w-4 sm:w-5 h-4 sm:h-5" /></a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
              <ul className="space-y-2 sm:space-y-3">{['About', 'Classes', 'Trainers', 'Pricing', 'Contact'].map(l => <li key={l}><button onClick={() => scrollToSection(l.toLowerCase())} className="text-slate-400 hover:text-cyan-400 transition-colors text-xs sm:text-sm">{l}</button></li>)}</ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">Programs</h4>
              <ul className="space-y-2 sm:space-y-3 text-slate-400 text-xs sm:text-sm">
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Personal Training</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Group Fitness</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Nutrition Coaching</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Corporate Wellness</li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">Newsletter</h4>
              <p className="text-slate-400 text-xs sm:text-sm mb-3 sm:mb-4">Get fitness tips and exclusive offers.</p>
              <form onSubmit={async (e) => { e.preventDefault(); if(supabase) { await supabase.from('newsletter_subscribers').insert([{ email }]); setEmail(''); }} } className="flex gap-2">
                <input type="email" required placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} className="flex-1 bg-slate-800/80 border border-slate-700 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-white focus:ring-2 focus:ring-cyan-500 outline-none" />
                <button type="submit" className="bg-gradient-to-r from-cyan-500 to-teal-500 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl hover:from-cyan-600 hover:to-teal-600 transition-all"><Heart className="w-3 sm:w-4 h-3 sm:h-4 text-white" /></button>
              </form>
            </div>
          </div>
          <div className="border-t border-slate-800/50 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-slate-500 text-xs sm:text-sm">2024 Apex Fitness. All rights reserved.</p>
            <div className="flex gap-4 sm:gap-6 text-slate-500 text-xs sm:text-sm">
              <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;