// Vercel serverless function entry point
import type { VercelRequest, VercelResponse } from "@vercel/node";

let app: any;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // Lazy load the Express app on first request
  if (!app) {
    // Set environment to production for Vercel
    process.env.NODE_ENV = "production";
    process.env.VERCEL = "1";
    
    // Import and initialize the Express app
    const { default: expressApp } = await import("../dist/index.cjs");
    app = expressApp;
  }
  
  // Handle the request with Express
  return new Promise((resolve) => {
    app(req, res, () => {
      resolve(undefined);
    });
  });
}
