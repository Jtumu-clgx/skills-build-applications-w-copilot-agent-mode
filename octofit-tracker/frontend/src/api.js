export async function fetchList(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  const data = await response.json();
  // Support both plain array responses and paginated { results: [...] } responses.
  return Array.isArray(data) ? data : (data.results ?? []);
}
