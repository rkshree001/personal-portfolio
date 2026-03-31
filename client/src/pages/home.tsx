import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { User, Code, Cog, Mail, Github, Linkedin, Download, Star, Sparkles, Zap, Heart, Trophy, Rocket, Target } from "lucide-react";
import { personalInfo } from "@/data/portfolio-data";
import { useToast } from "@/hooks/use-toast";

const quickAccessCards = [
  { 
    icon: User, 
    label: "About Me", 
    href: "/about", 
    color: "text-blue-600", 
    bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
    hoverColor: "hover:from-blue-100 hover:to-blue-200",
    glow: "shadow-blue-200/60",
    description: "My journey & story"
  },
  { 
    icon: Rocket, 
    label: "Projects", 
    href: "/projects", 
    color: "text-violet-600", 
    bgColor: "bg-gradient-to-br from-violet-50 to-violet-100",
    hoverColor: "hover:from-violet-100 hover:to-violet-200",
    glow: "shadow-violet-200/60",
    description: "11+ amazing apps"
  },
  { 
    icon: Code, 
    label: "Skills", 
    href: "/skills", 
    color: "text-emerald-600", 
    bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
    hoverColor: "hover:from-emerald-100 hover:to-emerald-200",
    glow: "shadow-emerald-200/60",
    description: "Tech expertise"
  },
  { 
    icon: Mail, 
    label: "Contact", 
    href: "/contact", 
    color: "text-rose-600", 
    bgColor: "bg-gradient-to-br from-rose-50 to-rose-100",
    hoverColor: "hover:from-rose-100 hover:to-rose-200",
    glow: "shadow-rose-200/60",
    description: "Let's connect!"
  },
];

const floatingElements = [
  { icon: Sparkles, x: "10%", y: "20%", delay: 0, duration: 6 },
  { icon: Star, x: "85%", y: "15%", delay: 1, duration: 8 },
  { icon: Zap, x: "15%", y: "70%", delay: 2, duration: 7 },
  { icon: Heart, x: "80%", y: "75%", delay: 0.5, duration: 9 },
  { icon: Trophy, x: "50%", y: "10%", delay: 1.5, duration: 10 },
  { icon: Rocket, x: "90%", y: "45%", delay: 3, duration: 6 },
];

const stats = [
  { label: "Years Experience", value: "2+", icon: Target, color: "text-blue-600" },
  { label: "Projects Built", value: "11+", icon: Code, color: "text-violet-600" },
  { label: "Team Led", value: "10", icon: User, color: "text-emerald-600" },
  { label: "Success Rate", value: "100%", icon: Trophy, color: "text-yellow-600" },
];

export default function HomePage() {
  const { toast } = useToast();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Shree_Bhargav_RK_Resume.pdf';
    link.click();
    
    toast({
      title: "🎉 Resume download started!",
      description: "Thank you for your interest! Download should begin shortly.",
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-violet-50/60" data-testid="home-page">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient blobs */}
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-violet-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating icons */}
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className="absolute text-blue-400/30 dark:text-blue-500/20"
            style={{ left: element.x, top: element.y }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: element.delay,
            }}
          >
            <element.icon className="w-8 h-8" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Enhanced Profile Picture */}
            <motion.div
              className="relative inline-block mb-8"
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <motion.div
                className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-blue-500 via-violet-500 to-purple-500 flex items-center justify-center text-5xl text-white font-bold shadow-2xl relative overflow-hidden"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.2, type: "spring", bounce: 0.5 }}
                whileHover={{ scale: 1.1, boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.4)" }}
                data-testid="profile-avatar"
              >
                <span className="drop-shadow-lg">SB</span>
                
                {/* Animated ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-white/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Pulse effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-violet-400/20"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>

              {/* Status badge */}
              <motion.div
                className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-4 border-white dark:border-slate-900 shadow-lg flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring", bounce: 0.6 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <User className="w-6 h-6 text-white" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Name with enhanced typography */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              data-testid="hero-name"
            >
              <motion.span
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="inline-block"
              >
                {personalInfo.name}
              </motion.span>
            </motion.h1>

            {/* Title with glow effect */}
            <motion.div
              className="relative inline-block mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="text-2xl md:text-3xl text-muted-foreground" data-testid="hero-title">
                {personalInfo.title}
              </p>
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-violet-600/20 rounded-lg blur-xl opacity-0"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              data-testid="hero-tagline"
            >
              {personalInfo.tagline}
            </motion.p>

            {/* Enhanced Buttons */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  asChild 
                  size="lg" 
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 shadow-lg"
                  data-testid="button-github"
                >
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" />
                    GitHub
                  </a>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="secondary" 
                  asChild 
                  size="lg" 
                  className="px-8 py-4 bg-gradient-to-r from-violet-50 to-blue-50 dark:from-violet-950 dark:to-blue-950 hover:from-violet-100 hover:to-blue-100"
                  data-testid="button-linkedin"
                >
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-5 w-5" />
                    LinkedIn
                  </a>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  onClick={downloadResume} 
                  size="lg" 
                  className="px-8 py-4 border-2 border-blue-300 hover:bg-blue-50 dark:border-blue-700 dark:hover:bg-blue-950/30"
                  data-testid="button-resume"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Resume
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                >
                  <Card className="text-center p-6 bg-white/90 backdrop-blur-sm border border-blue-100 shadow-xl hover:shadow-2xl hover:border-blue-200 transition-all duration-300">
                    <motion.div
                      className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-100 to-violet-100 flex items-center justify-center"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                    >
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </motion.div>
                    <motion.div 
                      className={`text-2xl font-bold mb-1 ${stat.color}`}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced Quick Access Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            data-testid="quick-access-cards"
          >
            {quickAccessCards.map((card, index) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <Link href={card.href}>
                  <Card className={`text-center p-8 cursor-pointer transition-all duration-500 group border-0 shadow-xl hover:shadow-2xl ${card.bgColor} ${card.hoverColor} relative overflow-hidden h-48 flex flex-col justify-center`}
                        data-testid={`card-${card.label.toLowerCase().replace(' ', '-')}`}>
                    
                    {/* Background glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    
                    {/* Icon container */}
                    <motion.div 
                      className="w-16 h-16 mx-auto mb-4 rounded-xl bg-white/60 flex items-center justify-center group-hover:scale-110 transition-all duration-300 relative z-10 shadow-lg"
                      whileHover={{ rotate: 5 }}
                    >
                      <card.icon className={`h-8 w-8 ${card.color}`} />
                      
                      {/* Icon glow */}
                      <motion.div
                        className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                        style={{ backgroundColor: card.color.includes('blue') ? '#3b82f6' : 
                                card.color.includes('violet') ? '#8b5cf6' : 
                                card.color.includes('emerald') ? '#10b981' : '#f43f5e' }}
                      />
                    </motion.div>
                    
                    <h3 className="font-bold text-lg mb-2 relative z-10">{card.label}</h3>
                    <p className="text-sm text-muted-foreground relative z-10">{card.description}</p>
                    
                    {/* Hover arrow */}
                    <motion.div
                      className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className={`w-6 h-6 rounded-full ${card.color.includes('blue') ? 'bg-blue-500' : 
                          card.color.includes('violet') ? 'bg-violet-500' : 
                          card.color.includes('emerald') ? 'bg-emerald-500' : 'bg-rose-500'} flex items-center justify-center`}>
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </motion.div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
