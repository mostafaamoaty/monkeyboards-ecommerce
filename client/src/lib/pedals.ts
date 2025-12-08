export interface Pedal {
  id: string;
  brand: string;
  model: string;
  category: "overdrive" | "distortion" | "delay" | "reverb" | "modulation" | "fuzz" | "compressor" | "eq" | "wah" | "tuner" | "looper" | "other" | "utility" | "tremolo/reverb" | "ambient/reverb" | "compressor/boost" | "rotary/modulation" | "amp simulator";
  width: number;
  height: number;
  imageUrl: string;
  color: string;
}

export const pedals: Pedal[] = [
  {
    id: "boss-ds1",
    brand: "Boss",
    model: "DS-1 Distortion",
    category: "distortion",
    width: 73,
    height: 129,
    imageUrl: "https://media.sweetwater.com/api/i/f-webp__q-82__ha-4259a7b2d99c48c0__hmac-8bf8eb81c5fbb2a3e60a4a078073c5daec0b2ba6/images/items/750/DS1-large.jpg",
    color: "#f97316"
  },
  {
    id: "boss-bd2",
    brand: "Boss",
    model: "BD-2 Blues Driver",
    category: "overdrive",
    // Boss compact pedals are roughly same footprint: 73mm × 129mm
    width: 73,
    height: 129,
    imageUrl: "https://media.sweetwater.com/api/i/f-webp__q-82__ha-4259a7b2d99c48c0__hmac-8bf8eb81c5fbb2a3e60a4a078073c5daec0b2ba6/images/items/750/BD2-large.jpg",
    color: "#e4b200"
  },
  {
    id: "mxr-carbon-copy",
    brand: "MXR",
    model: "M169 Carbon Copy Analog Delay",
    category: "delay",
    width: 73,
    height: 129,
    imageUrl: "https://media.sweetwater.com/api/i/f-webp__q-82__ha-0c49ba2cc4f5b5fff5c2171f2be9a0a4bd70529a/images/items/750/M169-large.jpg",
    color: "#85b6d9"
  },
  {
    id: "ibanez-ts9",
    brand: "Ibanez",
    model: "TS9 Tube Screamer",
    category: "overdrive",
    // Tube Screamer: approx 70 mm × 120 mm (typical compact pedal size)
    width: 70,
    height: 120,
    imageUrl: "https://media.sweetwater.com/api/i/f-webp__q-82__ha-6a1e082e7c2af7b5692de71627c6e889b9b7c8d2/images/items/750/TS9-large.jpg",
    color: "#70a700"
  },
  {
    id: "proco-rat2",
    brand: "ProCo",
    model: "RAT 2",
    category: "distortion",
    width: 73,
    height: 129,
    imageUrl: "https://media.sweetwater.com/api/i/f-webp__q-82__ha-c9dd433be2f385319c3e00cb04e2d8a67fbdec4d/images/items/750/RAT2-large.jpg",
    color: "#606060"
  },
  {
    id: "boss-sd1",
    brand: "Boss",
    model: "SD-1 Super Overdrive",
    category: "overdrive",
    width: 73,
    height: 129,
    imageUrl: "https://media.sweetwater.com/api/i/f-webp__q-82__ha-9f1bbd80119f63f1eeb2878e902695d927f7b549/images/items/750/SD1-large.jpg",
    color: "#ffc600"
  },
  {
    id: "electro-harmonix-big-muff-pi",
    brand: "Electro-Harmonix",
    model: "Big Muff Pi",
    category: "fuzz",
    width: 86,
    height: 145,
    imageUrl: "https://media.sweetwater.com/api/i/f-webp__q-82__ha-a7e5fcbca54344c25f6fe6160ee6c808cd117038/images/items/750/BMP-large.jpg",
    color: "#3a3a3a"
  },
  {
    id: "boss-tu3",
    brand: "Boss",
    model: "TU-3 Chromatic Tuner",
    category: "utility",
    width: 73,
    height: 129,
    imageUrl: "https://media.sweetwater.com/api/i/f-webp__q-82__ha-ffebfebadea1a5285678334d1e7bd10824459ace/images/items/750/TU3-large.jpg",
    color: "#ffffff"
  },
  {
    id: "boss-dd3",
    brand: "Boss",
    model: "DD-3 Digital Delay",
    category: "delay",
    width: 73,
    height: 129,
    imageUrl: "https://media.sweetwater.com/api/i/f-webp__q-82__ha-40d43bfedf35058c2cb673e58f374c33a8d48ef5/images/items/750/DD3-large.jpg",
    color: "#99d8ff"
  },
  {
    id: "mxr-phase90",
    brand: "MXR",
    model: "Phase 90",
    category: "modulation",
    width: 73,
    height: 129,
    imageUrl: "https://media.sweetwater.com/api/i/f-webp__q-82__ha-5df3e270a1f823943a5f3b3fc8c2d80ad3f4af19/images/items/750/Phase90-large.jpg",
    color: "#ff9900"
  },
  {
    id: "strymon-bigsky",
    brand: "Strymon",
    model: "BigSky",
    category: "reverb",
    width: 171,
    height: 187,
    imageUrl: "https://media.sweetwater.com/api/i/f-webp__q-82__ha-d4e9b256e0d6b651fd9bcc8b3ee27253ce328db6/images/items/750/BigSky-large.jpg",
    color: "#2c3a5d"
  },
  {
    id: "strymon-timeline",
    brand: "Strymon",
    model: "TimeLine",
    category: "delay",
    width: 171,
    height: 187,
    imageUrl: "https://media.sweetwater.com/api/i/f-webp__q-82__ha-869c6fd91974edf63010b244c1b4955a131a3402/images/items/750/TimeLine-large.jpg",
    color: "#4d4f68"
  },
  {
    id: "strymon-mobius",
    brand: "Strymon",
    model: "Mobius",
    category: "modulation",
    width: 171,
    height: 187,
    imageUrl: "https://media.sweetwater.com/api/i/f-webp__q-82__ha-4a23ab2f5f5c93b134a5aef3b0cd87a9fd66d12d/images/items/750/Mobius-large.jpg",
    color: "#3b5b7f"
  },
  {
    id: "strymon-elcapistan",
    brand: "Strymon",
    model: "El Capistan",
    category: "delay",
    width: 171,
    height: 187,
    imageUrl: "https://media.sweetwater.com/api/i/f-webp__q-82__ha-2cb0c3e6f82099fa03f5b1c24a632fd62e314f0a/images/items/750/ElCapistan-large.jpg",
    color: "#4a2e2e"
  },
  {
    id: "strymon-flint",
    brand: "Strymon",
    model: "Flint",
    category: "tremolo/reverb",
    width: 171,
    height: 187,
    imageUrl: "https://media.sweetwater.com/api/i/f-webp__q-82__ha-71d3a4e5a11e1a98102c1c10b66d6e8f063622c0/images/items/750/Flint-large.jpg",
    color: "#8c5e2f"
  },
  {
    id: "strymon-dig",
    brand: "Strymon",
    model: "DIG Dual Digital Delay",
    category: "delay",
    width: 171,
    height: 187,
    imageUrl: "https://media.sweetwater.com/api/i/f-webp__q-82__ha-9c4c437f0c2b6b6d26e5d80a8ee0e20463f5480f/images/items/750/DIG-large.jpg",
    color: "#3e3e3e"
  },
  {
    id: "strymon-brigadier",
    brand: "Strymon",
    model: "Brigadier",
    category: "delay",
    width: 171,
    height: 187,
    imageUrl: "https://media.sweetwater.com/api/i/f-webp__q-82__ha-5bdb76ed28a7aa9dcbf44c35d3de9142f7a9f2b2/images/items/750/Brig-large.jpg",
    color: "#5c5c5c"
  },
  {
    id: "strymon-compadre",
    brand: "Strymon",
    model: "Compadre",
    category: "compressor/boost",
    width: 171,
    height: 187,
    imageUrl: "https://media.sweetwater.com/api/i/f-webp__q-82__ha-7b7c0f1234abcd5678efab12c34ef56789012abc/images/items/750/Compadre-large.jpg",
    color: "#d4a35e"
  },
  {
    id: "strymon-lex",
    brand: "Strymon",
    model: "Lex",
    category: "rotary/modulation",
    width: 171,
    height: 187,
    imageUrl: "https://media.sweetwater.com/api/i/f-webp__q-82__ha-8f8d1234abcd567890efab12c34ef56789012abc/images/items/750/Lex-large.jpg",
    color: "#607c99"
  },
  {
    id: "strymon-iridium",
    brand: "Strymon",
    model: "Iridium",
    category: "amp simulator",
    width: 171,
    height: 187,
    imageUrl: "https://media.sweetwater.com/api/i/f-webp__q-82__ha-2f2e1234abcd567890efab12c34ef56789012abc/images/items/750/Iridium-large.jpg",
    color: "#3f3f3f"
  }
]

export function getPedalById(id: string): Pedal | undefined {
  return pedals.find((p) => p.id === id);
}

export function getPedalsByCategory(category: Pedal["category"]): Pedal[] {
  return pedals.filter((p) => p.category === category);
}

export const categories: { value: Pedal["category"]; label: string }[] = [
  { value: "overdrive", label: "Overdrive" },
  { value: "distortion", label: "Distortion" },
  { value: "fuzz", label: "Fuzz" },
  { value: "delay", label: "Delay" },
  { value: "reverb", label: "Reverb" },
  { value: "modulation", label: "Modulation" },
  { value: "compressor", label: "Compressor" },
  { value: "compressor/boost", label: "Compressor/Boost" },
  { value: "eq", label: "EQ" },
  { value: "wah", label: "Wah" },
  { value: "tuner", label: "Tuner" },
  { value: "utility", label: "Utility" },
  { value: "looper", label: "Looper" },
  { value: "tremolo/reverb", label: "Tremolo/Reverb" },
  { value: "ambient/reverb", label: "Ambient/Reverb" },
  { value: "rotary/modulation", label: "Rotary/Modulation" },
  { value: "amp simulator", label: "Amp Simulator" },
  { value: "other", label: "Other" },
];
