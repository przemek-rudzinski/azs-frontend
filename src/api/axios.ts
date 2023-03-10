import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1337/api",
});

api.interceptors.response.use(
  (response) => {
    const refreshToken = response.headers["x-access-token"];

    if (refreshToken) {
      // Store the new authentication token in your app
      console.log("reeeeefhreshing");
      localStorage.setItem("authToken", refreshToken);
    }

    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // Token expired, use refresh token to get a new token
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        return api
          .post("/auth/refresh-token", {
            refreshToken,
          })
          .then((response) => {
            // Store the new authentication token and refresh token in your app
            localStorage.setItem("authToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);

            // Retry the original request with the new token
            error.config.headers[
              "Authorization"
            ] = `Bearer ${response.data.token}`;

            return api(error.config);
          })
          .catch((error) => {
            // Handle refresh token error
            // Redirect the user to the login page or show an error message
          });
      } else {
        // Redirect the user to the login page or show an error message
      }
    }

    return Promise.reject(error);
  }
);

export default api;
