# Changelog

All notable changes to the Real Estate Marketplace project will be documented in this file.

## [Unreleased]

### Added

- Comprehensive README with project overview and architecture details

### Changed

- Refactored data access layer with ActiveRecord pattern for improved maintainability
- Enhanced property handling with improved metadata generation and decorator implementation

## [2025-05-29]

### Changed

- Refactored models and configuration to extend ActiveRecord pattern
- Updated property and contact models with improved metadata generation

## [2025-05-26]

### Added

- Contact agent form with validation and toast notifications
- Inquiry and contact models for lead processing

### Changed

- Refactored property and contact models to remove decorator classes
- Replaced database calls with PropertyModel methods throughout application

### Removed

- Unused repository files in favor of PropertyModel methods

## [Initial Release]

### Added

- Next.js 15 application with Payload CMS 3.33
- PostgreSQL database integration
- Property listings with custom URL generation
- Agent management system
- Location hierarchy (cities, states, zip codes)
- Property features and amenities
- Media management with optimized uploads
- Inquiry system for buyer contacts
- Custom primary key generation (8-character IDs)
- Repository pattern for data access
- Comprehensive database seeding
- Docker support for development

### Technical Implementation

- Tailwind CSS 4.1.4 styling
- Radix UI components
- TypeScript with strict type checking
- Custom address formatting
- SEO-friendly property URLs
