function notImplemented() {
  throw new Error("Корзина ещё не реализована. Сначала прочитайте тесты.");
}

function addToCart(arr, item, qnt) {
  if (qnt <= 0) throw new RangeError("Количество должно быть больше нуля");

  const existing = arr.find((e) => e.id === item.id);

  if (existing) {
    const next = existing.quantity + qnt;
    if (next > existing.stock)
      throw new RangeError("На складе недостаточно товара");
    existing.quantity = next;
  } else {
    if (qnt > item.stock) throw new RangeError("На складе недостаточно товара");
    arr.push({ ...item, quantity: qnt });
  }

  return arr;
}

function changeQuantity(cart, id, qnt) {
  if (qnt <= 0) throw new RangeError("Количество должно быть больше нуля");

  const existing = cart.find((e) => e.id === id);
  if (!existing) return cart;
  if (qnt > existing.stock)
    throw new RangeError("На складе недостаточно товара");

  return cart.map((e) => (e.id === id ? { ...e, quantity: qnt } : e));
}

function removeFromCart(cart, id) {
  const existing = cart.find((e) => e.id === id);
  if (!existing) return cart;

  return cart.filter((e) => e.id !== id);
}

function calculateCartSubtotal(cart) {
  if (cart.length === 0) return 0;
  return cart.reduce(function (sum, e) {
    return sum + e.price * e.quantity;
  }, 0);
}

function calculateOrderTotal(cart, disc) {
  let order = {};
  order.subtotal = calculateCartSubtotal(cart);
  order.discount = 0;
  if (disc === "SAVE10" && order.subtotal > 20000) {
    order.discount = order.subtotal * 0.1;
  }
  order.delivery = order.subtotal < 50000 ? 30000 : 0;
  order.total = order.subtotal - order.discount + order.delivery;
  return order;
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== "undefined") module.exports = cartApi;
if (typeof window !== "undefined") window.cartApi = cartApi;
