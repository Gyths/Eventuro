const BASE_URL = "http://localhost:4000/eventuro/api";

export const EventuroApi = async ({
  endpoint,
  method,
  data = null,
  saveLocalStorage = false,
  storageName = "",
}) => {
  try {
    const options = {
      method,
      headers: { "Content-Type": "application/json" },
    };

    if (method !== "GET" && data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(BASE_URL + endpoint, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error("Error en la consulta de la api " + endpoint + ": " + err);
    throw err;
  }
};
