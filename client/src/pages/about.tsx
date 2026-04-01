import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { aboutMe, personalInfo } from "@/data/portfolio-data";
import { useToast } from "@/hooks/use-toast";
import { Download, Code, Sparkles, User, GraduationCap, Briefcase, Building2 } from "lucide-react";
import { Link } from "wouter";

const skillChips = ["Java", "Kotlin", "Android", "REST APIs", "Printing Solutions", "PDF Generation", "SQL", "Leadership"];

const fullWorkExperience = [
  {
    title: "Senior Android Developer (Team Lead)",
    company: "Pozomind Technologies Pvt Ltd",
    location: "Hosur, Tamil Nadu",
    duration: "Sep 2025 – Present",
    type: "work",
    color: "from-violet-500 to-purple-600",
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
    type: "work",
    color: "from-blue-500 to-cyan-600",
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
    type: "work",
    color: "from-emerald-500 to-teal-600",
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
    type: "college",
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
    type: "diploma",
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
    type: "school",
    color: "from-pink-500 to-rose-500",
    highlights: [
      "Basketball Team Captain – School team (2016–2017)",
      "NCC Cadet – earned 'B' & 'C' Certificates",
      "Active in sports and extracurricular leadership",
    ],
  },
];

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
    <div className="min-h-screen py-24 px-4 bg-gradient-to-br from-blue-50 via-violet-50/30 to-orange-50/50 dark:from-blue-950/30 dark:via-violet-950/30 dark:to-orange-950/30 relative overflow-hidden" data-testid="about-page">
      {/* Enhanced Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-40 -left-20 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-violet-400/10 rounded-full blur-3xl"
          animate={{ x: [0, 60, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 -right-20 w-72 h-72 bg-gradient-to-br from-orange-400/10 to-pink-400/10 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, 40, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full mb-6 shadow-2xl"
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <User className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6" data-testid="about-title">
            <span className="text-4xl md:text-6xl mr-3">👋</span>
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-orange-600 bg-clip-text text-transparent">Hi, I'm Shree Bhargav</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="about-subtitle">
            {personalInfo.tagline}
          </p>
        </motion.div>

        {/* Bio + Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Professional Journey */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-8 border-0 shadow-2xl bg-gradient-to-br from-white via-blue-50/30 to-violet-50/30 dark:from-slate-900 dark:via-blue-950/30 dark:to-violet-950/30 relative overflow-hidden h-full" data-testid="journey-card">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              
              <h3 className="text-3xl font-bold mb-6 flex items-center gap-3 relative z-10">
                <span className="text-3xl">💡</span>
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">My Journey</span>
              </h3>
              <div className="relative z-10 text-muted-foreground space-y-4" data-testid="bio-content">
                {bioExpanded ? (
                  <div className="space-y-4">
                    {aboutMe.fullBio.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {aboutMe.shortBio.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>
              <Button
                variant="link"
                onClick={() => setBioExpanded(!bioExpanded)}
                className="relative z-10 mt-4 p-0 h-auto text-primary hover:text-primary/80"
                data-testid="bio-toggle"
              >
                {bioExpanded ? "← Show Less" : "Read Full Story →"}
              </Button>

              <motion.div
                className="mt-6 pt-4 border-t border-dashed border-blue-200 dark:border-blue-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Beyond the Code</p>
                <div className="grid grid-cols-2 gap-3" data-testid="personal-highlights">
                  <div className="flex items-center gap-3 bg-orange-50 dark:bg-orange-950/20 rounded-xl px-4 py-3">
                    <span className="text-2xl">🏀</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Basketball Captain</p>
                      <p className="text-xs text-muted-foreground">School & Diploma team</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-green-50 dark:bg-green-950/20 rounded-xl px-4 py-3">
                    <span className="text-2xl">🎖️</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">NCC Sergeant</p>
                      <p className="text-xs text-muted-foreground">'B' & 'C' Certificates</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-950/20 rounded-xl px-4 py-3">
                    <span className="text-2xl">🌍</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Rotary Club VP</p>
                      <p className="text-xs text-muted-foreground">Secretary & VP, 4+ years</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-violet-50 dark:bg-violet-950/20 rounded-xl px-4 py-3">
                    <span className="text-2xl">🏆</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">ISTE Vice President</p>
                      <p className="text-xs text-muted-foreground">Adhiyamaan College</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Card>
          </motion.div>

          {/* What I Do */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="p-6 border-0 shadow-2xl bg-gradient-to-br from-white via-violet-50/30 to-orange-50/30 dark:from-slate-900 dark:via-violet-950/30 dark:to-orange-950/30" data-testid="skills-card">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">🛠️</span>
                <span className="text-violet-600">What I Do</span>
              </h3>
              <p className="text-muted-foreground mb-4">
                I specialize in building Android apps with modern technologies and leading development teams to success.
              </p>

              <div className="flex flex-wrap gap-2 mb-4" data-testid="skill-chips">
                {skillChips.map((skill) => (
                  <Badge key={skill} variant="secondary" className="cursor-pointer hover:scale-105 transition-transform">
                    {skill}
                  </Badge>
                ))}
              </div>

              <h4 className="font-semibold mb-2 flex items-center gap-2">
                🏆 Key Achievements:
              </h4>
              <ul className="space-y-2 text-muted-foreground text-sm mb-6">
                <li>• Leading team of 8 developers at Pozomind Technologies</li>
                <li>• Built Pozo Retail, Printer SDK, Boating & Insurance apps</li>
                <li>• Improved cold-start performance by 40%</li>
                <li>• Designed USB/Wi-Fi ESC/POS printing solutions</li>
              </ul>

              <div className="border-t border-dashed border-violet-200 dark:border-violet-800 pt-4">
                <h4 className="text-lg font-semibold mb-2 flex items-center gap-2 text-emerald-600">
                  🌍 Philosophy
                </h4>
                <p className="text-muted-foreground text-sm">
                  {aboutMe.philosophy}
                </p>
              </div>
            </Card>

            <Card className="p-6 text-center border-0 shadow-xl bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-950/20 dark:to-violet-950/20" data-testid="cta-card">
              <p className="text-lg font-medium mb-4 flex items-center justify-center gap-2">
                Let's build something amazing together <Sparkles className="w-5 h-5" />
              </p>
              <div className="flex justify-center space-x-4">
                <Button onClick={downloadResume} data-testid="download-resume-about">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
                <Button variant="secondary" asChild data-testid="view-projects-about">
                  <Link href="/projects">
                    <Code className="mr-2 h-4 w-4" />
                    View Projects
                  </Link>
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Work Experience Timeline */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-3">
              <Briefcase className="w-7 h-7 text-blue-600" />
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Work Experience
              </h3>
            </div>
            <p className="text-muted-foreground">My professional journey so far</p>
          </div>

          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-violet-400 to-emerald-400 transform md:-translate-x-px" />

            <div className="space-y-8">
              {fullWorkExperience.map((job, index) => (
                <motion.div
                  key={index}
                  className={`relative flex items-start gap-6 md:gap-0 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 shadow-md transform -translate-x-1.5 md:-translate-x-2 mt-5 z-10"
                    style={{ background: `linear-gradient(135deg, ${job.color.includes("violet") ? "#8b5cf6,#7c3aed" : job.color.includes("blue") ? "#3b82f6,#0891b2" : "#10b981,#0d9488"})` }} />

                  {/* Card */}
                  <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? "md:mr-auto md:pr-10" : "md:ml-auto md:pl-10"}`}>
                    <Card className="p-6 border-0 shadow-xl bg-white dark:bg-slate-900 hover:shadow-2xl transition-shadow">
                      <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                        <div>
                          <h4 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">{job.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Building2 className="w-4 h-4 text-blue-500 shrink-0" />
                            <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">{job.company}</span>
                          </div>
                        </div>
                        {job.badge && (
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 shrink-0">
                            {job.badge}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">📅 {job.duration}</span>
                        <span className="flex items-center gap-1">📍 {job.location}</span>
                      </div>
                      <ul className="space-y-1.5">
                        {job.points.map((point, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-blue-500 mt-0.5 shrink-0">•</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Education Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-3">
              <GraduationCap className="w-7 h-7 text-orange-500" />
              <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
                Education
              </h3>
            </div>
            <p className="text-muted-foreground">My academic foundation and school life</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {educationTimeline.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 * index }}
              >
                <Card className="p-6 border-0 shadow-xl bg-white dark:bg-slate-900 hover:shadow-2xl transition-all hover:-translate-y-1 h-full">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${edu.color} mb-4 shadow-lg`}>
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white leading-snug mb-1">{edu.degree}</h4>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">{edu.institution}</p>
                  <p className="text-xs text-muted-foreground mb-1">📍 {edu.location}</p>
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span className="text-xs text-muted-foreground">📅 {edu.duration}</span>
                    {edu.grade && (
                      <Badge variant="outline" className="text-xs">{edu.grade}</Badge>
                    )}
                  </div>
                  <ul className="space-y-1.5">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-orange-500 mt-0.5 shrink-0">✦</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
