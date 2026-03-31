import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { aboutMe, personalInfo } from "@/data/portfolio-data";
import { useToast } from "@/hooks/use-toast";
import {
  Download,
  Building2,
  GraduationCap,
  Briefcase,
  User,
  MapPin,
  Calendar,
  ExternalLink,
} from "lucide-react";

const TABS = ["Overview", "Experience", "Education", "Personal"] as const;
type Tab = typeof TABS[number];

const fullWorkExperience = [
  {
    title: "Senior Android Developer (Team Lead)",
    company: "Pozomind Technologies Pvt Ltd",
    location: "Hosur, Tamil Nadu",
    duration: "Sep 2025 – Present",
    badge: "Current",
    badgeColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
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
    badge: "",
    badgeColor: "",
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
    badge: "",
    badgeColor: "",
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
    highlights: [
      "Project: Automatic Aquaponics System Using Arduino",
      "Basketball Team Captain",
      "Active NCC Cadet",
    ],
  },
  {
    degree: "Secondary Education (SSLC)",
    institution: "High School, Hosur",
    location: "Hosur, Tamil Nadu",
    duration: "Up to 2016",
    grade: "",
    highlights: [
      "Basketball Team Captain",
      "NCC Cadet – earned 'B' & 'C' Certificates",
      "Active in sports and extracurricular leadership",
    ],
  },
];

const personalInterests = [
  { label: "Harry Potter Fan", emoji: "🪄", description: "Avid reader of the entire HP series — finding magic in code too." },
  { label: "Marvel Enthusiast", emoji: "🦸‍♂️", description: "Heroes are made by the paths they choose. Iron Man is a personal icon." },
  { label: "Basketball", emoji: "🏀", description: "Team captain at school and diploma levels. Sport built my leadership instincts." },
  { label: "NCC Sergeant", emoji: "🎖️", description: "Earned 'B' & 'C' certificates in National Cadet Corps." },
  { label: "Rotary Club Leader", emoji: "🌍", description: "4+ years of community service and youth leadership programs." },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const { toast } = useToast();

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Shree_Bhargav_RK_Resume.pdf";
    link.click();
    toast({ title: "Download started", description: "Your resume download should begin shortly." });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-24 pb-16 px-4" data-testid="about-page">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2" data-testid="about-title">
            About Me
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg" data-testid="about-subtitle">
            Android Developer Team Lead · Hosur, Tamil Nadu
          </p>
        </motion.div>

        <div className="border-b border-slate-200 dark:border-slate-800 mb-10">
          <div className="flex gap-1 -mb-px overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "Overview" && (
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Professional Summary</h2>
                    <div className="space-y-3 text-slate-600 dark:text-slate-400 leading-relaxed" data-testid="bio-content">
                      {aboutMe.fullBio.slice(0, 4).map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Philosophy</h2>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic border-l-4 border-blue-200 dark:border-blue-800 pl-4">
                      "{aboutMe.philosophy}"
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <Card className="p-5 border border-slate-200 dark:border-slate-800 shadow-none">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wide">Quick Info</h3>
                    <dl className="space-y-3">
                      <div>
                        <dt className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">Role</dt>
                        <dd className="text-sm text-slate-700 dark:text-slate-300 font-medium">{personalInfo.title}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">Location</dt>
                        <dd className="text-sm text-slate-700 dark:text-slate-300 flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {personalInfo.location}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">Experience</dt>
                        <dd className="text-sm text-slate-700 dark:text-slate-300">{personalInfo.experience}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">Email</dt>
                        <dd className="text-sm text-blue-600 dark:text-blue-400">
                          <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                        </dd>
                      </div>
                    </dl>
                  </Card>

                  <Card className="p-5 border border-slate-200 dark:border-slate-800 shadow-none">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 uppercase tracking-wide">Core Skills</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {["Kotlin", "Java", "Android SDK", "Jetpack Compose", "MVVM", "REST APIs", "ESC/POS", "SQL", "Team Leadership"].map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs font-normal">{skill}</Badge>
                      ))}
                    </div>
                  </Card>

                  <Button onClick={downloadResume} className="w-full bg-blue-600 hover:bg-blue-700 text-white" data-testid="download-resume-about">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "Experience" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Work Experience</h2>
                  <span className="text-sm text-slate-400">{fullWorkExperience.length} positions</span>
                </div>
                <div className="space-y-4">
                  {fullWorkExperience.map((job, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                    >
                      <Card className="p-6 border border-slate-200 dark:border-slate-800 shadow-none hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                        <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{job.title}</h3>
                            <div className="flex items-center gap-2 text-sm">
                              <Building2 className="h-3.5 w-3.5 text-blue-500" />
                              <span className="text-blue-600 dark:text-blue-400 font-medium">{job.company}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            {job.badge && (
                              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${job.badgeColor}`}>
                                {job.badge}
                              </span>
                            )}
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                              <Calendar className="h-3 w-3" /> {job.duration}
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-1 mb-4">
                          <MapPin className="h-3 w-3" /> {job.location}
                        </div>
                        <ul className="space-y-2">
                          {job.points.map((point, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                              <span className="text-blue-500 mt-1 shrink-0 text-xs">•</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Education" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Academic Background</h2>
                  <span className="text-sm text-slate-400">{educationTimeline.length} institutions</span>
                </div>
                <div className="space-y-4">
                  {educationTimeline.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                    >
                      <Card className="p-6 border border-slate-200 dark:border-slate-800 shadow-none hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800 flex items-center justify-center shrink-0">
                            <GraduationCap className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
                              <h3 className="font-semibold text-slate-900 dark:text-white leading-snug">{edu.degree}</h3>
                              {edu.grade && (
                                <Badge variant="outline" className="text-xs shrink-0">{edu.grade}</Badge>
                              )}
                            </div>
                            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">{edu.institution}</p>
                            <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
                              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{edu.location}</span>
                              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{edu.duration}</span>
                            </div>
                            <ul className="space-y-1.5">
                              {edu.highlights.map((h, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                  <span className="text-orange-500 mt-1 shrink-0 text-xs">✦</span>
                                  {h}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Personal" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Beyond the Code</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-2xl">
                    Outside of engineering, I'm shaped by stories, sport, and service. Here's what makes me, me.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {personalInterests.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                    >
                      <Card className="p-5 border border-slate-200 dark:border-slate-800 shadow-none hover:border-slate-300 dark:hover:border-slate-700 transition-colors h-full">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{item.emoji}</span>
                          <div>
                            <h3 className="font-medium text-slate-900 dark:text-white mb-1">{item.label}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <Card className="p-6 border border-slate-200 dark:border-slate-800 shadow-none bg-slate-50 dark:bg-slate-900/50">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-3">A Few Fun Facts</h3>
                  <ul className="space-y-2">
                    {aboutMe.funFacts.map((fact, i) => (
                      <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                        {fact}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
