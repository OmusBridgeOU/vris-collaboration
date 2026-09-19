const reception_number_minimum = 10_000;
const reception_number_range = 90_000;
const uint32_range = 0x1_0000_0000;
const unbiased_uint32_limit =
  Math.floor(uint32_range / reception_number_range) * reception_number_range;

export function generate_reception_number(): string {
  const random_value = new Uint32Array(1);
  do {
    crypto.getRandomValues(random_value);
  } while (random_value[0] >= unbiased_uint32_limit);

  return (
    reception_number_minimum +
    (random_value[0] % reception_number_range)
  ).toString();
}

export function format_item_code(
  reception_number: string,
  item_number: number,
): string {
  return `${reception_number}-${item_number.toString().padStart(2, "0")}`;
}
