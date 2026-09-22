export type StaffRole = "reception" | "production" | "delivery" | "admin";

export function has_role(
  roles: readonly string[],
  required_role: StaffRole,
): boolean {
  return roles.includes("admin") || roles.includes(required_role);
}

export function is_staff(roles: readonly string[]): boolean {
  return roles.some((role) =>
    ["reception", "production", "delivery", "admin"].includes(role),
  );
}
