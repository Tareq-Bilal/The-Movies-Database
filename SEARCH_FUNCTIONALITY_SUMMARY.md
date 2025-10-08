# Search & Filter Functionality Summary

## Overview

The search functionality allows users to search across multiple content types (movies, TV shows, people, companies, keywords, collections, networks) with real-time filtering and pagination.

---

## Architecture

### **Service Layer** (`src/services/`)

Handles all API calls and data fetching logic.

#### `search.js`

- **Purpose**: Communicates with TMDB Search API
- **Key Function**: `searchMulti(query, type, page)`
  - Searches across different content types
  - Returns results, total pages, and total results
- **Specialized Functions**:
  - `searchMovies()`, `searchTV()`, `searchPeople()`, etc.
  - All use `searchMulti()` internally

#### `searchCounts.js`

- **Purpose**: Fetches result counts for all filter types
- **Key Function**: `fetchSearchCounts(query)`
  - Fetches counts for all 7 filter types in parallel
  - Returns object: `{ movie: 150, tv: 45, person: 23, ... }`
  - Used to display result counts in filter buttons

---

## Custom Hook

### `useSearch.js` (`src/hooks/`)

- **Purpose**: Manages search state and data fetching for a single filter type
- **Parameters**:
  - `query` - search query string
  - `filter` - active filter type (movie, tv, etc.)
  - `page` - current page number
- **Returns**:
  - `results` - array of search results
  - `totalPages` - total number of pages
  - `totalResults` - total number of results
  - `isLoading` - loading state
  - `error` - error message if any
- **Usage**: Called in `SearchPage.jsx` to fetch and manage search results

---

## Components

### **SearchPage** (`src/pages/SearchPage.jsx`)

- **Role**: Main search page container
- **Responsibilities**:
  1. Reads URL parameters (query, filter, page)
  2. Uses `useSearch` hook to fetch results
  3. Calls `fetchSearchCounts` service to get filter counts
  4. Manages active filter and pagination state
  5. Updates URL when filter/page changes

### **SearchFilter** (`src/components/SearchFilter/`)

- **Role**: Displays filter buttons with result counts
- **Props**:
  - `filters` - array with labels and counts
  - `activeFilter` - currently selected filter
  - `onFilterChange` - callback when filter clicked
- **Features**: Shows result count next to each filter (e.g., "Movies 150")

### **SearchList** (`src/components/SearchList/`)

- **Role**: Renders search results based on filter type
- **Key Feature**: Component mapping strategy
- **Component Map**:
  ```javascript
  {
    movie: MovieSearchResult,
    tv: TVSearchResult,
    person: Person,
    company: Company,
    keyword: Keyword,
    collection: Collection,
    network: Network
  }
  ```
- **Logic**: Selects appropriate component based on `filterType` prop

### **Result Components**

Each content type has its own display component:

- `MovieSearchResult` - movie cards with poster, title, date, overview
- `TVSearchResult` - TV show cards (uses `name`, `first_air_date`)
- `Person` - person cards with profile image and known works
- `Company` - company name with origin country badge
- `Keyword` - simple keyword display
- `Collection` - collection cards with poster
- `Network` - network information

### **Pagination** (`src/components/Pagination/`)

- **Role**: Handles page navigation
- **Props**: `currentPage`, `totalPages`, `onPageChange`

---

## Data Flow

```
1. User enters search query
   ↓
2. SearchPage receives query from URL
   ↓
3. useSearch hook → calls search.js service → fetches results
   ↓
4. fetchSearchCounts service → fetches all filter counts in parallel
   ↓
5. SearchFilter displays filters with counts
   ↓
6. SearchList maps results to appropriate component
   ↓
7. Results displayed + Pagination shown if needed
```

---

## Key Features

### **URL-Based State Management**

- Query, filter, and page stored in URL parameters
- Enables shareable search links
- Browser back/forward buttons work correctly

### **Parallel Count Fetching**

- All filter counts fetched simultaneously using `Promise.all()`
- Improves performance vs sequential fetching

### **Component Mapping Strategy**

- Dynamic component selection based on content type
- Easy to add new content types
- Each component receives appropriate props via spread operator

### **Conditional Rendering**

- Placeholder images when posters missing
- Different prop names for different APIs (e.g., `title` vs `name`)
- Handles missing data gracefully

---

## Example Usage

```javascript
// In SearchPage.jsx

// 1. Fetch search results for current filter
const { results, totalPages, isLoading, error } = useSearch(query, filter, page);

// 2. Fetch counts for all filters
useEffect(() => {
  const loadCounts = async () => {
    const counts = await fetchSearchCounts(query);
    setCounts(counts); // { movie: 150, tv: 45, ... }
  };
  loadCounts();
}, [query]);

// 3. Merge counts with filter config
const filtersWithCounts = FILTERS.map(f => ({
  ...f,
  totalResults: counts[f.id] || 0
}));

// 4. Pass to components
<SearchFilter filters={filtersWithCounts} />
<SearchList results={results} filterType={filter} />
```

---

## Summary

**Services** handle API calls → **useSearch hook** manages state → **SearchPage** orchestrates logic → **Components** display results

This architecture provides:

- ✅ Clean separation of concerns
- ✅ Reusable service functions
- ✅ Efficient parallel data fetching
- ✅ Type-specific result rendering
- ✅ URL-based state for shareability
