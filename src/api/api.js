const apiUrl = process.env.VUE_APP_API_URL;
const apiKey = process.env.VUE_APP_API_KEY;

const defaultOptions = {
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  redirect: 'follow',
  referrerPolicy: 'origin',
};

export default class Api {
  static async auth() {
    const options = {
      ...defaultOptions,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey,
      }),
    };
    const url = `${apiUrl}/auth`;
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    } catch (e) {
      throw new Error(`Error: ${JSON.stringify(e)}`);
    }
  }

  static async images(token, page = 1) {
    const options = {
      ...defaultOptions,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `${apiUrl}/images?page=${page}`;
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    } catch (e) {
      throw new Error(`Error: ${JSON.stringify(e)}`);
    }
  }

  static async image(token, id) {
    const options = {
      ...defaultOptions,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `${apiUrl}/images/${id}`;
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    } catch (e) {
      throw new Error(`Error: ${JSON.stringify(e)}`);
    }
  }
}
