export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function isNonEmpty<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
