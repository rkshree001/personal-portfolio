import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { personalInfo } from "@/data/portfolio-data";
import { Briefcase, Mail, Phone, Github, Linkedin, Send, Smartphone, Globe, Code, Users, CheckCircle2, Zap, Shield, Clock, Star, DollarSign, Calendar, Building } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { Check, Search } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const countries = [
  { code: "+93", flag: "🇦🇫", name: "Afghanistan" },
  { code: "+355", flag: "🇦🇱", name: "Albania" },
  { code: "+213", flag: "🇩🇿", name: "Algeria" },
  { code: "+54", flag: "🇦🇷", name: "Argentina" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+43", flag: "🇦🇹", name: "Austria" },
  { code: "+32", flag: "🇧🇪", name: "Belgium" },
  { code: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "+56", flag: "🇨🇱", name: "Chile" },
  { code: "+86", flag: "🇨🇳", name: "China" },
  { code: "+57", flag: "🇨🇴", name: "Colombia" },
  { code: "+45", flag: "🇩🇰", name: "Denmark" },
  { code: "+20", flag: "🇪🇬", name: "Egypt" },
  { code: "+358", flag: "🇫🇮", name: "Finland" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+30", flag: "🇬🇷", name: "Greece" },
  { code: "+852", flag: "🇭🇰", name: "Hong Kong" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+62", flag: "🇮🇩", name: "Indonesia" },
  { code: "+353", flag: "🇮🇪", name: "Ireland" },
  { code: "+972", flag: "🇮🇱", name: "Israel" },
  { code: "+39", flag: "🇮🇹", name: "Italy" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "+254", flag: "🇰🇪", name: "Kenya" },
  { code: "+82", flag: "🇰🇷", name: "South Korea" },
  { code: "+965", flag: "🇰🇼", name: "Kuwait" },
  { code: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "+52", flag: "🇲🇽", name: "Mexico" },
  { code: "+31", flag: "🇳🇱", name: "Netherlands" },
  { code: "+64", flag: "🇳🇿", name: "New Zealand" },
  { code: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "+47", flag: "🇳🇴", name: "Norway" },
  { code: "+92", flag: "🇵🇰", name: "Pakistan" },
  { code: "+63", flag: "🇵🇭", name: "Philippines" },
  { code: "+48", flag: "🇵🇱", name: "Poland" },
  { code: "+351", flag: "🇵🇹", name: "Portugal" },
  { code: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "+7", flag: "🇷🇺", name: "Russia" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "+34", flag: "🇪🇸", name: "Spain" },
  { code: "+94", flag: "🇱🇰", name: "Sri Lanka" },
  { code: "+46", flag: "🇸🇪", name: "Sweden" },
  { code: "+41", flag: "🇨🇭", name: "Switzerland" },
  { code: "+66", flag: "🇹🇭", name: "Thailand" },
  { code: "+90", flag: "🇹🇷", name: "Turkey" },
  { code: "+380", flag: "🇺🇦", name: "Ukraine" },
  { code: "+971", flag: "🇦🇪", name: "United Arab Emirates" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+84", flag: "🇻🇳", name: "Vietnam" },
];

const offerings = [
  {
    icon: Smartphone,
    title: "Android Development",
    description: "Native Android apps with Java & Kotlin — from MVP to enterprise-grade solutions.",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
  },
  {
    icon: Globe,
    title: "Full Stack Web",
    description: "Modern web applications with React, TypeScript, and robust backend APIs.",
    color: "from-violet-500 to-purple-500",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    border: "border-violet-200 dark:border-violet-800",
  },
  {
    icon: Users,
    title: "Team Leadership",
    description: "Lead your dev team, establish best practices, code reviews, and delivery processes.",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  {
    icon: Code,
    title: "Consulting & Strategy",
    description: "Technical consultation on architecture, performance, and scalability decisions.",
    color: "from-orange-500 to-amber-500",
    bg: "bg-orange-50 dark:bg-orange-950/30",
    border: "border-orange-200 dark:border-orange-800",
  },
];

const whyMe = [
  { icon: CheckCircle2, text: "2+ years of proven delivery", color: "text-emerald-500" },
  { icon: Zap, text: "Fast turnaround, quality-first", color: "text-yellow-500" },
  { icon: Shield, text: "Clean, maintainable code", color: "text-blue-500" },
  { icon: Clock, text: "On-time delivery every time", color: "text-violet-500" },
  { icon: Star, text: "Led teams of 10+ developers", color: "text-orange-500" },
  { icon: Users, text: "100% client satisfaction rate", color: "text-rose-500" },
];

export default function HireMePage() {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("+91");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    mobile: "",
    projectType: "",
    currency: "$ USD",
    budgetAmount: "",
    timeline: "",
    description: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.projectType || !formData.budgetAmount || !formData.timeline) {
      toast({ title: "Please fill all required fields", description: "Project type, budget amount, and timeline are required." });
      return;
    }
    setShowConfirm(true);
  };

  const handleConfirmedSend = async () => {
    setShowConfirm(false);
    setIsSubmitting(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      company: formData.company || "Not specified",
      mobile: `${selectedCountry} ${formData.mobile}`,
      projectType: formData.projectType,
      budget: `${formData.currency} ${formData.budgetAmount}`,
      timeline: formData.timeline,
      description: formData.description,
      type: "hire",
    };

    try {
      await supabase.from("messages").insert([{
        name: payload.name,
        email: payload.email,
        mobile: payload.mobile,
        message: `[HIRE ME] ${payload.projectType} | Budget: ${payload.budget} | Timeline: ${payload.timeline} | Company: ${payload.company}\n\n${payload.description}`,
      }]);
    } catch (dbErr: any) {
      console.warn("Supabase unavailable:", dbErr.message);
    }

    try {
      const res = await fetch("/api/hire-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.success) console.warn("Email notification issue:", data.emailError);
    } catch (mailErr: any) {
      console.warn("Email send failed (non-blocking):", mailErr.message);
    }

    toast({
      title: "Hire request sent successfully!",
      description: "Thank you! I'll review your project and get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", company: "", mobile: "", projectType: "", currency: "$ USD", budgetAmount: "", timeline: "", description: "" });
    setIsSubmitting(false);
    navigate("/");
  };

  const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }) };

  return (
    <>
      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent className="border-0 shadow-2xl bg-white dark:bg-slate-900 max-w-md rounded-2xl p-0 overflow-hidden">
          <div className="bg-gradient-to-r from-violet-600 to-blue-600 px-7 pt-7 pb-5">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
              <Briefcase className="w-7 h-7 text-white" />
            </div>
            <AlertDialogTitle className="text-white text-xl font-bold">Ready to submit your request?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/80 text-sm mt-1">
              I'll personally review your project and respond within 24 hours.
            </AlertDialogDescription>
          </div>
          <div className="px-7 py-5">
            <div className="space-y-2 mb-6">
              {formData.projectType && (
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <span className="text-violet-500">📱</span>
                  <span><strong>Type:</strong> {formData.projectType}</span>
                </div>
              )}
              {formData.budgetAmount && (
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <span className="text-emerald-500">💰</span>
                  <span><strong>Budget:</strong> {formData.currency} {formData.budgetAmount}</span>
                </div>
              )}
              {formData.timeline && (
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <span className="text-blue-500">📅</span>
                  <span><strong>Timeline:</strong> {formData.timeline}</span>
                </div>
              )}
            </div>
            <AlertDialogFooter className="gap-3 sm:gap-3">
              <AlertDialogCancel
                data-testid="hire-confirm-cancel"
                className="flex-1 border-slate-200 dark:border-slate-700 rounded-xl"
              >
                Go Back
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmedSend}
                className="flex-1 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white border-0 rounded-xl font-semibold"
                data-testid="hire-confirm-send"
              >
                Yes, Submit Request
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/40 to-blue-50/60 dark:from-slate-950 dark:via-violet-950/20 dark:to-slate-900" data-testid="hire-page">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden pt-28 pb-16 px-4">
          <div className="absolute inset-0 pointer-events-none">
            <motion.div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-400/15 rounded-full blur-3xl" animate={{ scale: [1, 1.2, 1], x: [0, 40, 0] }} transition={{ duration: 12, repeat: Infinity }} />
            <motion.div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-400/15 rounded-full blur-3xl" animate={{ scale: [1.1, 1, 1.1], y: [0, -30, 0] }} transition={{ duration: 10, repeat: Infinity }} />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-6 px-5 py-2 text-sm font-semibold bg-gradient-to-r from-violet-600 to-blue-600 text-white border-0 shadow-lg">
                Available for new projects
              </Badge>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent leading-tight pb-2"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              data-testid="hire-hero-title"
            >
              Let's Build Something Amazing
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Android Developer & Team Lead with 2+ years of building high-quality mobile & web solutions. Ready to bring your vision to life.
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-md border border-slate-200 dark:border-slate-700">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Open to Work</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-md border border-slate-200 dark:border-slate-700">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">24hr Response</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-md border border-slate-200 dark:border-slate-700">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Top Rated</span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pb-24">

          {/* Offerings Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
            initial="hidden"
            animate="visible"
          >
            {offerings.map((offer, i) => (
              <motion.div key={offer.title} custom={i} variants={fadeIn} whileHover={{ y: -6, scale: 1.02 }}>
                <Card className={`p-6 h-full border-2 ${offer.border} ${offer.bg} hover:shadow-xl transition-all duration-300`}>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${offer.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <offer.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{offer.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{offer.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content: Why Me + Form */}
          <div className="grid lg:grid-cols-5 gap-10">

            {/* Left: Why Hire Me */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Why Choose Me?</h2>
                <p className="text-slate-600 dark:text-slate-400">Here's what you get when you work with me:</p>
              </div>

              <div className="space-y-3">
                {whyMe.map((item, i) => (
                  <motion.div
                    key={item.text}
                    className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
                    whileHover={{ x: 4 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                  >
                    <item.icon className={`w-5 h-5 shrink-0 ${item.color}`} />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Contact Quick Links */}
              <div className="pt-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Reach Out Directly</h3>
                <div className="space-y-3">
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-blue-300 hover:shadow-md transition-all group">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Email</div>
                      <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">{personalInfo.email}</div>
                    </div>
                  </a>
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-blue-300 hover:shadow-md transition-all group">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                      <Linkedin className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">LinkedIn</div>
                      <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">Connect professionally</div>
                    </div>
                  </a>
                  <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-emerald-300 hover:shadow-md transition-all group">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Phone</div>
                      <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 transition-colors">{personalInfo.phone}</div>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right: Hire Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Card className="p-8 border-2 border-violet-100 dark:border-violet-900/40 shadow-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Project Inquiry</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Fill in your project details and I'll get back to you with a proposal within 24 hours.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5" data-testid="hire-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="hire-name" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name *</Label>
                      <Input
                        id="hire-name"
                        placeholder="Your full name"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="border-slate-200 dark:border-slate-700 focus:border-violet-500 focus:ring-violet-500/20"
                        data-testid="input-hire-name"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="hire-email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address *</Label>
                      <Input
                        id="hire-email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="border-slate-200 dark:border-slate-700 focus:border-violet-500 focus:ring-violet-500/20"
                        data-testid="input-hire-email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="hire-company" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Company / Organization</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="hire-company"
                          placeholder="Your company name"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          className="pl-9 border-slate-200 dark:border-slate-700"
                          data-testid="input-hire-company"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Mobile Number</Label>
                      <div className="flex gap-2">
                        <Popover open={countryOpen} onOpenChange={setCountryOpen}>
                          <PopoverTrigger asChild>
                            <Button variant="outline" role="combobox" className="w-28 justify-between shrink-0 border-slate-200 dark:border-slate-700 px-2" data-testid="hire-country-select">
                              <span>{countries.find((c) => c.code === selectedCountry)?.flag}</span>
                              <span className="text-xs">{selectedCountry}</span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl rounded-xl" align="start">
                            <Command>
                              <CommandInput placeholder="Search country..." />
                              <CommandList className="max-h-52 overflow-y-auto">
                                <CommandEmpty>No country found.</CommandEmpty>
                                <CommandGroup>
                                  {countries.map((country) => (
                                    <CommandItem key={`${country.code}-${country.name}`} value={country.name} onSelect={() => { setSelectedCountry(country.code); setCountryOpen(false); }} className="flex items-center gap-2 cursor-pointer">
                                      <span>{country.flag}</span>
                                      <span className="text-xs font-semibold">{country.code}</span>
                                      <span className="text-xs text-slate-500 truncate">{country.name}</span>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <Input
                          type="tel"
                          placeholder="Phone number"
                          value={formData.mobile}
                          onChange={(e) => handleInputChange("mobile", e.target.value)}
                          className="flex-1 border-slate-200 dark:border-slate-700"
                          data-testid="input-hire-mobile"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="space-y-1.5">
                      <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Project Type *</Label>
                      <Select onValueChange={(v) => handleInputChange("projectType", v)} value={formData.projectType}>
                        <SelectTrigger className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" data-testid="select-project-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl rounded-xl">
                          <SelectItem value="Android App">📱 Android App</SelectItem>
                          <SelectItem value="Web Application">🌐 Web Application</SelectItem>
                          <SelectItem value="Full Stack">⚡ Full Stack</SelectItem>
                          <SelectItem value="POS / Enterprise">🖥️ POS / Enterprise</SelectItem>
                          <SelectItem value="Technical Consulting">💡 Technical Consulting</SelectItem>
                          <SelectItem value="Team Leadership">👥 Team Leadership</SelectItem>
                          <SelectItem value="Other">✨ Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Budget *</Label>
                      <div className="flex gap-2">
                        <Select onValueChange={(v) => handleInputChange("currency", v)} value={formData.currency}>
                          <SelectTrigger className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 w-[160px] shrink-0 font-semibold" data-testid="select-currency">
                            <SelectValue placeholder="Currency" />
                          </SelectTrigger>
                          <SelectContent className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl rounded-xl max-h-72">
                            <SelectItem value="$ USD">$ USD — Dollar</SelectItem>
                            <SelectItem value="€ EUR">€ EUR — Euro</SelectItem>
                            <SelectItem value="£ GBP">£ GBP — Pound</SelectItem>
                            <SelectItem value="₹ INR">₹ INR — Rupee</SelectItem>
                            <SelectItem value="₱ PHP">₱ PHP — Peso</SelectItem>
                            <SelectItem value="¥ JPY">¥ JPY — Yen</SelectItem>
                            <SelectItem value="¥ CNY">¥ CNY — Yuan</SelectItem>
                            <SelectItem value="₩ KRW">₩ KRW — Won</SelectItem>
                            <SelectItem value="₽ RUB">₽ RUB — Ruble</SelectItem>
                            <SelectItem value="﷼ SAR">﷼ SAR — Riyal</SelectItem>
                            <SelectItem value="د.إ AED">د.إ AED — Dirham</SelectItem>
                            <SelectItem value="৳ BDT">৳ BDT — Taka</SelectItem>
                            <SelectItem value="₺ TRY">₺ TRY — Lira</SelectItem>
                            <SelectItem value="RM MYR">RM MYR — Ringgit</SelectItem>
                            <SelectItem value="S$ SGD">S$ SGD — S. Dollar</SelectItem>
                            <SelectItem value="A$ AUD">A$ AUD — A. Dollar</SelectItem>
                            <SelectItem value="C$ CAD">C$ CAD — C. Dollar</SelectItem>
                            <SelectItem value="CHF CHF">CHF — Swiss Franc</SelectItem>
                            <SelectItem value="kr SEK">kr SEK — Krona</SelectItem>
                            <SelectItem value="R ZAR">R ZAR — Rand</SelectItem>
                            <SelectItem value="R$ BRL">R$ BRL — Real</SelectItem>
                            <SelectItem value="$ MXN">$ MXN — M. Peso</SelectItem>
                            <SelectItem value="₦ NGN">₦ NGN — Naira</SelectItem>
                            <SelectItem value="KSh KES">KSh KES — Shilling</SelectItem>
                            <SelectItem value="฿ THB">฿ THB — Baht</SelectItem>
                            <SelectItem value="Rp IDR">Rp IDR — Rupiah</SelectItem>
                            <SelectItem value="₫ VND">₫ VND — Dong</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          data-testid="input-budget-amount"
                          type="text"
                          placeholder="e.g. 5000"
                          value={formData.budgetAmount}
                          onChange={(e) => handleInputChange("budgetAmount", e.target.value)}
                          className="border-slate-200 dark:border-slate-700 focus:border-violet-500 focus:ring-violet-500/20 flex-1 font-semibold"
                        />
                      </div>
                      <p className="text-xs text-slate-400 dark:text-slate-500">Select your currency and enter the budget amount</p>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Timeline *</Label>
                      <Select onValueChange={(v) => handleInputChange("timeline", v)} value={formData.timeline}>
                        <SelectTrigger className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" data-testid="select-timeline">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl rounded-xl">
                          <SelectItem value="ASAP (1-2 weeks)">🚀 ASAP (1-2 weeks)</SelectItem>
                          <SelectItem value="1 Month">📅 1 Month</SelectItem>
                          <SelectItem value="2-3 Months">🗓️ 2-3 Months</SelectItem>
                          <SelectItem value="3-6 Months">📆 3-6 Months</SelectItem>
                          <SelectItem value="6+ Months">⏳ 6+ Months</SelectItem>
                          <SelectItem value="Ongoing / Retainer">🔄 Ongoing / Retainer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="hire-description" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Project Description *</Label>
                    <Textarea
                      id="hire-description"
                      placeholder="Describe your project in detail — goals, features, target audience, tech preferences, anything that will help me understand your vision..."
                      rows={5}
                      required
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="border-slate-200 dark:border-slate-700 focus:border-violet-500 resize-none"
                      data-testid="input-hire-description"
                    />
                  </div>

                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-semibold text-base shadow-lg shadow-violet-500/30 border-0"
                      data-testid="button-hire-submit"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending your request...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <Briefcase className="h-5 w-5" />
                          Submit Hire Request
                        </div>
                      )}
                    </Button>
                  </motion.div>

                  <p className="text-center text-xs text-slate-400 dark:text-slate-500">
                    By submitting, you agree that I'll contact you regarding your project. No spam, ever.
                  </p>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
