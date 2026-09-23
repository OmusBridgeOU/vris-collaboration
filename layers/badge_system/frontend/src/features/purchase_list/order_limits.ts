export const design_limit_message = (max_items_per_batch: number) =>
  `カートは最大${max_items_per_batch}種類までです。別のデザインを追加するには、カートから不要なデザインを外してください。`;

export const quantity_limit_message = (max_quantity_per_item: number) =>
  `1デザインの数量は最大${max_quantity_per_item}個です。${max_quantity_per_item}個以下にして注文してください。`;

export function order_limit_error(
  entries: Array<{ quantity: number }>,
  max_items_per_batch: number,
  max_quantity_per_item: number,
) {
  if (entries.length > max_items_per_batch) {
    return design_limit_message(max_items_per_batch);
  }

  if (entries.some((entry) => entry.quantity > max_quantity_per_item)) {
    return quantity_limit_message(max_quantity_per_item);
  }

  return null;
}
