import axios from 'axios';

const GLOBAL_URL = import.meta.env.VITE_GLOBAL_URL;

const axiosInstance = axios.create({
  baseURL: GLOBAL_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getDataFromServer = async <T>(url: string): Promise<T> => {
  try {
    const response = await axiosInstance.get(`${GLOBAL_URL}/${url}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from server:', error);
    throw error;
  }
};

export const postDataToServer = async <T>(
  url: string,
  data: Record<string, any>, // Add support for request body
  config = {} // Allow custom Axios configuration
): Promise<T> => {
  try {
    // Ensure the URL is correctly prefixed with the base URL
    const response = await axiosInstance.post(
      `${GLOBAL_URL}/${url}`,
      data,
      config
    );
    return response.data;
  } catch (error: any) {
    console.error('Error posting data to server:', error);
    throw error;
  }
};
