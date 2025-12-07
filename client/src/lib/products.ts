import type { Product } from "@shared/schema";
import smallPedalboard from "@assets/monkey-compact-1-tier.webp";
import smallPedalboardSide from "@assets/monkey-compact-1-tier-side.jpg";
import smallPedalboardBack from "@assets/monkey-compact-1-tier-back.jpg";
import mediumPedalboard from "@assets/monkey-standard-1-tier.webp";
import mediumPedalboardSide from "@assets/monkey-standard-1-tier-side.jpg";
import mediumPedalboardBack from "@assets/monkey-standard-1-tier-back.jpg";
import largePedalboard from "@assets/monkey-pro-2-tier.webp";
import largePedalboardSide from "@assets/monkey-pro-2-tier-side.jpg";

export const products: Product[] = [
  {
    id: "compact-pedalboard",
    name: "Compact Pedalboard",
    size: "compact",
    description: "Perfect for 4-6 pedals. Ideal for minimalist setups.",
    longDescription: "The Compact Pedalboard is handcrafted for musicians who value quality over quantity. Built with premium hardwood, this board provides the perfect foundation for your essential pedals. The angled design ensures optimal ergonomics while performing, and the durable construction means this board will last for years of gigging and studio sessions.",
    basePrice: 1499,
    images: [smallPedalboard, smallPedalboardSide, smallPedalboardBack],
    features: [
      "Handcrafted from premium hardwood",
      "Fits 4-6 standard-size pedals",
      "Dimensions: 50cm x 25cm",
      "Non-slip rubber feet",
      "Cable routing channels",
      "Lifetime warranty on craftsmanship",
    ],
    tier: "1-tier",
  },
  {
    id: "standard-pedalboard",
    name: "Standard Pedalboard",
    size: "standard",
    description: "Fits 10-12 pedals. The most popular choice for working musicians.",
    longDescription: "Our Standard Pedalboard is the go-to choice for professional musicians. With room for 5-6 pedals, it offers the perfect balance between portability and functionality. Each board is individually crafted and sanded by hand, ensuring a flawless finish that showcases the natural beauty of the wood grain.",
    basePrice: 1999,
    images: [mediumPedalboard, mediumPedalboardSide, mediumPedalboardBack],
    features: [
      "Handcrafted from premium hardwood",
      "Fits 10-12 standard-size pedals",
      "Dimensions: 55cm x 35cm",
      "Non-slip rubber feet",
      "Integrated cable management",
      "Power supply mounting area",
      "Lifetime warranty on craftsmanship",
    ],
    tier: "1-tier",
  },
  {
    id: "pro-pedalboard",
    name: "Pro Pedalboard",
    size: "pro",
    description: "Full rig with up to 16 pedals. For the serious tone chaser.",
    longDescription: "The Pro Pedalboard is our flagship model, designed for musicians with extensive rigs. Featuring a two-tier design, this board maximizes space efficiency while maintaining easy access to all your pedals. The elevated rear section provides optimal visibility and ergonomics during performance.",
    basePrice: 2799,
    images: [largePedalboard, largePedalboardSide],
    features: [
      "Handcrafted from premium hardwood",
      "Two-tier design for maximum capacity",
      "Fits up to 16 standard-size pedals",
      "Dimensions: 60cm x 35cm",
      "Non-slip rubber feet",
      "Advanced cable management system",
      "Dedicated power supply area",
      "Reinforced construction for touring",
      "Lifetime warranty on craftsmanship",
    ],
    tier: "2-tier",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsBySize(size: "compact" | "standard" | "pro"): Product[] {
  return products.filter((p) => p.size === size);
}
