import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, QrCode, Star, Sparkles, Code, Award, Target, Zap, BookOpen, X, Maximize2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { personalInfo } from "@/data/portfolio-data";
import { DynamicQRCode } from "@/components/ui/qr-code";

const resumeStats = [
  { value: "2+", label: "Years Experience", color: "text-blue-600", icon: Target, bg: "bg-blue-500/10", border: "border-blue-200" },
  { value: "10", label: "Team Members Led", color: "text-violet-600", icon: Star, bg: "bg-violet-500/10", border: "border-violet-200" },
  { value: "11+", label: "Projects Completed", color: "text-emerald-600", icon: Code, bg: "bg-emerald-500/10", border: "border-emerald-200" },
  { value: "25+", label: "Technologies Mastered", color: "text-rose-600", icon: Zap, bg: "bg-rose-500/10", border: "border-rose-200" },
];

const resumeHighlights = [
  { text: "Senior Android Developer & Team Lead at Pozomind Technologies", emoji: "🚀" },
  { text: "Leading team of 8 developers with code reviews & mentoring", emoji: "👥" },
  { text: "Expert in Kotlin, Java, Jetpack Compose, MVVM Architecture", emoji: "📱" },
  { text: "Built 11+ successful mobile applications across various domains", emoji: "🏆" },
  { text: "Specialized in USB/Wi-Fi printing solutions & ESC/POS SDK", emoji: "🔧" },
  { text: "Performance expert — improved cold start by 40%, load time 12s → 4s", emoji: "🎯" },
];

export default function ResumePage() {
  const { toast } = useToast();
  const [isHovering, setIsHovering] = useState(false);
  const [sparkleEffect, setSparkleEffect] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Shree_Bhargav_RK_Resume.pdf";
    link.click();
    toast({
      title: "🎉 Resume download started!",
      description: "Thank you for your interest! Download should begin shortly.",
    });
    setSparkleEffect(true);
    setTimeout(() => setSparkleEffect(false), 1000);
  };

  const openResumeInNewTab = () => {
    window.open("/resume.pdf", "_blank");
    toast({ title: "📄 Opening resume...", description: "Resume opened in a new tab for viewing." });
  };

  return (
    <div
      className="min-h-screen py-24 px-4 bg-gradient-to-br from-blue-50 via-white to-violet-50 relative overflow-hidden"
      data-testid="resume-page"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 -left-32 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-violet-300/20 rounded-full blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 -right-32 w-80 h-80 bg-gradient-to-br from-violet-300/20 to-pink-300/20 rounded-full blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, 20, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-blue-200/15 to-emerald-200/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full mb-6 shadow-2xl"
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <BookOpen className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4" data-testid="resume-title">
            <span className="mr-3">📄</span>
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              My Professional Journey
            </span>
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto" data-testid="resume-subtitle">
            Discover my career story, technical expertise, and achievements in one comprehensive document
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="relative overflow-hidden border-0 shadow-2xl bg-white/90 backdrop-blur-sm" data-testid="resume-preview-card">
            {/* Card glow decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-10 -left-10 w-32 h-32 bg-violet-500/10 rounded-full"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.6, 0.3, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>

            <div className="relative p-8 md:p-12">
              {/* Top: PDF icon + info + action buttons */}
              <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                {/* PDF Thumbnail */}
                <motion.div
                  className="relative shrink-0"
                  onHoverStart={() => setIsHovering(true)}
                  onHoverEnd={() => setIsHovering(false)}
                >
                  <motion.div
                    className="w-32 h-44 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-2xl flex flex-col items-center justify-center relative overflow-hidden cursor-pointer"
                    animate={sparkleEffect ? { scale: [1, 1.1, 1], boxShadow: ["0 25px 50px -12px rgba(0,0,0,0.25)", "0 25px 50px -12px rgba(59,130,246,0.5)", "0 25px 50px -12px rgba(0,0,0,0.25)"] } : {}}
                    whileHover={{ scale: 1.05, rotateY: 8, boxShadow: "0 30px 60px -12px rgba(59,130,246,0.35)" }}
                    onClick={() => setShowPreview(true)}
                    data-testid="resume-preview"
                  >
                    <FileText className="w-14 h-14 text-white drop-shadow-lg mb-2 relative z-10" />
                    <div className="absolute inset-0 p-3 pt-5 flex flex-col gap-1">
                      {[...Array(7)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="h-0.5 bg-white/25 rounded"
                          style={{ width: `${85 - i * 6}%` }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                        />
                      ))}
                    </div>
                    <AnimatePresence>
                      {isHovering && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-violet-600/60 flex flex-col items-center justify-center gap-1 z-20"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Eye className="w-8 h-8 text-white drop-shadow-lg" />
                          <span className="text-white text-xs font-semibold">Preview</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  {/* Sparkle effect */}
                  <AnimatePresence>
                    {sparkleEffect && (
                      <motion.div
                        className="absolute -top-2 -right-2"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                      >
                        <Sparkles className="w-6 h-6 text-yellow-400" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Info and Buttons */}
                <div className="flex-1 text-center md:text-left">
                  <motion.h3
                    className="text-3xl font-bold mb-2 text-slate-900"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    data-testid="resume-name"
                  >
                    {personalInfo.name}
                  </motion.h3>
                  <motion.p
                    className="text-lg text-slate-500 mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    data-testid="resume-description"
                  >
                    {personalInfo.title} &middot; {personalInfo.experience} Experience
                  </motion.p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={() => setShowPreview(true)}
                        className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-lg px-6 py-2.5"
                        data-testid="preview-resume-button"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Preview Resume
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={downloadResume}
                        variant="outline"
                        className="border-2 border-blue-300 hover:bg-blue-50 hover:border-blue-400 px-6 py-2.5"
                        data-testid="download-resume-button"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={openResumeInNewTab}
                        variant="ghost"
                        className="border border-slate-200 hover:bg-slate-50 px-6 py-2.5"
                        data-testid="view-resume-button"
                      >
                        <Maximize2 className="mr-2 h-4 w-4" />
                        Open Full Screen
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Inline PDF Preview Panel */}
              <AnimatePresence>
                {showPreview && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="overflow-hidden mb-10"
                  >
                    <div className="rounded-2xl overflow-hidden border-2 border-blue-200 shadow-2xl bg-slate-100">
                      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-violet-600">
                        <div className="flex items-center gap-2 text-white">
                          <FileText className="w-4 h-4" />
                          <span className="text-sm font-semibold">Resume Preview</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <motion.button
                            onClick={openResumeInNewTab}
                            className="text-white/80 hover:text-white transition-colors"
                            whileHover={{ scale: 1.1 }}
                            title="Open full screen"
                          >
                            <Maximize2 className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            onClick={() => setShowPreview(false)}
                            className="text-white/80 hover:text-white transition-colors"
                            whileHover={{ scale: 1.1 }}
                          >
                            <X className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                      <iframe
                        src="/resume.pdf"
                        className="w-full bg-white"
                        style={{ height: "75vh", minHeight: "600px" }}
                        title="Resume Preview"
                        data-testid="resume-iframe"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Highlights Grid */}
              <div className="mb-10" data-testid="resume-highlights">
                <h4 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-violet-500" />
                  Career Highlights
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {resumeHighlights.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-50/80 to-violet-50/80 border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all"
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="text-xl shrink-0">{item.emoji}</span>
                      <span className="text-sm font-medium text-slate-700">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* QR Code */}
              <motion.div
                className="border-t-2 border-dashed border-blue-200 pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <h4 className="text-xl font-semibold mb-5 flex items-center justify-center gap-2 text-slate-800" data-testid="qr-section-title">
                  <QrCode className="w-5 h-5 text-violet-600" />
                  Quick Share via QR
                </h4>
                <div className="flex flex-col items-center" data-testid="qr-code-section">
                  <div className="p-4 bg-white rounded-2xl shadow-lg border border-blue-100 mb-3">
                    <DynamicQRCode value={`${window.location.origin}/resume.pdf`} size={128} className="mx-auto" />
                  </div>
                  <p className="text-sm text-slate-500">Scan to view & download resume on any device</p>
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Stats Strip */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          data-testid="resume-stats"
        >
          {resumeStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <Card className={`text-center p-6 h-full border ${stat.border} shadow-lg bg-white hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1`}>
                <motion.div
                  className={`w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center ${stat.bg} border ${stat.border}`}
                  whileHover={{ scale: 1.15, rotate: 8 }}
                >
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </motion.div>
                <motion.div
                  className={`text-4xl font-bold mb-1.5 ${stat.color}`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.25 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-slate-500 font-medium text-sm">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <Card className="inline-block p-10 bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 text-white border-0 shadow-2xl">
            <motion.div animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }} transition={{ duration: 5, repeat: Infinity }}>
              <Award className="w-12 h-12 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-3">Ready to collaborate?</h3>
            <p className="text-blue-100 mb-6 max-w-md">
              Let's discuss how my expertise in Android development and team leadership can drive your next project to success!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={downloadResume} variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-lg">
                <Download className="mr-2 h-4 w-4" />
                Get My Resume
              </Button>
              <Button
                variant="outline"
                className="border-2 border-white/50 text-white hover:bg-white/15 font-semibold"
                onClick={() => (window.location.href = "/contact")}
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
