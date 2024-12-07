import axios from 'axios';

const GLOBAL_URL = import.meta.env.VITE_GLOBAL_URL;

export const getDataFromServer = async <T>(url: string): Promise<T> => {
  try {
    const response = await axios.get(`${GLOBAL_URL}/${url}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from server:', error);
    throw error;
  }
};
