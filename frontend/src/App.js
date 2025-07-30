import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import './App.css';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentPage, setCurrentPage] = useState('portfolio');
  const [activePoemTab, setActivePoemTab] = useState('long');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    let lastActiveSection = 'home';
    let lastScrolled = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const currentScrolled = scrollY > 50;
          
          // Only update if state actually changed
          if (currentScrolled !== lastScrolled) {
            setIsScrolled(currentScrolled);
            lastScrolled = currentScrolled;
          }
          
          const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
          
          // Check if we're near the bottom of the page
          const isNearBottom = (window.innerHeight + scrollY) >= (document.body.offsetHeight - 100);
          
          let currentSection = lastActiveSection;
          
          if (isNearBottom) {
            currentSection = 'contact';
          } else {
            // Find the section that's currently in view with better detection
            const sectionElements = sections.map(section => {
              const element = document.getElementById(section);
              if (element) {
                const rect = element.getBoundingClientRect();
                return {
                  section,
                  top: rect.top,
                  bottom: rect.bottom,
                  height: rect.height
                };
              }
              return null;
            }).filter(Boolean);

            // Find the section that's most visible
            const visibleSection = sectionElements.find(({ top, bottom }) => {
              return top <= 200 && bottom >= 200;
            });

            if (visibleSection) {
              currentSection = visibleSection.section;
            }
          }
          
          // Only update if section actually changed
          if (currentSection !== lastActiveSection) {
            setActiveSection(currentSection);
            lastActiveSection = currentSection;
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  // Optimized Animation variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120
      }
    }
  }), []);

  const slideVariants = useMemo(() => ({
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120
      }
    }
  }), []);

  const longPoems = [
    {
      title: "Chasing the Dawn",
      content: `Beneath the stars, I wonder why,
The moon will wink and say goodbye.
I spread my wings, I long to fly,
To pierce the dark and learn to fly.

The world is wide, but still I cry,
For fleeting dreams that fade and die.
Yet through it all, I cant deny,
I'll chase the dawn and touch the sky.`,
      date: "2025"
    }
  ];

  const shortPoems = [
    {
      title: "Women",
      content: `Women,
You're a poem.
Written in ink,
After a drink.`,
      date: "2023"
    }
  ];

  const projects = [
    {
      title: "Wifi-FTP",
      description: "Web-interfaced file transfer software using Python and HTML for seamless WiFi/LAN file sharing over intranet.",
      tech: ["Python", "HTML", "Networking", "Web Interface"],
      github: "https://github.com/clamesys/Wifi-FTP",
      image: "https://opengraph.githubassets.com/1398db6a50ad70aa4bbfd5a7b760c050c00793beb9ee46bfa83342c99f0425b1/clamesys/Wifi-FTP"
    },
    {
      title: "Secure Authentication System",
      description: "A professional-grade authentication system implementing secure user registration, login, and session management with JWT.",
      tech: ["Python (Flask)", "JWT Authentication", "Role-Based Access Control (RBAC)"],
      github: "https://github.com/clamesys/Secure-Authentication-System",
      image: "https://images.unsplash.com/photo-1688986550777-26427d87a1a3"
    },
    {
      title: "Real-Time Stock Market Dashboard",
      description: "A professional, interactive dashboard for tracking and visualizing live stock market data built with Python and Streamlit.",
      tech: ["Web Scraping", "Streamlit", "Python"],
      github: "https://github.com/clamesys/Real-Time-Stock-Market-Dashboard",
      image: "https://raw.githubusercontent.com/clamesys/Real-Time-Stock-Market-Dashboard/refs/heads/main/ss/2.png"
    },
    {
      title: "IoT Certificate Lifecycle",
      description: "This project demonstrates the certificate lifecycle for IoT devices in a oneM2M compliant system.",
      tech: ["Cryptography", "Python", "Data Security", "Certificate Authority"],
      github: "https://github.com/clamesys/IoT-Cert-Life",
      image: "https://images.unsplash.com/photo-1645760051467-9d61131d133e"
    }
  ];

  const skills = {
    "Programming": ["Python", "C", "Linux", "Bash", "Data Structures", "Algorithms"],
    "Cybersecurity": ["Digital Forensics", "Ethical Hacking", "Cryptography", "Vulnerability Assessment", "SIEM", "Malware Analysis"],
    "IoT & Hardware": ["PCB Design", "Embedded Systems", "3D Modeling", "Prototyping", "Sensor Integration", "Hardware R&D"],
    "System Administration": ["Windows Troubleshooting", "Server Management", "System Analysis", "Network Configuration", "Event Viewer", "Process Management"],
    "Creative & Design": ["Graphics Design", "Video Editing", "3D Modeling", "UI/UX Basics", "Technical Documentation"]
  };

  const certifications = [
    {
      title: "Play It Safe: Manage Security Risk",
      provider: "Google",
      link: "https://www.coursera.org/account/accomplishments/verify/N3FECZN5YCUP",
      icon: "🛡️"
    },
    {
      title: "Foundations of Cybersecurity",
      provider: "Google",
      link: "https://www.coursera.org/account/accomplishments/verify/5A2K798YTGCL",
      icon: "🔒"
    },
    {
      title: "Programming For Everybody",
      provider: "University of Michigan",
      link: "https://www.coursera.org/account/accomplishments/verify/WLGLCFBTKBZX",
      icon: "🐍"
    },
    {
      title: "Digital Forensics Essentials",
      provider: "EC-Council",
      link: "https://learn.eccouncil.org/certificate/dda3033a-9afe-49f7-bac6-ee61c54e8983",
      icon: "🔍"
    },
    {
      title: "CodeRed Anonymity Course",
      provider: "EC-Council",
      link: "https://learn.eccouncil.org/certificate/4a86edac-0d56-45be-a9f2-4fd1b620a4ba",
      icon: "🎭"
    },
    {
      title: "Ethical Hacking From Scratch",
      provider: "Udemy",
      link: "https://www.udemy.com/certificate/UC-67e07287-2da5-4f43-9e0c-ee870e57eaf9/",
      icon: "💻"
    },
    {
      title: "Scientific Computing with Python",
      provider: "freeCodeCamp",
      link: "https://www.freecodecamp.org/certification/clamesys/scientific-computing-with-python-v7",
      icon: "🧮"
    },
    {
      title: "Data Analysis with Python",
      provider: "freeCodeCamp",
      link: "https://freecodecamp.org/certification/clamesys/data-analysis-with-python-v7",
      icon: "📊"
    },
    {
      title: "All Things 101",
      provider: "Infosys Springboard",
      link: "https://verify.onwingspan.com/",
      icon: "🎓"
    }
  ];

  // Enhanced Animated Components with memoization
  const AnimatedSection = React.memo(({ children, className = '', id = '' }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
      rootMargin: '-50px 0px'
    });

    return (
      <motion.section
        ref={ref}
        id={id}
        className={className}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {children}
      </motion.section>
    );
  });

  const AnimatedCard = React.memo(({ children, className = '', delay = 0 }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
      rootMargin: '-20px 0px'
    });

    return (
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          hidden: { y: 30, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: {
              type: "spring",
              damping: 25,
              stiffness: 120,
              delay: delay
            }
          }
        }}
        whileHover={{ y: -3, transition: { duration: 0.2 } }}
      >
        {children}
      </motion.div>
    );
  });

  return (
    <div className="min-h-screen bg-black text-white font-primary">
      {currentPage === 'portfolio' ? (
        <>
          {/* Enhanced Navigation */}
          <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-nav shadow-glow' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <motion.div 
                  className="text-xl md:text-2xl font-bold font-accent text-white glow-text"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Debayangshu Sen
                </motion.div>
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-6 lg:space-x-8">
                  {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item, index) => (
                    <motion.button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className={`hover:text-white transition-all duration-300 nav-item text-sm lg:text-base will-change-transform ${
                        activeSection === item.toLowerCase() ? 'text-white border-b-2 border-white' : 'text-gray-400'
                      }`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item}
                    </motion.button>
                  ))}
                  <motion.button
                    onClick={() => setCurrentPage('poems')}
                    className="text-gray-400 hover:text-white transition-all duration-300 nav-item text-sm lg:text-base will-change-transform"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Poetry
                  </motion.button>
                </div>

                {/* Mobile Navigation Button */}
                <motion.button
                  className="md:hidden text-white p-2 will-change-transform"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </motion.button>
              </div>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  className="md:hidden glass-nav border-t border-gray-800"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-4 py-2 space-y-1">
                    {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item, index) => (
                      <motion.button
                        key={item}
                        onClick={() => scrollToSection(item.toLowerCase())}
                        className={`block w-full text-left py-3 px-2 transition-all duration-300 nav-item will-change-transform ${
                          activeSection === item.toLowerCase() ? 'text-white bg-white/10' : 'text-gray-400'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.1)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item}
                      </motion.button>
                    ))}
                    <motion.button
                      onClick={() => setCurrentPage('poems')}
                      className="block w-full text-left py-3 px-2 text-gray-400 transition-all duration-300 nav-item will-change-transform"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                      whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.1)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Poetry
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>

          {/* Enhanced Hero Section */}
          <AnimatedSection id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 hero-bg"></div>
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/50 to-black"></div>
            
            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/20 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.2, 0.8, 0.2],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
              <motion.div
                className="mb-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.h1 
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 font-accent"
                  variants={itemVariants}
                >
                  <span className="hero-text glow-text">
                    Debayangshu Sen
                  </span>
                </motion.h1>
                <motion.div 
                  className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-2 font-mono"
                  variants={itemVariants}
                >
                  aka <span className="text-white font-semibold glow-text">"Clame"</span>
                </motion.div>
                <motion.p 
                  className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8"
                  variants={itemVariants}
                >
                  IoT Engineer • Cybersecurity Researcher • The Troubleshooter
                </motion.p>
              </motion.div>
              
              <motion.p 
                className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed px-4"
                variants={itemVariants}
              >
                From fixing Windows 98 as a kid to designing IoT systems and conducting security research. 
                I bridge the gap between hardware and software, solving problems others can't.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center px-4"
                variants={itemVariants}
              >
                <motion.button 
                  onClick={() => scrollToSection('projects')}
                  className="glass-button-primary w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work
                </motion.button>
                <motion.button 
                  onClick={() => scrollToSection('contact')}
                  className="glass-button-secondary w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.button>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Enhanced About Section */}
          <AnimatedSection id="about" className="py-16 md:py-20 section-bg">
            <div className="max-w-6xl mx-auto px-4">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 font-accent glow-text"
                variants={itemVariants}
              >
                About Me
              </motion.h2>
              
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <motion.div className="space-y-6" variants={slideVariants}>
                  <h3 className="text-xl md:text-2xl font-semibold font-accent glow-text">The Origin Story</h3>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                    My journey began in Class 2 when I accidentally broke my Windows 98 OS. With no internet and only curiosity, 
                    I repaired it over a phone call with my uncle at IBM. That moment sparked a lifelong passion for understanding 
                    systems from the inside out.
                  </p>
                  
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                    Over the years, I became known as <span className="text-white font-semibold glow-text">"the troubleshooter"</span> - 
                    the person hundreds of students, staff, and professionals call when they have technical issues. 
                    I can identify malware just by its file path and solve complex system problems manually through Safe Mode.
                  </p>

                  <h3 className="text-xl md:text-2xl font-semibold font-accent glow-text pt-4">Current Focus</h3>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                    Now pursuing Computer Science & Engineering while working as an IoT Engineer Consultant, 
                    I'm leading hardware R&D and embedded systems design. My expertise spans from cybersecurity 
                    research to PCB design, bridging the gap between hardware and software innovation.
                  </p>

                  <h3 className="text-xl md:text-2xl font-semibold font-accent glow-text pt-4">My Strengths & Passions</h3>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                    My core strengths lie in <span className="text-white glow-text">organization, problem-solving, communication, and troubleshooting</span>. 
                    I excel at grasping technical concepts quickly and conducting thorough research to find solutions to any challenge.
                  </p>
                  
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                    I'm passionate about <span className="text-white glow-text">R&D because I'm curious as hell</span> - 
                    so much so that "I am so curious that I tasted the poisonous food that I made myself to kill the rat in my house." 😅
                  </p>

                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                    When I'm not troubleshooting systems or designing IoT solutions, you'll find me writing poetry, 
                    riding and modifying bikes, or exploring the beautiful landscapes of Meghalaya alone with my 2-wheeled machine. 
                    I love the peace time with nature and the freedom of the open road.
                  </p>
                </motion.div>
                
                <AnimatedCard className="glass-card p-6 md:p-8" delay={0.3}>
                  <h3 className="text-lg md:text-xl font-semibold mb-6 font-accent glow-text">Quick Facts</h3>
                  <div className="space-y-4">
                    {[
                      { icon: "📍", text: "Guwahati, Assam, India" },
                      { icon: "🎓", text: "B.Tech CSE at Assam Down Town University (2022-2026)" },
                      { icon: "💼", text: "IoT Engineer Consultant at NINUR TECH" },
                      { icon: "🔧", text: "Hundreds of successful system repairs" },
                      { icon: "🏆", text: "GDSC Core Member & Multiple Certifications" },
                      { icon: "🏍️", text: "Poetry, Bike Riding & Modifications, R&D" },
                      { icon: "🌲", text: "Loves exploring Meghalaya solo on 2 wheels" }
                    ].map((fact, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      >
                        <span className="text-white glow-text text-lg md:text-xl">{fact.icon}</span>
                        <span className="text-sm md:text-base">{fact.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </AnimatedCard>
              </div>
            </div>
          </AnimatedSection>

          {/* Enhanced Experience Section */}
          <AnimatedSection id="experience" className="py-16 md:py-20 bg-black">
            <div className="max-w-6xl mx-auto px-4">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 font-accent glow-text"
                variants={itemVariants}
              >
                Experience
              </motion.h2>
              
              <div className="space-y-6 md:space-y-8">
                {[
                  {
                    title: "IoT Engineer Consultant",
                    company: "NINUR TECH PRIVATE LIMITED",
                    type: "Internship • Hybrid, India",
                    period: "Feb 2025 - Aug 2025",
                    description: "Leading hardware R&D projects including PCB design, 3D modeling, assembly, and testing. Focused on sensor integration and ensuring seamless device-software communication. Conducting research to optimize IoT product performance and functionality.",
                    borderColor: "border-white",
                    active: true
                  },
                  {
                    title: "Database Management Intern",
                    company: "Assam Down Town University - IT Cell",
                    type: "Internship",
                    period: "May 15 - Jul 15, 2025",
                    description: "Managed and optimized database systems for the university's IT infrastructure. Handled data integrity, performance tuning, and system maintenance.",
                    borderColor: "border-gray-400",
                    active: false
                  },
                  {
                    title: "GDSC Core Member",
                    company: "Assam Down Town University",
                    type: "Core Team Member",
                    period: "Aug 2023 - Sep 2023",
                    description: "Active core member of Google Developer Student Clubs, organizing tech events, workshops, and contributing to the developer community.",
                    borderColor: "border-gray-600",
                    active: false
                  }
                ].map((exp, index) => (
                  <AnimatedCard key={index} className={`glass-card p-6 md:p-8 border-l-4 ${exp.borderColor}`} delay={index * 0.2}>
                    <div className="flex flex-col lg:flex-row justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl md:text-2xl font-semibold text-white font-accent">{exp.title}</h3>
                        <p className={`font-medium ${exp.active ? 'text-white glow-text' : 'text-gray-300'}`}>{exp.company}</p>
                        <p className="text-gray-400 text-sm md:text-base">{exp.type}</p>
                      </div>
                      <span className="text-gray-400 glass-tag mt-2 lg:mt-0 text-xs md:text-sm">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                      {exp.description}
                    </p>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Enhanced Projects Section */}
          <AnimatedSection id="projects" className="py-16 md:py-20 section-bg">
            <div className="max-w-7xl mx-auto px-4">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 font-accent glow-text"
                variants={itemVariants}
              >
                Featured Projects
              </motion.h2>
              
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {projects.map((project, index) => (
                  <AnimatedCard key={index} className="glass-card project-card overflow-hidden" delay={index * 0.2}>
                    <div className="h-48 md:h-64 overflow-hidden">
                      <motion.img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div className="p-4 md:p-6">
                      <h3 className="text-lg md:text-xl font-semibold mb-3 font-accent glow-text">{project.title}</h3>
                      <p className="text-gray-300 mb-4 leading-relaxed text-sm md:text-base">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, techIndex) => (
                          <motion.span 
                            key={techIndex} 
                            className="glass-tag text-xs md:text-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                      
                      <motion.a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-white hover:glow-text transition-all duration-300 font-mono text-sm md:text-base"
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View on GitHub</span>
                        <span>→</span>
                      </motion.a>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Enhanced Skills Section */}
          <AnimatedSection id="skills" className="py-16 md:py-20 bg-black">
            <div className="max-w-6xl mx-auto px-4">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-center mb-2 font-accent glow-text"
                variants={itemVariants}
              >
                Skills & Expertise
              </motion.h2>
              <motion.p 
                className="text-lg md:text-xl text-center mb-8 md:mb-12 font-accent glow-text"
                variants={itemVariants}
              >
                (jack of all trades, master of some)
              </motion.p>
              
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {Object.entries(skills).map(([category, skillList], index) => (
                  <AnimatedCard key={category} className="glass-card p-4 md:p-6" delay={index * 0.1}>
                    <h3 className="text-lg md:text-xl font-semibold mb-4 font-accent glow-text">{category}</h3>
                    <div className="space-y-2">
                      {skillList.map((skill, skillIndex) => (
                        <motion.div 
                          key={skillIndex} 
                          className="flex items-center space-x-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 + skillIndex * 0.1 }}
                        >
                          <span className="w-2 h-2 bg-white rounded-full glow-dot"></span>
                          <span className="text-gray-300 text-sm md:text-base">{skill}</span>
                        </motion.div>
                      ))}
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Enhanced Certifications Section */}
          <AnimatedSection id="certifications" className="py-16 md:py-20 section-bg">
            <div className="max-w-6xl mx-auto px-4">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 font-accent glow-text"
                variants={itemVariants}
              >
                Certifications
              </motion.h2>
              
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {certifications.map((cert, index) => (
                  <AnimatedCard key={index} delay={index * 0.1}>
                    <motion.a 
                      href={cert.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="glass-card p-4 md:p-6 hover:glass-card-hover transition-all duration-300 group cursor-pointer block"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start space-x-3">
                        <motion.span 
                          className="text-white text-xl glow-text group-hover:scale-110 transition-transform"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          {cert.icon}
                        </motion.span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-semibold font-accent glow-text group-hover:text-white transition-colors text-sm md:text-base">
                            {cert.title}
                          </h3>
                          <p className="text-gray-400 text-xs md:text-sm font-mono mt-1 group-hover:text-gray-300 transition-colors">
                            {cert.provider}
                          </p>
                          <div className="flex items-center space-x-1 mt-2 opacity-70 group-hover:opacity-100 transition-opacity">
                            <span className="text-xs text-gray-500 font-mono">View Certificate</span>
                            <span className="text-xs text-gray-500">↗</span>
                          </div>
                        </div>
                      </div>
                    </motion.a>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Enhanced Contact Section */}
          <AnimatedSection id="contact" className="py-16 md:py-20 bg-black">
            <div className="max-w-6xl mx-auto px-4">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 font-accent glow-text"
                variants={itemVariants}
              >
                Let's Connect
              </motion.h2>
              
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                <motion.div className="space-y-6 md:space-y-8" variants={slideVariants}>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 font-accent glow-text">Get In Touch</h3>
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                      Whether you need a system troubleshooted, an IoT solution designed, or want to discuss 
                      cybersecurity research, I'm always up for interesting technical challenges.
                    </p>
                    <p className="text-gray-400 font-mono text-sm md:text-base">
                      Response time: Usually within 24 hours ⚡
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { icon: "📧", text: "debayangshusen@gmail.com", href: "mailto:debayangshusen@gmail.com" },
                      { icon: "📞", text: "+91 8822866953", href: "tel:+918822866953" },
                      { icon: "💬", text: "WhatsApp: +91 8403099279", href: "https://wa.me/918403099279" }
                    ].map((contact, index) => (
                      <motion.a 
                        key={index}
                        href={contact.href} 
                        target={contact.href.includes('http') ? "_blank" : undefined}
                        rel={contact.href.includes('http') ? "noopener noreferrer" : undefined}
                        className="contact-link"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-xl md:text-2xl">{contact.icon}</span>
                        <span className="font-mono text-sm md:text-base">{contact.text}</span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
                
                <AnimatedCard className="glass-card p-6 md:p-8" delay={0.3}>
                  <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 font-accent glow-text">Find Me Online</h3>
                  <div className="space-y-4">
                    {[
                      { icon: "💼", text: "LinkedIn - Professional Profile", href: "https://linkedin.com/in/debayangshusen" },
                      { icon: "🐙", text: "GitHub - Code & Projects", href: "https://github.com/clamesys" },
                      { icon: "📸", text: "Instagram - Behind the Scenes", href: "https://instagram.com/clame_sys" }
                    ].map((social, index) => (
                      <motion.a 
                        key={index}
                        href={social.href} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="social-link"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-xl md:text-2xl">{social.icon}</span>
                        <span className="text-sm md:text-base">{social.text}</span>
                      </motion.a>
                    ))}
                    <div className="pt-4 border-t border-gray-700">
                      <p className="text-gray-400 text-xs md:text-sm font-mono">
                        📍 Based in Guwahati, Assam, India • Open to remote opportunities worldwide
                      </p>
                    </div>
                  </div>
                </AnimatedCard>
              </div>
            </div>
          </AnimatedSection>

          {/* Enhanced Footer */}
          <footer className="py-6 md:py-8 section-bg border-t border-gray-800">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <motion.p 
                className="text-gray-400 font-mono text-sm md:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                © 2025 Debayangshu Sen. Built with React & Tailwind CSS.
              </motion.p>
              <motion.p 
                className="text-gray-500 text-xs md:text-sm mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                "You Just Cant SocialEnginner Me. Its just impossible. Dont u Even try." 😎
              </motion.p>
            </div>
          </footer>
        </>
      ) : (
        // Enhanced Poetry Section
        <motion.div 
          className="min-h-screen bg-black text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Poetry Navigation */}
          <nav className="fixed top-0 w-full z-50 glass-nav shadow-glow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <motion.div 
                  className="text-xl md:text-2xl font-bold font-accent text-white glow-text"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Poetry Corner
                </motion.div>
                <motion.button
                  onClick={() => setCurrentPage('portfolio')}
                  className="text-gray-400 hover:text-white transition-all duration-300 nav-item font-mono text-sm md:text-base"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ← Back to Portfolio
                </motion.button>
              </div>
            </div>
          </nav>

          <div className="pt-20 p-4 md:p-8">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 font-accent glow-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Poetry Collection
            </motion.h1>
            
            {/* Poem Category Tabs */}
            <div className="max-w-3xl mx-auto mb-6 md:mb-8">
              <div className="flex justify-center space-x-4">
                {['long', 'short'].map((tab) => (
                  <motion.button
                    key={tab}
                    onClick={() => setActivePoemTab(tab)}
                    className={`px-4 md:px-6 py-3 rounded-lg font-semibold transition-all duration-300 font-mono text-sm md:text-base ${
                      activePoemTab === tab ? 'glass-button-active' : 'glass-button-inactive'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tab === 'long' ? 'Long Poems' : 'Short Poems'}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="max-w-3xl mx-auto space-y-8 md:space-y-12">
              <AnimatePresence mode="wait">
                {activePoemTab === 'long' ? (
                  <motion.div
                    key="long"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {longPoems.length > 0 ? (
                      longPoems.map((poem, index) => (
                        <AnimatedCard key={index} className="glass-card p-6 md:p-8" delay={index * 0.2}>
                          <h2 className="text-xl md:text-2xl font-semibold mb-4 font-accent glow-text">{poem.title}</h2>
                          <pre className="text-gray-300 whitespace-pre-wrap font-serif leading-relaxed text-sm md:text-base">
                            {poem.content}
                          </pre>
                          <p className="text-gray-500 mt-4 font-mono text-sm">{poem.date}</p>
                        </AnimatedCard>
                      ))
                    ) : (
                      <div className="glass-card p-6 md:p-8 text-center">
                        <p className="text-gray-400 font-mono text-sm md:text-base">More long poems coming soon...</p>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="short"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {shortPoems.length > 0 ? (
                      shortPoems.map((poem, index) => (
                        <AnimatedCard key={index} className="glass-card p-6 md:p-8" delay={index * 0.2}>
                          <h2 className="text-xl md:text-2xl font-semibold mb-4 font-accent glow-text">{poem.title}</h2>
                          <pre className="text-gray-300 whitespace-pre-wrap font-serif leading-relaxed text-sm md:text-base">
                            {poem.content}
                          </pre>
                          <p className="text-gray-500 mt-4 font-mono text-sm">{poem.date}</p>
                        </AnimatedCard>
                      ))
                    ) : (
                      <div className="glass-card p-6 md:p-8 text-center">
                        <p className="text-gray-400 font-mono text-sm md:text-base">Short poems (4 lines each) coming soon...</p>
                        <p className="text-gray-500 text-xs md:text-sm mt-2 font-mono">Perfect for quick inspiration bursts!</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default App;