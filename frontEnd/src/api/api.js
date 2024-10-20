import axios from 'axios';

const apiBase = 'http://localhost:8081/super';

// Utility function to get headers with current token
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

// Create axios instance with default config
const api = axios.create({
  baseURL: apiBase,
  timeout: 10000 // 10 second timeout
});

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error('Unauthorized access - please log in again');
          localStorage.removeItem('token');
          break;
        case 403:
          console.error('Forbidden access - insufficient permissions');
          break;
        case 404:
          console.error('Resource not found');
          break;
        default:
          console.error('Server error:', error.response.data);
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);




// User-related functions
export const fetchUserById = async (userId) => {
  try {
    const response = await api.get(`/getuser/${userId}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllUsers = async () => {
  try {
    const response = await api.get('/getusers', { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserInfo = async (userId, userData) => {
  try {
    const response = await api.put(`/updateuser/${userId}`, userData, { 
      headers: getAuthHeaders() 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/deleteuser/${userId}`, { 
      headers: getAuthHeaders() 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};



// Agent-related functions
export const fetchAllAgents = async () => {
  try {
    const response = await api.get('/getagents', { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAgentInfo = async (agentId, agentData) => {
  try {
    const response = await api.put(`/updateagent/${agentId}`, agentData, { 
      headers: getAuthHeaders() 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAgent = async (agentId) => {
  try {
    const response = await api.delete(`/deleteagent/${agentId}`, { 
      headers: getAuthHeaders() 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createAgent = async (agentData) => {
  try {
    const response = await api.post('/createagent', agentData, { 
      headers: getAuthHeaders() 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};




// Policy-related functions
export const fetchPolicyById = async (policyId) => {
  try {
    const response = await api.get(`/getpolicy/${policyId}`, { 
      headers: getAuthHeaders() 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllPolicies = async () => {
  try {
    const response = await api.get('/policies', { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePolicy = async (policyId, policyData) => {
  try {
    const response = await api.put(`/updatepolicy/${policyId}`, policyData, { 
      headers: getAuthHeaders() 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};





// Branch-related functions
export const createBranch = async (branchData) => {
  try {
    const response = await api.post('/branch', branchData, { 
      headers: getAuthHeaders() 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBranchById = async (branchId) => {
  try {
    const response = await api.get(`/branch/${branchId}`, { 
      headers: getAuthHeaders() 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBranchStatistics = async () => {
  try {
    const response = await api.get('/allbranchinfo', { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw error;
  }
};




// Coupon and Voucher functions
export const createAndAssignCoupon = async (userId, couponData) => {
  try {
    const response = await api.post(`/createcoupon/${userId}`, couponData, { 
      headers: getAuthHeaders() 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createVoucher = async (agentId, voucherData) => {
  try {
    const response = await api.post(`/voucher/${agentId}`, voucherData, { 
      headers: getAuthHeaders() 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const topUpVoucher = async (agentId, voucherData) => {
  try {
    const response = await api.post(`/voucher/topup/${agentId}`, voucherData, { 
      headers: getAuthHeaders() 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};