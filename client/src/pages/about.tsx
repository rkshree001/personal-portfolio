import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { aboutMe, personalInfo } from "@/data/portfolio-data";
import { useToast } from "@/hooks/use-toast";
import { Download, Code, Sparkles, Zap, User } from "lucide-react";
import { Link } from "wouter";

const skillChips = ["Java", "Kotlin", "Android", "REST APIs", "Printing Solutions", "PDF Generation", "SQL", "Leadership"];

export default function AboutPage() {
  const [bioExpanded, setBioExpanded] = useState(false);
  const [sparkleEffect, setSparkleEffect] = useState(false);
  const [arcReactorEffect, setArcReactorEffect] = useState(false);
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

  const triggerHarryPotterEgg = () => {
    setSparkleEffect(true);
    toast({
      title: "✨ Expelliarmus!",
      description: "Magic is everywhere in coding! ⚡",
    });
    setTimeout(() => setSparkleEffect(false), 1000);
  };

  const triggerMarvelEgg = () => {
    setArcReactorEffect(true);
    toast({
      title: "🦸‍♂️ I am Iron Man!",
      description: "Heroes are made by the paths they choose 🚀",
    });
    setTimeout(() => setArcReactorEffect(false), 1000);
  };

  return (
    <div className="min-h-screen py-24 px-4 bg-gradient-to-br from-blue-50 via-violet-50/30 to-orange-50/50 dark:from-blue-950/30 dark:via-violet-950/30 dark:to-orange-950/30 relative overflow-hidden" data-testid="about-page">
      {/* Enhanced Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-40 -left-20 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-violet-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-40 -right-20 w-72 h-72 bg-gradient-to-br from-orange-400/10 to-pink-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 40, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full mb-6 shadow-2xl"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1] 
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Professional Journey */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-8 border-0 shadow-2xl bg-gradient-to-br from-white via-blue-50/30 to-violet-50/30 dark:from-slate-900 dark:via-blue-950/30 dark:to-violet-950/30 relative overflow-hidden h-full" data-testid="journey-card">
              {/* Card background animation */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              
              <h3 className="text-3xl font-bold mb-6 flex items-center gap-3 relative z-10">
                <span className="text-3xl">💡</span>
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">My Journey</span>
              </h3>
              <div className="text-muted-foreground space-y-4" data-testid="bio-content">
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
                className="mt-4 p-0 h-auto text-primary hover:text-primary/80"
                data-testid="bio-toggle"
              >
                {bioExpanded ? "← Show Less" : "Read Full Story →"}
              </Button>

              {/* Easter Eggs inside the card */}
              <motion.div
                className="flex justify-center space-x-8 mt-6 pt-4 border-t border-dashed border-blue-200 dark:border-blue-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.div
                  className="cursor-pointer text-center group"
                  onClick={triggerHarryPotterEgg}
                  animate={sparkleEffect ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.6 }}
                  data-testid="harry-potter-egg"
                >
                  <motion.span
                    className="text-4xl block mb-2 group-hover:scale-110 transition-transform"
                    animate={sparkleEffect ? { rotate: [0, 15, -15, 0] } : {}}
                  >
                    🪄
                  </motion.span>
                  <p className="text-sm text-muted-foreground font-medium">Harry Potter Fan</p>
                </motion.div>
                
                <motion.div
                  className="cursor-pointer text-center group"
                  onClick={triggerMarvelEgg}
                  animate={arcReactorEffect ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.6 }}
                  data-testid="marvel-egg"
                >
                  <motion.span
                    className="text-4xl block mb-2 group-hover:scale-110 transition-transform"
                    animate={arcReactorEffect ? { 
                      boxShadow: [
                        "0 0 10px rgba(59, 130, 246, 0.5)",
                        "0 0 30px rgba(59, 130, 246, 0.8)",
                        "0 0 10px rgba(59, 130, 246, 0.5)"
                      ]
                    } : {}}
                    style={{ borderRadius: "50%" }}
                  >
                    🦸‍♂️
                  </motion.span>
                  <p className="text-sm text-muted-foreground font-medium">Marvel Enthusiast</p>
                </motion.div>
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

              {/* Interactive Skills Chips */}
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
                <li>• Leading team of 10 developers at Prematix Software Solutions</li>
                <li>• Built NYC Schools, Trip Wise Pay, Pozo Retail & Printer apps</li>
                <li>• Reduced app load times from 12s → 4s</li>
                <li>• Designed USB/Wi-Fi printing solutions</li>
              </ul>

              {/* Philosophy section inside the card */}
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
      </div>
    </div>
  );
}
