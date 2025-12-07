import { randomUUID } from "crypto";

// Simple in-memory storage for session data if needed
// Orders are stored in Google Sheets

export interface IStorage {
  // Add any additional storage methods as needed
}

export class MemStorage implements IStorage {
  constructor() {}
}

export const storage = new MemStorage();
