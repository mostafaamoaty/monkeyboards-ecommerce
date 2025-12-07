import type { Express } from "express";
import { createServer, type Server } from "http";
import { appendOrderToSheet } from "./googleSheets";
import { z } from "zod";

// Order validation schema
const cartItemSchema = z.object({
  id: z.string(),
  productId: z.string(),
  productName: z.string(),
  size: z.string(),
  tier: z.string(),
  woodFinish: z.string(),
  color: z.string(),
  quantity: z.number().min(1),
  price: z.number().min(0),
  image: z.string(),
  isCustom: z.boolean(),
  customDimensions: z.object({
    width: z.number(),
    height: z.number(),
  }).optional(),
});

const orderRequestSchema = z.object({
  customerName: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  address: z.string().min(10),
  city: z.string().min(2),
  notes: z.string().optional(),
  paymentMethod: z.enum(["cod", "instapay"]),
  items: z.array(cartItemSchema).min(1),
  totalAmount: z.number().min(0),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Submit order endpoint
  app.post("/api/orders", async (req, res) => {
    try {
      // Validate request body
      const validationResult = orderRequestSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({
          error: "Invalid order data",
          details: validationResult.error.errors,
        });
      }

      const orderData = validationResult.data;

      // Append order to Google Sheets
      const orderId = await appendOrderToSheet({
        customerName: orderData.customerName,
        email: orderData.email,
        phone: orderData.phone,
        address: orderData.address,
        city: orderData.city,
        paymentMethod: orderData.paymentMethod,
        notes: orderData.notes,
        items: orderData.items,
        totalAmount: orderData.totalAmount,
      });

      res.status(201).json({
        success: true,
        orderId,
        message: "Order placed successfully",
      });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({
        error: "Failed to create order",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  return httpServer;
}
