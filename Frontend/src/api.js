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

    const allHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    if (token) {
      allHeaders.Authorization = `Bearer ${token}`;
    }

    const options = {
      method,
      headers: allHeaders, 
    };


    if (credentials) options.credentials = credentials;

    if (method !== "GET" && data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(BASE_URL1 + endpoint, options);

    if (!response.ok) {
      const errorText = await response.text();
      
      try {
        const errorJson = JSON.parse(errorText);
        throw new Error(`Error ${response.status}: ${errorJson.message || errorText}`);
      } catch (e) {
        throw new Error(`Error ${response.status}: ${errorText}`);
      }
    }

    const text = await response.text();
    if (!text) {
      return null; 
    }
    
    return JSON.parse(text); 

  } catch (err) {
    console.error("Error en la consulta de la api " + endpoint + ": " + err);
    throw err;
  }
};
