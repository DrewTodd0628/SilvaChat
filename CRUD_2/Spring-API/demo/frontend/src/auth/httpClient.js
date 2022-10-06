import axios from "axios";

const httpClient = axios.create();

// adds access tokens in all api requests
// this interceptor is only added when the auth0 instance is ready and exports the getAccessTokenSilently method
export const addAccessTokenInterceptor = (getAccessTokenSilently) => {
  
    // axios.interceptors.response.use( (response) => {
    //     console.log("Success");
    //     return response;
    //   }, (error) => {
    //     console.log("Failed");
    //     return Promise.reject(error);
    //   });
  
    //   console.log("Finished.");

      axios.interceptors.request.use(async (config) => {
        const token = await getAccessTokenSilently();
        config.headers.Authorization = `Bearer ${token}`;
          return config;
        }, (error) => {
          return Promise.reject(error);
        });
};

export default httpClient;