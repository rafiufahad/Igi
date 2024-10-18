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

const apiBase = 'http://localhost:8081/super';

// Fetch one user by ID
export const fetchUserById = (userId) => {
  return axios.get(`${apiBase}/getuser/${userId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};

// Fetch one policy by ID
export const fetchPolicyById = (policyId) => {
  return axios.get(`${apiBase}/getpolicy/${policyId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};

// Fetch all users
export const fetchAllUsers = () => {
  return axios.get(`${apiBase}/getusers`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};

// Fetch all agents
export const fetchAllAgents = () => {
  return axios.get(`${apiBase}/getagents`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};

// Fetch all policies
export const fetchAllPolicies = () => {
  return axios.get(`${apiBase}/policies`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};

// Update user information
export const updateUserInfo = (userId, userData) => {
  return axios.put(`${apiBase}/updateuser/${userId}`, userData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};

// Update agent information
export const updateAgentInfo = (agentId, agentData) => {
  return axios.put(`${apiBase}/updateagent/${agentId}`, agentData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};

// Delete a user
export const deleteUser = (userId) => {
  return axios.delete(`${apiBase}/deleteuser/${userId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};

// Delete an agent
export const deleteAgent = (agentId) => {
  return axios.delete(`${apiBase}/deleteagent/${agentId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};

// Create a new branch
export const createBranch = (branchData) => {
  return axios.post(`${apiBase}/branch`, branchData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};

// Get branch details by ID
export const getBranchById = (branchId) => {
  return axios.get(`${apiBase}/branch/${branchId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};

// Update a policy
export const updatePolicy = (policyId, policyData) => {
  return axios.put(`${apiBase}/updatepolicy/${policyId}`, policyData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};

// Create and assign a coupon to a user
export const createAndAssignCoupon = (userId, couponData) => {
  return axios.post(`${apiBase}/createcoupon/${userId}`, couponData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};

// Create a voucher for an agent
export const createVoucher = (agentId, voucherData) => {
  return axios.post(`${apiBase}/voucher/${agentId}`, voucherData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};

// Top-up voucher amount
export const topUpVoucher = (agentId, voucherData) => {
  return axios.post(`${apiBase}/voucher/topup/${agentId}`, voucherData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};

// Create a new agent
export const createAgent = (agentData) => {
  return axios.post(`${apiBase}/createagent`, agentData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};

// Get branch statistics
export const getBranchStatistics = () => {
  return axios.get(`${apiBase}/allbranchinfo`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};
