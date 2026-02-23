const KEY = "decitwo_comparisons_v1";

export function loadComparisons() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveComparisons(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}
