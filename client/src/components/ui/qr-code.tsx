import { useEffect, useRef } from "react";
import QRCode from "qrcode";
import { motion } from "framer-motion";

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
}

export function DynamicQRCode({ value, size = 128, className = "" }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, value, {
        width: size,
        margin: 1,
        color: {
          dark: '#1f2937',
          light: '#ffffff'
        }
      });
    }
  }, [value, size]);

  return (
    <motion.div 
      className={`inline-block ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <canvas 
        ref={canvasRef} 
        className="rounded-2xl shadow-2xl border-4 border-gradient-to-r from-violet-200 to-blue-200 dark:from-violet-800 dark:to-blue-800 bg-white dark:bg-slate-800 p-2"
      />
    </motion.div>
  );
}