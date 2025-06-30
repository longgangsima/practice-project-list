# 🎯 Project Documentation

Individual project documentation and guides for each frontend application.

## � Available Projects

Each project maintains its own README file within its source directory for easy access during development.

### [BookStore](../../src/pages/BookStore/)

**Location:** `src/pages/BookStore/README.md`  
**Path:** `/book-store`  
**Description:** Mock API data fetching and processing patterns

**Key Features:**

- Complex API data fetching workflow
- Author and book data correlation
- Error handling for missing data
- Data grouping and sorting algorithms

### [Restaurant System](../../src/pages/RestaurantSystem/)

**Location:** `src/pages/RestaurantSystem/README.md`  
**Path:** `/restaurant-system`  
**Description:** Order management system with CRUD operations

**Key Features:**

- Order creation and management
- Form validation and controlled components
- Real-time order display
- Backend API integration

### [Image Carousel III](../../src/pages/ImageCarouselIII/)

**Path:** `/image-carousel-iii`  
**Description:** Interactive image carousel component

**Key Features:**

- Smooth image transitions
- Touch/swipe support
- Responsive design
- Performance optimized

### [Trading Chart](../../src/pages/TradingChart/)

**Path:** `/trading-chart` _(Coming Soon)_  
**Description:** Financial data visualization

**Planned Features:**

- Real-time chart updates
- Multiple chart types
- Interactive data points
- Time range selection

---

## 🏗️ Project Architecture

### Directory Structure

```
src/pages/[ProjectName]/
├── README.md              # Project documentation (stay close to code)
├── index.tsx             # Main project component
├── components/           # Project-specific components
├── styles/              # Project-specific styles
├── data/                # Mock data files
├── __tests__/           # Project tests
└── hooks/               # Custom hooks (if needed)
```

### Development Workflow

1. **Start Development:**

   ```bash
   # Root directory
   pnpm dev

   # Navigate to project URL
   http://localhost:5173/[project-path]
   ```

2. **Read Project Docs:**

   ```bash
   # Open project README while coding
   code src/pages/[ProjectName]/README.md
   ```

3. **Backend Development:**
   ```bash
   # Start backend if needed
   cd backend && npm start
   ```

---

## � Related Documentation

- **[Learning Guides](../guides/)** - React concepts and patterns
- **[Backend API](../backend/)** - Shared backend documentation
- **[Testing](../guides/testing/)** - Testing strategies

## 🤝 Contributing

When adding new projects:

1. Create project directory in `src/pages/`
2. Add project README.md in the project directory
3. Update routing in `App.tsx`
4. Add project to `constants/projectList.ts`
5. Update this index file with project info
