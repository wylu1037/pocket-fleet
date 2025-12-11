# Pocket Fleet

A modern website + blog platform built with **PocketBase** (Go) backend and **TanStack Start** (React) frontend.

## Project Structure

```
pocket-fleet/
├── main.go                 # Backend entry point
├── go.mod                  # Go dependencies
├── go.sum                  # Go dependency checksums
├── Makefile                # Build commands
├── migrations/             # Database migrations
│   ├── 1733900000_init_site_config.go
│   ├── 1733900001_init_blog_posts.go
│   └── 1733900002_init_media.go
│
├── frontend/               # TanStack Start + React frontend
│   ├── src/
│   │   ├── routes/         # File-based routing
│   │   │   ├── __root.tsx
│   │   │   ├── index.tsx   # Homepage
│   │   │   └── blog/
│   │   │       ├── index.tsx   # Blog list
│   │   │       └── $slug.tsx   # Blog post detail
│   │   ├── lib/
│   │   │   └── pocketbase.ts   # PocketBase client
│   │   └── styles/
│   │       └── globals.css     # Tailwind + custom styles
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
└── README.md
```

## Features

### Backend (PocketBase)
- **Site Configuration**: Configurable title, logo, description, and other settings
- **Blog Posts**: Rich content with cover images, categories, tags, and SEO support
- **Media Management**: Centralized asset management for images and files
- **Admin UI**: Built-in PocketBase admin panel at `/_/`

### Frontend (TanStack Start)
- **Server-Side Rendering**: Fast initial page loads
- **File-based Routing**: Intuitive route organization
- **Modern UI**: Dark theme with gradient accents
- **Responsive Design**: Works on all devices
- **Type-Safe**: Full TypeScript support

## Getting Started

### Prerequisites
- Go 1.23+
- Node.js 20+
- npm or pnpm

### Backend Setup

```bash
# From project root
make dev
# or
go run . serve --http=0.0.0.0:8090
```

The PocketBase admin UI will be available at: `http://localhost:8090/_/`

On first run, create an admin account.

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

The frontend will be available at: `http://localhost:3000`

### Quick Start (Both)

```bash
# Install all dependencies
make install

# Terminal 1: Start backend
make dev

# Terminal 2: Start frontend
make frontend-dev
```

## Collections

### site_config
Store website configuration as key-value pairs.

| Field | Type | Description |
|-------|------|-------------|
| key | text | Unique configuration key |
| value | text | Configuration value |
| type | text | Value type (text, image, url, json, html) |
| description | text | Optional description |

Example keys:
- `site_name` - Website name
- `site_description` - Website description
- `logo` - Logo image URL
- `contact_email` - Contact email

### blog_posts
Blog articles with rich content support.

| Field | Type | Description |
|-------|------|-------------|
| title | text | Post title |
| slug | text | URL-friendly identifier |
| excerpt | text | Short description |
| content | editor | Rich HTML content |
| cover_image | file | Cover image |
| published | bool | Publication status |
| published_at | date | Publication date |
| category | select | Post category |
| tags | json | Array of tags |
| view_count | number | View counter |

### media
Centralized media asset storage.

| Field | Type | Description |
|-------|------|-------------|
| name | text | Asset name |
| alt | text | Alt text for images |
| file | file | The media file |
| category | select | Asset category (logo, hero, banner, etc.) |

## Development

### Build for Production

**Backend:**
```bash
make build
./pocket-fleet serve --http=0.0.0.0:8090
```

**Frontend:**
```bash
cd frontend
npm run build
npm run start
```

## Makefile Commands

| Command | Description |
|---------|-------------|
| `make dev` | Start backend in development mode |
| `make build` | Build backend binary |
| `make run` | Run built backend binary |
| `make migrate` | Run database migrations |
| `make deps` | Download Go dependencies |
| `make clean` | Clean build artifacts |
| `make frontend-dev` | Start frontend dev server |
| `make frontend-build` | Build frontend for production |
| `make install` | Install all dependencies |

## Tech Stack

- **Backend**: Go, PocketBase
- **Frontend**: React, TanStack Start, TanStack Router
- **Styling**: Tailwind CSS
- **Build**: Vite
- **Type Safety**: TypeScript

## License

MIT
