# Search Functionality - Clean Architecture Documentation

## Overview

This document describes the clean, modular search functionality implementation following best practices and SOLID principles.

## Architecture

### 📁 File Structure

```
src/
├── hooks/
│   └── useSearch.js              # Custom hook for search logic
├── services/
│   └── search.js                 # API service layer
├── components/
│   ├── SearchFilter/
│   │   ├── SearchFilter.jsx      # Filter sidebar component
│   │   └── SearchFilter.module.css
│   ├── SearchList/
│   │   ├── SearchList.jsx        # Results display component
│   │   └── SearchList.module.css
│   └── SearchCard/
│       └── MovieSearchResult.jsx # Individual result card
└── pages/
    ├── SearchPage.jsx            # Main search page
    └── SearchPage.module.css
```

## Core Components

### 1. **SearchPage.jsx** (Smart Component)

**Responsibility**: Orchestrates the search functionality

**Key Features**:

- URL-based state management (query, filter, page)
- Delegates data fetching to custom hook
- Handles filter and pagination changes
- Updates URL parameters

**Props**: None (uses URL params)

**State Management**:

```javascript
// URL Parameters (source of truth)
- query: string     // Search term
- filter: string    // Active filter (movie, tv, person, etc.)
- page: number      // Current page

// Local State
- activeFilter: string  // Synced with URL filter param
```

**Best Practices Applied**:

- ✅ Single Responsibility: Only handles UI orchestration
- ✅ URL as single source of truth
- ✅ Scroll to top on page change
- ✅ Clear error boundaries

---

### 2. **useSearch.js** (Custom Hook)

**Responsibility**: Encapsulates search logic and state

**API**:

```javascript
const {
  results, // Array of search results
  totalPages, // Total number of pages
  totalResults, // Total number of results
  isLoading, // Loading state
  error, // Error message
} = useSearch(query, filter, page);
```

**Key Features**:

- Automatic data fetching on dependency changes
- Error handling
- Loading states
- Empty query handling

**Best Practices Applied**:

- ✅ Separation of Concerns: Business logic separate from UI
- ✅ Single Responsibility: Only handles search data
- ✅ Reusable across components
- ✅ Clear API interface

---

### 3. **search.js** (Service Layer)

**Responsibility**: API communication layer

**Functions**:

```javascript
searchMulti(query, type, page); // Generic search
searchMovies(query, page); // Search movies
searchTV(query, page); // Search TV shows
searchPeople(query, page); // Search people
searchCompanies(query, page); // Search companies
searchKeywords(query, page); // Search keywords
```

**Key Features**:

- Centralized API calls
- Query validation
- Error handling
- Type-specific search functions

**Best Practices Applied**:

- ✅ Single Responsibility: Only handles API calls
- ✅ DRY: Reusable search function
- ✅ Error handling at source
- ✅ Input validation

---

### 4. **SearchFilter.jsx** (Presentation Component)

**Responsibility**: Displays filter options

**Props**:

```javascript
{
  filters: Array<{id, label}>,  // Available filters
  activeFilter: string,          // Currently active filter
  onFilterChange: function,      // Filter change handler
  totalResults: number,          // Total result count
}
```

**Key Features**:

- Responsive design (horizontal/vertical layouts)
- Accessibility (aria-labels)
- Clear active state

**Best Practices Applied**:

- ✅ Presentational component (no business logic)
- ✅ Props-driven
- ✅ Accessibility
- ✅ Responsive design

---

### 5. **SearchList.jsx** (Presentation Component)

**Responsibility**: Displays search results

**Props**:

```javascript
{
  results: Array,        // Search results
  loading: boolean,      // Loading state
  error: string,         // Error message
  filterType: string,    // Type of results
}
```

**Key Features**:

- Component mapping for different types
- Loading/Error/Empty states
- Extensible for new types

**Best Practices Applied**:

- ✅ Single Responsibility: Only renders results
- ✅ Strategy Pattern: Component mapping
- ✅ Clear state handling
- ✅ Extensible architecture

---

## Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                          SearchPage                              │
│  - Reads URL params (query, filter, page)                       │
│  - Manages activeFilter state                                   │
└──────────────────┬────────────────────────────────┬─────────────┘
                   │                                 │
                   ▼                                 ▼
        ┌──────────────────┐            ┌──────────────────┐
        │   useSearch()    │            │  SearchFilter    │
        │  Custom Hook     │            │   Component      │
        │                  │            │                  │
        │ - Fetches data   │            │ - Shows filters  │
        │ - Handles state  │            │ - Emits changes  │
        └────────┬─────────┘            └──────────────────┘
                 │
                 ▼
        ┌──────────────────┐
        │  search.js       │
        │  Service Layer   │
        │                  │
        │ - API calls      │
        │ - Error handling │
        └────────┬─────────┘
                 │
                 ▼
        ┌──────────────────┐
        │   SearchList     │
        │   Component      │
        │                  │
        │ - Renders items  │
        │ - State display  │
        └──────────────────┘
```

## Design Patterns Used

### 1. **Custom Hook Pattern**

- Encapsulates complex logic
- Reusable across components
- Clear separation of concerns

### 2. **Service Layer Pattern**

- Centralized API communication
- Easy to mock for testing
- Single source of truth for API calls

### 3. **Component Composition**

- Small, focused components
- Easy to test and maintain
- Reusable across application

### 4. **Strategy Pattern**

- Component mapping in SearchList
- Easy to add new content types
- Flexible and extensible

### 5. **URL State Management**

- URL as single source of truth
- Shareable search results
- Browser back/forward support

## Best Practices Implemented

### Code Quality

✅ **Single Responsibility Principle**: Each module has one clear purpose
✅ **DRY (Don't Repeat Yourself)**: Reusable functions and components
✅ **Separation of Concerns**: Clear boundaries between layers
✅ **Clean Code**: Descriptive names, clear structure
✅ **Error Handling**: Comprehensive error states

### React Best Practices

✅ **Custom Hooks**: Business logic separation
✅ **Controlled Components**: Props-driven UI
✅ **useEffect Dependencies**: Proper dependency arrays
✅ **Conditional Rendering**: Clear state handling
✅ **Key Props**: Proper list rendering

### Performance

✅ **URL-based State**: Avoid unnecessary re-renders
✅ **Lazy Loading**: Only fetch when needed
✅ **Memoization Ready**: Pure components
✅ **Scroll Management**: UX optimization

### Accessibility

✅ **Semantic HTML**: Proper element usage
✅ **ARIA Labels**: Screen reader support
✅ **Keyboard Navigation**: Full keyboard support

### Maintainability

✅ **Modular Architecture**: Easy to modify
✅ **Clear Naming**: Self-documenting code
✅ **Consistent Structure**: Predictable patterns
✅ **Documentation**: Clear comments

## Usage Example

### Basic Search

```javascript
// Navigate to search page
navigate('/search?query=avengers&filter=movie&page=1');

// SearchPage automatically:
// 1. Reads URL params
// 2. Fetches data via useSearch hook
// 3. Displays results in SearchList
// 4. Shows filters in SearchFilter
```

### Changing Filters

```javascript
// User clicks "TV Shows" filter
handleFilterChange('tv');

// Automatically:
// 1. Updates activeFilter state
// 2. Updates URL to ?query=avengers&filter=tv&page=1
// 3. useSearch hook refetches with new filter
// 4. SearchList displays TV results
```

### Pagination

```javascript
// User clicks page 2
handlePageChange(2);

// Automatically:
// 1. Updates URL to ?query=avengers&filter=tv&page=2
// 2. useSearch hook refetches page 2
// 3. Scrolls to top
// 4. SearchList displays new results
```

## Extending the System

### Adding a New Filter Type

1. **Add to FILTERS array** (SearchPage.jsx):

```javascript
const FILTERS = [
  // ...existing filters
  { id: 'collection', label: 'Collections' },
];
```

2. **Create component** (if needed):

```javascript
// components/SearchCard/CollectionResult.jsx
const CollectionResult = ({ name, overview, poster_path }) => {
  // ...render collection
};
```

3. **Add to COMPONENT_MAP** (SearchList.jsx):

```javascript
const COMPONENT_MAP = {
  // ...existing mappings
  collection: CollectionResult,
};
```

4. **Add service function** (search.js):

```javascript
export const searchCollections = (query, page = 1) =>
  searchMulti(query, 'collection', page);
```

That's it! The system will automatically handle the new type.

## Testing Strategy

### Unit Tests

- `useSearch.js`: Test data fetching, loading states, errors
- `search.js`: Test API calls, error handling
- Components: Test rendering, props, user interactions

### Integration Tests

- Filter changes trigger correct API calls
- Pagination updates URL and fetches data
- Error states display correctly

### E2E Tests

- Complete search flow
- Filter switching
- Pagination navigation
- Browser back/forward buttons

## Performance Considerations

1. **Debouncing**: Consider adding for real-time search
2. **Caching**: Implement result caching for visited pages
3. **Virtual Scrolling**: For large result sets
4. **Code Splitting**: Lazy load filter-specific components

## Future Enhancements

1. **Advanced Filters**: Year, rating, genre
2. **Sort Options**: Relevance, date, rating
3. **Infinite Scroll**: Alternative to pagination
4. **Search History**: Recent searches
5. **Autocomplete**: Search suggestions
6. **Favorites**: Save searches

## Summary

This implementation follows:

- ✅ Clean Architecture principles
- ✅ SOLID principles
- ✅ React best practices
- ✅ Separation of Concerns
- ✅ Extensible design
- ✅ Maintainable code structure

The result is a robust, scalable, and maintainable search system that can easily be extended with new features.
