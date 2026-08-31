const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

// Fallback to localhost when VITE_CODESPACE_NAME is unset, avoiding https://undefined-8000... URLs.
export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export async function fetchList(resource) {
  const response = await fetch(`${API_BASE_URL}/${resource}/`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${resource}`);
  }
  const data = await response.json();
  // Support both plain array responses and paginated { results: [...] } responses.
  return Array.isArray(data) ? data : (data.results ?? []);
}
