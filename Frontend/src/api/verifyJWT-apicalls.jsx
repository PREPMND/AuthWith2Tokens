import axios from "axios";

let refreshPromise = null;
const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND}/api/v1`,
  withCredentials: true,
});
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    if (!error.response) {
      return Promise.reject(error);
    }

    // Rate limit
    if (error.response.status === 429) {
      window.dispatchEvent(
        new CustomEvent("rate-limit", {
          detail: {
            message: "You're requesting too quickly.",
          },
        })
      );

      return Promise.reject(error);
    }

    if (originalRequest.url?.includes("/users/refreshtoken")) {
      return Promise.reject(error);
    }
    if (
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = api
            .post("/users/refreshtoken")
            .finally(() => {
              refreshPromise = null;
            });
        }

        await refreshPromise;
        return api(originalRequest);
      } catch (refreshError) {
        window.dispatchEvent(new Event("logout"));
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;