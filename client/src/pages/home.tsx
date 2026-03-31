import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Github, Linkedin, Download, ArrowRight, MapPin, Briefcase, Users, Award, ChevronRight } from "lucide-react";
import { personalInfo } from "@/data/portfolio-data";
import { useToast } from "@/hooks/use-toast";

const stats = [
  { label: "Years of Experience", value: "2+", icon: Briefcase },
  { label: "Projects Delivered", value: "11+", icon: Award },
  { label: "Team Size Led", value: "10", icon: Users },
  { label: "Apps on Play Store", value: "5+", icon: Award },
];

const highlights = [
  {
    title: "Mobile Development",
    description: "Native Android apps using Kotlin & Jetpack Compose with MVVM architecture.",
    href: "/projects",
  },
  {
    title: "Team Leadership",
    description: "Leading teams of up to 10 engineers, driving delivery and code quality.",
    href: "/about",
  },
  {
    title: "Printing & POS Systems",
    description: "USB/Wi-Fi thermal printer SDKs and ESC/POS integration specialist.",
    href: "/skills",
  },
];

export default function HomePage() {
  const { toast } = useToast();

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Shree_Bhargav_RK_Resume.pdf";
    link.click();
    toast({
      title: "Download started",
      description: "Your resume download should begin shortly.",
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950" data-testid="home-page">
      <section className="pt-32 pb-20 px-4 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-400 text-xs font-medium rounded-full border border-green-200 dark:border-green-800">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Available for opportunities
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white tracking-tight mb-6 leading-[1.1]" data-testid="hero-name">
              Shree Bhargav R K
            </h1>

            <p className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-medium mb-4" data-testid="hero-title">
              {personalInfo.title}
            </p>

            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-8" data-testid="hero-tagline">
              Building high-performance Android applications and leading engineering teams to deliver scalable, user-centric mobile solutions.
            </p>

            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-10">
              <MapPin className="h-4 w-4" />
              <span>{personalInfo.location}</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={downloadResume}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 h-11 rounded-md"
                data-testid="button-resume"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
              <Button
                variant="outline"
                asChild
                className="px-6 h-11 rounded-md border-slate-300 dark:border-slate-700"
                data-testid="button-linkedin"
              >
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
              <Button
                variant="ghost"
                asChild
                className="px-6 h-11 rounded-md text-slate-700 dark:text-slate-300"
                data-testid="button-github"
              >
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-8">
              Areas of Expertise
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index + 0.3 }}
                >
                  <Link href={item.href}>
                    <div className="group p-6 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all cursor-pointer h-full">
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                        {item.description}
                      </p>
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                        Learn more <ChevronRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 bg-slate-900 dark:bg-slate-800 rounded-xl"
          >
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Ready to work together?</h2>
              <p className="text-slate-400 text-sm">
                I'm open to full-time roles, contract work, and technical consultations.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/contact">
                  Get in touch <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700">
                <Link href="/projects">
                  View work
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
