import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import { db } from "./storage";
import { insertMessageSchema, messages } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Resume download route
  app.get("/api/resume", (req, res) => {
    const resumePath = path.join(process.cwd(), "client", "public", "resume.pdf");
    res.download(resumePath, "Shree_Bhargav_RK_Resume.pdf", (err) => {
      if (err) {
        console.error("Error downloading resume:", err);
        res.status(404).json({ message: "Resume not found" });
      }
    });
  });

  // Contact form submission endpoint with Supabase integration
  app.post("/api/contact", async (req, res) => {
    try {
      console.log("Received contact form data:", req.body);
      
      // Validate the request body
      const validatedData = insertMessageSchema.parse(req.body);
      
      try {
        // Try to insert the message into the Supabase database
        const [newMessage] = await db.insert(messages).values(validatedData).returning();
        
        console.log("Message saved to database with ID:", newMessage.id);
        
        res.status(201).json({ 
          success: true, 
          message: "Message sent successfully! Thank you for contacting Shree Bhargav.",
          id: newMessage.id 
        });
      } catch (dbError) {
        console.error("Database error:", dbError);
        
        // If database isn't available, still acknowledge the submission
        console.log("Fallback: Contact form submission logged locally:", validatedData);
        
        res.status(200).json({ 
          success: true, 
          message: "Message received! Thank you for contacting Shree Bhargav.",
          note: "Database connection pending - message logged for review."
        });
      }
    } catch (error) {
      console.error("Error processing message:", error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data. Please check all fields are filled correctly.",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to send message. Please try again later." 
        });
      }
    }
  });

   app.get("/api/messages", async (req, res) => {
    try {
      const allMessages = await db.select().from(messages);

      res.json(allMessages); // send rows back
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch messages." 
      });
    }
  });
  // Portfolio data endpoints
  app.get("/api/portfolio/info", (req, res) => {
    res.json({
      name: "Shree Bhargav R K",
      title: "Android Developer Team Lead",
      email: "rkshree001@gmail.com",
      phone: "+91 9080322066",
      location: "Hosur, Tamil Nadu, India",
      github: "https://github.com/rkshree001",
      linkedin: "https://linkedin.com/in/shree-bhargav-r-k-7b5b1419b",
      experience: "2+ years",
      teamSize: "10 developers"
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
