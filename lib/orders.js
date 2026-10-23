
const STATUSES = ["Received", "Preparing", "Out for delivery", "Delivered"];
const STEP_MS = 15000; 

const orders = (globalThis.__addisOrders ??= seed());

function seed() {
  const now = Date.now();
  const item = (id, name, priceETB) => ({ id, name, priceETB });
  const make = (id, userId, items) => ({
    id,
    userId,
    items,
    totalETB: items.reduce((sum, i) => sum + i.priceETB, 0),
    createdAt: now,
    cancelled: false,
    delivered: false,
  });
  return new Map([
    ["1", make("1", "usr_1", [item("menu-1", "Classic Doro Wat", 650), item("menu-19", "Traditional Jebena Coffee", 80)])],
    ["2", make("2", "usr_1", [item("menu-13", "Full Vegan Beyaynetu Platter", 480)])],
    ["3", make("3", "usr_2", [item("menu-10", "Prime Beef Kitfo", 720)])],
  ]);
}

function withStatus(order) {
  let status;
  if (order.cancelled) status = "Cancelled";
  else if (order.delivered) status = "Delivered";
  else {
    const step = Math.floor((Date.now() - order.createdAt) / STEP_MS);
    status = STATUSES[Math.min(step, STATUSES.length - 1)];
  }
  return { ...order, status };
}

export function getOrder(id) {
  const order = orders.get(String(id));
  return order ? withStatus(order) : null;
}


export function getOrdersFor(userId) {
  return [...orders.values()]
    .filter((o) => o.userId === userId)
    .map(withStatus)
    .sort((a, b) => b.createdAt - a.createdAt);
}

export function getAllOrders() {
  return [...orders.values()].map(withStatus).sort((a, b) => b.createdAt - a.createdAt);
}

export function createOrder(userId, items) {
  const id = String(Math.max(0, ...[...orders.keys()].map(Number)) + 1);
  orders.set(id, {
    id,
    userId,
    items,
    totalETB: items.reduce((sum, i) => sum + i.priceETB, 0),
    createdAt: Date.now(),
    cancelled: false,
    delivered: false,
  });
  return withStatus(orders.get(id));
}
export function markCancelled(id) {
  const order = orders.get(String(id));
  if (order) order.cancelled = true;
}
export async function cancelOrder(orderId) {

    const user = await getSession();
    if (!user) throw new Error("Not signed in"); 
        
    const order = await getOrder(orderId);

    if (!order) throw new Error("No such order");       
    if (order.userId !== user.id)

    throw new Error("Not yours"); 
                      
    await markCancelled(orderId);
}

export function markOrderDelivered(id) {
  const order = orders.get(String(id));
  if (order) order.delivered = true;
}

