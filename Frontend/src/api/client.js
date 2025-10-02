const ENV_BASE = process.env.EXAMIFY_API_BASE;
const API_BASE = ENV_BASE && ENV_BASE.length > 0 ? ENV_BASE : 'http://localhost:5050';

function parseJsonSafe(response) {
  return response
    .json()
    .catch(() => ({}));
}

export async function postJson(path, body) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await parseJsonSafe(res);
    if (!res.ok) {
      const normalized = normalizeErrors(data);
      throw normalized;
    }
    return data;
  } catch (e) {
    if (e && (e.errors || e.error || e.message)) {
      throw e;
    }
    throw { error: 'Network error. Check API base URL and server is running.' };
  }
}

export function normalizeErrors(data) {
  if (!data) return { errors: [], error: 'Unknown error' };
  if (Array.isArray(data.errors)) {
    return { errors: data.errors };
  }
  if (typeof data.error === 'string') {
    return { error: data.error };
  }
  if (typeof data.message === 'string') {
    return { message: data.message };
  }
  return { error: 'Unknown error' };
} 