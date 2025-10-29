# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Next.js application for VZW Ten Boomgaerde Lichtervelde - a facility management system for reservations, organizations, and hall management. The application features a dashboard system with authentication, internationalization (Dutch/Belgian), and is built with modern React patterns.

## Common Development Commands

### Development Setup & Running

```bash
# Install dependencies
npm install

# Start development server (automatically starts Supabase)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Analyze bundle size
npm run analyze
```

### Supabase (Local Development)

```bash
# Start Supabase services manually
npm run supabase:start

# Stop Supabase services
npm run supabase:stop

# Generate TypeScript types from Supabase schema
npm run supabase:gen-types
```

### Code Quality & Testing

```bash
# Run linter
npm run lint

# Format code
npm run format:fix

# Check formatting
npm run format

# Run commit linting
npm run commitlint

# Check for unused dependencies
npm run knip

# Run lint-staged (used in pre-commit hooks)
npm run lint-staged
```

## Architecture Overview

### Tech Stack

- **Framework**: Next.js 15 with App Router and Turbopack
- **Styling**: Tailwind CSS with custom design system components
- **UI Components**: Radix UI primitives with custom implementations
- **Database**: Supabase (PostgreSQL) with TypeScript types
- **State Management**: TanStack Query for server state
- **Internationalization**: next-intl (Dutch/Belgian locale)
- **Authentication**: Supabase Auth

### Project Structure

#### App Router Architecture

- **`app/layout.tsx`**: Root layout wrapper
- **`app/[locale]/layout.tsx`**: Internationalized layout with providers
- **`app/[locale]/(sidebar)/`**: Protected routes with sidebar navigation
- **`app/[locale]/authentication/`**: Auth routes (sign-in, sign-up, recovery)

#### Core Directories

**Components Architecture**

- **`components/atoms/`**: Design system components (Button, Input, Table, etc.)
- **`components/Providers.tsx`**: Client-side providers (TanStack Query)
- **`components/SSRProviders.tsx`**: Server-side providers
- **`components/Tools.tsx`**: Development tools integration

**Services Layer**

- **`service/authentication/`**: Auth operations (sign-in, sign-up, password management)
- **`service/reservations/`**: Reservation CRUD operations
- **`service/organisations/`**: Organization management
- **`service/users/`**: User management operations
- **`service/halls/`**: Hall/venue management
- **`service/products/`**: Product management

**Utilities & Configuration**

- **`utils/supabase/`**: Database client configuration (server/client)
- **`utils/query/`**: TanStack Query client setup
- **`utils/tailwindcss/`**: Tailwind utility functions
- **`proxies/`**: Custom proxy stack with plugin system
- **`i18n/`**: Internationalization routing and configuration
- **`types/`**: TypeScript type definitions

#### proxy System

The project uses a plugin-based proxy system:

- **`proxies/stack.ts`**: proxy orchestration
- **`proxies/plugins/`**: Individual proxy plugins
- **`proxy.ts`**: Next.js proxy entry point

### Key Patterns

#### Authentication & Authorization

- Supabase Auth integration with server/client patterns
- Protected routes using proxy
- Role-based access (admin functions)

#### Data Fetching

- TanStack Query for server state management
- Supabase client for database operations
- Type-safe database operations with generated types

#### Internationalization

- Single locale (nl-BE) with next-intl
- Localized routing structure
- Server-side locale detection

#### UI Component System

- Atomic design with Radix UI primitives
- Consistent styling with Tailwind CSS
- Form components with react-hook-form integration
- Data tables with TanStack Table

### Development Notes

#### Database Development

- Local Supabase instance runs on development
- Types are generated from database schema
- Use `npm run supabase:gen-types` after schema changes

#### Styling Approach

- Tailwind CSS with custom configuration
- Design tokens through CSS variables
- Component variants using class-variance-authority

#### Code Quality

- ESLint with Next.js, TypeScript, and perfectionist rules
- Prettier for code formatting
- Conventional commits with commitlint
- Husky for git hooks
- Strict TypeScript configuration

#### Build Optimization

- Turbopack for faster development builds
- Bundle analyzer available for production analysis
- Console removal in production builds
