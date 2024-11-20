import API from "../utils/api";

const useAPI = () => {
  const GET = async (url, params = {}) => {
    try {
      const response = await API.get(url, { params });
      return response;
    } catch (error) {
      return error;
    }
  };

  const POST = async (url, data = {}, params = {}) => {
    try {
      const response = await API.post(url, data, { params });
      return response;
    } catch (error) {
      return error;
    }
  };

  return { GET, POST };
};

  

export default useAPI;
