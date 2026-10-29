
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
