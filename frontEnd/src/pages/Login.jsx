import { useState } from 'react';
import assets from '../../src/assets/assets';
import { Link } from 'react-router-dom';
import PrimaryBtn from '../comppnents/PrimaryBtn';

const Login = () => {
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative w-full min-h-screen bg-no-repeat bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${assets.background})` }}>
      <div className="absolute inset-0 bg-[#AA913F] mix-blend-multiply z-1"></div>

      <div className='relative z-2 flex flex-col max-w-3xl mx-auto'>
        {/* --- Logo --- */}
        <div className='flex justify-center my-14'>
          <img src={assets.logo} alt="IGI Logo" className="w-[82.83px] sm:w-[118.33px]" />  
        </div>

        {/* --- Login Form --- */}
        <div className='flex items-center bg-white bg-opacity-80 mx-6 mb-[-50px] rounded-xl z-2'>
          <div className='flex flex-col flex-grow text-center m-[24px] sm:mx-12 z-10 sm: rounded-xl'>
            <h6 className='text-base sm:text-2xl font-bold text-black my-6'>Login</h6>
            <div className='flex flex-row gap-4 mb-4'>
              <p className='text-xs sm:text-base text-black mx-auto font-normal text-center'>
                Don’t have an account? <Link className='text-primary text-sm sm:text-base font-bold flex-1'>Create an Account</Link>
              </p>
            </div>
            <form action="">
              <div className='mb-6 flex flex-col justify-start text-left'>
                <p className='text-sm sm:text-base text-[#848484] font-bold mb-1'>Email Address</p>
                <input className='w-full rounded-md py-3 px-2.5 bg-white border border-gray-300 focus:outline-none focus:border-primary' type="email" name="email" placeholder='Enter Email Address' /> 
              </div>
              <div className='mb-4 flex flex-col justify-start text-left'>
                <p className='text-sm sm:text-base text-[#848484] font-bold mb-1'>Password</p>
                <div className='relative flex flex-row justify-between'>
                  {/* Toggle input type between password and text */}
                  <input
                    className='w-full rounded-md py-3 px-2.5'
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder='Enter Password'
                  />
                  {/* Eye icon to toggle password visibility */}
                  <img
                    className='w-5 absolute right-4 top-3 cursor-pointer'
                    src={showPassword ? assets.eyeIcon : showPassword ? assets.eyeIconOpen : assets.eyeIcon || assets.eyeIconClosed}  // Replace with appropriate open/closed icons
                    alt="Toggle Password Visibility"
                    onClick={togglePasswordVisibility}
                  />
                </div>
                <p className='text-sm sm:text-base text-primary cursor-pointer'>Forgot password?</p>
              </div>
            </form>
           
            <PrimaryBtn text1={'Login'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
