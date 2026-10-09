### Instructions

I need a new property search page. The page will be broken up in the following components:

1. SearchHeader (src/components/search/search-header.tsx)
2. PropertySearchCard (src/components/search/property-search-card.tsx)
3. SearchResults (src/components/search/search-results.tsx)
4. SearchResultsMap (src/components/search/search-results-map.tsx)

### Description

The new page route will be `/search` (src/app/(frontend)/search/page.tsx)

It will be taking advantage of tailwindcss and shadcn components where possible. All the shadcn components have been downloaded and are available.

The page will be full screen with a 12 column grid. On mobile there will be a single column (span-12) which will default to include the SearchResults component. It will include the SearchHeader (also span-12) at the top. On larger screens ("lg") the SearchHeader remains span-12. Below it will be the SearchResults component again but now sitting on the left side of the screen with span-4 (1/3 the width of the screen) and the SearchResultsMap component on the right-side with span-8 (2/3 the width of the screen)

#### Components

**SearchHeader**

The SearchHeader component will be a single rowed form with large input with a placeholder on the right for to-be-determined filters.

**PropertySearchCard**

The PropertySearchCard is used to display each property within the the `SearchResults` component. The card will consist of the property photo, price, address and beds, baths and sqft.

**SearchResults**

The SearchResults component will be a list of the search results in a 2x2 grid of `PropertySearchCard`s with pagination if necessary. On mobile it will be a single column with 25 results per page (if pagination is needed).

**SearchResultsMap**

The SearchResultsMap component will be a full-size map of the area that includes pins of each of the results. Do not implement this yet until a later phase. Just a placeholder to start.
