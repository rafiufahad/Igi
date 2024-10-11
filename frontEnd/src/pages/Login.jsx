// import { useState } from 'react';
// import assets from '../../src/assets/assets';
// import { Link } from 'react-router-dom';
// import PrimaryBtn from '../comppnents/PrimaryBtn';

// const Login = () => {
//   // State to toggle password visibility
//   const [showPassword, setShowPassword] = useState(false);

//   // Function to toggle password visibility
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="relative w- min-h-screen bg-no-repeat bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${assets.background})` }}>
//       <div className="absolute inset-0 bg-[#AA913F] mix-blend-multiply z-1"></div>

//       <div className='relative z-2 flex flex-col mx-auto w-[90%] sm:w-[50%]'>
//         {/* --- Logo --- */}
//         <div className='flex justify-center my-14'>
//           <img src={assets.logo} alt="IGI Logo" className="w-[82.83px] sm:w-[118.33px]" />  
//         </div>

//         {/* --- Login Form --- */}
//         <div className='flex items-center bg-white bg-opacity-80 rounded-xl z-2'>
//           <div className='flex flex-col flex-grow justify-center items-center text-center z-10 sm: rounded-xl mb-'>
//             {/* headers */}
//             <h6 className='text-base sm:text-2xl font-bold text-black my-8 mx-auto'>Login</h6>
//             <div className='flex flex-row gap-4 mb-4'>
//               <p className='text-xs sm:text-base text-black mx-auto font-normal text-center'>
//                 Don’t have an account? <Link to='/registration' className='text-primary underline text-sm sm:text-base font-bold flex-1'>Create an Account</Link>
//               </p>
//             </div>

//             {/* form section */}
//             <form className='w-[80%] mx-auto' action="">
//               <div className='mb-6 flex flex-col justify-start text-left'>
//                 <p className='text-sm sm:text-base text-[#848484] font-bold mb-1'>Email Address</p>
//                 <input className='w-[full] rounded-md py-3 px-2.5 bg-white border border-gray-300 focus:outline-none focus:border-primary' type="email" name="email" placeholder='Enter Email Address' /> 
//               </div>

//               <div className='flex flex-col justify-start text-left'>
//                 <p className='text-sm sm:text-base text-[#848484] font-bold mb-1'>Password</p>
//                 <div className='relative flex flex-row justify-between'>
//                   {/* Toggle input type between password and text */}
//                   <input className='w-full rounded-md py-3 px-2.5' type={showPassword ? 'text' : 'password'} name="password" placeholder='Enter Password'/>
//                   {/* Eye icon to toggle password visibility */}
//                   <img className='w-5 absolute right-4 top-3 cursor-pointer' src={showPassword ? assets.eyeIcon : showPassword ? assets.eyeIconOpen : assets.eyeIcon || assets.eyeIconClosed} alt="Toggle Password Visibility" onClick={togglePasswordVisibility}/>
//                 </div>
//                 <div className='flex flex-row justify-between mt-2'>
//                   <p className='text-sm sm:text-base text-primary cursor-pointer'>Forgot password?</p>
//                 </div>
//               </div>
//             </form>
           
//            {/* button section */}
//             <PrimaryBtn text1={'Login'}/>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import { useState } from 'react';
import assets from '../../src/assets/assets';
import { Link } from 'react-router-dom';
import PrimaryBtn from '../comppnents/PrimaryBtn';

const Login = () => {
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');  // State for email
  const [password, setPassword] = useState('');  // State for password

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission

    // Prepare the login request payload
    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetch('/your/login/endpoint', {  // Replace with your actual login endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login, e.g., store the token or redirect
        console.log('Login successful:', data);
      } else {
        // Handle error response
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="relative w- min-h-screen bg-no-repeat bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${assets.background})` }}>
      <div className="absolute inset-0 bg-[#AA913F] mix-blend-multiply z-1"></div>

      <div className='relative z-2 flex flex-col mx-auto w-[90%] sm:w-[50%]'>
        {/* --- Logo --- */}
        <div className='flex justify-center my-14'>
          <img src={assets.logo} alt="IGI Logo" className="w-[82.83px] sm:w-[118.33px]" />  
        </div>

        {/* --- Login Form --- */}
        <div className='flex items-center bg-white bg-opacity-80 rounded-xl z-2'>
          <div className='flex flex-col flex-grow justify-center items-center text-center z-10 sm: rounded-xl mb-'>
            {/* headers */}
            <h6 className='text-base sm:text-2xl font-bold text-black my-8 mx-auto'>Login</h6>
            <div className='flex flex-row gap-4 mb-4'>
              <p className='text-xs sm:text-base text-black mx-auto font-normal text-center'>
                Don’t have an account? <Link to='/registration' className='text-primary underline text-sm sm:text-base font-bold flex-1'>Create an Account</Link>
              </p>
            </div>

            {/* form section */}
            <form className='w-[80%] mx-auto' onSubmit={handleSubmit}> {/* Attach handleSubmit here */}
              <div className='mb-6 flex flex-col justify-start text-left'>
                <p className='text-sm sm:text-base text-[#848484] font-bold mb-1'>Email Address</p>
                <input 
                  className='w-[full] rounded-md py-3 px-2.5 bg-white border border-gray-300 focus:outline-none focus:border-primary' 
                  type="email" 
                  name="email" 
                  placeholder='Enter Email Address' 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} // Update email state
                  required
                /> 
              </div>

              <div className='flex flex-col justify-start text-left'>
                <p className='text-sm sm:text-base text-[#848484] font-bold mb-1'>Password</p>
                <div className='relative flex flex-row justify-between'>
                  {/* Toggle input type between password and text */}
                  <input 
                    className='w-full rounded-md py-3 px-2.5' 
                    type={showPassword ? 'text' : 'password'} 
                    name="password" 
                    placeholder='Enter Password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} // Update password state
                    required
                  />
                  {/* Eye icon to toggle password visibility */}
                  <img 
                    className='w-5 absolute right-4 top-3 cursor-pointer' 
                    src={showPassword ? assets.eyeIconOpen : assets.eyeIconClosed} 
                    alt="Toggle Password Visibility" 
                    onClick={togglePasswordVisibility}
                  />
                </div>
                <div className='flex flex-row justify-between mt-2'>
                  <p className='text-sm sm:text-base text-primary cursor-pointer'>Forgot password?</p>
                </div>
              </div>
              {/* button section */}
              <PrimaryBtn text1={'Login'}/>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
