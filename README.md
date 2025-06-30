# 📚 React Practice Projects

A monorepo containing multiple React projects demonstrating various concepts and patterns, with a shared Node.js backend API.

## 🚀 Quick Start

### Frontend Development
```bash
pnpm install
pnpm dev
```

### Backend Development  
```bash
cd backend
npm install
npm start
```

### Full Stack Development
```bash
# Terminal 1: Start backend
cd backend && npm start

# Terminal 2: Start frontend  
pnpm dev
```

## 📁 Project Structure

```
react-app/
├── src/                    # Frontend React applications
│   ├── components/         # Shared components
│   ├── pages/             # Individual project pages
│   └── utils/             # Utilities and API helpers
├── backend/               # Node.js/Express API server
├── docs/                  # 📖 Comprehensive documentation
└── README.md              # This file
```

## 🎯 Available Projects

| Project | Path | Description |
|---------|------|-------------|
| **BookStore** | `/book-store` | Mock API data fetching and processing |
| **Restaurant System** | `/restaurant-system` | Order management with CRUD operations |
| **Image Carousel III** | `/image-carousel-iii` | Interactive UI components |

## 📖 Documentation

**📚 [Complete Documentation](./docs/)** - Comprehensive guides and project documentation

### Quick Links
- **[Project Documentation](./docs/projects/)** - Project index and overview
  - **[BookStore](./src/pages/BookStore/README.md)** - In-project documentation
  - **[Restaurant System](./src/pages/RestaurantSystem/README.md)** - In-project documentation
- **[React Concepts](./docs/guides/react-concepts/)** - Learning materials and patterns
- **[Testing Guides](./docs/guides/testing/)** - Testing strategies and setup
- **[Backend API](./docs/backend/)** - API documentation and setup

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **React Router** for navigation
- **CSS Modules** for styling

### Backend
- **Node.js** with Express
- **File-based JSON storage**
- **CORS** enabled for development
- **Modular route structure**

## 🎓 Learning Objectives

This project demonstrates:
- **Component Architecture** - Reusable and maintainable components
- **State Management** - Various React state patterns
- **API Integration** - Frontend-backend communication
- **Form Handling** - Controlled components and validation
- **Testing** - Unit and manual testing strategies
- **Monorepo Structure** - Organizing multiple related projects

---

📅 **Last Updated:** June 29, 2025  
🏷️ **Version:** 1.0.0
