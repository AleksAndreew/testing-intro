const products = require("../../src/data/products");
const { sortProductsByPrice } = require("../../src/catalog");

describe("sortProductsByPrice", () => {
  test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
    expect(sortProductsByPrice(products, "asc").map((e) => e.id)).toEqual([
      3, 6, 5, 4, 2, 1,
    ]);
  });
  test("все товары без направления сортируются как [3, 6, 5, 4, 2, 1]", () => {
    expect(sortProductsByPrice(products).map((e) => e.id)).toEqual([
      3, 6, 5, 4, 2, 1,
    ]);
  });
  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
    const catalog = [
      { id: 1, price: 49900 },
      { id: 3, price: 18900 },
      { id: 4, price: 27900 },
    ];
    expect(sortProductsByPrice(catalog, "asc").map((e) => e.id)).toEqual([
      3, 4, 1,
    ]);
  });
  test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
    expect(sortProductsByPrice(products, "desc").map((e) => e.id)).toEqual([
      1, 2, 4, 5, 6, 3,
    ]);
  });
  test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
    const catalog = [
      { id: 3, price: 18900 },
      { id: 1, price: 49900 },
      { id: 4, price: 27900 },
    ];
    expect(sortProductsByPrice(catalog, "desc").map((e) => e.id)).toEqual([
      1, 4, 3,
    ]);
  });
  test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", () => {
    const catalog = [
      { id: 5, price: 24900 },
      { id: 2, price: 35900 },
      { id: 6, price: 21900 },
    ];
    expect(sortProductsByPrice(catalog, "desc").map((e) => e.id)).toEqual([
      2, 5, 6,
    ]);
  });
  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
    const catalog = [
      { id: 1, price: 49900 },
      { id: 3, price: 18900 },
      { id: 4, price: 27900 },
    ];
    const copy = [...catalog];
    sortProductsByPrice(catalog, "asc");
    expect(catalog).toEqual(copy);
  });
  test("'desc' не меняет исходный массив [1, 3, 4]", () => {
    const catalog = [
      { id: 1, price: 49900 },
      { id: 3, price: 18900 },
      { id: 4, price: 27900 },
    ];
    const copy = [...catalog];
    sortProductsByPrice(catalog, "desc");
    expect(catalog).toEqual(copy);
  });
  test("направление по умолчанию не меняет исходный массив всех товаров", () => {
    const copy = [...products];
    sortProductsByPrice(products);
    expect(products).toEqual(copy);
  });
});
