import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { type User, type InsertUser, type Message, type InsertMessage, users, messages } from "@shared/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

// Database connection for Supabase
const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client);

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    // For memory storage, create a mock message
    const id = randomUUID();
    const message: Message = { 
      ...insertMessage, 
      id,
      created_at: new Date()
    };
    return message;
  }
}

export const storage = new MemStorage();
