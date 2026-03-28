const BASE_URL = import.meta.env.VITE_API_URL;

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    let mensaje = `Error ${response.status}`;
    try {
      const datos = await response.json();
      if (datos.error) mensaje = datos.error;
    } catch {
      // no es JSON, usamos el mensaje genérico
    }
    throw new Error(mensaje);
  }

  if (response.status === 204) return null;

  return response.json();
}

export const api = {
  get: (endpoint) => request(endpoint),
  post: (endpoint, body) =>
    request(endpoint, { method: "POST", body: JSON.stringify(body) }),
  put: (endpoint, body) =>
    request(endpoint, { method: "PUT", body: JSON.stringify(body) }),
  patch: (endpoint, body) =>
    request(endpoint, { method: "PATCH", body: JSON.stringify(body) }),
  delete: (endpoint) => request(endpoint, { method: "DELETE" }),
};
