import { z } from "zod";

// Wood finish options
export const woodFinishes = [
  { id: "walnut", name: "Dark Walnut", color: "#4a3728" },
  { id: "ebony", name: "Ebony", color: "#1a1a1a" },
  { id: "natural", name: "Natural Wood", color: "#d4a574" },
] as const;

// Tier options
export const tierOptions = ["1-tier", "2-tier"] as const;

// Product size definitions
export const productSizes = [
  {
    id: "standard",
    name: "Compact",
    description: "Perfect for 4-6 pedals",
    dimensions: { width: 30, height: 15 },
    basePrice: 1499,
  },
  {
    id: "pro",
    name: "Standard",
    description: "Fits 10-12 pedals comfortably",
    dimensions: { width: 45, height: 20 },
    basePrice: 1999,
  },
  {
    id: "pro",
    name: "Pro",
    description: "Full rig with up to 16 pedals",
    dimensions: { width: 60, height: 30 },
    basePrice: 2799,
  },
] as const;

// Product type
export interface Product {
  id: string;
  name: string;
  size: "compact" | "standard" | "pro";
  description: string;
  longDescription: string;
  basePrice: number;
  images: string[];
  features: string[];
  tier: "1-tier" | "2-tier";
}

// Cart item type
export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  size: string;
  tier: string;
  woodFinish: string;
  quantity: number;
  price: number;
  image: string;
  isCustom: boolean;
  customDimensions?: { width: number; height: number };
}

// Order schema
export const orderSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  address: z.string().min(10, "Please enter your full address"),
  city: z.string().min(2, "Please enter your city"),
  notes: z.string().optional(),
  paymentMethod: z.enum(["cod", "instapay"]),
});

export type OrderFormData = z.infer<typeof orderSchema>;

// Full order with items
export interface Order extends OrderFormData {
  id: string;
  items: CartItem[];
  totalAmount: number;
  createdAt: string;
  status: "pending" | "confirmed" | "shipped" | "delivered";
}

// Custom pedalboard configuration
export interface CustomConfig {
  width: number;
  height: number;
  tier: "1-tier" | "2-tier";
  woodFinish: string;
}

// Calculate price for custom pedalboard
export function calculateCustomPrice(config: CustomConfig): number {
  const baseRatePerSqCm = 1.5;
  const area = config.width * config.height;
  let price = area * baseRatePerSqCm;
  
  if (config.tier === "2-tier") {
    price *= 1.4; // 40% more for 2-tier
  }
  
  return Math.round(price);
}
