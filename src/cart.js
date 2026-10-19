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

function calculateCartSubtotal() {
  return notImplemented();
}
function calculateOrderTotal() {
  return notImplemented();
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
