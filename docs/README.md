# 📚 React Practice Projects - Documentation

Welcome to the documentation for the React Practice Projects monorepo. This contains multiple frontend projects with a shared backend API.

## 🏗️ Project Structure

```
react-app/
├── src/                    # Frontend React applications
├── backend/               # Shared Node.js/Express API
└── docs/                  # 📖 Documentation (you are here)
```

## 📖 Documentation Index

### 🎯 [Project Guides](./projects/)
- **[BookStore](../src/pages/BookStore/README.md)** - Mock API data fetching and processing
- **[Restaurant System](../src/pages/RestaurantSystem/README.md)** - Order management system
- **Image Carousel III** - Interactive image carousel
- **Trading Chart** - Financial data visualization

### 🧠 [Learning Guides](./guides/)
- **[React Concepts](./guides/react-concepts/)** - Core React concepts and patterns
- **[Testing](./guides/testing/)** - Testing strategies and setup guides

### 🔧 [Backend Documentation](./backend/)
- **[API Reference](./backend/)** - Backend API setup and endpoints

## 🚀 Quick Start

1. **Frontend Development:**
   ```bash
   pnpm install
   pnpm dev
   ```

2. **Backend Development:**
   ```bash
   cd backend
   npm install
   npm start
   ```

3. **Full Stack Development:**
   ```bash
   # Terminal 1: Start backend
   cd backend && npm start
   
   # Terminal 2: Start frontend
   pnpm dev
   ```

## 🏛️ Architecture

This is a **monorepo** containing:
- Multiple React projects in a single frontend app
- Shared components and utilities
- Unified backend API serving multiple projects
- Centralized documentation and guides

## 📱 Available Projects

| Project | Path | Description |
|---------|------|-------------|
| Home | `/` | Project listing and navigation |
| BookStore | `/book-store` | API data fetching patterns |
| Restaurant System | `/restaurant-system` | CRUD operations and forms |
| Image Carousel III | `/image-carousel-iii` | Interactive UI components |

## 🎓 Learning Objectives

Each project demonstrates different React and web development concepts:

- **API Integration** - Fetching, processing, and error handling
- **State Management** - useState, useEffect, and state patterns
- **Form Handling** - Controlled components and validation
- **Component Architecture** - Reusable and maintainable code
- **Testing** - Unit tests and manual testing strategies
- **Backend Integration** - Full-stack development patterns

---

📅 **Last Updated:** June 29, 2025  
🏷️ **Version:** 1.0.0  
🧑‍💻 **Maintainer:** Development Team
