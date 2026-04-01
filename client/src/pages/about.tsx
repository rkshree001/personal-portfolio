import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { aboutMe, personalInfo, certifications } from "@/data/portfolio-data";
import { useToast } from "@/hooks/use-toast";
import {
  Download, Code, Sparkles, GraduationCap, Briefcase,
  Building2, Github, Linkedin, Mail, MapPin, Award
} from "lucide-react";
import { Link } from "wouter";

const skillChips = ["Java", "Kotlin", "Android", "REST APIs", "Printing Solutions", "PDF Generation", "SQL", "Leadership"];

const stats = [
  { label: "Years Experience", value: 3, suffix: "+", color: "from-blue-500 to-blue-600" },
  { label: "Projects Delivered", value: 11, suffix: "+", color: "from-violet-500 to-violet-600" },
  { label: "Developers Led", value: 10, suffix: "+", color: "from-emerald-500 to-emerald-600" },
  { label: "Companies", value: 3, suffix: "", color: "from-orange-500 to-orange-600" },
];

const fullWorkExperience = [
  {
    title: "Senior Android Developer (Team Lead)",
    company: "Pozomind Technologies Pvt Ltd",
    location: "Hosur, Tamil Nadu",
    duration: "Sep 2025 – Present",
    color: "from-violet-500 to-purple-600",
    dotColor: "#8b5cf6",
    badge: "Current",
    points: [
      "Leading a team of 8 Android developers, ensuring 99% crash-free stability",
      "Architected scalable apps using Kotlin, Jetpack Compose & MVVM",
      "Improved deployment speed by 30% with CI/CD pipelines",
      "Enhanced in-house Printer SDK with better ESC/POS support",
    ],
  },
  {
    title: "Senior Software Developer – Android",
    company: "Prematix Software Solutions",
    location: "Hosur, Tamil Nadu",
    duration: "Jul 2023 – Aug 2025",
    color: "from-blue-500 to-cyan-600",
    dotColor: "#3b82f6",
    badge: "",
    points: [
      "Developed high-scale Android apps using Kotlin, Java, MVVM & Jetpack",
      "Built advanced POS/Thermal Printer modules (USB/Wi-Fi) with ESC/POS",
      "Improved app cold-start performance by 40% and optimized UI rendering",
      "Delivered multi-platform solutions for Mobile, TV, and POS systems",
    ],
  },
  {
    title: "SQL Developer (ERP Intern)",
    company: "Carborundum Universal Limited",
    location: "Hosur, Tamil Nadu",
    duration: "Dec 2022 – Jun 2023",
    color: "from-emerald-500 to-teal-600",
    dotColor: "#10b981",
    badge: "",
    points: [
      "Handled ERP troubleshooting, SQL scripting & CRM workflows",
      "Managed front-end and back-end ERP interactions",
      "Assisted as system administrator for ERP platforms",
    ],
  },
];

const educationTimeline = [
  {
    degree: "B.E. in Computer Science Engineering",
    institution: "Adhiyamaan College of Engineering",
    location: "Hosur, Tamil Nadu",
    duration: "Aug 2018 – Jun 2021",
    grade: "CGPA: 7.9",
    color: "from-orange-500 to-rose-500",
    highlights: [
      "Vice President of ISTE Chapter",
      "Final Year Project: AI-Based Child Drowning Prevention System",
      "Project: Web Phishing Detection Using Machine Learning",
    ],
  },
  {
    degree: "Diploma in E-Robotics",
    institution: "Er. Perumal Manimekalai College of Engineering",
    location: "Hosur, Tamil Nadu",
    duration: "Aug 2016 – Jun 2018",
    grade: "74%",
    color: "from-amber-500 to-orange-500",
    highlights: [
      "Project: Automatic Aquaponics System Using Arduino",
      "Basketball Team Captain",
      "Active NCC Cadet",
    ],
  },
  {
    degree: "School – Secondary Education",
    institution: "High School, Hosur",
    location: "Hosur, Tamil Nadu",
    duration: "Up to 2016",
    grade: "",
    color: "from-pink-500 to-rose-500",
    highlights: [
      "Basketball Team Captain – School team (2016–2017)",
      "NCC Cadet – earned 'B' & 'C' Certificates",
      "Active in sports and extracurricular leadership",
    ],
  },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1200;
          const step = Math.ceil(target / (duration / 16));
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function AboutPage() {
  const [bioExpanded, setBioExpanded] = useState(true);
  const { toast } = useToast();

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Shree_Bhargav_RK_Resume.pdf';
    link.click();
    toast({
      title: "Resume download started! 📄",
      description: "Your download should begin shortly.",
    });
  };

  return (
    <div className="min-h-screen py-24 px-4 bg-gradient-to-br from-blue-50 via-violet-50/30 to-orange-50/50 relative overflow-hidden" data-testid="about-page">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-40 -left-20 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-violet-400/10 rounded-full blur-3xl"
          animate={{ x: [0, 60, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 -right-20 w-96 h-96 bg-gradient-to-br from-orange-400/10 to-pink-400/10 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, 40, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-violet-400/5 to-blue-400/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── HERO ─────────────────────────────────────────── */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Avatar */}
          <motion.div
            className="relative inline-flex mb-8"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-blue-500 via-violet-600 to-purple-600 flex items-center justify-center shadow-2xl shadow-violet-400/40 text-white text-4xl font-black tracking-tight select-none">
              SB
            </div>
            <span className="absolute -bottom-2 -right-2 text-2xl">👋</span>
            <motion.div
              className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/30 to-violet-400/30 blur-xl -z-10"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black mb-4 leading-tight" data-testid="about-title">
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-orange-500 bg-clip-text text-transparent">
              Hi, I'm Shree Bhargav
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4" data-testid="about-subtitle">
            {personalInfo.tagline}
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span>{personalInfo.location}</span>
          </div>
        </motion.div>

        {/* ── STATS BAR ─────────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04, y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-5 text-center border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden relative">
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} rounded-t-xl`} />
                <p className={`text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* ── BIO + SIDEBAR ────────────────────────────────── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">

          {/* My Journey card */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card className="p-8 border-0 shadow-2xl bg-white/90 relative overflow-hidden h-full" data-testid="journey-card">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br from-blue-400/8 to-violet-400/8 rounded-full blur-2xl" />
              </div>

              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 relative z-10">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-white text-lg shadow-lg">💡</span>
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">My Journey</span>
              </h3>

              <div className="relative z-10 space-y-4" data-testid="bio-content">
                {(bioExpanded ? aboutMe.fullBio : aboutMe.shortBio).map((paragraph, index) => (
                  <motion.div
                    key={index}
                    className="flex gap-3 group"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <div className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-b from-blue-500 to-violet-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <p className="text-muted-foreground leading-relaxed text-sm">{paragraph}</p>
                  </motion.div>
                ))}
              </div>

              <Button
                variant="link"
                onClick={() => setBioExpanded(!bioExpanded)}
                className="relative z-10 mt-5 p-0 h-auto text-primary hover:text-primary/80 font-semibold text-sm"
                data-testid="bio-toggle"
              >
                {bioExpanded ? "← Show Less" : "Read Full Story →"}
              </Button>

              {/* Beyond the Code */}
              <div className="mt-6 pt-5 border-t border-blue-100 relative z-10">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-4">Beyond the Code</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { emoji: "🏀", title: "Basketball Captain", sub: "School & Diploma teams", bg: "bg-orange-50 hover:bg-orange-100 border-orange-100" },
                    { emoji: "🎖️", title: "NCC Sergeant", sub: "'B' & 'C' Certificates", bg: "bg-green-50 hover:bg-green-100 border-green-100" },
                    { emoji: "🌍", title: "Rotary Club VP", sub: "Secretary & VP, 4+ years", bg: "bg-blue-50 hover:bg-blue-100 border-blue-100" },
                    { emoji: "🏆", title: "ISTE Vice President", sub: "Adhiyamaan College", bg: "bg-violet-50 hover:bg-violet-100 border-violet-100" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className={`flex items-center gap-3 ${item.bg} border rounded-xl px-4 py-3 transition-colors cursor-default`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <span className="text-2xl">{item.emoji}</span>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.sub}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Sidebar: What I Do + CTA */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="p-6 border-0 shadow-2xl bg-white/90" data-testid="skills-card">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-violet-100 text-lg">🛠️</span>
                <span className="text-violet-600">What I Do</span>
              </h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                I build high-performance Android apps and lead development teams to deliver scalable mobile solutions.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5" data-testid="skill-chips">
                {skillChips.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs cursor-default hover:scale-105 transition-transform">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="space-y-2.5 mb-5">
                {[
                  { icon: "⚡", text: "Team of 8 devs at Pozomind Technologies" },
                  { icon: "📱", text: "Pozo Retail, Printer SDK, Boating & Insurance apps" },
                  { icon: "🚀", text: "40% cold-start performance improvement" },
                  { icon: "🖨️", text: "USB/Wi-Fi ESC/POS printing solutions" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-base mt-0.5">{item.icon}</span>
                    <p className="text-muted-foreground text-xs leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-violet-100 pt-4">
                <p className="text-xs font-semibold text-emerald-600 mb-1 flex items-center gap-1">🌍 Philosophy</p>
                <p className="text-muted-foreground text-xs leading-relaxed">{aboutMe.philosophy}</p>
              </div>
            </Card>

            {/* CTA card */}
            <Card className="p-6 border-0 shadow-xl bg-gradient-to-br from-blue-600 via-violet-600 to-purple-600 text-white relative overflow-hidden" data-testid="cta-card">
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-xl"
                  animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 4, repeat: Infinity }} />
              </div>
              <p className="text-base font-semibold mb-1 relative z-10 flex items-center gap-2">
                Let's build something amazing <Sparkles className="w-4 h-4" />
              </p>
              <p className="text-blue-100 text-xs mb-4 relative z-10">{personalInfo.email}</p>
              <div className="flex flex-col gap-2 relative z-10">
                <Button onClick={downloadResume} variant="secondary" size="sm" className="w-full justify-center" data-testid="download-resume-about">
                  <Download className="mr-2 h-3.5 w-3.5" />
                  Download Resume
                </Button>
                <Button variant="outline" size="sm" asChild className="w-full justify-center bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white" data-testid="view-projects-about">
                  <Link href="/projects">
                    <Code className="mr-2 h-3.5 w-3.5" />
                    View Projects
                  </Link>
                </Button>
              </div>
              {/* Social links */}
              <div className="flex gap-3 mt-4 relative z-10">
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-blue-100 hover:text-white transition-colors"
                  data-testid="link-github">
                  <Github className="w-3.5 h-3.5" /> GitHub
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-blue-100 hover:text-white transition-colors"
                  data-testid="link-linkedin">
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                </a>
                <a href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-1.5 text-xs text-blue-100 hover:text-white transition-colors"
                  data-testid="link-email">
                  <Mail className="w-3.5 h-3.5" /> Email
                </a>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* ── WORK EXPERIENCE ───────────────────────────────── */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Work Experience
              </h3>
            </div>
            <p className="text-muted-foreground text-sm">My professional journey so far</p>
          </div>

          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-violet-400 to-emerald-400 md:-translate-x-px" />
            <div className="space-y-8">
              {fullWorkExperience.map((job, index) => (
                <motion.div
                  key={index}
                  className={`relative flex items-start gap-6 md:gap-0 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <div className="absolute left-6 md:left-1/2 w-5 h-5 rounded-full border-2 border-white shadow-lg transform -translate-x-2 md:-translate-x-2.5 mt-4 z-10 flex items-center justify-center"
                    style={{ background: job.dotColor }}>
                    <div className="w-2 h-2 rounded-full bg-white/70" />
                  </div>

                  <div className={`ml-14 md:ml-0 md:w-5/12 ${index % 2 === 0 ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"}`}>
                    <motion.div whileHover={{ scale: 1.02, y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Card className="p-6 border-0 shadow-xl bg-white hover:shadow-2xl transition-all relative overflow-hidden">
                        <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${job.color}`} />
                        <div className="flex items-start justify-between mb-3 flex-wrap gap-2 pl-2">
                          <div>
                            <h4 className="font-bold text-base text-slate-900 leading-snug">{job.title}</h4>
                            <div className="flex items-center gap-1.5 mt-1">
                              <Building2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                              <span className="text-blue-600 font-medium text-sm">{job.company}</span>
                            </div>
                          </div>
                          {job.badge && (
                            <Badge className="bg-emerald-100 text-emerald-700 shrink-0 text-xs">
                              ● {job.badge}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4 pl-2 flex-wrap">
                          <span>📅 {job.duration}</span>
                          <span>📍 {job.location}</span>
                        </div>
                        <ul className="space-y-2 pl-2">
                          {job.points.map((point, i) => (
                            <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                              <span className="text-blue-400 mt-0.5 shrink-0">▸</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </Card>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── EDUCATION ─────────────────────────────────────── */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center shadow-lg">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-3xl font-black bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
                Education
              </h3>
            </div>
            <p className="text-muted-foreground text-sm">My academic foundation and school life</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {educationTimeline.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 * index }}
                whileHover={{ scale: 1.03, y: -4 }}
              >
                <Card className="p-6 border-0 shadow-xl bg-white h-full transition-all relative overflow-hidden">
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${edu.color}`} />
                  <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${edu.color} mb-4 shadow-lg mt-2`}>
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 leading-snug mb-1">{edu.degree}</h4>
                  <p className="text-sm font-medium text-blue-600 mb-1">{edu.institution}</p>
                  <p className="text-xs text-muted-foreground mb-1">📍 {edu.location}</p>
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span className="text-xs text-muted-foreground">📅 {edu.duration}</span>
                    {edu.grade && (
                      <Badge variant="outline" className="text-xs font-semibold">{edu.grade}</Badge>
                    )}
                  </div>
                  <ul className="space-y-1.5">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-orange-400 mt-0.5 shrink-0">✦</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── CERTIFICATIONS ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                <Award className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-3xl font-black bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                Certifications
              </h3>
            </div>
            <p className="text-muted-foreground text-sm">Recognition and credentials earned</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.07 * index }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="p-4 border-0 shadow-md bg-white hover:shadow-lg transition-all flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Award className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-sm text-slate-700 leading-snug">{cert}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
