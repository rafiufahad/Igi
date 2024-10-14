import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import RegistrationPage from './pages/RegistrationPage';
import DashBoard from './pages/DashBoard';
import BranchesAgencies from './pages/DashboardPages/BranchesAgencies';
import ManageRoles from './pages/DashboardPages/ManageRoles';
import ManageUsers from './pages/DashboardPages/ManageUsers';
import Policies from './pages/DashboardPages/Policies';
import Reports from './pages/DashboardPages/Reports';
// import LineChart from './comppnents/Dashboard/LineChart';
import AppSummary from './pages/AppSummary';
import PaymentPage from './pages/PaymentPage';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentUnsuccess from './pages/PaymentUnsuccess';



const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registration/:sectionId' element={<RegistrationPage />} />
        <Route path='/registration' element={<Navigate to='/registration/personalData' />} /> 
        <Route path='/registration/appsummary' element={<AppSummary />} />

        {/* Dashboard default route redirects to the main dashboard page */}
        <Route path='/dashboard' element={<DashBoard />} />
        
        {/* Define routes for different sections */}
        <Route path='/dashboard/policies' element={<Policies />} />
        <Route path='/dashboard/reports' element={<Reports />} />
        <Route path='/dashboard/branch-agencies' element={<BranchesAgencies />} />
        <Route path='/dashboard/manage-users' element={<ManageUsers />} />
        <Route path='/dashboard/manage-roles' element={<ManageRoles />} />

        {/* Payment Related Routes */}
        <Route path='/paymentpage' element={<PaymentPage />} />
        <Route path='/paymentsuccess' element={<PaymentSuccess />} />
        <Route path='/paymentunsuccess' element={<PaymentUnsuccess />} />
      </Routes>
    </div>
  );
};

export default App;
