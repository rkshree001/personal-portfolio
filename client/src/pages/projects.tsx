import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/portfolio-data";
import { Github, ExternalLink, Search, Activity, Plane, Dumbbell, Shield, Cloud, Store, Printer, Ship, ShieldCheck, Smartphone, Eye } from "lucide-react";

const filterCategories = [
  { value: "all", label: "All Projects" },
  { value: "mobile", label: "Mobile Apps" },
  { value: "enterprise", label: "Enterprise" },
  { value: "printing", label: "Printing Solutions" },
  { value: "entertainment", label: "Entertainment" },
  { value: "ai", label: "AI/ML" },
];

// Icon mapping for projects
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
};

export default function ProjectsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = selectedFilter === "all" || project.category === selectedFilter;
    const matchesSearch = searchTerm === "" || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen py-24 px-4 bg-slate-50 dark:bg-slate-950" data-testid="projects-page">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white" data-testid="projects-title">
            💼 My Projects
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto" data-testid="projects-subtitle">
            A collection of applications I've built to solve real-world problems
          </p>
        </div>

        {/* Project Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8" data-testid="project-filters">
          {filterCategories.map((category) => (
            <Button
              key={category.value}
              variant={selectedFilter === category.value ? "default" : "outline"}
              onClick={() => setSelectedFilter(category.value)}
              className={`px-4 py-2 font-medium transition-colors ${
                selectedFilter === category.value
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
              data-testid={`filter-${category.value}`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Project Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 border border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg"
              data-testid="project-search"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="projects-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                    data-testid={`project-card-${project.id}`}>
                <div className="h-48 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  {(() => {
                    const IconComponent = iconMap[project.image as keyof typeof iconMap];
                    return IconComponent ? <IconComponent className="w-16 h-16 text-slate-600 dark:text-slate-400" /> : null;
                  })()}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white" data-testid={`project-title-${project.id}`}>
                        {project.title}
                      </h3>
                      {project.badge && (
                        <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full shadow-lg animate-pulse">
                          {project.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm" data-testid={`project-description-${project.id}`}>
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4" data-testid={`project-tech-${project.id}`}>
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="default" 
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" 
                      data-testid={`project-github-${project.id}`}
                      onClick={() => window.open(project.github, '_blank')}
                    >
                      <Github className="mr-1 h-3 w-3" />
                      Code
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800" 
                      data-testid={`project-demo-${project.id}`}
                      onClick={() => window.open(project.demo, '_blank')}
                      disabled={project.demo === '#'}
                    >
                      <ExternalLink className="mr-1 h-3 w-3" />
                      Demo
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-500 dark:text-slate-400 text-lg">No projects found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}