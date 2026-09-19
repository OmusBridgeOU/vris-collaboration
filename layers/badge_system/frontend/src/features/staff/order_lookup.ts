export function normalize_order_lookup(value: string): string {
  if (/^[1-9]\d{4}$/.test(value)) return value;
  throw new Error("受付番号は10000から99999までの5桁数字で入力してください。");
}
