import axios from 'axios';

// Constants
const brain_url = import.meta.env.VITE_APP_JEEC_BRAIN_URL;
const brain_user = import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME;
const brain_pass = import.meta.env.VITE_APP_JEEC_WEBSITE_KEY;
const auth = {
      username: brain_user,
      password: brain_pass
    };


export const GET = async (route, params = {}) => {  
  const url = brain_url + route;
  
  params = {
    ...params,
    auth:auth 
  }

  try {
    const response = await axios.get( url, {params} );
    return response;
  } catch (e) {
    handleError(e)
  }
}

export const POST = async (route, data = {}) => {  
  const url = brain_url + route;
  data = {
    ...params,
    auth:auth 
  }

  try {
    const response = await axios.post( url, data );
    return response;
  } catch (e) {
    handleError(e)
  }
}

const handleError = (error) => {
  if (error.response) {
    // Server responded with a status other than 2xx
    console.error('Error response:', error.response);
  } else if (error.request) {
    // No response received from server
    console.error('Error request:', error.request);
  } else {
    // Error setting up the request
    console.error('Error message:', error.message);
  }
  throw error;
};