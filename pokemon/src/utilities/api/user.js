import { getToken } from "../service/user";

const BASE_URL = "/api/user";

// USER FUNCTIONS:
export function signUp(userData) {
  return sendRequest(BASE_URL, "POST", userData);
}

export function login(credetials) {
  return sendRequest(`${BASE_URL}/login`, "POST", credetials);
}

export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}

// HELPER FUNCTIONS:
export default async function sendRequest(url, method = "GET", payload = null) {
  const options = { method };
  const token = getToken();
  

  if (payload) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(payload);
  }

  if (token) {
    options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${token}`;
  }
  console.log("URL:", url, "OPTIONS:", options);
  const res = await fetch(url, options);
  console.log("res:", res);
  if (res.ok) return res.json();
  throw new Error("Bad Request");
}
