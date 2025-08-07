# News Feed with Infinite Scroll

A React-based news feed application that implements infinite scroll functionality with a mock API.

## Features

- **Infinite Scroll**: Automatically loads more content when user scrolls near the bottom
- **Mock API**: Simulates real API calls with loading delays
- **Responsive Design**: Mobile-friendly layout
- **Loading States**: Visual feedback during data fetching
- **Modern UI**: Clean, card-based design with hover effects

## API Structure

The mock API returns data in this format:

```typescript
{
  page: number,
  data: [
    {
      id: string,
      name: string,
      body: string,
      image: {
        url: string
      }
    }
  ]
}
```

## Implementation Details

### Components

1. **NewsFeed** (`index.tsx`): Main component managing state and infinite scroll logic
2. **NewsCard** (`components/NewsCard.tsx`): Individual news item display
3. **LoadingSpinner** (`components/LoadingSpinner.tsx`): Loading indicator

### Key Features

- **Pagination**: Loads 5 items per page
- **Total Items**: 10 items total (2 pages)
- **Scroll Detection**: Triggers new data fetch 1000px before reaching bottom
- **State Management**: Manages loading states, pagination, and data
- **Error Handling**: Graceful error handling for API failures

### Mock Data

- Uses Picsum Photos for random images
- Generates realistic news content
- Simulates 1-second API delay
- Returns empty data after page 2 to simulate end of content

## Usage

1. Navigate to the News Feed project from the main page
2. Scroll down to see automatic loading of new content
3. Loading spinner appears while fetching data
4. End message displays when all content is loaded

## Technical Implementation

- **React Hooks**: useState, useEffect, useCallback
- **Lazy Loading**: Images loaded with loading="lazy"
- **CSS Animations**: Smooth hover effects and loading spinner
- **Responsive Design**: Mobile-first approach
- **TypeScript**: Full type safety

## File Structure

```
NewsFeed/
├── index.tsx                 # Main component
├── types.ts                  # TypeScript interfaces
├── api/
│   └── newsApi.ts           # Mock API implementation
├── components/
│   ├── NewsCard.tsx         # News item component
│   ├── NewsCard.css         # News card styles
│   ├── LoadingSpinner.tsx   # Loading component
│   └── LoadingSpinner.css   # Loading spinner styles
└── styles/
    └── NewsFeed.css         # Main styles
```
