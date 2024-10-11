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

// const mapInitialStateToApiFormat = (formData) => {
//   return [
//       { key: "surname", value: formData.personalData.surname, type: "text" },
//       { key: "other_names", value: formData.personalData.other_names, type: "text" },
//       { key: "gender", value: formData.personalData.gender, type: "text" },
//       { key: "dob_year", value: formData.personalData.dateOfBirth.split("-")[0], type: "text" }, // Extract year from date
//       { key: "dob_month", value: formData.personalData.dateOfBirth.split("-")[1], type: "text" }, // Extract month from date
//       { key: "dob_day", value: formData.personalData.dateOfBirth.split("-")[2], type: "text" }, // Extract day from date
//       { key: "place_of_birth", value: formData.personalData.place_of_birth, type: "text" },
//       { key: "marital_status", value: formData.personalData.marital_status, type: "text" },
//       { key: "residence_addr1", value: formData.personalData.residence_addr1, type: "text" },
//       { key: "state_residence", value: formData.personalData.state_residence, type: "text" },
//       { key: "residence_lga", value: formData.personalData.residence_lga, type: "text" },
//       { key: "nationality", value: formData.personalData.nationality, type: "text" },
//       { key: "state_of_origin", value: formData.personalData.stateOfOrigin, type: "text" }, // Convert stateOfOrigin to state_of_origin
//       { key: "lga_of_origin", value: formData.personalData.lgaOfOrigin, type: "text" }, // Convert lgaOfOrigin to lga_of_origin
//       { key: "gsm", value: formData.personalData.telephone_number, type: "text" }, // Change to gsm for the API
//       { key: "passport_no", value: formData.coverDestination.passportNo, type: "text" },
//       { key: "issuance_date", value: formData.coverDestination.issuance_date, type: "text" },
//       { key: "expiry_date", value: formData.coverDestination.expiry_date, type: "text" },
//       { key: "nin", value: formData.coverDestination.nin, type: "text" },
//       { key: "destination", value: formData.coverDestination.destination, type: "text" },
//       { key: "start_date", value: formData.coverDestination.startDate, type: "text" },
//       { key: "end_date", value: formData.coverDestination.endDate, type: "text" },
//       { key: "email", value: formData.loginDetails.email, type: "text" },
//       { key: "password", value: formData.loginDetails.password, type: "text" },
//       { key: "confirm_password", value: formData.loginDetails.confirmPassword, type: "text" }
//   ];
// };



// Directly hardcoding the API URL and Token for testing
const api = axios.create({
  baseURL: 'http://localhost:8081',
  headers: {
    'Authorization': 'Bearer 39109f7df56e1051c39YNM9e6YK85066bb852', // Bearer token for authentication
    'Content-Type': 'application/json',
  },
});

export default api;


// api.js
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:8081',
// });

// export default api;
