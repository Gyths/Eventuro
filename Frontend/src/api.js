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
      //ASI FUNCIONA RECLAMOS XD
      /* headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      }, // <- merge headers*/
    };

    if (credentials) options.credentials = credentials;

    if (method !== "GET" && data) {
      options.body = isFormData ? data : JSON.stringify(data);
    }
    const response = await fetch(BASE_URL1 + endpoint, options);

    const text = await response.text();

    let jsonData;
    try {
      jsonData = text ? JSON.parse(text) : {};
    } catch {
      jsonData = { error: text };
    }

    if (!response.ok) {
      const error = new Error(
        jsonData.error || jsonData.message || "Error inesperado"
      );
      error.status = response.status;
      error.code = jsonData.code || jsonData.errorCode || 0;
      error.responseData = jsonData;
      console.log(error);
      throw error;
    }
    return jsonData;
  } catch (err) {
    console.error("Error en la consulta de la api " + endpoint + ": " + err);
    throw err;
  }
};
