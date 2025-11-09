import { BASE_URL } from "./config.js";

const BASE_URL1 = `${BASE_URL}/eventuro/api`;

export const EventuroApi = async ({ endpoint, method, data = null }) => {
  try {
    const session = localStorage.getItem("session");
    const token = session ? JSON.parse(session)?.token : null;
    const options = {
      method,
      headers: { "Content-Type": "application/json", Accept: "application/json", ...(token ? {Authorization: `Bearer ${token}` } : {})},
    };

    if (method !== "GET" && data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(BASE_URL1 + endpoint, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    //console.log(result);
    return result;
  } catch (err) {
    console.error("Error en la consulta de la api " + endpoint + ": " + err);
    throw err;
  }
};
