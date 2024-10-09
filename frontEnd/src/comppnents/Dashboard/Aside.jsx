import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import assets from '../../assets/assets';

const Aside = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="m-0">
      <aside className={`hidden sm:block transition-all duration-300 ${isExpanded ? 'w-[292px]' : 'w-[108px]'} bg-white border-2 border-r-gray3 h-screen`}
      >
        <div className="mt-0">
          <div className="flex flex-col items-center gap-y-5 mt-[40px] mb-[46px]">
            {isExpanded ? (
              <div className="flex flex-col gap-5">
                <Link to="/dashboard/dashboard" className="flex flex-row items-center bg-primary2 py-[2px] pl-0 pr-20 rounded-lg">
                  <img src={assets.dottedIcon} alt="Dashboard" className="w-[44px] bg-primary2 p-[10px]" />
                  <span className="text-base font-bold ">Dashboard</span>
                </Link>

                <Link to="/dashboard/policies" className="flex flex-row gap-4 items-center">
                  <img src={assets.policy1} alt="Policies" className="w-[44px]" />
                  <span className="text-sm">Policies</span>
                </Link>

                <Link to="/dashboard/reports" className="flex flex-row gap-4 items-center">
                  <img src={assets.report1} alt="Reports" className="w-[44px]" />
                  <span className="text-sm">Reports</span>
                </Link>

                <Link to="/dashboard/branch-agencies" className="flex flex-row gap-4 items-center">
                  <img src={assets.branch1} alt="Branch / Agencies" className="w-[44px]" />
                  <span className="text-sm">Branch / Agencies</span>
                </Link>

                <Link to="/dashboard/manage-users" className="flex flex-row gap-4 items-center">
                  <img src={assets.user1} alt="Manage Users" className="w-[44px]" />
                  <span className="text-sm">Manage Users</span>
                </Link>

                <Link to="/dashboard/manage-roles" className="flex flex-row gap-4 items-center">
                  <img src={assets.roles1} alt="Manage Roles" className="w-[44px]" />
                  <span className="text-sm">Manage Roles</span>
                </Link>
              </div>
            ) : (
              <>
                <Link to="/dashboard/dashboard">
                  <img src={assets.dottedIcon} alt="Dashboard" className="w-[44px] bg-primary2 p-[10px] rounded-lg" />
                </Link>

                <Link to="/dashboard/policies">
                  <img src={assets.policy1} alt="Policies" className="w-[44px]" />
                </Link>

                <Link to="/dashboard/reports">
                  <img src={assets.report1} alt="Reports" className="w-[44px]" />
                </Link>

                <Link to="/dashboard/branch-agencies">
                  <img src={assets.branch1} alt="Branch / Agencies" className="w-[44px]" />
                </Link>

                <Link to="/dashboard/manage-users">
                  <img src={assets.user1} alt="Manage Users" className="w-[44px]" />
                </Link>

                <Link to="/dashboard/manage-roles">
                  <img src={assets.roles1} alt="Manage Roles" className="w-[44px]" />
                </Link>
              </>
            )}
          </div>

          <div
            className="box-border flex flex-row justify-center items-center p-2 gap-2.5 w-full h-[40px] bg-gray-100 border border-gray-300 border-t-0 border-r-0 flex-none order-1 self-stretch grow-0 cursor-pointer"
            onClick={handleToggle}
          >
            <img
              src={assets.doublearrow}
              alt="Toggle"
              className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Aside;
