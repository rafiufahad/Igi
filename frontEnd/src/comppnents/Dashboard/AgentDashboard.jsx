import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/appContext';


const AgentDashboard = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AppContext);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get('http://localhost:8081/agent/policies', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setPolicies(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch policies');
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

//   Route to create user and policy as an agent
  const createUser = async (userData) => {
    try {
      const response = await axios.post('http://localhost:8081/agent/users', userData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log('User has been successfully created', response.data);
      
    } catch (err) {
      setError('Failed to create user');
    }
  };

//   Route to creating policies for same user
  const createPolicy = async (policyData) => {
    try {
      const response = await axios.post('http://localhost:8081/agent/userpolicy/:id', policyData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setPolicies([...policies, response.data]);
    } catch (err) {
      setError('Failed to create policy');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Agent Dashboard</h2>
      <h3>All Policies</h3>
      <ul>
        {policies.map(policy => (
          <li key={policy.id}>{policy.name} - {policy.status}</li>
        ))}
      </ul>
      {/* Add forms or buttons to create new users and policies */}
    </div>
  );
};

export default AgentDashboard;