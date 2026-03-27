/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code, 
  Database, 
  Cpu, 
  Layers, 
  ChevronRight, 
  Send, 
  Download,
  Terminal,
  Globe,
  Server,
  Brain,
  Rocket,
  Calendar,
  User,
  Menu,
  X
} from 'lucide-react';

// --- Types ---
interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  image: string;
}

interface Skill {
  name: string;
  level: number;
}

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    title: "MERN Task Manager",
    description: "A full-stack task management application with real-time updates, user authentication, and drag-and-drop features.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Socket.io"],
    github: "#",
    live: "#",
    image: "https://picsum.photos/seed/task/800/600"
  },
  {
    title: "E-commerce Website",
    description: "Modern e-commerce platform with product filtering, cart functionality, and secure payment integration.",
    tech: ["React", "Redux", "Node.js", "Stripe API", "Cloudinary"],
    github: "#",
    live: "#",
    image: "https://picsum.photos/seed/shop/800/600"
  },
  {
    title: "AI Chatbot Assistant",
    description: "Intelligent chatbot powered by Gemini API, capable of handling complex queries and providing contextual responses.",
    tech: ["React", "Gemini API", "Node.js", "Tailwind CSS"],
    github: "#",
    live: "#",
    image: "https://picsum.photos/seed/ai/800/600"
  },
  {
    title: "Portfolio v2",
    description: "A high-performance portfolio website with advanced animations and futuristic UI/UX design.",
    tech: ["React", "Framer Motion", "Tailwind CSS", "Vite"],
    github: "#",
    live: "#",
    image: "https://picsum.photos/seed/portfolio/800/600"
  }
];

const SKILLS: Skill[] = [
  { name: "Frontend", level: 85 },
  { name: "Backend", level: 70 },
  { name: "Database", level: 65 },
  { name: "AI/ML", level: 40 }
];

const TIMELINE: TimelineItem[] = [
  { year: "2025", title: "Building Full-Stack Projects", description: "Developing complex MERN applications and exploring AI integrations." },
  { year: "2025", title: "Learning Web Development", description: "Mastered the fundamentals of HTML, CSS, JS and started with React." },
  { year: "2024", title: "Started Programming", description: "Began my journey with Python and basic data structures." }
];

const TECH_STACK = {
  frontend: ["HTML", "CSS", "JavaScript", "React", "Tailwind"],
  backend: ["Node.js", "Express"],
  database: ["MongoDB"],
  ai: ["Python", "ML Basics"],
  tools: ["Git", "GitHub", "VS Code"]
};

// --- Components ---

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12 text-center md:text-left">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold mb-4"
    >
      <span className="text-gradient">{children}</span>
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-text-secondary max-w-2xl"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="relative min-h-screen bg-background-dark text-text-primary">
      {/* Custom Cursor Glow */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(56, 189, 248, 0.05), transparent 80%)`
        }}
      />

      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-accent-blue z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background-dark/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold tracking-tighter"
          >
            GKG<span className="text-accent-blue">.</span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`}
                className={`text-sm font-medium transition-colors hover:text-accent-blue ${activeSection === item.id ? 'text-accent-blue' : 'text-text-secondary'}`}
                onClick={() => setActiveSection(item.id)}
              >
                {item.label}
              </a>
            ))}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-sm font-semibold hover:bg-accent-blue/20 transition-all"
            >
              Resume
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background-light border-b border-white/5"
            >
              <div className="flex flex-col p-6 space-y-4">
                {navItems.map((item) => (
                  <a 
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-lg font-medium text-text-secondary hover:text-accent-blue"
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 overflow-hidden section-padding min-h-screen flex items-center">
        {/* Background Elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent-blue/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-accent-blue text-sm font-medium mb-6"
            >
              <span className="relative flex h-2 w-2 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-blue"></span>
              </span>
              Available for new opportunities
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Hello 👋 <br />
              I'm <span className="text-gradient">Gaurav Kumar Gupta</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-xl">
              MERN Full-Stack Developer <br />
              <span className="text-text-primary/80 italic">Building scalable web apps & exploring AI-powered solutions</span>
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.a 
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-accent-blue text-background-dark font-bold flex items-center gap-2 hover:neon-glow-blue transition-all"
              >
                View Portfolio <ChevronRight size={20} />
              </motion.a>
              <motion.a 
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all"
              >
                Contact Me
              </motion.a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative flex justify-center items-center"
          >
            {/* Animated Ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] border-2 border-dashed border-accent-blue/30 rounded-full"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] border border-accent-purple/20 rounded-full"
            />
            
            {/* Developer Illustration / Image */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/10 glass-card p-2">
              <img 
                src="https://i.ibb.co/F4Sgy0NW/Whats-App-Image-2026-03-13-at-00-30-09.jpg" 
                alt="Gaurav Kumar Gupta" 
                className="w-full h-full object-cover rounded-full transition-all duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Floating Particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
                className="absolute w-2 h-2 bg-accent-blue rounded-full blur-[1px]"
                style={{
                  top: `${20 + i * 15}%`,
                  left: `${10 + i * 20}%`
                }}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="section-padding bg-background-light/30">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="The technologies I use to bring ideas to life.">
            Tech Stack
          </SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {Object.entries(TECH_STACK).map(([category, items], idx) => (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 hover:border-accent-blue/30 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-accent-blue/10 text-accent-blue">
                    {category === 'frontend' && <Globe size={20} />}
                    {category === 'backend' && <Server size={20} />}
                    {category === 'database' && <Database size={20} />}
                    {category === 'ai' && <Brain size={20} />}
                    {category === 'tools' && <Terminal size={20} />}
                  </div>
                  <h3 className="font-bold capitalize">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span 
                      key={item}
                      className="px-3 py-1 rounded-md bg-white/5 text-xs font-medium text-text-secondary group-hover:text-text-primary transition-colors border border-white/5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <SectionTitle>About Me</SectionTitle>
            <p className="text-lg text-text-secondary leading-relaxed">
              I am a MERN stack developer focused on building scalable and responsive web applications. 
              Currently, I am exploring AI and Machine Learning to build intelligent systems that can solve complex problems.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              I enjoy solving real-world problems and continuously improving my skills. My goal is to bridge the gap between 
              modern web technologies and artificial intelligence.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-6">
              {[
                { label: "Projects Completed", value: 12 },
                { label: "Learning Hours", value: 1200 },
                { label: "Coffee Consumed", value: 450 },
                { label: "GitHub Commits", value: 800 }
              ].map((stat, i) => (
                <div key={i}>
                  <motion.h4 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-3xl font-bold text-accent-blue mb-1"
                  >
                    <Counter value={stat.value} />+
                  </motion.h4>
                  <p className="text-sm text-text-secondary uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square glass-card overflow-hidden p-4">
              <div className="w-full h-full bg-linear-to-br from-accent-blue/20 to-accent-purple/20 rounded-xl flex items-center justify-center">
                <Layers size={120} className="text-accent-blue/40 animate-pulse" />
              </div>
            </div>
            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 glass-card p-6 neon-glow-blue"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent-blue flex items-center justify-center text-background-dark">
                  <Rocket size={24} />
                </div>
                <div>
                  <p className="text-xs text-text-secondary uppercase">Experience</p>
                  <p className="font-bold">2+ Years Learning</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-padding bg-background-light/30">
        <div className="max-w-4xl mx-auto">
          <SectionTitle subtitle="My proficiency in various domains of development.">
            My Skills
          </SectionTitle>

          <div className="space-y-8">
            {SKILLS.map((skill, idx) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-2">
                  <span className="font-bold">{skill.name}</span>
                  <span className="text-accent-blue">{skill.level}%</span>
                </div>
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: idx * 0.1, ease: "easeOut" }}
                    className="h-full bg-linear-to-r from-accent-blue to-accent-purple"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="A selection of my recent work and personal projects.">
            My Portfolio
          </SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((project, idx) => (
              <motion.div 
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group glass-card overflow-hidden flex flex-col"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-background-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <motion.a 
                      href={project.github}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 rounded-full bg-white text-background-dark"
                    >
                      <Github size={20} />
                    </motion.a>
                    <motion.a 
                      href={project.live}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 rounded-full bg-accent-blue text-background-dark"
                    >
                      <ExternalLink size={20} />
                    </motion.a>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-accent-blue transition-colors">{project.title}</h3>
                  <p className="text-text-secondary mb-6 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => (
                      <span key={t} className="text-xs font-semibold px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="section-padding bg-background-light/30">
        <div className="max-w-4xl mx-auto">
          <SectionTitle subtitle="My educational and professional path.">
            My Journey
          </SectionTitle>

          <div className="relative pl-8 md:pl-0">
            {/* Vertical Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />
            
            <div className="space-y-12">
              {TIMELINE.map((item, idx) => (
                <motion.div 
                  key={item.year}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-accent-blue border-4 border-background-dark -translate-x-1/2 z-10" />
                  
                  <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                    <div className="glass-card p-6 hover:neon-glow-purple">
                      <span className="text-accent-purple font-bold text-sm mb-2 block">{item.year}</span>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-text-secondary">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Rocket size={100} />
            </div>
            <h2 className="text-4xl font-bold mb-6 text-gradient">Open to Opportunities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {[
                "Looking for internships & junior roles",
                "Open to remote work worldwide",
                "Interested in innovative startups",
                "Quick learner & highly adaptable"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-text-secondary">
                  <div className="w-6 h-6 rounded-full bg-accent-blue/20 flex items-center justify-center text-accent-blue">
                    <ChevronRight size={14} />
                  </div>
                  {text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-background-light/30">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Let's build something amazing together.">
            Get In Touch
          </SectionTitle>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="glass-card p-8 h-full">
                <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue group-hover:bg-accent-blue group-hover:text-background-dark transition-all">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary uppercase">Email</p>
                      <p className="font-bold">gauravkumargupta1517@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-accent-purple/10 flex items-center justify-center text-accent-purple group-hover:bg-accent-purple group-hover:text-background-dark transition-all">
                      <Linkedin size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary uppercase">LinkedIn</p>
                      <p className="font-bold">gaurav-kumar-gupta</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-text-primary group-hover:bg-white group-hover:text-background-dark transition-all">
                      <Github size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary uppercase">GitHub</p>
                      <p className="font-bold">gauravkumargupta</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-6 rounded-xl bg-accent-blue/5 border border-accent-blue/10">
                  <p className="text-sm text-accent-blue font-medium mb-2 flex items-center gap-2">
                    <Download size={16} /> Download Resume
                  </p>
                  <p className="text-xs text-text-secondary">Get a copy of my professional background in PDF format.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <form className="glass-card p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-blue transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-blue transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Message</label>
                  <textarea 
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-blue transition-colors resize-none"
                  />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl bg-accent-blue text-background-dark font-bold flex items-center justify-center gap-2 hover:neon-glow-blue transition-all"
                >
                  Send Message <Send size={20} />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xl font-bold tracking-tighter">
            GKG<span className="text-accent-blue">.</span>
          </div>
          <p className="text-text-secondary text-sm">
            © {new Date().getFullYear()} Gaurav Kumar Gupta. Built with React & Framer Motion.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-text-secondary hover:text-accent-blue transition-colors"><Github size={20} /></a>
            <a href="#" className="text-text-secondary hover:text-accent-blue transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="text-text-secondary hover:text-accent-blue transition-colors"><Mail size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- Helper Components ---

const Counter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}</span>;
};

// Custom hook for in-view detection since we don't have useInView from framer-motion directly in this version easily without checking
function useInView(ref: React.RefObject<HTMLElement | null>, options: IntersectionObserverInit & { once?: boolean }) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (options.once) observer.unobserve(entry.target);
      } else if (!options.once) {
        setIsInView(false);
      }
    }, options);

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);

  return isInView;
}
