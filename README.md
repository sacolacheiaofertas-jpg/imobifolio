# Real Estate Marketplace

A modern real estate marketplace built with Next.js 15 and Payload CMS 3.33, featuring property listings, agent management, and location-based search capabilities.

## Features

- **Property Listings** - Comprehensive property management with custom URLs, gallery support, and detailed specifications
- **Agent Management** - Real estate agent profiles with property associations and contact information
- **Location System** - Hierarchical location data with cities, states, and zip codes
- **Property Features** - Categorized amenities and characteristics for detailed property descriptions
- **Inquiry System** - Contact forms and inquiry management for potential buyers
- **Media Management** - Optimized image uploads with multiple sizes and focal point support

## Tech Stack

- **Frontend**: Next.js 15 with App Router
- **CMS**: Payload CMS 3.33
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS 4.1.4
- **UI Components**: Radix UI
- **Package Manager**: pnpm

## Quick Start

1. **Clone and Install**

   ```bash
   git clone <repository-url>
   cd realestate-demo
   pnpm install
   ```

2. **Environment Setup**

   ```bash
   cp .env.example .env
   # Add your PostgreSQL connection string to MONGODB_URI
   ```

3. **Development**

   ```bash
   pnpm dev
   ```

4. **Seed Database** (Optional)
   ```bash
   pnpm db:seed
   ```

Visit `http://localhost:3000` for the public marketplace and `http://localhost:3000/admin` for the CMS admin panel.

## Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm db:seed` - Seed database with sample data
- `pnpm generate:types` - Generate Payload types
- `pnpm generate:importmap` - Generate import map for Payload admin

## Architecture

### Route Structure

- `app/(frontend)` - Public-facing marketplace
  - Property listings and details
  - Agent profiles
  - Search and filtering
- `app/(payload)` - Payload CMS admin interface

### Collections

- **Properties** - Real estate listings with custom ID generation and URL preview
- **Agents** - Real estate professionals with specializations
- **Locations** - Geographic hierarchy (cities, states, zip codes)
- **Features** - Property amenities and characteristics
- **Inquiries** - Contact forms and buyer inquiries
- **Media** - File uploads with optimized sizes
- **Users** - Admin authentication

### Key Features

#### Custom Primary Keys

Uses 8-character generated IDs instead of auto-incrementing integers for all collections.

#### Smart URL Generation

Properties automatically generate SEO-friendly URLs:

```
/home/{state}/{city}/{street-address}/{zip}/home/{id}
```

#### Address Formatting

Automatic address structuring from street address and location relationships.

#### Repository Pattern

Database operations abstracted through repository classes with common CRUD operations.

## Docker Setup (Optional)

Use the included `docker-compose.yml` for containerized development:

```bash
docker-compose up -d
```

Modify your `.env` file's `DATABASE_URI` to point to the containerized database.

## Database Seeding

The application includes comprehensive sample data:

```bash
pnpm db:seed
```

This populates:

- Sample properties with images and details (put images you want to include in `./media)`
- Real estate agents with specializations
- Location data for Tennessee
- Property features and amenities
- Admin users

## Contributing

1. Follow the existing code patterns and conventions
2. Use the repository pattern for data access
3. Maintain TypeScript types with `pnpm generate:types`
4. Run linting and type checking before commits
