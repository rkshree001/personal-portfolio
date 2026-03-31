import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { personalInfo } from "@/data/portfolio-data";
import { MapPin, Mail, Phone, Github, Linkedin, Send, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabaseClient"; // ✅ import supabase client

import { Check, Search } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

 


// countries.ts
// Full list of countries with phone codes + emoji flags

const countries = [
  { code: "+93", flag: "🇦🇫", name: "Afghanistan" },
  { code: "+355", flag: "🇦🇱", name: "Albania" },
  { code: "+213", flag: "🇩🇿", name: "Algeria" },
  { code: "+376", flag: "🇦🇩", name: "Andorra" },
  { code: "+244", flag: "🇦🇴", name: "Angola" },
  { code: "+1-268", flag: "🇦🇬", name: "Antigua and Barbuda" },
  { code: "+54", flag: "🇦🇷", name: "Argentina" },
  { code: "+374", flag: "🇦🇲", name: "Armenia" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+43", flag: "🇦🇹", name: "Austria" },
  { code: "+994", flag: "🇦🇿", name: "Azerbaijan" },
  { code: "+973", flag: "🇧🇭", name: "Bahrain" },
  { code: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "+1-246", flag: "🇧🇧", name: "Barbados" },
  { code: "+32", flag: "🇧🇪", name: "Belgium" },
  { code: "+501", flag: "🇧🇿", name: "Belize" },
  { code: "+229", flag: "🇧🇯", name: "Benin" },
  { code: "+975", flag: "🇧🇹", name: "Bhutan" },
  { code: "+591", flag: "🇧🇴", name: "Bolivia" },
  { code: "+387", flag: "🇧🇦", name: "Bosnia and Herzegovina" },
  { code: "+267", flag: "🇧🇼", name: "Botswana" },
  { code: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "+673", flag: "🇧🇳", name: "Brunei" },
  { code: "+359", flag: "🇧🇬", name: "Bulgaria" },
  { code: "+226", flag: "🇧🇫", name: "Burkina Faso" },
  { code: "+257", flag: "🇧🇮", name: "Burundi" },
  { code: "+855", flag: "🇰🇭", name: "Cambodia" },
  { code: "+237", flag: "🇨🇲", name: "Cameroon" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "+238", flag: "🇨🇻", name: "Cape Verde" },
  { code: "+56", flag: "🇨🇱", name: "Chile" },
  { code: "+86", flag: "🇨🇳", name: "China" },
  { code: "+57", flag: "🇨🇴", name: "Colombia" },
  { code: "+506", flag: "🇨🇷", name: "Costa Rica" },
  { code: "+385", flag: "🇭🇷", name: "Croatia" },
  { code: "+53", flag: "🇨🇺", name: "Cuba" },
  { code: "+357", flag: "🇨🇾", name: "Cyprus" },
  { code: "+420", flag: "🇨🇿", name: "Czech Republic" },
  { code: "+45", flag: "🇩🇰", name: "Denmark" },
  { code: "+20", flag: "🇪🇬", name: "Egypt" },
  { code: "+503", flag: "🇸🇻", name: "El Salvador" },
  { code: "+372", flag: "🇪🇪", name: "Estonia" },
  { code: "+251", flag: "🇪🇹", name: "Ethiopia" },
  { code: "+358", flag: "🇫🇮", name: "Finland" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+995", flag: "🇬🇪", name: "Georgia" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+30", flag: "🇬🇷", name: "Greece" },
  { code: "+852", flag: "🇭🇰", name: "Hong Kong" },
  { code: "+36", flag: "🇭🇺", name: "Hungary" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+62", flag: "🇮🇩", name: "Indonesia" },
  { code: "+98", flag: "🇮🇷", name: "Iran" },
  { code: "+964", flag: "🇮🇶", name: "Iraq" },
  { code: "+353", flag: "🇮🇪", name: "Ireland" },
  { code: "+972", flag: "🇮🇱", name: "Israel" },
  { code: "+39", flag: "🇮🇹", name: "Italy" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "+254", flag: "🇰🇪", name: "Kenya" },
  { code: "+82", flag: "🇰🇷", name: "South Korea" },
  { code: "+965", flag: "🇰🇼", name: "Kuwait" },
  { code: "+856", flag: "🇱🇦", name: "Laos" },
  { code: "+371", flag: "🇱🇻", name: "Latvia" },
  { code: "+961", flag: "🇱🇧", name: "Lebanon" },
  { code: "+370", flag: "🇱🇹", name: "Lithuania" },
  { code: "+352", flag: "🇱🇺", name: "Luxembourg" },
  { code: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "+356", flag: "🇲🇹", name: "Malta" },
  { code: "+52", flag: "🇲🇽", name: "Mexico" },
  { code: "+31", flag: "🇳🇱", name: "Netherlands" },
  { code: "+64", flag: "🇳🇿", name: "New Zealand" },
  { code: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "+47", flag: "🇳🇴", name: "Norway" },
  { code: "+92", flag: "🇵🇰", name: "Pakistan" },
  { code: "+970", flag: "🇵🇸", name: "Palestine" },
  { code: "+51", flag: "🇵🇪", name: "Peru" },
  { code: "+63", flag: "🇵🇭", name: "Philippines" },
  { code: "+48", flag: "🇵🇱", name: "Poland" },
  { code: "+351", flag: "🇵🇹", name: "Portugal" },
  { code: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "+7", flag: "🇷🇺", name: "Russia" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+421", flag: "🇸🇰", name: "Slovakia" },
  { code: "+386", flag: "🇸🇮", name: "Slovenia" },
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
  { code: "+598", flag: "🇺🇾", name: "Uruguay" },
  { code: "+998", flag: "🇺🇿", name: "Uzbekistan" },
  { code: "+58", flag: "🇻🇪", name: "Venezuela" },
  { code: "+84", flag: "🇻🇳", name: "Vietnam" },
  { code: "+260", flag: "🇿🇲", name: "Zambia" },
  { code: "+263", flag: "🇿🇼", name: "Zimbabwe" },
];


const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    description: "rkshree001@gmail.com",
    color: "text-blue-600"
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Connect professionally",
    href: personalInfo.linkedin,
    description: "Connect professionally",
    color: "text-blue-500"
  },
  {
    icon: Github,
    label: "GitHub",
    value: "View my repositories",
    href: personalInfo.github,
    description: "View my repositories",
    color: "text-slate-600"
  },
  {
    icon: Phone,
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
    description: "+91 9080322066",
    color: "text-green-600"
  },
  {
    icon: MapPin,
    label: "Location",
    value: personalInfo.location,
    href: "#",
    description: "Hosur, Tamil Nadu, India",
    color: "text-slate-600"
  },
];

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', message: '' });
  const [selectedCountry, setSelectedCountry] = useState("+91");
  const [open, setOpen] = useState(false);
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   try {
  //     // ✅ Save directly to Supabase
  //     const { error } = await supabase.from("messages").insert([
  //       {
  //         name: formData.name,
  //         email: formData.email,
  //         mobile: `${selectedCountry} ${formData.mobile}`,
  //         message: formData.message,
  //       }
  //     ]);

  //     if (error) {
  //       console.error(error);
  //       toast({
  //         title: "❌ Failed to send message",
  //         description: error.message || "Please try again later.",
  //         variant: "destructive",
  //       });
  //     } else {
  //       toast({
  //         title: "🎉 Message sent successfully!",
  //         description: "Thanks for reaching out! I'll get back to you within 24 hours.",
  //       });
  //       setFormData({ name: '', email: '', mobile: '', message: '' });
  //     }
  //   } catch (err) {
  //     console.error('Error submitting form:', err);
  //     toast({
  //       title: "❌ Network error",
  //       description: "Please check your connection and try again.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  const payload = {
    name: formData.name,
    email: formData.email,
    mobile: `${selectedCountry} ${formData.mobile}`,
    message: formData.message,
  };

  try {
    const { error } = await supabase.from("messages").insert([payload]);
    if (error) console.warn("Supabase insert failed:", error.message);
  } catch (dbErr: any) {
    console.warn("Supabase unavailable:", dbErr.message);
  }

  try {
    const res = await fetch("/api/notify", {
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
    title: "🎉 Message sent successfully!",
    description: "Thanks for reaching out! I'll get back to you within 24 hours.",
  });
  setFormData({ name: "", email: "", mobile: "", message: "" });
  setIsSubmitting(false);
};

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen py-24 px-4 bg-slate-50 dark:bg-slate-950" data-testid="contact-page">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            <span className="mr-3">📧</span>
            Get In Touch
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Let's discuss your next project or just say hello
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div>
            <Card className="p-6 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Contact Information</h3>
              <div className="space-y-4">
                {contactMethods.map((method) => (
                  <a
                    key={method.label}
                    href={method.href}
                    className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group"
                    target={method.href.startsWith("http") ? "_blank" : undefined}
                    rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    <div className="w-12 h-12 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm">
                      <method.icon className={`h-6 w-6 ${method.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900 dark:text-white">{method.label}</div>
                      <div className="text-slate-600 dark:text-slate-400 text-sm">{method.description}</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="p-6 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="mobile">Mobile Number</Label>
 <div className="flex gap-2">
<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      role="combobox"
      aria-expanded={open}
      className="w-40 justify-between"
    >
      <div className="flex items-center gap-2">
        <span>
          {countries.find((c) => c.code === selectedCountry)?.flag}
        </span>
        <span>{selectedCountry}</span>
      </div>
    </Button>
  </PopoverTrigger>

<PopoverContent
  className="p-0 bg-white border border-gray-200 shadow-md rounded-lg 
             w-[var(--radix-popover-trigger-width)] max-w-sm"
  align="start"
>
  <Command>
    <CommandInput placeholder="Search country..." className="mb-2" />
    <CommandList className="max-h-64 overflow-y-auto">
      <CommandEmpty>No country found.</CommandEmpty>
      <CommandGroup>
        {countries.map((country, index) => (
          <div key={country.code}>
            <CommandItem
              value={country.name}
              onSelect={() => {
                setSelectedCountry(country.code);
                setOpen(false);
              }}
              className="flex flex-col items-start gap-1 px-3 py-2 
                         cursor-pointer hover:bg-gray-100 
                         dark:hover:bg-slate-800"
            >
              {/* Top row: Phone code */}
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <span className="w-8 shrink-0">{country.flag}</span>
                <span className="font-semibold">{country.code}</span>
              </div>

              {/* Second row: Country name (BOLD) */}
              <div className="text-sm font-bold text-gray-900 dark:text-gray-100 whitespace-normal break-words">
                {country.name}
              </div>
            </CommandItem>

            {/* Divider */}
            {index < countries.length - 1 && (
              <div className="border-t border-gray-200 dark:border-gray-700" />
            )}
          </div>
        ))}
      </CommandGroup>
    </CommandList>
  </Command>
</PopoverContent>

</Popover>

  <Input
    id="mobile"
    type="tel"
    placeholder="Enter mobile number"
    value={formData.mobile}
    onChange={(e) => handleInputChange("mobile", e.target.value)}
    className="flex-1"
  />
</div>
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project..."
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white">
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Send className="h-4 w-4" />
                      Send Message
                    </div>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
