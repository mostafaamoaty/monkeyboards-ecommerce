# Monkey Boards - Handmade Guitar Pedalboards

## Overview

Monkey Boards is an e-commerce platform specializing in premium handcrafted guitar pedalboards. The application allows customers to browse pre-configured pedalboards, build custom boards with specific dimensions and finishes, and place orders. The platform features a visual pedalboard planner tool that helps musicians arrange their pedals virtually before purchasing. Orders are processed through Cash on Delivery (COD) or InstaPay payment methods and stored in Google Sheets for order management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript for type-safe component development
- Wouter for lightweight client-side routing
- TanStack Query for server state management and API caching
- Zustand with persistence middleware for cart and pedalboard planner state
- Tailwind CSS with shadcn/ui component library for consistent design system
- Framer Motion for drag-and-drop interactions in the pedalboard planner

**Design System:**
- Custom Tailwind configuration with extended color palette based on HSL CSS variables
- Theme provider supporting light/dark mode with localStorage persistence
- Component library following shadcn/ui's "New York" style preset
- Design guidelines emphasize boutique e-commerce aesthetic with generous spacing and premium feel

**State Management Strategy:**
- Cart state managed via Zustand with localStorage persistence, allowing cart to survive page refreshes
- Pedalboard planner uses separate Zustand store for canvas state, pedal positions, and board configuration
- Global theme state managed through React Context
- Server data fetched and cached using TanStack Query

**Key Pages:**
- Home: Hero section with featured products and value propositions
- Products: Filterable catalog with size and tier filtering
- Product Details: Image gallery, customization options (wood finish, tier), quantity selection
- Custom Builder: Interactive form for specifying exact dimensions and finishes with real-time price calculation
- Checkout: Order form with customer details and payment method selection
- Pedalboard Planner: Drag-and-drop canvas for virtually arranging pedals on different board sizes
- Artists & Partners: Marketing pages showcasing collaborations

### Backend Architecture

**Server Framework:**
- Express.js server with TypeScript
- HTTP server creation for both development and production environments
- Vite middleware integration for development with HMR support
- Static file serving for production builds

**Development vs Production:**
- Development: Vite dev server with HMR, middleware mode, and hot reload
- Production: Pre-built static assets served from `dist/public` directory
- Serverless deployment support via Vercel with lazy-loaded Express app in `api/index.ts`

**API Design:**
- RESTful endpoint structure under `/api` prefix
- POST `/api/orders` endpoint for order submission with Zod validation
- Health check endpoint at `/api/health`
- Request logging middleware tracking method, path, status code, and duration

**Validation:**
- Shared Zod schemas between client and server for type safety
- Order validation includes customer info, cart items, payment method, and total amount
- Cart item validation ensures required fields like product ID, size, tier, wood finish, and pricing

### Data Storage Solutions

**Google Sheets Integration:**
- Primary order storage using Google Sheets API via Replit connector
- OAuth 2.0 authentication with automatic token refresh
- Connection settings retrieved from Replit's connector API using environment-based authentication tokens
- Orders appended to sheets with customer details, line items, and order metadata
- No traditional database used - Google Sheets serves as the order management system

**Client-Side Persistence:**
- Cart state persisted to localStorage via Zustand middleware
- Theme preference stored in localStorage
- Session-based data only exists in memory during user session

**Product Catalog:**
- Static product definitions in TypeScript with typed interfaces
- Pre-defined size options (Compact, Standard, Pro) with dimensions and base prices
- Wood finish options (Dark Walnut, Ebony, Natural Wood) with color values
- Tier options (1-tier, 2-tier) affecting pricing

### External Dependencies

**UI Component Libraries:**
- Radix UI primitives for accessible, unstyled components (dialogs, popovers, dropdowns, etc.)
- shadcn/ui component patterns built on top of Radix UI
- Embla Carousel for image galleries
- CMDK for command palette patterns
- Lucide React for iconography
- React Icons for brand icons (Instagram, Facebook, Spotify)

**Form Management:**
- React Hook Form for form state and validation
- @hookform/resolvers for Zod schema integration
- Zod for runtime validation and type inference

**Build & Development Tools:**
- Vite for fast development server and optimized production builds
- ESBuild for server-side bundling with selective dependency bundling
- Drizzle ORM configured but not actively used (PostgreSQL dialect configured for future use)
- TypeScript with strict mode enabled for type safety

**Deployment Platform:**
- Vercel serverless functions for production hosting
- Replit development environment with special Vite plugins for cartographer and dev banner
- Environment-based configuration switching between development and production

**API Integrations:**
- Google Sheets API for order storage
- Replit Connectors API for OAuth token management

**Pricing Logic:**
- Custom pedalboards use dimension-based calculation: base price (1500 EGP) + area surcharge + tier multiplier
- Pre-configured products have fixed base prices with tier variations
- All prices in Egyptian Pounds (EGP)

**Asset Management:**
- Product images stored in `attached_assets` directory
- Custom alias `@assets` configured in Vite for easy imports
- WebP format for optimized image delivery