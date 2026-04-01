import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu, Code, X, User, Briefcase, Cog, FileText, MessageCircle, Home, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/", label: "Home", icon: Home, bg: "bg-blue-50" },
  { href: "/about", label: "About", icon: User, bg: "bg-violet-50" },
  { href: "/projects", label: "Projects", icon: Briefcase, bg: "bg-emerald-50" },
  { href: "/skills", label: "Skills", icon: Cog, bg: "bg-orange-50" },
  { href: "/resume", label: "Resume", icon: FileText, bg: "bg-red-50" },
  { href: "/contact", label: "Contact", icon: MessageCircle, bg: "bg-pink-50" },
  { href: "/hire-me", label: "Hire Me", icon: Sparkles, bg: "bg-gradient-to-r from-violet-50 to-blue-50", highlight: true },
];

export default function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 bg-gradient-to-r from-white/95 via-blue-50/95 to-violet-50/95 backdrop-blur-xl z-30 border-b border-blue-100 shadow-lg shadow-blue-100/50"
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
                    "0 10px 25px -3px rgba(139, 92, 246, 0.3)",
                  ],
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
              <motion.span className="font-bold text-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                Shree Bhargav
              </motion.span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.filter(i => !i.highlight).map((item, index) => (
              <Link key={item.href} href={item.href} data-testid={`nav-link-${item.label.toLowerCase()}`}>
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <motion.span
                    className={`font-semibold transition-all duration-300 cursor-pointer px-4 py-2.5 rounded-xl block ${
                      location === item.href
                        ? "text-white bg-gradient-to-r from-blue-600 to-violet-600 shadow-lg shadow-blue-500/30"
                        : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.span>
                  {location === item.href && (
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 rounded-full"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
            <Link href="/hire-me" data-testid="nav-link-hire-me">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-2"
              >
                <span className={`font-bold cursor-pointer px-5 py-2.5 rounded-xl block transition-all duration-300 ${
                  location === "/hire-me"
                    ? "text-white bg-gradient-to-r from-violet-600 to-blue-600 shadow-lg"
                    : "text-white bg-gradient-to-r from-violet-600 to-blue-600 shadow-md hover:shadow-lg hover:from-violet-700 hover:to-blue-700"
                }`}>
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    Hire Me
                  </span>
                </span>
              </motion.div>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
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
                        <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.3 }}>
                          <X className="h-5 w-5" />
                        </motion.div>
                      ) : (
                        <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.3 }}>
                          <Menu className="h-5 w-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-full max-w-sm bg-gradient-to-br from-white via-blue-50/50 to-violet-50/50 border-l border-blue-100 shadow-2xl backdrop-blur-xl overflow-y-auto"
                data-testid="mobile-menu"
              >
                <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent mb-2">
                  Navigation
                </SheetTitle>
                <SheetDescription className="text-slate-500 mb-8">
                  Explore my portfolio sections
                </SheetDescription>

                <motion.div
                  className="flex flex-col space-y-3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                    >
                      <Link href={item.href} onClick={() => setIsOpen(false)} data-testid={`mobile-nav-link-${item.label.toLowerCase()}`}>
                        <motion.div
                          className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 cursor-pointer group ${
                            location === item.href
                              ? `${item.bg} border-2 border-blue-200 shadow-md`
                              : "hover:bg-white/70 border-2 border-transparent"
                          }`}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className={`w-11 h-11 rounded-xl ${item.bg} border border-blue-100 flex items-center justify-center shadow-sm`}>
                            <item.icon className="h-5 w-5 text-blue-600" />
                          </div>
                          <span className={`text-base font-semibold transition-colors ${location === item.href ? "text-blue-700" : "text-slate-600 group-hover:text-blue-600"}`}>
                            {item.label}
                          </span>
                          {location === item.href && (
                            <motion.div className="ml-auto flex items-center gap-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                            </motion.div>
                          )}
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className="text-center">
                    <motion.div animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                      <Sparkles className="w-8 h-8 mx-auto mb-2" />
                    </motion.div>
                    <p className="text-sm font-semibold">Android Developer</p>
                    <p className="text-xs text-blue-100 mt-0.5">Team Lead & Tech Explorer</p>
                  </div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
