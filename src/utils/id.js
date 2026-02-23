export function makeId(prefix = "c") {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}
