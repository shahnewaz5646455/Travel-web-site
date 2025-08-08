import axios from "axios";
import React from "react";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: `https://travelserver-three.vercel.app/`,
});

export function useAxios() {
  return axiosSecure;
}

const useAxiosSecure = () => {
  const { user } = useAuth();

  axiosSecure.interceptors.request.use(
    (config) => {
      // Only set Authorization if user and accessToken exist
      if (user && user.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
