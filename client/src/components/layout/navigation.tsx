import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun, Menu, Code, X, User, Briefcase, Cog, FileText, MessageCircle, Home, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/", label: "Home", icon: Home, color: "text-white", bg: "bg-blue-50 dark:bg-blue-950/50" },
  { href: "/about", label: "About", icon: User, color: "text-white", bg: "bg-violet-50 dark:bg-violet-950/50" },
  { href: "/projects", label: "Projects", icon: Briefcase, color: "text-white", bg: "bg-emerald-50 dark:bg-emerald-950/50" },
  { href: "/skills", label: "Skills", icon: Cog, color: "text-white", bg: "bg-orange-50 dark:bg-orange-950/50" },
  { href: "/resume", label: "Resume", icon: FileText, color: "text-white", bg: "bg-red-50 dark:bg-red-950/50" },
  { href: "/contact", label: "Contact", icon: MessageCircle, color: "text-white", bg: "bg-pink-50 dark:bg-pink-950/50" },
];

export default function Navigation() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 bg-gradient-to-r from-white/95 via-blue-50/95 to-violet-50/95 dark:from-slate-950/95 dark:via-blue-950/95 dark:to-violet-950/95 backdrop-blur-xl z-30 border-b-2 border-gradient-to-r from-blue-200 via-violet-200 to-purple-200 dark:from-blue-800/50 dark:via-violet-800/50 dark:to-purple-800/50 shadow-2xl"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      data-testid="navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" data-testid="nav-logo">
            <motion.div 
              className="flex items-center space-x-3 cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-blue-600 via-violet-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                whileHover={{ rotate: 10, scale: 1.1 }}
                animate={{ 
                  boxShadow: [
                    "0 10px 25px -3px rgba(59, 130, 246, 0.3)",
                    "0 10px 25px -3px rgba(139, 92, 246, 0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Code className="text-white text-xl relative z-10" />
              </motion.div>
              <motion.span 
                className="font-bold text-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent"
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                Shree Bhargav
              </motion.span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                data-testid={`nav-link-${item.label.toLowerCase()}`}
              >
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <motion.span
                    className={`font-bold transition-all duration-300 cursor-pointer px-4 py-3 rounded-xl ${
                      location === item.href 
                        ? "text-white bg-gradient-to-r from-blue-600 to-violet-600 shadow-lg shadow-blue-500/25" 
                        : "text-muted-foreground hover:text-primary hover:bg-gradient-to-r hover:from-blue-50 hover:to-violet-50 dark:hover:from-blue-950/50 dark:hover:to-violet-950/50"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.span>
                  {location === item.href && (
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 rounded-full shadow-lg"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      animate={{ 
                        boxShadow: [
                          "0 4px 12px rgba(59, 130, 246, 0.4)",
                          "0 4px 12px rgba(139, 92, 246, 0.4)"
                        ]
                      }}
                      style={{
                        transition: "box-shadow 2s ease-in-out infinite"
                      }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-xl bg-gradient-to-r from-white/80 to-blue-50/80 dark:from-slate-800/80 dark:to-blue-950/80 hover:from-white hover:to-blue-50 dark:hover:from-slate-800 dark:hover:to-blue-950 shadow-lg border border-blue-200/50 dark:border-blue-800/50"
                data-testid="theme-toggle"
              >
                <AnimatePresence mode="wait">
                  {theme === "dark" ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun className="h-5 w-5 text-yellow-600" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon className="h-5 w-5 text-blue-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            {/* Enhanced Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="md:hidden rounded-xl bg-gradient-to-br from-blue-600 via-violet-600 to-purple-600 hover:from-blue-700 hover:via-violet-700 hover:to-purple-700 text-white shadow-xl border-0" 
                    data-testid="mobile-menu-trigger"
                  >
                    <AnimatePresence mode="wait">
                      {isOpen ? (
                        <motion.div
                          key="x"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <X className="h-5 w-5" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="menu"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Menu className="h-5 w-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-full max-w-sm bg-gradient-to-br from-white via-blue-50/50 to-violet-50/50 dark:from-slate-950 dark:via-blue-950/50 dark:to-violet-950/50 border-l-4 border-gradient-to-b from-blue-500 to-violet-500 shadow-2xl backdrop-blur-xl overflow-y-auto"
                data-testid="mobile-menu"
              >
                <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent mb-2">
                  Navigation
                </SheetTitle>
                <SheetDescription className="text-muted-foreground mb-8">
                  Explore my portfolio sections
                </SheetDescription>

                <motion.div 
                  className="flex flex-col space-y-4"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        data-testid={`mobile-nav-link-${item.label.toLowerCase()}`}
                      >
                        <motion.div
                          className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 cursor-pointer group ${
                            location === item.href 
                              ? `${item.bg} border-2 border-blue-200 dark:border-blue-800 shadow-lg` 
                              : "hover:bg-white/50 dark:hover:bg-slate-800/30 border-2 border-transparent"
                          }`}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div
                            className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}
                            whileHover={{ rotate: 5, scale: 1.1 }}
                          >
                            <item.icon className={`h-6 w-6 ${item.color}`} />
                          </motion.div>
                          <div className="flex-1">
                            <span
                              className={`text-lg font-bold transition-colors ${
                                location === item.href ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                              }`}
                            >
                              {item.label}
                            </span>
                            {location === item.href && (
                              <motion.div
                                className="flex items-center gap-1 mt-1"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                              >
                                <Sparkles className="h-3 w-3 text-blue-600" />
                                <span className="text-xs text-blue-600 font-medium">Current</span>
                              </motion.div>
                            )}
                          </div>
                          <motion.div
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <div className={`w-6 h-6 rounded-full ${item.color.includes('blue') ? 'bg-blue-500' : 
                                item.color.includes('violet') ? 'bg-violet-500' : 
                                item.color.includes('emerald') ? 'bg-emerald-500' : 
                                item.color.includes('orange') ? 'bg-orange-500' : 
                                item.color.includes('red') ? 'bg-red-500' : 'bg-pink-500'} flex items-center justify-center`}>
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </motion.div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="mt-8 p-4 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-center"
                  >
                    <Sparkles className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">Android Developer</p>
                    <p className="text-xs text-blue-100">Team Lead & Tech Explorer</p>
                  </motion.div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
