// import axios from 'axios';

 
// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_URL, // Use the API URL from the .env file
//   headers: {
//     Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`, // Bearer token for authentication
//     'Content-Type': 'application/json', // Set content type to JSON
//   },
// });


// export default api;



import axios from 'axios';

// Directly hardcoding the API URL and Token for testing
const api = axios.create({
  baseURL: '/api',
  headers: {
    Authorization: 'Bearer 39109f7df56e1051c39YNM9e6YK85066bb852', // Bearer token for authentication
    'Content-Type': 'application/json',
  },
});

export default api;
