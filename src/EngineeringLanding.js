import { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ChevronDown, ArrowRight, Code, Database, 
  Cpu, Globe, LineChart, Activity, CheckCircle,
  Twitter, Facebook, Instagram, Linkedin, MapPin, Phone, Mail,
  Target, Hexagon, Triangle, Award, Users, MessageSquare
} from 'lucide-react';

// Optimized LazyImage component
const LazyImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!imgRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const img = new Image();
          img.onload = () => setLoaded(true);
          img.onerror = () => setError(true);
          img.src = src;
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    
    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [src]);

  return (
    <div ref={imgRef} className={`${className} overflow-hidden`}>
      {loaded ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
      ) : error ? (
        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
          <div className="text-center text-gray-600">
            <div className="text-2xl sm:text-4xl mb-2">🏗️</div>
            <p className="text-xs sm:text-sm">Image placeholder</p>
          </div>
        </div>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
      )}
    </div>
  );
};

// Animated counter
const Counter = ({ value, label, icon: Icon }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    if (hasAnimated) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          const target = parseInt(value);
          const duration = 2000;
          const startTime = Date.now();
          
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            setCount(Math.floor(target * progress));
            if (progress < 1) requestAnimationFrame(animate);
          };
          
          requestAnimationFrame(animate);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);
  
  return (
    <div ref={ref} className="text-center group">
      <div className="bg-amber-50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 group-hover:bg-amber-600 group-hover:shadow-lg transition-all duration-300">
        <Icon className="mx-auto h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-amber-600 group-hover:text-white transition-colors" />
      </div>
      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-600">{count}</div>
      <p className="text-gray-700 mt-1 sm:mt-2 text-sm sm:text-base">{label}</p>
    </div>
  );
};

// Reusable components
const ServiceCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg border-l-4 border-transparent hover:border-amber-500 transition-all duration-300 group">
    <div className="bg-amber-50 rounded-lg w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-amber-600 transition-colors">
      <Icon className="text-amber-600 h-6 w-6 sm:h-8 sm:w-8 group-hover:text-white transition-colors" />
    </div>
    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">{title}</h3>
    <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">{description}</p>
    <div className="flex items-center text-amber-600 font-medium group-hover:translate-x-2 transition-transform text-sm sm:text-base">
      <span>Learn more</span>
      <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
    </div>
  </div>
);

const ProjectCard = ({ image, title, category, description }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
    <div className="relative h-40 sm:h-48 lg:h-56">
      <LazyImage src={image} alt={title} className="w-full h-full group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute inset-0 bg-amber-900 bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="bg-white text-amber-600 px-3 py-2 sm:px-4 rounded-full font-medium flex items-center text-sm sm:text-base">
          View Project <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
        </button>
      </div>
    </div>
    <div className="p-4 sm:p-6">
      <div className="text-amber-600 text-xs sm:text-sm font-medium mb-2">{category}</div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm sm:text-base">{description}</p>
    </div>
  </div>
);

const TestimonialCard = ({ text, author, position, company }) => (
  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-full">
    <div className="text-amber-600 text-2xl sm:text-4xl font-serif mb-3 sm:mb-4">"</div>
    <p className="text-gray-700 italic mb-4 sm:mb-6 text-sm sm:text-base">{text}</p>
    <div>
      <p className="font-semibold text-gray-800 text-sm sm:text-base">{author}</p>
      <p className="text-gray-500 text-xs sm:text-sm">{position}, {company}</p>
    </div>
  </div>
);

// Data
const services = [
  { icon: Code, title: "Software Development", description: "Custom software solutions tailored to meet your business needs with cutting-edge technologies." },
  { icon: Database, title: "Data Engineering", description: "Transform your data into strategic assets with comprehensive data engineering solutions." },
  { icon: Cpu, title: "IoT Solutions", description: "Connect your devices and harness real-time data with innovative IoT solutions." },
  { icon: Globe, title: "Cloud Services", description: "Scalable, secure cloud solutions that drive efficiency and innovation for your business." },
  { icon: LineChart, title: "AI & Machine Learning", description: "Leverage AI to automate processes and gain valuable insights from your data." },
  { icon: Activity, title: "Process Automation", description: "Streamline workflows and increase productivity with intelligent automation systems." }
];

const projects = [
  { image: "/Industrial.jpeg", title: "Industrial IoT Platform", category: "IoT / Cloud", description: "Connected manufacturing equipment to improve operational efficiency by 35%." },
  { image: "/Financial.jpeg", title: "Financial Analytics Dashboard", category: "Data / Analytics", description: "Real-time financial data visualization for a Fortune 500 company." },
  { image: "/Smart City.jpeg", title: "Smart City Infrastructure", category: "IoT / Software", description: "Integrated transportation and utility management system for urban areas." },
  { image: "/Ai-Powered.png", title: "AI-Powered Customer Service", category: "AI / ML", description: "Natural language processing solution that reduced support costs by 40%." }
];

const testimonials = [
  { text: "TechForge transformed our manufacturing processes with their IoT solution. We've seen a 30% increase in productivity and significant cost savings.", author: "Michael Johnson", position: "CTO", company: "Global Manufacturing Inc." },
  { text: "The team's expertise in cloud architecture helped us scale our operations efficiently. Their attention to detail and commitment to quality is unmatched.", author: "Sarah Chen", position: "VP of Engineering", company: "DataStream Systems" },
  { text: "Working with TechForge on our AI initiative was a game-changer. Their innovative approach and technical excellence exceeded our expectations.", author: "Robert Taylor", position: "Director of Innovation", company: "FutureTech Solutions" }
];

const stats = [
  { icon: Users, value: "1250", label: "Projects Completed" },
  { icon: Award, value: "25", label: "Years Experience" },
  { icon: MessageSquare, value: "98", label: "Client Satisfaction" },
  { icon: Globe, value: "45", label: "Countries Served" }
];

const principles = [
  { icon: Target, title: "Precision", description: "Engineering excellence through meticulous attention to detail" },
  { icon: Hexagon, title: "Structural Integrity", description: "Building solutions with rock-solid foundations" },
  { icon: Triangle, title: "Innovation", description: "Pushing boundaries with forward-thinking approaches" },
  { icon: CheckCircle, title: "Quality Assurance", description: "Systematic processes that ensure quality and scalability" }
];

const contactInfo = [
  { icon: MapPin, title: "Location", value: "123 Innovation Drive, Tech Park" },
  { icon: Phone, title: "Phone", value: "+1 (555) 123-4567" },
  { icon: Mail, title: "Email", value: "info@techforge.com" }
];

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" }
];

export default function TechForgeLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Optimized scroll handler
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          
          const sections = document.querySelectorAll('section');
          const scrollPosition = window.scrollY + 100;

          sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              setActiveSection(section.id);
            }
          });
          
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  const NavLink = ({ id, label }) => (
    <button 
      onClick={() => scrollToSection(id)}
      className={`px-2 sm:px-3 py-1 transition-colors duration-300 text-sm sm:text-base ${
        activeSection === id 
          ? 'text-amber-600 border-b-2 border-amber-600' 
          : isScrolled 
            ? 'text-gray-800 hover:text-amber-600' 
            : 'text-white hover:text-amber-200'
      }`}
    >
      {label}
    </button>
  );

  const SectionTitle = ({ subtitle, title, description, center = false }) => (
    <div className={`${center ? 'text-center' : ''} mb-8 sm:mb-12`}>
      <div className="inline-block bg-amber-100 px-3 py-1 text-xs sm:text-sm font-semibold text-amber-800 rounded-lg mb-3 sm:mb-4">
        {subtitle}
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
        {title}
      </h2>
      {description && (
        <p className={`text-gray-600 text-sm sm:text-base ${center ? 'max-w-2xl mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  );

  return (
    <div className="font-sans bg-gray-50">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-3 sm:py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className={`text-xl sm:text-2xl font-bold transition-colors ${
              isScrolled ? 'text-amber-600' : 'text-white'
            }`}>
              Tech<span className="text-amber-400">Forge</span>
            </div>
            
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
              {['home', 'about', 'services', 'projects', 'testimonials', 'contact'].map(id => (
                <NavLink key={id} id={id} label={id.charAt(0).toUpperCase() + id.slice(1)} />
              ))}
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-amber-600 text-white px-4 sm:px-6 py-2 rounded-full hover:bg-amber-700 transition-all duration-300 text-sm sm:text-base"
              >
                Get Started
              </button>
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden transition-colors ${
                isScrolled ? 'text-amber-600' : 'text-white'
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white shadow-lg">
            <div className="p-4 space-y-3">
              {['home', 'about', 'services', 'projects', 'testimonials', 'contact'].map(id => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="block w-full text-left py-2 text-gray-800 hover:text-amber-600 transition-colors"
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('contact')}
                className="w-full bg-amber-600 text-white px-4 py-2 rounded-full hover:bg-amber-700 transition-all duration-300 mt-4"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 border-4 sm:border-8 border-amber-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/3 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 border-2 border-amber-600 rounded opacity-70"></div>
        </div>
        
        <div className="min-h-screen flex items-center py-20 sm:py-0">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-4">
                  <div className="h-1 w-8 sm:w-12 bg-amber-500 mr-3 sm:mr-4"></div>
                  <span className="text-amber-400 uppercase tracking-wider font-semibold text-xs sm:text-sm">Engineering Excellence</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                  Build the <span className="text-amber-400">Future</span> with Precision
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-300">
                  Innovative engineering solutions for tomorrow's challenges
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="bg-amber-600 text-white px-6 sm:px-8 py-3 rounded-full hover:bg-amber-500 transition-all duration-300"
                  >
                    Explore Services
                  </button>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="border-2 border-amber-400 text-amber-400 px-6 sm:px-8 py-3 rounded-full hover:bg-amber-400 hover:text-gray-900 transition-all duration-300"
                  >
                    Contact Us
                  </button>
                </div>
              </div>
              
              <div className="flex justify-center order-first lg:order-last">
                <div className="relative w-full max-w-sm sm:max-w-md">
                  <LazyImage 
                    src="/Engineering.jpeg" 
                    alt="Engineering visualization" 
                    className="rounded-xl shadow-xl w-full h-60 sm:h-80"
                  />
                  <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-amber-600 text-white p-2 rounded-full animate-pulse">
                    <Target className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button onClick={() => scrollToSection('about')} className="text-white hover:text-amber-400 transition-colors">
            <ChevronDown size={24} className="sm:w-9 sm:h-9" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <SectionTitle 
                subtitle="About Us"
                title="Engineering Excellence Since 1999"
              />
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                TechForge is a leading engineering firm specializing in software development, IoT solutions, and advanced analytics. With over two decades of experience, we've delivered innovative solutions across industries worldwide.
              </p>
              <div className="space-y-3 sm:space-y-4">
                {['ISO 9001 Certified', 'Award-winning solutions', 'Global team of experts'].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="text-amber-600 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4 order-1 lg:order-2">
              {stats.map((stat, index) => (
                <Counter key={index} {...stat} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle 
            subtitle="Our Principles"
            title="Engineering Excellence"
            description="The core principles that drive our engineering approach"
            center
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {principles.map((principle, index) => (
              <div key={index} className="text-center group">
                <div className="bg-amber-50 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-amber-600 transition-colors">
                  <principle.icon className="h-8 w-8 sm:h-10 sm:w-10 text-amber-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{principle.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle 
            subtitle="Our Services"
            title="Comprehensive Engineering Solutions"
            description="From concept to deployment, we deliver end-to-end solutions"
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle 
            subtitle="Our Work"
            title="Featured Projects"
            description="Real-world solutions that drive business success"
            center
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle 
            subtitle="Client Testimonials"
            title="What Our Clients Say"
            center
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Get In Touch</h2>
              <p className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base">Ready to start your next project? Contact us today.</p>
              
              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3 sm:space-x-4">
                    <div className="bg-amber-600 p-2 rounded-lg flex-shrink-0">
                      <info.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base">{info.title}</h4>
                      <p className="text-gray-300 text-sm sm:text-base">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex space-x-3 sm:space-x-4 mt-6 sm:mt-8">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.href}
                    className="bg-amber-600 p-2 rounded-lg hover:bg-amber-500 transition-colors flex-shrink-0"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-amber-500 text-sm sm:text-base"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-amber-500 text-sm sm:text-base"
              />
              <textarea
                rows={5}
                placeholder="Your Message"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-amber-500 text-sm sm:text-base"
              />
              <button className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-500 transition-colors font-medium text-sm sm:text-base">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="text-xl sm:text-2xl font-bold mb-4 md:mb-0">
              Tech<span className="text-amber-400">Forge</span>
            </div>
            <div className="text-gray-400">
              <p className="text-sm sm:text-base">&copy; 2024 Developed by David. All rights reserved.</p>
              <p className="text-xs sm:text-sm mt-1">Engineering Excellence Since 1999</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}