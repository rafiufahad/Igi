import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllUsers, fetchAllAgents, fetchAllPolicies, createBranch, updatePolicy, getBranchStatistics} from '../../api/api';
import { AppContext } from '../../context/appContext';
import assets from "../../assets/assets";
import Dropdown from './Dropdown';

const initialDashboardState = {
  users: {
    data: [],
    loading: true,
    error: null
  },
  agents: {
    data: [],
    loading: true,
    error: null
  },
  policies: {
    data: [],
    loading: true,
    error: null
  },
  branches: {
    data: null,
    loading: true,
    error: null
  }
};

const SuperAdminDashboard = () => {
  const [dashboardState, setDashboardState] = useState(initialDashboardState);
  const [globalError, setGlobalError] = useState(null);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  // Helper function to update specific state section
  const updateState = (section, updates) => {
    setDashboardState(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...updates
      }
    }));
  };

  // Check for authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  // Fetch all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
     
      // Fetch users with error handling
      const fetchUsers = async () => {
        try {
          const response = await fetchAllUsers();
          updateState('users', { 
            data: response.data || [], 
            loading: false,
            error: null 
          });
          
          console.log(response.data);
          

        } catch (error) {
          console.error('Error fetching users:', error);
          updateState('users', { 
            data: [], 
            loading: false,
            error: error.response?.status === 403 ? 'Access denied' : 'Failed to fetch users'
          });
        }
      };

      // Fetch agents with error handling
      // const fetchAgents = async () => {
      //   try {
      //     const response = await fetchAllAgents();
      //     updateState('agents', { 
      //       data: response.data || [], 
      //       loading: false,
      //       error: null 
      //     });
      //   } catch (error) {
      //     console.error('Error fetching agents:', error);
      //     updateState('agents', { 
      //       data: [], 
      //       loading: false,
      //       error: error.response?.status === 403 ? 'Access denied' : 'Failed to fetch agents'
      //     });
      //     // Don't set global error for 403 - allow dashboard to continue loading
      //     if (error.response?.status !== 403) {
      //       setGlobalError('Error loading some dashboard data');
      //     }
      //   }
      // };

      // Fetch policies with error handling
      const fetchPolicies = async () => {
        try {
          const response = await fetchAllPolicies();
          updateState('policies', { 
            data: response.data || [], 
            loading: false,
            error: null 
          });
        } catch (error) {
          console.error('Error fetching policies:', error);
          updateState('policies', { 
            data: [], 
            loading: false,
            error: error.response?.status === 403 ? 'Access denied' : 'Failed to fetch policies'
          });
        }
      };

      // Execute all fetches in parallel and continue even if some fail
      await Promise.allSettled([
        fetchUsers(),
        // fetchAgents(),
        fetchPolicies()
      ]);

      // Set loading to false for all sections that might not have been updated
      Object.keys(initialDashboardState).forEach(key => {
        setDashboardState(prev => ({
          ...prev,
          [key]: {
            ...prev[key],
            loading: false
          }
        }));
      });
    };

    fetchDashboardData();
  }, [navigate]);

  // Handler for creating a new branch
  const handleCreateBranch = async (branchData) => {
    try {
      await createBranch(branchData);
      // Refresh branch statistics after creation
      const response = await getBranchStatistics();
      updateState('branches', { data: response.data });
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        updateState('branches', { 
          error: 'Failed to create branch' 
        });
      }
    }
  };

  // Handler for updating a policy
  const handleUpdatePolicy = async (policyId, policyData) => {
    try {
      const response = await updatePolicy(policyId, policyData);
      updateState('policies', {
        data: dashboardState.policies.data.map(policy => 
          policy.id === policyId ? response.data : policy
        )
      });
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        updateState('policies', { 
          error: 'Failed to update policy' 
        });
      }
    }
  };

  // Calculate dashboard metrics
  const getDashboardMetrics = () => {
    const { users, policies, agents, branches } = dashboardState;
    
    return {
      totalPolicies: policies.data.length,
      totalUsers: users.data.length,
      totalAgents: agents.data.length,
      branchCount: branches.data?.branchCount || 0,
      agencyCount: branches.data?.agencyCount || 0,
      // Add more metrics as needed
    };
  };

  // Loading state
  const isLoading = Object.values(dashboardState).some(section => section.loading);
  
  // Error state
  const hasErrors = Object.values(dashboardState).some(section => section.error) || globalError;

  if (isLoading) return <div>Loading...</div>;
  if (hasErrors) return <div>{globalError || 'Some dashboard sections failed to load'}</div>;

  const metrics = getDashboardMetrics();

  // Your existing return statement goes here...
  return (
    <div>
    <main className="flex-1 mt-0">
        <div className='mt-[40px] sm:ml-[40px] sm:mr-[64px] mx-3'>
          <div className='flex justify-between mb-8 gap-8 '>
            <h1 className='text-xl sm:text-2xl font-bold text-black'>Dashboard</h1>
            <p className='text-black font-bold text-sm sm:text-lg'>Goodafternoon, <span className='text-primary font-bold text-base sm:text-lg'>John</span></p>
          </div>
    
          <div className="flex flex-row flex-wrap gap-x-8 gap-y-6 sm:gap-y-12 w-full mb-16 sm:mb-0">
            {/* DashBoard Boxes */}
            {/* --- BOX 1 --- */}
            <div className="flex flex-col gap-14 justify-center items-center rounded-lg border border-gray3 p-6 w-[388px] h-[215px] grow">
              <div className="flex justify-between gap-2 items-center w-full">
                <div className='flex gap-4 items-center mr-8 shrink'>
                  <img className='w-14' src={assets.policy2} alt="" />
                  <p className='font-bold text-black text-base'>Policies</p>
                </div>
                <div><Dropdown /></div>
                <img src={assets.plusIcon} alt="" />
              </div>
              <div className='bg-primary2 flex flex-row flex-wrap justify-between items-center px-3 py-3.5  w-full rounded-md'>
                <p className='text-xs font-medium text-accent whitespace-nowrap'>Total no. of Policies</p>
                <p className='text-lg font-bold text-accent '>120</p>
              </div>
            </div>
    
            {/* --- BOX 2 --- */}
            <div className="relative flex flex-col shrink flex-wrap gap-14 justify-center items-center rounded-lg border border-gray3 p-6 w-[388px] h-[215px] grow">
              <div className='flex items-center justify-between w-full'>
                <div className='flex justify-between items-center gap-4'>
                  <img className='w-14' src={assets.report2} alt="" />
                  <p className='font-bold text-black text-base'>Reports</p>
                </div>
                <img src={assets.dotdotdot} alt="" />
              </div>
              <div className='flex justify-between items-end w-full'>
                <div className='flex flex-col gap-2 justify-center '>
                  <div className='flex items-center gap-3'>
                    <p className="w-[8px] h-[16px] bg-primary rounded-[2px]"></p>
                    <p className='text-xs font-medium text-accent'>Issued</p>
                  </div>
                  <div className='flex items-center gap-3'>
                    <p className="w-[8px] h-[16px] bg-gold rounded-[2px]"></p>
                    <p className='text-xs font-medium text-accent'>Cancelled</p>
                  </div>
                </div>
                <div className=''>
                  <img className='absolute bottom-0 right-6' src={assets.arc} alt="" />
                  <div className='absolute bottom-6 right-[50px] flex flex-col gap-3 items-center '>
                    <p className='font-bold text-lg text-accent'>235</p>
                    <p className='text-gray4 text-xs font-medium'>Total no. of Application</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* --- BOX 3 --- */}
            <div className="relative flex flex-col flex-shrink gap-[17px] justify-center items-center rounded-lg border border-gray3 p-6 w-[388px] h-[215px] grow">
              <div className='flex items-center justify-between w-full'>
                <div className='flex justify-between items-center gap-4'>
                  <img className='w-14' src={assets.complaints} alt="" />
                  <p className='font-bold text-black text-base'>Complaints</p>
                </div>
                <img src={assets.dotdotdot} alt="" />
              </div>
              <div className='flex flex-col gap-1 w-full'>
                <div className='flex flex-row justify-between items-center p-2 px-3 w-full h-[45px] bg-primary2 rounded-[4px]'>
                    <p className='text-xs font-medium text-accent whitespace-nowrap'>Resolved Complaints</p>
                    <p className='text-lg font-bold text-accent '>300</p>
                </div>
                <div className='flex flex-row justify-between items-center p-2 px-3 w-full h-[45px] bg-gold2 rounded-[4px]'>
                <p className='text-xs font-medium text-accent whitespace-nowrap'>Unresolved Complaints</p>
                <p className='text-lg font-bold text-accent '>43</p>
                </div>
              </div>
            </div>
    
            {/* --- BOX 4 --- */}
            <div className="flex flex-col gap-14 justify-center items-center rounded-lg border border-gray3 p-6 w-[388px] h-[215px] grow">
              <div className="flex justify-between gap-2 items-center w-full">
                <div className='flex gap-4 items-center mr-8'>
                  <img className='w-14' src={assets.role2} alt="" />
                  <p className='font-bold text-black text-base'>Roles</p>
                </div>
                <div><Dropdown /></div>
                <img src={assets.plusIcon} alt="" />
              </div>
              <div className='bg-primary2 flex flex-row justify-between items-center px-3 py-3.5  w-full h-[57px] rounded-md'>
                <p className='text-xs font-medium text-accent whitespace-nowrap'>Total no. of Roles</p>
                <p className='text-lg font-bold text-accent '>78</p>
              </div>
            </div>
    
            {/* --- BOX 5 --- */}
            <div className="relative flex flex-col gap-14 justify-center items-center rounded-lg border border-gray3 p-6 w-[388px] h-[215px] grow">
              <div className='flex items-center justify-between w-full'>
                <div className='flex justify-between items-center gap-4'>
                  <img className='w-14' src={assets.user2} alt="" />
                  <p className='font-bold text-black text-base'>Users</p>
                </div>
                <div className='z-20'><Dropdown /></div>
                <img src={assets.plusIcon} alt="" />
              </div>
              <div className='flex justify-between items-end w-full'>
                <div className='flex flex-col gap-2 justify-center '>
                  <div className='flex items-center gap-3'>
                    <p className="w-[8px] h-[16px] bg-primary rounded-[2px]"></p>
                    <p className='text-xs font-medium text-accent'>Old Users</p>
                  </div>
                  <div className='flex items-center gap-3'>
                    <p className="w-[8px] h-[16px] bg-gold rounded-[2px]"></p>
                    <p className='text-xs font-medium text-accent'>Last 7 days</p>
                  </div>
                </div>
                <div className=''>
                  <img className='absolute bottom-0 right-6' src={assets.arc} alt="" />
                  <div className='absolute bottom-6 right-[50px] flex flex-col gap-3 items-center '>
                    <p className='font-bold text-lg text-accent'>1425</p>
                    <p className='text-gray4 text-xs font-medium'>Total no. of Users</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* --- BOX 6 --- */}
            <div className="relative flex flex-col gap-[17px] justify-center items-center rounded-lg border border-gray3 p-6 w-[388px] h-[215px] grow">
              <div className='flex items-center justify-between w-full'>
                <div className='flex justify-between items-center gap-4'>
                  <img className='w-14' src={assets.complaints} alt="" />
                  <p className='font-bold text-black text-base'>Branch / Agencies</p>
                </div>
                <img src={assets.plusIcon} alt="" />
              </div>
              <div className='flex flex-col gap-1 w-full'>
                <div className='flex flex-row justify-between items-center p-2 px-3 w-full h-[45px] bg-primary2 rounded-[4px]'>
                    <p className='text-xs font-medium text-accent whitespace-nowrap'>No. of Branches</p>
                    <p className='text-lg font-bold text-accent '>34</p>
                </div>
                <div className='flex flex-row justify-between items-center p-2 px-3 w-full h-[45px] bg-gold2 rounded-[4px]'>
                <p className='text-xs font-medium text-accent whitespace-nowrap'>No. of Agencies</p>
                <p className='text-lg font-bold text-accent '>12</p>
                </div>
              </div>
            </div>
    
          </div>
        </div>
    </main>
    </div>
  )
};

export default SuperAdminDashboard;

