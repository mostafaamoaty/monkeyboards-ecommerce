import type { Product } from "@shared/schema";
import smallPedalboard from "@assets/generated_images/small_walnut_pedalboard_product.png";
import mediumPedalboard from "@assets/generated_images/medium_oak_pedalboard_product.png";
import largePedalboard from "@assets/generated_images/large_maple_two-tier_pedalboard.png";
import woodGrainDetail from "@assets/generated_images/wood_grain_detail_closeup.png";

export const products: Product[] = [
  {
    id: "compact-pedalboard",
    name: "Compact Pedalboard",
    size: "small",
    description: "Perfect for 3-4 pedals. Ideal for minimalist setups.",
    longDescription: "The Compact Pedalboard is handcrafted for musicians who value quality over quantity. Built with premium hardwood, this board provides the perfect foundation for your essential pedals. The angled design ensures optimal ergonomics while performing, and the durable construction means this board will last for years of gigging and studio sessions.",
    basePrice: 1499,
    images: [smallPedalboard, woodGrainDetail],
    features: [
      "Handcrafted from premium hardwood",
      "Fits 3-4 standard-size pedals",
      "Dimensions: 30cm x 15cm",
      "Non-slip rubber feet",
      "Cable routing channels",
      "Lifetime warranty on craftsmanship",
    ],
    tier: "1-tier",
  },
  {
    id: "standard-pedalboard",
    name: "Standard Pedalboard",
    size: "medium",
    description: "Fits 5-6 pedals. The most popular choice for working musicians.",
    longDescription: "Our Standard Pedalboard is the go-to choice for professional musicians. With room for 5-6 pedals, it offers the perfect balance between portability and functionality. Each board is individually crafted and sanded by hand, ensuring a flawless finish that showcases the natural beauty of the wood grain.",
    basePrice: 1999,
    images: [mediumPedalboard, woodGrainDetail],
    features: [
      "Handcrafted from premium hardwood",
      "Fits 5-6 standard-size pedals",
      "Dimensions: 45cm x 20cm",
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
    size: "large",
    description: "Full rig with 8-10 pedals. For the serious tone chaser.",
    longDescription: "The Pro Pedalboard is our flagship model, designed for musicians with extensive rigs. Featuring a two-tier design, this board maximizes space efficiency while maintaining easy access to all your pedals. The elevated rear section provides optimal visibility and ergonomics during performance.",
    basePrice: 2799,
    images: [largePedalboard, woodGrainDetail],
    features: [
      "Handcrafted from premium hardwood",
      "Two-tier design for maximum capacity",
      "Fits 8-10 standard-size pedals",
      "Dimensions: 60cm x 30cm",
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

export function getProductsBySize(size: "small" | "medium" | "large"): Product[] {
  return products.filter((p) => p.size === size);
}
