import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Download, Eye, QrCode, Star, Sparkles, Code, Award, Target, Zap, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { personalInfo } from "@/data/portfolio-data";
import { DynamicQRCode } from "@/components/ui/qr-code";

const resumeStats = [
  { value: "2+", label: "Years Experience", color: "text-blue-600", icon: Target, bg: "bg-blue-500/10" },
  { value: "10", label: "Team Members Led", color: "text-violet-600", icon: Star, bg: "bg-violet-500/10" },
  { value: "11+", label: "Projects Completed", color: "text-emerald-600", icon: Code, bg: "bg-emerald-500/10" },
  { value: "25+", label: "Technologies Mastered", color: "text-rose-600", icon: Zap, bg: "bg-rose-500/10" },
];

const resumeHighlights = [
  "🚀 Senior Software Developer at Prematix Software Solutions",
  "👥 Leading team of 10 developers with mentoring & code reviews",
  "📱 Expert in Java, Kotlin, Android SDK, Jetpack Compose",
  "🏆 Built 11+ successful mobile applications across various domains",
  "🔧 Specialized in USB/Wi-Fi printing solutions & payment gateways",
  "🎯 Performance optimization expert (reduced load times 12s → 4s)"
];

export default function ResumePage() {
  const { toast } = useToast();
  const [isHovering, setIsHovering] = useState(false);
  const [sparkleEffect, setSparkleEffect] = useState(false);

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Shree_Bhargav_RK_Resume.pdf';
    link.click();
    
    toast({
      title: "🎉 Resume download started!",
      description: "Thank you for your interest! Download should begin shortly.",
    });

    // Trigger sparkle effect
    setSparkleEffect(true);
    setTimeout(() => setSparkleEffect(false), 1000);
  };

  const openResumeInNewTab = () => {
    window.open('/resume.pdf', '_blank');
    toast({
      title: "📄 Opening resume...",
      description: "Resume opened in a new tab for viewing.",
    });
  };

  return (
    <div className="min-h-screen py-24 px-4 bg-gradient-to-br from-blue-50 via-white to-violet-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950" data-testid="resume-page">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full mb-6 shadow-2xl"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1] 
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
           <BookOpen className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6" data-testid="resume-title">
            <span className="text-4xl md:text-6xl mr-3">📄</span>
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">My Professional Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="resume-subtitle">
            Discover my career story, technical expertise, and achievements in one comprehensive document
          </p>
        </motion.div>

        {/* Main Resume Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-white via-blue-50/30 to-violet-50/30 dark:from-slate-900 dark:via-blue-950/30 dark:to-violet-950/30" data-testid="resume-preview-card">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-10 -left-10 w-32 h-32 bg-violet-500/10 rounded-full"
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  opacity: [0.6, 0.3, 0.6]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>

            <div className="relative p-8 md:p-12">
              {/* Resume Preview Section */}
              <div className="text-center mb-10">
                <motion.div
                  className="relative inline-block"
                  onHoverStart={() => setIsHovering(true)}
                  onHoverEnd={() => setIsHovering(false)}
                >
                  <motion.div
                    className="w-32 h-40 bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-xl flex items-center justify-center mb-6 mx-auto relative overflow-hidden"
                    animate={sparkleEffect ? { 
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                        "0 25px 50px -12px rgba(59, 130, 246, 0.5)",
                        "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                      ]
                    } : {}}
                    transition={{ duration: 0.6 }}
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 10,
                      boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.3)"
                    }}
                    data-testid="resume-preview"
                  >
                    <FileText className="w-16 h-16 text-white drop-shadow-lg" />
                    
                    {/* PDF lines effect */}
                    <div className="absolute inset-0 p-4 pt-6">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="h-0.5 bg-white/30 rounded mb-1"
                          style={{ width: `${80 - i * 5}%` }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                    
                    <AnimatePresence>
                      {isHovering && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-violet-600/20 flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Eye className="w-8 h-8 text-white drop-shadow-lg" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>

                <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent" data-testid="resume-name">
                  {personalInfo.name}
                </h3>
                <p className="text-lg text-muted-foreground mb-6" data-testid="resume-description">
                  {personalInfo.title} | {personalInfo.experience} Experience
                </p>

                {/* Resume Highlights */}
                <div className="max-w-3xl mx-auto mb-8" data-testid="resume-highlights">
                  <div className="grid md:grid-cols-2 gap-3 text-left">
                    {resumeHighlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center p-3 rounded-lg bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-950/20 dark:to-violet-950/20 border border-blue-200/50 dark:border-blue-800/50"
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                      >
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {highlight}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      onClick={openResumeInNewTab}
                      className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-lg px-8 py-3"
                      data-testid="view-resume-button"
                    >
                      <Eye className="mr-2 h-5 w-5" />
                      View Resume
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      onClick={downloadResume}
                      variant="outline"
                      className="flex-1 sm:flex-none border-2 border-blue-300 hover:bg-blue-50 dark:border-blue-700 dark:hover:bg-blue-950/30 px-8 py-3"
                      data-testid="download-resume-button"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download PDF
                    </Button>
                  </motion.div>
                </div>

                {/* QR Code Section */}
                <motion.div
                  className="border-t border-dashed border-slate-300 dark:border-slate-700 pt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <h4 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2" data-testid="qr-section-title">
                    <QrCode className="w-5 h-5 text-violet-600" />
                    Quick Share
                  </h4>
                  <div className="inline-block" data-testid="qr-code-section">
                    <div className="mb-3">
                      <DynamicQRCode 
                        value={`${window.location.origin}/resume.pdf`}
                        size={128}
                        className="mx-auto"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">Scan to view & download resume</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Enhanced Resume Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          data-testid="resume-stats"
        >
          {resumeStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <Card className="text-center p-6 h-full border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 group-hover:shadow-xl transition-all duration-300">
                <motion.div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${stat.bg}`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </motion.div>
                <motion.div 
                  className={`text-4xl font-bold mb-2 ${stat.color}`}
                  animate={{ 
                    scale: [1, 1.05, 1] 
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <Card className="inline-block p-8 bg-gradient-to-r from-blue-600 to-violet-600 text-white border-0 shadow-2xl">
            <Award className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Ready to collaborate?</h3>
            <p className="text-blue-100 mb-6 max-w-md">
              Let's discuss how my expertise in Android development and team leadership can drive your next project to success!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={downloadResume}
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                <Download className="mr-2 h-4 w-4" />
                Get My Resume
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => window.location.href = '/contact'}
              >
                Let's Connect
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
