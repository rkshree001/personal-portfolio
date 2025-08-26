import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function FloatingResumeButton() {
  const { toast } = useToast();

  const downloadResume = () => {
    // In a real app, this would download the actual PDF
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Shree_Bhargav_RK_Resume.pdf';
    link.click();
    
    toast({
      title: "Resume download started! 📄",
      description: "Your download should begin shortly.",
    });
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
      data-testid="floating-resume-button"
    >
      <Button
        onClick={downloadResume}
        className="bg-primary hover:bg-primary/90 text-primary-foreground p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group"
        size="icon"
        data-testid="download-resume-floating"
      >
        <Download className="w-6 h-6" />
        <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-slate-800 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Download Resume
        </span>
      </Button>
    </motion.div>
  );
}
