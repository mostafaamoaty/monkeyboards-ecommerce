# Design Guidelines: Monkey Boards - Handmade Guitar Pedalboards

## Design Approach

**Reference-Based with Boutique E-commerce Focus**
Drawing inspiration from premium music gear retailers (Reverb, Sweetwater product pages) and artisan e-commerce platforms (high-end Etsy shops, custom instrument builders). The design should balance handcrafted authenticity with modern web standards, emphasizing product photography and tactile, premium feel.

**Key Principles:**
- Product photography as hero - let the craftsmanship shine
- Confident, bold typography that reflects boutique manufacturing
- Generous spacing that feels premium, not cluttered
- Tactile interaction patterns for configurators

## Typography

**Font Selection:**
- Headings: Inter or Montserrat (700-800 weight) - modern, confident, clean
- Body: Inter or Work Sans (400-500 weight) - highly readable for product details
- Accent: Optional mono font for technical specs (dimensions, SKUs)

**Scale:**
- Hero Headlines: text-5xl to text-7xl
- Section Headers: text-3xl to text-4xl
- Product Names: text-2xl (semibold)
- Body Text: text-base to text-lg
- Captions/Labels: text-sm

## Layout System

**Spacing Units:** Use Tailwind spacing of 3, 4, 6, 8, 12, 16, 20, 24
- Component padding: p-6 to p-8
- Section spacing: py-16 to py-24
- Card gaps: gap-6 to gap-8
- Micro-spacing: space-y-3 to space-y-4

**Grid Structure:**
- Container: max-w-7xl mx-auto px-4 to px-8
- Products Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Product Details: Two-column split (60/40) - gallery left, info right

## Page-Specific Guidelines

### Landing Page

**Hero Section (80vh):**
Large, impactful hero image showcasing a premium pedalboard in use or beautifully staged. Hero should include:
- Large headline emphasizing handcrafted quality
- Subheadline about custom-built pedalboards
- Primary CTA "Shop Pedalboards" + Secondary "Build Custom"
- Buttons with backdrop blur on image background

**Sections (5-7 total):**
1. Featured Products Grid (3 standard sizes with images)
2. Custom Builder Teaser (visual of configurator + CTA)
3. Craftsmanship Showcase (2-column: large image + text about handmade process)
4. Social Proof/Instagram Gallery (4-6 pedalboard images in grid)
5. Why Choose Us (3-column features: Quality, Customization, Fast Delivery)
6. CTA Section (bold, centered with custom builder emphasis)

### Products List Page

**Layout:**
- Filter sidebar (left, 20% width): Size, Wood Finish, Tier options
- Product grid (right, 80% width): 2-3 columns responsive
- Each card: Large square product image, name, price, "Quick View" button

**Product Cards:**
- Aspect ratio 1:1 for images
- Hover: subtle scale (1.02) and shadow elevation
- Clear pricing display
- Badge for "Custom Available"

### Product Details Page

**Split Layout:**
- Left (60%): Image gallery with main large image + thumbnail strip below
- Right (40%): Sticky product info section

**Info Section Components:**
- Product name (large, bold)
- Price display (prominent)
- Variant selectors (Wood Finish dropdown + Color swatches)
- Size specifications table
- Quantity selector
- Add to Cart (large, full-width button)
- Product description (expandable sections for details)

### Custom Builder Page

**Progressive Disclosure Layout:**
- Step indicator at top (Size → Tiers → Finish → Color → Review)
- Large preview area (left or top, 50-60% of space)
- Configuration panel (right or bottom)
- Live price calculator (sticky, always visible)

**Configuration Controls:**
- Dimension inputs: Large number inputs with +/- steppers
- Tier selector: Visual radio cards (images of 1-tier vs 2-tier)
- Finish selector: Large swatches or cards with texture previews
- Real-time visual preview updating with selections

**Add to Cart:** Bold, full-width with custom specs summary

### Shopping Cart (Slide-over Panel)

- Slide from right (w-96 to w-[28rem])
- Item cards with thumbnail, name, variant details, quantity controls
- Subtotal calculation
- "Checkout" button (prominent, full-width)
- Empty state: Illustration + "Browse Products" CTA

### Checkout Page

**Single Column Form (max-w-2xl):**
- Order summary card (sticky on desktop)
- Customer information fields (name, phone, address)
- Payment method radio group (COD/Instapay with icons)
- Order notes textarea
- Submit button: "Place Order" (large, confident)

## Component Library

### Buttons
- Primary: Large padding (px-8 py-4), rounded-lg, semibold text
- Secondary: Outlined style with hover fill
- Icon buttons: Square aspect, centered icon

### Cards
- Rounded corners: rounded-xl
- Shadow: shadow-sm with hover:shadow-lg transition
- Padding: p-6

### Forms
- Input fields: Tall (h-12), rounded-lg, clear labels above
- Dropdowns: Custom styled with chevron icon
- Color swatches: Circle or rounded-square, border on selected

### Navigation
- Header: Sticky top, backdrop blur, logo left, nav center, cart icon right
- Mobile: Hamburger menu with slide-in drawer
- Footer: 3-column grid (About, Quick Links, Contact)

## Images

**Critical Image Placements:**

1. **Hero Image:** Full-width, professional photo of premium pedalboard with pedals arranged on it, shot from slight angle to show depth and craftsmanship. Natural lighting preferred.

2. **Product Photography:** Each product needs 4-6 images:
   - Front-facing hero shot
   - Top-down view showing layout
   - Close-up of wood grain/finish
   - Side profile showing tiers
   - In-use with pedals (lifestyle)

3. **Custom Builder Preview:** 3D-style or isometric illustration/render that updates with selections

4. **Craftsmanship Section:** Workshop photos showing hand-building process, tools, attention to detail

5. **Social Proof:** Customer pedalboards in action (4-6 grid)

All product images should have consistent white or subtle gradient backgrounds, high resolution, professionally lit to showcase wood grain and finishes.

## Responsive Behavior

- Desktop (lg): Multi-column layouts, side-by-side content
- Tablet (md): 2-column grids, stacked detail pages
- Mobile: Single column, stacked navigation, full-width cards

**Priority:** Mobile cart access, easy variant selection on touch devices, thumb-friendly custom builder controls