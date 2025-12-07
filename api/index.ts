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
    // Using require for CommonJS module to avoid TypeScript errors
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const expressApp = require("../dist/index.cjs");
    app = expressApp.default || expressApp;
  }
  
  // Handle the request with Express
  // VercelRequest/VercelResponse are compatible enough with Express req/res
  return new Promise<void>((resolve) => {
    if (app) {
      app(req as any, res as any, () => {
        resolve();
      });
    } else {
      res.status(500).json({ error: "Failed to initialize application" });
      resolve();
    }
  });
}
