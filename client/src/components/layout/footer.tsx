import { Link } from "wouter";
import { Code, Github, Linkedin, Mail } from "lucide-react";
import { personalInfo, additionalTech } from "@/data/portfolio-data";

export default function Footer() {
  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Me" },
    { href: "/projects", label: "Projects" },
    { href: "/skills", label: "Skills" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" },
    { href: "/hire-me", label: "Hire Me" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-100 py-12 px-4" data-testid="footer">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Code className="text-white text-sm" />
              </div>
              <span className="font-bold text-xl">Shree Bhargav</span>
            </div>
            <p className="text-slate-400 mb-4">
              Android Developer Team Lead passionate about building scalable mobile applications and leading innovative development teams.
            </p>
            <div className="flex space-x-4">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                data-testid="footer-github"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                data-testid="footer-linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-slate-400 hover:text-white transition-colors"
                data-testid="footer-email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                          data-testid={`footer-link-${link.label.toLowerCase().replace(' ', '-')}`}>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {additionalTech.slice(0, 8).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-sm"
                  data-testid={`footer-tech-${tech.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-slate-400" data-testid="footer-copyright">
            © 2026 Shree Bhargav R K. Built with passion and lots of ☕
          </p>
          <p className="text-slate-500 text-sm mt-2" data-testid="footer-tech-note">
            Designed & Developed with modern web technologies
          </p>
        </div>
      </div>
    </footer>
  );
}
