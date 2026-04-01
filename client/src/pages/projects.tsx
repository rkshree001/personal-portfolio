import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/portfolio-data";
import { Github, ExternalLink, Search, Activity, Plane, Dumbbell, Shield, Cloud, Store, Printer, Ship, ShieldCheck, Smartphone, Eye, Sparkles, TrendingUp, Lock } from "lucide-react";

const filterCategories = [
  { value: "all", label: "All Projects" },
  { value: "mobile", label: "Mobile Apps" },
  { value: "enterprise", label: "Enterprise" },
  { value: "web", label: "Web Apps" },
  { value: "printing", label: "Printing Solutions" },
  { value: "entertainment", label: "Entertainment" },
  { value: "ai", label: "AI/ML" },
];

const iconMap = {
  Activity,
  Plane,
  Dumbbell,
  Shield,
  Cloud,
  Store,
  Printer,
  Ship,
  ShieldCheck,
  Smartphone,
  Eye,
  TrendingUp,
};

const categoryColors: Record<string, string> = {
  mobile: "from-blue-500 to-cyan-500",
  enterprise: "from-violet-500 to-purple-600",
  printing: "from-orange-500 to-amber-500",
  entertainment: "from-pink-500 to-rose-500",
  ai: "from-emerald-500 to-teal-500",
  web: "from-green-500 to-teal-500",
  default: "from-slate-400 to-slate-500",
};

export default function ProjectsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = selectedFilter === "all" || project.category === selectedFilter;
    const matchesSearch =
      searchTerm === "" ||
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tech.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen py-24 px-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-violet-50/40 relative overflow-hidden" data-testid="projects-page">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 w-80 h-80 bg-blue-300/15 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-72 h-72 bg-violet-300/15 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.8, 0.5, 0.8] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl mb-6 shadow-2xl"
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          <h2
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent pb-2 leading-tight"
            data-testid="projects-title"
          >
            My Projects
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto" data-testid="projects-subtitle">
            A collection of applications I've built to solve real-world problems
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          data-testid="project-filters"
        >
          {filterCategories.map((category, index) => (
            <motion.div
              key={category.value}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Button
                variant={selectedFilter === category.value ? "default" : "outline"}
                onClick={() => setSelectedFilter(category.value)}
                className={`px-5 py-2 font-semibold rounded-xl transition-all ${
                  selectedFilter === category.value
                    ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-200 border-0"
                    : "border-blue-200 text-slate-600 hover:bg-blue-50 hover:border-blue-300"
                }`}
                data-testid={`filter-${category.value}`}
              >
                {category.label}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Search */}
        <motion.div
          className="max-w-md mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="relative">
            <Input
              type="text"
              placeholder="Search projects by name, description, or tech..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 py-3 border-2 border-blue-100 focus:border-blue-400 rounded-xl bg-white shadow-sm"
              data-testid="project-search"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400 w-4 h-4" />
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="popLayout">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="projects-grid">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => {
                const gradient = categoryColors[project.category] || categoryColors.default;
                const IconComponent = iconMap[project.image as keyof typeof iconMap];
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    whileHover={{ y: -6 }}
                    data-testid={`project-card-${project.id}`}
                  >
                    <Card className="overflow-hidden h-full flex flex-col border border-blue-100 bg-white shadow-lg hover:shadow-2xl hover:border-blue-200 transition-all duration-300">
                      {/* Image / Icon banner */}
                      <div className={`h-44 bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}>
                        {/* Subtle pattern overlay */}
                        <div className="absolute inset-0 opacity-20">
                          {[...Array(4)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute rounded-full bg-white/30"
                              style={{
                                width: `${60 + i * 30}px`,
                                height: `${60 + i * 30}px`,
                                top: `${10 + i * 15}%`,
                                right: `${-10 + i * 5}%`,
                              }}
                              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                              transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
                            />
                          ))}
                        </div>
                        {IconComponent && (
                          <motion.div
                            className="relative z-10 p-4 rounded-2xl bg-white/20 backdrop-blur-sm"
                            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                            transition={{ duration: 0.4 }}
                          >
                            <IconComponent className="w-14 h-14 text-white drop-shadow-lg" />
                          </motion.div>
                        )}
                        {project.badge && (
                          <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-bold bg-white/90 text-green-700 rounded-full shadow-lg border border-green-200 animate-pulse">
                            {project.badge}
                          </span>
                        )}
                      </div>

                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-900 mb-2" data-testid={`project-title-${project.id}`}>
                            {project.title}
                          </h3>
                          <p className="text-slate-500 mb-4 text-sm leading-relaxed" data-testid={`project-description-${project.id}`}>
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mb-4" data-testid={`project-tech-${project.id}`}>
                            {project.tech.map((tech) => (
                              <Badge
                                key={tech}
                                variant="secondary"
                                className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2 pt-2">
                          {project.github === "#" ? (
                            <div className="flex-1 relative group/lock">
                              <Button
                                size="sm"
                                disabled
                                className="w-full bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                                data-testid={`project-github-${project.id}`}
                              >
                                <Lock className="mr-1.5 h-3.5 w-3.5" />
                                Code
                              </Button>
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-800 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover/lock:opacity-100 transition-opacity duration-200 pointer-events-none z-20 shadow-lg">
                                Contact me for source code
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
                              </div>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              className="flex-1 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white border-0 shadow-md"
                              onClick={() => window.open(project.github, "_blank")}
                              data-testid={`project-github-${project.id}`}
                            >
                              <Github className="mr-1.5 h-3.5 w-3.5" />
                              Code
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 border-blue-200 hover:bg-blue-50 hover:border-blue-300 text-slate-600"
                            onClick={() => window.open(project.demo, "_blank")}
                            disabled={project.demo === "#"}
                            data-testid={`project-demo-${project.id}`}
                          >
                            <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                            Demo
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                className="col-span-full text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-400 text-lg font-medium">No projects found matching your criteria.</p>
                <p className="text-slate-400 text-sm mt-1">Try adjusting the filter or search term.</p>
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}
