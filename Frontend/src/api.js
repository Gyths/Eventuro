// src/api/index.js
import { BASE_URL } from "./config.js";

const BASE_URL1 = `${BASE_URL}/eventuro/api`;

export const EventuroApi = async ({
  endpoint,
  method,
  data = null,
  headers = {},
  credentials = undefined,
}) => {
  try {
    const session = localStorage.getItem("session");
    const token = session ? JSON.parse(session)?.token : null;

    const isFormData = data instanceof FormData;

    const baseHeaders = {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    };

    // Solo ponemos Content-Type si NO es FormData
    if (!isFormData) {
      baseHeaders["Content-Type"] = "application/json";
    }

    const options = {
      method,
      headers: baseHeaders,
    };

    if (credentials) options.credentials = credentials;

    if (method !== "GET" && data) {
      options.body = isFormData ? data : JSON.stringify(data);
    }

    const response = await fetch(BASE_URL1 + endpoint, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Error en la consulta de la api " + endpoint + ": " + err);
    throw err;
  }
};
