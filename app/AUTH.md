
## /checkout

- Middleware -> session cookie exists; early check only
- Page -> getSession(); redirects if the cookie does not resolve to a user
- Action -> placeOrder() checks the session again, validates delivery details,
  looks up dish IDs and prices from server data, and assigns the new order to
  session.id
- Ownership -> no existing order to check; this action creates an order for
  the signed-in user

## /orders

- Middleware -> session cookie exists; early check only
- Page -> getSession(); redirects if there is no valid user
- Query -> getOrdersFor(session.id); returns that user's orders
- Action -> cancelOrder(orderId) checks the session, loads the order, and
  compares order.userId with session.id before cancelling

## /orders/[id] and /api/orders/[id]

- Page/API -> getSession() and check the order belongs to the user
  (staff are also allowed by the current code)
- Query -> getOrder(id) loads by ID first; ownership is checked afterward

## Session format and deployment

- The `session` cookie contains a signed, seven-day identity payload (`id`, `name`,
  `role`, and expiry). The HMAC signature prevents users from changing those claims.
- Set a long random `SESSION_SECRET` in local environment variables and in the
  Vercel project's Production environment variables. Changing the secret invalidates
  existing sessions; users must sign in again.
- This lets a newly registered user remain recognized during that session across
  Vercel function instances. User accounts and orders are still held in memory, so
  new accounts cannot reliably sign in again after their session ends and orders
  are not durable. Durable account/order history requires persistent storage.
