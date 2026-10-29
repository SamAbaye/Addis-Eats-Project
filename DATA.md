# DATA.md — data ownership and refresh rules

This document records where each query runs, how it is identified, when it refreshes, and why that choice fits the current Addis Eats project. The menu JSON stands in for a live API so the app can practice client fetching and revalidation.

| Query / screen | Runs on | Key or source | Refresh rule | Reasoning |
| --- | --- | --- | --- | --- |
| Menu catalogue (`/menu`) | Client, in `FilterShell` with SWR | SWR key: `/menu.json`; fetches the public JSON file | SWR's default revalidation behavior; no polling interval is configured | The browser owns menu filtering and can revalidate the catalogue. The JSON file is a mock API source; it will only show changed data after the source changes and a revalidation happens. |
| Menu search and category filter | Client, derived from the loaded catalogue | Current `q` URL search parameter plus the selected category in React state; no separate request key | Recomputed as the URL query or selected category changes; there is no debounce or server search request | Filtering the already loaded menu is simple and avoids an extra request for each typed character. Search currently matches English and Amharic dish names. |
| Dish detail | Server Component | `getDish(id)` reads the shared menu data in `app/lib/dishes.js` | Read when the route renders; no client polling | The dish route needs the same authoritative dish record for page content, metadata, structured data, and the generated social image. |
| User's order list (`/orders`) | Server Component | `getOrdersFor(session.id)` | Read on page render/navigation; no client polling on the list | The server has the session and filters orders to that user before rendering private data. |
| Initial order status (`/orders/[id]`) | Server Component | `getOrder(id)`, followed by an ownership check; passed as `initial` | Read on page render/navigation | The server passes the status as `fallbackData` and checks access before returning the page. Because `OrderStatus` checks `isLoading` before rendering `data`, SWR may show its loading message while the first client request is in flight; SWR does not count fallback data as loaded data. |
| Live order status (`/orders/[id]`) | Client, in `OrderStatus` with SWR | SWR key: `/api/orders/${id}` | Polls every 5 seconds (`refreshInterval: 5000`); starts with server-provided `fallbackData` | The client can refresh status while the customer watches the page. The API checks the session and order ownership on every poll. In this project, status changes are simulated from elapsed time in the in-memory order model; this is practice plumbing, not a persistent kitchen update feed. |
| Cart | Client, Zustand store | The `useCartStore` state; no network query key | Updates immediately; Zustand persist rehydrates from browser storage and saves under `cart-storage`; no server refresh | Cart interactions need immediate feedback, and Zustand persists the store in browser storage under `cart-storage`. Checkout must still validate the submitted dish IDs and prices on the server instead of trusting client totals. |

## Important distinction

A Client Component can be included in server-rendered HTML, but that alone does not make its data a server query. `FilterShell` currently calls `useSWR` in the browser to fetch `/menu.json`; the menu page does not pass a server-fetched catalogue into it. The order detail page does pass a server-fetched initial status into its client polling component.

The menu endpoint currently proxies the static JSON file, but `FilterShell` fetches `/menu.json` directly. If the menu later comes from a real API, update the SWR source/key to that endpoint and keep the same ownership and refresh reasoning.


