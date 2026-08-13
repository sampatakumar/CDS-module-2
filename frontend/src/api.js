const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

async function handleResponse(response) {
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const message = data?.message || response.statusText || "Request failed";
    throw new Error(message);
  }
  return data;
}

function authHeaders(token) {
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : ""
  };
}

export async function registerUser(body) {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body)
  });
  return handleResponse(response);
}

export async function loginUser(body) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body)
  });
  return handleResponse(response);
}

export async function getBlogs(token, search = "", category = "", author = "") {
  let url = `${API_BASE}/blogs`;
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (category && category !== "All") params.append("category", category);
  if (author) params.append("author", author);

  const queryString = params.toString();
  if (queryString) {
    url += `?${queryString}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: authHeaders(token)
  });
  return handleResponse(response);
}

export async function createBlog(body, token) {
  const response = await fetch(`${API_BASE}/blogs`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(body)
  });
  return handleResponse(response);
}

export async function updateBlog(id, body, token) {
  const response = await fetch(`${API_BASE}/blogs/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(body)
  });
  return handleResponse(response);
}

export async function deleteBlog(id, token) {
  const response = await fetch(`${API_BASE}/blogs/${id}`, {
    method: "DELETE",
    headers: authHeaders(token)
  });
  return handleResponse(response);
}

export async function getUserProfile(token) {
  const response = await fetch(`${API_BASE}/auth/profile`, {
    method: "GET",
    headers: authHeaders(token)
  });
  return handleResponse(response);
}

export async function getBlogById(id, token) {
  const response = await fetch(`${API_BASE}/blogs/${id}`, {
    method: "GET",
    headers: authHeaders(token)
  });
  return handleResponse(response);
}

