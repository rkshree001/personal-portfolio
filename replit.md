# Portfolio App - Shree Bhargav R K

## Overview

This is a comprehensive personal portfolio application for Shree Bhargav R K, an Android Developer Team Lead with 2+ years of experience. The application showcases professional experience, projects, skills, and contact information through an interactive web interface. Built as a full-stack application, it features a modern React frontend with server-side API endpoints for resume downloads and contact form submissions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing with multiple pages (splash, home, about, projects, skills, resume, contact)
- **Styling**: Tailwind CSS with custom design system featuring portfolio-specific color schemes and gradients
- **UI Components**: Shadcn/ui component library built on Radix UI primitives for accessible, customizable components
- **Animations**: Framer Motion for smooth page transitions, interactive elements, and Easter egg effects
- **State Management**: TanStack React Query for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for contact forms
- **Theme Support**: Built-in dark/light theme toggle with system preference detection

### Backend Architecture
- **Runtime**: Node.js with Express.js server framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **API Design**: RESTful endpoints for portfolio data, resume downloads, and contact form submissions
- **File Serving**: Static file serving for resume PDF downloads
- **Development**: Vite development server with hot module replacement and runtime error overlay

### Build System
- **Bundler**: Vite for fast development and optimized production builds
- **Build Process**: Separate client and server builds with esbuild for server-side bundling
- **Development Tools**: TypeScript compiler checking, ESLint integration, and Replit-specific development plugins

### Database Schema
- **ORM**: Drizzle ORM configured for PostgreSQL with type-safe database operations
- **Schema**: Basic user management schema with UUID primary keys and unique username constraints
- **Migrations**: Drizzle Kit for database schema migrations and version control
- **Database Provider**: Configured for Neon Database serverless PostgreSQL

### UI/UX Design Patterns
- **Design System**: Consistent color palette with primary blue (#3b82f6), secondary violet, and accent colors
- **Typography**: Inter font family with serif and monospace alternatives
- **Layout**: Responsive grid layouts with mobile-first design approach
- **Navigation**: Fixed header navigation with smooth scrolling and active state indicators
- **Animations**: Entrance animations, hover effects, and interactive Easter eggs for Harry Potter and Marvel references

### Component Architecture
- **Layout Components**: Reusable navigation header and footer with social links
- **Page Components**: Dedicated components for each route with consistent structure
- **UI Components**: Comprehensive component library including cards, buttons, dialogs, forms, and data display components
- **Custom Components**: Floating resume download button and theme provider for enhanced user experience

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React 18, React DOM, React Router (Wouter)
- **UI Framework**: Radix UI component primitives for accessibility
- **Styling**: Tailwind CSS with PostCSS for utility-first styling
- **Animations**: Framer Motion for declarative animations
- **Forms**: React Hook Form with Hookform Resolvers for validation
- **Data Fetching**: TanStack React Query for server state management
- **Utilities**: clsx and class-variance-authority for conditional styling
- **Date Handling**: date-fns for date manipulation and formatting

### Backend Dependencies
- **Server Framework**: Express.js for HTTP server and middleware
- **Database**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database serverless PostgreSQL (@neondatabase/serverless)
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Validation**: Zod for runtime type checking and validation

### Development Dependencies
- **Build Tools**: Vite, esbuild, TypeScript compiler
- **Development**: tsx for TypeScript execution, Replit-specific plugins
- **Linting**: ESLint configuration for code quality
- **Database Tools**: Drizzle Kit for schema management and migrations

### Third-party Integrations
- **Font Provider**: Google Fonts (Inter, JetBrains Mono, Georgia)
- **Development Platform**: Replit integration with development banner and runtime error modal
- **Version Control**: Git-based workflow with package-lock.json for dependency management