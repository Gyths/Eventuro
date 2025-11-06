// src/api/index.js (o donde esté tu wrapper)
import { BASE_URL } from "./config.js";

const BASE_URL1 = `${BASE_URL}/eventuro/api`;

export const EventuroApi = async ({
  endpoint,
  method,
  data = null,
  headers = {},          // <- NUEVO
  credentials = undefined // <- opcional: "include" si usas cookies/sesión
}) => {
  try {
    const options = {
      method,
      headers: { "Content-Type": "application/json", ...headers }, // <- merge headers
    };

    if (credentials) options.credentials = credentials;

    if (method !== "GET" && data) {
      options.body = JSON.stringify(data);
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
