const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

// Fallback to localhost when VITE_CODESPACE_NAME is unset, avoiding https://undefined-8000... URLs.
export const API_ORIGIN = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export async function fetchList(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  const data = await response.json();
  // Support both plain array responses and paginated { results: [...] } responses.
  return Array.isArray(data) ? data : (data.results ?? []);
}
