import defaults from "../badge_pricing.json";

export function order_pricing(quantity: number, configured_price?: string) {
  const price =
    configured_price === undefined
      ? defaults.unit_price_yen
      : /^\d+$/.test(configured_price)
        ? Number(configured_price)
        : NaN;
  const valid =
    Number.isSafeInteger(price) &&
    price >= 0 &&
    Number.isSafeInteger(quantity) &&
    quantity >= 0 &&
    Number.isSafeInteger(price * quantity);
  return {
    unitPriceYen: valid ? price : null,
    totalPriceYen: valid ? price * quantity : null,
  };
}
