import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { skills, additionalTech } from "@/data/portfolio-data";
import { Code, Smartphone, Printer, Users, Sparkles, Star, Zap, Cog, Rocket, Target, Trophy, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const skillCategories = [
  {
    title: "Programming",
    icon: Code,
    color: "text-white",
    bgColor: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50",
    cardGradient: "from-blue-500 to-cyan-500",
    skills: skills.programming,
  },
  {
    title: "Android",
    icon: Smartphone,
    color: "text-white",
    bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/50",
    cardGradient: "from-emerald-500 to-teal-500",
    skills: skills.android,
  },
  {
    title: "Async/Reactive",
    icon: Zap,
    color: "text-white",
    bgColor: "bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-950/50 dark:to-violet-900/50",
    cardGradient: "from-violet-500 to-purple-500",
    skills: skills.asyncReactive,
  },
  {
    title: "Networking & APIs",
    icon: Rocket,
    color: "text-white",
    bgColor: "bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-950/50 dark:to-cyan-900/50",
    cardGradient: "from-cyan-500 to-blue-500",
    skills: skills.networking,
  },
  {
    title: "Databases",
    icon: Target,
    color: "text-white",
    bgColor: "bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/50 dark:to-indigo-900/50",
    cardGradient: "from-indigo-500 to-purple-500",
    skills: skills.databases,
  },
  {
    title: "Backend",
    icon: Cog,
    color: "text-white",
    bgColor: "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50",
    cardGradient: "from-green-500 to-emerald-500",
    skills: skills.backend,
  },
  {
    title: "Testing",
    icon: Trophy,
    color: "text-white",
    bgColor: "bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/50",
    cardGradient: "from-red-500 to-pink-500",
    skills: skills.testing,
  },
  {
    title: "Tools",
    icon: Star,
    color: "text-white",
    bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/50 dark:to-yellow-900/50",
    cardGradient: "from-yellow-500 to-orange-500",
    skills: skills.tools,
  },
  {
    title: "Debugging & Integration",
    icon: Sparkles,
    color: "text-white",
    bgColor: "bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/50 dark:to-pink-900/50",
    cardGradient: "from-pink-500 to-rose-500",
    skills: skills.debugging,
  },
  {
    title: "Creative Tools",
    icon: Heart,
    color: "text-white",
    bgColor: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50",
    cardGradient: "from-purple-500 to-violet-500",
    skills: skills.creative,
  },
  {
    title: "Leadership",
    icon: Users,
    color: "text-white",
    bgColor: "bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-950/50 dark:to-rose-900/50",
    cardGradient: "from-rose-500 to-pink-500",
    skills: skills.leadership,
  },
];

const floatingElements = [
  { icon: Sparkles, x: "8%", y: "20%", delay: 0, duration: 7 },
  { icon: Star, x: "88%", y: "15%", delay: 1, duration: 9 },
  { icon: Cog, x: "12%", y: "70%", delay: 2, duration: 6 },
  { icon: Zap, x: "85%", y: "75%", delay: 0.5, duration: 8 },
  { icon: Trophy, x: "45%", y: "8%", delay: 1.5, duration: 10 },
  { icon: Target, x: "92%", y: "45%", delay: 3, duration: 7 },
];

export default function SkillsPage() {
  const [animatedLevels, setAnimatedLevels] = useState<{ [key: string]: number }>({});
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      const levels: { [key: string]: number } = {};
      skillCategories.forEach(category => {
        category.skills.forEach(skill => {
          levels[skill.name] = skill.level;
        });
      });
      setAnimatedLevels(levels);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSkillHover = (skillName: string, description: string) => {
    setHoveredSkill(skillName);
    toast({
      title: skillName,
      description: description,
    });
  };

  return (
    <div className="min-h-screen py-24 px-4 bg-gradient-to-br from-slate-50 via-amber-50/30 to-orange-50/50 dark:from-slate-950 dark:via-amber-950/30 dark:to-orange-950/50 relative overflow-hidden" data-testid="skills-page">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient blobs */}
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 140, 0],
            y: [0, -70, 0],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, -120, 0],
            y: [0, 90, 0],
            scale: [1.3, 1, 1.3],
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
            className="absolute text-amber-400/30 dark:text-orange-500/20"
            style={{ left: element.x, top: element.y }}
            animate={{
              y: [0, -35, 0],
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

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full mb-8 shadow-2xl"
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
            <Zap className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6"
            data-testid="skills-title"
          >
            <span className="text-4xl md:text-6xl mr-3">💻</span>
            <motion.span 
              className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              Skills & Expertise
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            data-testid="skills-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Technologies and tools I work with to build amazing applications and lead successful development teams
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="p-8 h-full border-0 shadow-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm relative overflow-hidden group" data-testid={`skill-category-${category.title.toLowerCase().replace(/\s+/g, '-')}`}>
                {/* Card background animation */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${category.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                
                <div className="flex items-center mb-6 relative z-10">
                  <motion.div 
                    className={`p-4 rounded-xl ${category.bgColor} mr-4 shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <category.icon className={`h-8 w-8 ${category.color}`} />
                  </motion.div>
                  <motion.h3 
                    className={`text-2xl font-bold bg-gradient-to-r ${category.cardGradient} bg-clip-text text-transparent`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {category.title}
                  </motion.h3>
                </div>
                
                <div className="space-y-6 relative z-10">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      className="cursor-pointer group"
                      onMouseEnter={() => handleSkillHover(skill.name, skill.description)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      data-testid={`skill-item-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <motion.span 
                          className="font-semibold text-base group-hover:text-primary transition-colors"
                          whileHover={{ scale: 1.05 }}
                        >
                          {skill.name}
                        </motion.span>
                        <motion.span 
                          className={`text-sm font-bold ${category.color}`}
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: skillIndex * 0.2 }}
                        >
                          {animatedLevels[skill.name] || 0}%
                        </motion.span>
                      </div>
                      <Progress
                        value={animatedLevels[skill.name] || 0}
                        className="h-3 bg-gray-200 dark:bg-gray-700"
                        data-testid={`skill-progress-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                      />
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Additional Technologies */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card className="p-10 border-0 shadow-2xl bg-gradient-to-r from-amber-600 to-orange-600 text-white relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <div className="relative z-10">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="inline-block mb-6"
              >
                <Heart className="w-12 h-12 text-white" />
              </motion.div>
              
              <motion.h3 
                className="text-3xl font-bold mb-8" 
                data-testid="additional-tech-title"
              >
                <span className="text-3xl mr-3">✨</span>
                <span>Additional Technologies</span>
              </motion.h3>
              
              <div className="flex flex-wrap justify-center gap-4" data-testid="additional-tech-badges">
                {additionalTech.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.05 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge
                      variant="outline"
                      className="px-4 py-3 text-base font-semibold bg-white/90 text-amber-800 border-2 border-white/50 hover:bg-white hover:shadow-lg transition-all duration-300 cursor-default"
                      data-testid={`tech-badge-${tech.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                className="flex justify-center gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                {[Sparkles, Star, Trophy].map((Icon, index) => (
                  <motion.div
                    key={index}
                    animate={{ 
                      y: [0, -8, 0],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  >
                    <Icon className="w-6 h-6 text-amber-200" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
