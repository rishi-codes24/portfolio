import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["About", "Skills", "Projects", "Journey", "Contact"];

const SKILLS = [
  { category: "Frontend", items: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"], icon: "◈" },
  { category: "Tools & Workflow", items: ["Git", "GitHub", "Vite", "VS Code", "Framer Motion"], icon: "◉" },
  { category: "Design", items: ["UI Design", "Figma (learning)", "Glassmorphism", "Motion Design", "Color Theory"], icon: "◇" },
  { category: "Creative", items: ["Video Editing", "Content Creation", "Storytelling", "AI Tools", "Thumbnail Design"], icon: "◎" },
];

const PROJECTS = [
  {
    id: 1,
    title: "This Portfolio",
    desc: "Designed and built from scratch — a futuristic, glassmorphic personal portfolio with Framer Motion animations, smooth scrolling, and a fully responsive layout. My most polished project yet.",
    tech: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    gradient: "from-violet-500/25 via-purple-500/10 to-transparent",
    accent: "#a78bfa",
    github: "https://github.com/rishi-codes24",
    live: "#",
    tag: "Live",
  },
  {
    id: 2,
    title: "Weather App",
    desc: "A clean weather dashboard pulling live data from the OpenWeatherMap API. Features city search, animated weather icons, and a responsive dark UI built to feel native.",
    tech: ["React", "REST API", "CSS", "JavaScript"],
    gradient: "from-cyan-500/25 via-sky-500/10 to-transparent",
    accent: "#22d3ee",
    github: "https://github.com/rishi-codes24",
    live: "#",
    tag: "API",
  },
  {
    id: 3,
    title: "YouTube Toolkit",
    desc: "A utility web app for creators — generates video titles, descriptions, and hashtag ideas using AI prompts. Built to scratch my own itch as a part-time content creator.",
    tech: ["HTML", "CSS", "JavaScript", "AI API"],
    gradient: "from-rose-500/20 via-pink-500/10 to-transparent",
    accent: "#fb7185",
    github: "https://github.com/rishi-codes24",
    live: "#",
    tag: "Creator",
  },
  {
    id: 4,
    title: "Landing Page Clone",
    desc: "Pixel-perfect recreation of a premium SaaS landing page. Focused on layout precision, hover animations, and breakpoints — a deliberate exercise in sharpening CSS skills.",
    tech: ["HTML", "Tailwind CSS", "JavaScript"],
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    accent: "#fbbf24",
    github: "https://github.com/rishi-codes24",
    live: "#",
    tag: "CSS",
  },
];

const JOURNEY = [
  {
    phase: "The Spark",
    period: "Early 2024",
    title: "Discovered Web Dev",
    desc: "Stumbled into HTML and CSS on YouTube at 2am. Built my first webpage — an ugly but magical blue box on a white screen. Couldn't stop thinking about it.",
    icon: "✦",
    accent: "#a78bfa",
  },
  {
    phase: "The Grind",
    period: "Mid 2024",
    title: "JavaScript & First Projects",
    desc: "Survived JavaScript fundamentals, DOM manipulation, and my first API call. Shipped the Weather App and felt like a real developer for about 5 minutes.",
    icon: "◈",
    accent: "#22d3ee",
  },
  {
    phase: "Level Up",
    period: "Late 2024",
    title: "Joined IITM & Learned React",
    desc: "Started 1st year at IITM College of Engineering. Picked up React, Tailwind, and Vite. Started thinking in components. Everything clicked at once.",
    icon: "◎",
    accent: "#34d399",
  },
  {
    phase: "Now →",
    period: "2025",
    title: "Building & Creating",
    desc: "Shipping projects, exploring UI/UX and motion design, making content about my learning journey, and looking for opportunities to collaborate. Just getting started.",
    icon: "→",
    accent: "#fbbf24",
  },
];

// ─── ANIMATION VARIANTS ──────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

// ─── LOADING SCREEN ──────────────────────────────────────────────────────────

function LoadingScreen({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(16px)", scale: 1.04 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-[#060608] flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col items-center gap-8"
      >
        {/* Spinning logo */}
        <div className="relative w-16 h-16">
          <motion.div
            className="absolute inset-0 rounded-2xl border border-violet-500/50"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 rounded-xl border border-cyan-500/35"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-white/80 font-bold text-xl" style={{ fontFamily: "'Syne', sans-serif" }}>
            R
          </div>
          <div className="absolute inset-0 rounded-2xl" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)" }} />
        </div>

        {/* Progress bar */}
        <div className="w-52 h-px bg-white/[0.08] rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #7c3aed, #22d3ee, #7c3aed)" }}
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-[11px] font-mono tracking-[0.35em] text-white/25 uppercase"
        >
          rishi.kashyap
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

// ─── MOUSE GLOW ──────────────────────────────────────────────────────────────

function MouseGlow() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 70, damping: 18 });
  const sy = useSpring(y, { stiffness: 70, damping: 18 });

  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed z-0 w-[560px] h-[560px] rounded-full"
      style={{
        left: sx,
        top: sy,
        x: "-50%",
        y: "-50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.055) 0%, transparent 65%)",
      }}
    />
  );
}

// ─── PARTICLES ───────────────────────────────────────────────────────────────

function Particles() {
  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    size: Math.random() * 1.8 + 0.4,
    left: Math.random() * 100,
    top: Math.random() * 100,
    dur: Math.random() * 14 + 10,
    delay: Math.random() * 9,
    color: ["#a78bfa", "#22d3ee", "#34d399", "#f472b6"][Math.floor(Math.random() * 4)],
  }));

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ width: p.size, height: p.size, left: `${p.left}%`, top: `${p.top}%`, background: p.color }}
          animate={{ y: [0, -35, 0], opacity: [0, 0.55, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ─── UTILITY ─────────────────────────────────────────────────────────────────

function Section({ id, children, className = "" }) {
  return (
    <section id={id} className={`relative py-28 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto ${className}`}>
      {children}
    </section>
  );
}

function SectionLabel({ children }) {
  return (
    <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-violet-400/50" />
      <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/32">{children}</span>
    </motion.div>
  );
}

function SectionHeading({ children }) {
  return (
    <motion.h2
      variants={fadeUp}
      className="text-4xl md:text-5xl font-semibold tracking-tight text-white/90 mb-16 leading-tight"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      {children}
    </motion.h2>
  );
}

function AnimatedSection({ children, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({ children, className, onClick, href, target }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.28);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.28);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const Tag = href ? "a" : "button";
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ x: sx, y: sy, display: "inline-block" }}>
      <Tag href={href} target={target} onClick={onClick} className={className}>{children}</Tag>
    </motion.div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 2.4 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[#060608]/75 backdrop-blur-2xl border-b border-white/[0.05]" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2.5"
          >
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600/40 to-cyan-500/20 border border-violet-500/30 flex items-center justify-center text-xs font-bold text-white/80">
              R
            </span>
            <span className="font-mono text-sm text-white/45 group-hover:text-white/75 transition-colors tracking-widest hidden sm:block">
              rishi.dev
            </span>
          </button>

          {/* Desktop pill nav */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-2xl px-2 py-1.5 backdrop-blur-sm">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className={`px-4 py-1.5 rounded-xl text-sm transition-all duration-200 ${
                  active === link
                    ? "text-white bg-white/[0.1]"
                    : "text-white/40 hover:text-white/75 hover:bg-white/[0.05]"
                }`}
              >
                {link}
              </button>
            ))}
          </div>

          <MagneticButton
            onClick={() => scrollTo("Contact")}
            className="hidden md:flex items-center gap-2 px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white font-medium hover:opacity-90 transition-opacity shadow-[0_0_24px_rgba(139,92,246,0.32)]"
          >
            Say hello ✦
          </MagneticButton>

          {/* Burger */}
          <button className="md:hidden p-2 text-white/55 hover:text-white" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <div className="space-y-1.5">
              <motion.span animate={menuOpen ? { rotate: 45, y: 6 } : {}} className="block h-px w-5 bg-current" />
              <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="block h-px w-5 bg-current" />
              <motion.span animate={menuOpen ? { rotate: -45, y: -6 } : {}} className="block h-px w-5 bg-current" />
            </div>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(8px)" }}
            transition={{ duration: 0.28 }}
            className="fixed inset-x-0 top-16 z-40 bg-[#060608]/95 backdrop-blur-2xl border-b border-white/[0.05] px-6 py-4 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <button key={link} onClick={() => scrollTo(link)} className="block w-full text-left py-3 text-sm text-white/50 hover:text-white border-b border-white/[0.05] last:border-0 transition-colors">
                {link}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 70]);
  const op = useTransform(scrollY, [0, 380], [1, 0]);

  const words = ["interfaces", "experiences", "ideas", "things I love"];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % words.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.11) 0%, transparent 68%)" }}
          animate={{ scale: [1, 1.08, 1], x: [0, 20, 0], y: [0, -18, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 68%)" }}
          animate={{ scale: [1, 1.1, 1], x: [0, -14, 0], y: [0, 14, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{ background: "radial-gradient(circle, rgba(244,114,182,0.04) 0%, transparent 68%)" }}
          animate={{ scale: [1, 1.14, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <motion.div style={{ y, opacity: op }} className="relative z-10 max-w-7xl w-full mx-auto pt-36 pb-20">
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.6 }}
          className="inline-flex items-center gap-2.5 mb-10 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.07] backdrop-blur-sm"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
          </span>
          <span className="text-[11px] font-mono tracking-widest text-white/38 uppercase">1st Year · IITM · New Delhi</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(46px,8.5vw,92px)] font-semibold tracking-tighter leading-[0.93] text-white mb-8"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          I'm Rishi.<br />
          <span className="text-white/22">I build </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(12px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent"
            >
              {words[idx]}
            </motion.span>
          </AnimatePresence>
          <span className="text-white/22">.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.9, duration: 0.7 }}
          className="text-lg md:text-xl text-white/36 max-w-lg leading-relaxed mb-12"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          First-year engineering student obsessed with frontend, UI/UX, and anything that looks like it{" "}
          <em className="text-white/55 not-italic">shouldn't be possible in a browser.</em> Still learning. Always building.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.0, duration: 0.6 }}
          className="flex flex-wrap gap-4 items-center"
        >
          <MagneticButton
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-2.5 px-7 py-3.5 bg-white text-black rounded-2xl font-semibold text-sm hover:bg-white/90 transition-all shadow-[0_0_28px_rgba(255,255,255,0.1)]"
          >
            See my work
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}>→</motion.span>
          </MagneticButton>
          <MagneticButton
            href="https://github.com/rishi-codes24"
            target="_blank"
            className="flex items-center gap-2 px-7 py-3.5 rounded-2xl border border-white/[0.09] text-white/50 hover:text-white hover:border-white/22 text-sm transition-all bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </MagneticButton>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="absolute bottom-10 left-0 flex items-center gap-2.5 text-white/16"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Scroll</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────

function About() {
  const facts = [
    { value: "1st", label: "Year of college" },
    { value: "4+", label: "Projects shipped" },
    { value: "∞", label: "Things to learn" },
    { value: "2am", label: "Typical build time" },
  ];

  return (
    <Section id="about">
      <AnimatedSection>
        <SectionLabel>Who I am</SectionLabel>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <SectionHeading>
              Student. Builder.<br />
              <span className="text-white/25">Perpetually curious.</span>
            </SectionHeading>
            <motion.div
              variants={fadeUp}
              className="space-y-5 text-white/42 leading-relaxed text-[15px]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <p>
                Hey — I'm Rishi Kashyap, a first-year student at{" "}
                <span className="text-white/70">IITM College of Engineering, New Delhi.</span> I study, I code, and I spend way too many hours making buttons feel just right.
              </p>
              <p>
                I got into frontend development because I loved the idea of turning code into something{" "}
                <em className="text-white/58 not-italic">visual and interactive.</em> Since then I've been hooked — learning React, Tailwind, motion design, and whatever else catches my eye.
              </p>
              <p>
                Outside code, I'm into{" "}
                <span className="text-white/62">video editing and content creation</span> — I think visual storytelling and UI design have more in common than people realize. Also actively exploring how AI tools are reshaping how we build.
              </p>
              <p className="text-white/28 italic text-sm border-l border-violet-500/25 pl-4">
                "I don't have years of experience yet — but I have energy, taste, and a stubbornness to figure things out."
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex gap-5 flex-wrap">
              {[
                { label: "GitHub ↗", href: "https://github.com/rishi-codes24", target: "_blank" },
                { label: "LinkedIn ↗", href: "https://www.linkedin.com/in/rishi-kashyap-68617030a/", target: "_blank" },
                { label: "Email ↗", href: "mailto:riishhh24@gmail.com", target: undefined },
              ].map((l) => (
                <a key={l.label} href={l.href} target={l.target} className="text-sm text-white/32 hover:text-white border-b border-white/12 hover:border-white/45 transition-all pb-0.5 font-mono tracking-wide">
                  {l.label}
                </a>
              ))}
            </motion.div>
          </div>

          <div className="space-y-4">
            <motion.div variants={stagger} className="grid grid-cols-2 gap-3">
              {facts.map((f) => (
                <motion.div
                  key={f.label}
                  variants={fadeUp}
                  whileHover={{ y: -3 }}
                  className="p-5 rounded-2xl border border-white/[0.07] bg-white/[0.025] hover:bg-white/[0.04] hover:border-violet-500/20 transition-all duration-300 group cursor-default"
                >
                  <div className="text-3xl font-bold text-white/88 mb-1 group-hover:text-violet-300 transition-colors" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {f.value}
                  </div>
                  <div className="text-xs text-white/32" style={{ fontFamily: "'DM Sans', sans-serif" }}>{f.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
              <p className="text-xs font-mono text-white/28 tracking-widest uppercase mb-4">Interests</p>
              <div className="flex flex-wrap gap-2">
                {["React", "UI/UX", "Motion Design", "AI Tools", "Video Editing", "Open Source", "Typography", "Creative Dev"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg text-xs border border-white/[0.07] bg-white/[0.03] text-white/45 hover:border-violet-500/28 hover:text-violet-300 hover:bg-violet-500/[0.05] transition-all duration-200 cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>
    </Section>
  );
}

// ─── SKILLS ──────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <Section id="skills">
      <AnimatedSection>
        <SectionLabel>What I work with</SectionLabel>
        <SectionHeading>
          The tools I'm<br />
          <span className="text-white/25">getting good at.</span>
        </SectionHeading>
        <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILLS.map((group) => (
            <motion.div
              key={group.category}
              variants={fadeUp}
              whileHover={{ y: -5, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
              className="relative p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-violet-500/20 hover:bg-white/[0.04] transition-colors duration-400 group overflow-hidden cursor-default"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(circle at 50% 0%, rgba(139,92,246,0.07) 0%, transparent 70%)" }}
              />
              <div className="flex items-center gap-2 mb-5">
                <span className="text-violet-400/55 text-sm">{group.icon}</span>
                <h3 className="text-xs font-mono tracking-widest uppercase text-white/28">{group.category}</h3>
              </div>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-white/50 group-hover:text-white/62 transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <span className="h-px w-3 bg-gradient-to-r from-violet-400/35 to-transparent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </AnimatedSection>
    </Section>
  );
}

// ─── PROJECT CARD ────────────────────────────────────────────────────────────

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const cardRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - r.left) / r.width - 0.5) * 10,
      y: ((e.clientY - r.top) / r.height - 0.5) * -10,
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.13, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
        animate={{ rotateX: tilt.y, rotateY: tilt.x, scale: hovered ? 1.016 : 1 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative rounded-2xl border border-white/[0.07] bg-white/[0.025] overflow-hidden h-full"
      >
        {/* Gradient bg */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
          animate={{ opacity: hovered ? 1 : 0.45 }}
          transition={{ duration: 0.4 }}
        />
        {/* Shimmer top */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${project.accent}90, transparent)` }}
          animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0.4 }}
          transition={{ duration: 0.4 }}
        />
        {/* Inner glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ boxShadow: hovered ? `inset 0 0 50px ${project.accent}14` : `inset 0 0 0px ${project.accent}00` }}
          transition={{ duration: 0.4 }}
        />

        <div className="relative p-7 flex flex-col h-full" style={{ transform: "translateZ(20px)" }}>
          <div className="flex items-start justify-between mb-6">
            <span
              className="px-2.5 py-1 rounded-md text-[10px] font-mono tracking-widest uppercase border"
              style={{ color: project.accent, borderColor: `${project.accent}32`, background: `${project.accent}0e` }}
            >
              {project.tag}
            </span>
            <span className="text-xs font-mono text-white/18">0{project.id}</span>
          </div>

          <h3 className="text-xl font-semibold text-white/88 mb-3 leading-snug" style={{ fontFamily: "'Syne', sans-serif" }}>
            {project.title}
          </h3>
          <p className="text-sm text-white/40 leading-relaxed mb-7 flex-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tech.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-md text-[11px] font-mono border border-white/[0.07] bg-white/[0.04] text-white/42">
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            <a
              href={project.github}
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.09] text-xs text-white/42 hover:text-white hover:border-white/22 transition-all bg-white/[0.03] hover:bg-white/[0.07]"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Code
            </a>
            <a
              href={project.live}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all"
              style={{ background: `${project.accent}14`, color: project.accent, border: `1px solid ${project.accent}26` }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: project.accent }} />
              Live
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Projects() {
  return (
    <Section id="projects">
      <AnimatedSection>
        <SectionLabel>What I've built</SectionLabel>
        <SectionHeading>
          Projects I'm<br />
          <span className="text-white/25">proud of (so far).</span>
        </SectionHeading>
      </AnimatedSection>
      <div className="grid md:grid-cols-2 gap-5">
        {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
      </div>
    </Section>
  );
}

// ─── JOURNEY ─────────────────────────────────────────────────────────────────

function Journey() {
  return (
    <Section id="journey">
      <AnimatedSection>
        <SectionLabel>Learning journey</SectionLabel>
        <SectionHeading>
          How I got here<br />
          <span className="text-white/25">and where I'm going.</span>
        </SectionHeading>
        <motion.div variants={stagger} className="relative space-y-6">
          {/* Vertical spine — desktop only */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/30 via-white/[0.07] to-transparent -translate-x-1/2" />

          {JOURNEY.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i}
              className={`relative flex gap-6 md:gap-0 items-start ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              {/* Node */}
              <div className="relative z-10 shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-5">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  transition={{ duration: 0.25 }}
                  className="w-10 h-10 rounded-xl border flex items-center justify-center text-sm backdrop-blur-sm cursor-default"
                  style={{ background: `${item.accent}14`, borderColor: `${item.accent}32`, color: item.accent, boxShadow: `0 0 18px ${item.accent}1a` }}
                >
                  {item.icon}
                </motion.div>
              </div>

              {/* Card */}
              <div className={`flex-1 md:w-[45%] md:flex-none pl-2 md:pl-0 ${i % 2 === 0 ? "md:pr-14" : "md:pl-14 md:ml-[50%]"}`}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.3 }}
                  className="group p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className={`flex items-center gap-3 mb-3 ${i % 2 === 0 ? "md:flex-row-reverse md:justify-end" : ""}`}>
                    <span className="text-[11px] font-mono tracking-widest" style={{ color: item.accent }}>{item.phase}</span>
                    <span className="text-[11px] text-white/22 font-mono">{item.period}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white/85 mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/38 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {item.desc}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatedSection>
    </Section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────

function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "riishhh24@gmail.com";

  const copy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <Section id="contact">
      <AnimatedSection>
        <div className="relative rounded-3xl border border-white/[0.07] bg-white/[0.02] overflow-hidden p-10 md:p-20 text-center">
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 68%)" }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <motion.div variants={fadeUp} className="flex justify-center"><SectionLabel>Let's connect</SectionLabel></motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-5xl md:text-7xl font-semibold tracking-tight text-white/90 mb-5 mt-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Let's make<br />
            <span className="text-white/25">something cool.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-base text-white/36 mb-12 max-w-sm mx-auto leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Open to collabs, feedback, internship opportunities, or just a conversation about design and code.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton
              href={`mailto:${email}`}
              className="flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-black rounded-2xl font-semibold hover:bg-white/90 transition-all shadow-[0_0_28px_rgba(255,255,255,0.1)]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send an email
            </MagneticButton>

            <MagneticButton
              onClick={copy}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-white/[0.09] text-white/50 hover:text-white hover:border-white/25 transition-all bg-white/[0.03] text-sm font-mono"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span key="copied" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-emerald-400 flex items-center gap-2">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    Copied!
                  </motion.span>
                ) : (
                  <motion.span key="addr" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{email}</motion.span>
                )}
              </AnimatePresence>
            </MagneticButton>
          </motion.div>
        </div>
      </AnimatedSection>
    </Section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  const socials = [
    { label: "GitHub", href: "https://github.com/rishi-codes24" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rishi-kashyap-68617030a/" },
    { label: "Email", href: "mailto:riishhh24@gmail.com" },
  ];
  return (
    <footer className="border-t border-white/[0.05] px-6 md:px-12 lg:px-24 py-10 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <span className="text-xs font-mono text-white/18 tracking-widest uppercase">© 2025 Rishi Kashyap</span>
        <div className="flex items-center gap-6">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} className="text-xs text-white/26 hover:text-white/62 transition-colors font-mono tracking-wider">
              {s.label}
            </a>
          ))}
        </div>
        <span className="text-xs font-mono text-white/18 tracking-wider">React + Tailwind + Framer Motion</span>
      </div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap"
        rel="stylesheet"
      />
      <AnimatePresence>{!loaded && <LoadingScreen key="loader" onDone={() => setLoaded(true)} />}</AnimatePresence>
      <div className="min-h-screen bg-[#060608] text-white selection:bg-violet-500/25 overflow-x-hidden">
        <MouseGlow />
        <Particles />
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Journey />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}