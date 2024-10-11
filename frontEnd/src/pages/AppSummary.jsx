import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/appContext';
import { Link, useNavigate } from 'react-router-dom';
// import api from '../api/api';
import { useSummaryData, generateReference } from '../comppnents/Registration/summaryHelpers';
import Footer from '../comppnents/Footer';
import Header from '../comppnents/Header';
import { payWithPaystack } from '../api/paystackPayment';
import amount from '../comppnents/Registration/summaryHelpers';
import axios from 'axios';



const AppSummary = () => {
  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .trim()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };
  
  const { formData, countryZones } = useContext(AppContext);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [reference, setReference] = useState(sessionStorage.getItem('paymentReference') || generateReference()); // Use stored reference or generate one

  const navigate = useNavigate();
  const summaryData = useSummaryData(formData, countryZones);
  // const email = summaryData.email;
  // const calculatedAmount = amount(formData, countryZones); // Get the amount

  // // Handle form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const formDataToSend = new FormData();
  //   formDataToSend.append('surname', 'Lagbaja2');
  //   formDataToSend.append('other_names', 'Tamedo');
  //   formDataToSend.append('country', 'NG');
  //   formDataToSend.append('gsm', '08012345611');
  //   formDataToSend.append('insured', 'JGRAB BABS2');
  //   formDataToSend.append('contact_name', 'Jane Doe2');
  //   formDataToSend.append('residence_addr1', 'My residence address');
  //   formDataToSend.append('residence_addr2', 'My residence two');
  //   formDataToSend.append('permanent_address1', 'Permanent addr 1');
  //   formDataToSend.append('permanent_address2', 'Permanent addr 2');
  //   formDataToSend.append('nationality', 'NG');
  //   formDataToSend.append('state_residence', 'NG-100000');
  //   formDataToSend.append('residence_lga', 'shomolu');
  //   formDataToSend.append('office_lga', 'Ikeja');
  //   formDataToSend.append('dob_year', '1970');
  //   formDataToSend.append('dob_month', '06');
  //   formDataToSend.append('dob_day', '30');
  //   formDataToSend.append('email', email); // Use email from summaryData
  //   formDataToSend.append('reg_date', '2022-08-30');
  //   formDataToSend.append('title', 'Mr.');
  //   formDataToSend.append('marital_status', 'S');
  //   formDataToSend.append('gender', 'M');
  //   formDataToSend.append('employer_name', 'Syssoft');
  //   formDataToSend.append('office_addr', 'Estaport Avenue');
  //   formDataToSend.append('occupation', 'Technician');
  //   formDataToSend.append('id_type', 'NIDC');
  //   formDataToSend.append('bvn', '1234567890');
  //   formDataToSend.append('website', 'www.tamedo.com');


  //   // Generate a new reference on form submit
  //   const newReference = generateReference();
  //   setReference(newReference); // Update state to reflect the new reference
  //   sessionStorage.setItem('paymentReference', newReference); // Store the new reference in sessionStorage

  //   // Append the new reference to the form data being sent in the POST request
  //   formDataToSend.append('reference', newReference);

  //   // API call to submit form data
  //   api.post('?process=Processopenledapi&process_code=100', formDataToSend, {
  //     headers: {
  //       'Authorization': 'Bearer 39109f7df56e1051c39YNM9e6YK85066bb852',
  //     }
  //   })
  //   .then((res) => {
  //     console.log('Response:', res.data);
  //     alert('Form submitted successfully!');
  //     setErrorMessage(''); // Clear any previous error message

  //     // Immediately initiate Paystack payment after form submission
  //     payWithPaystack(
  //       email,
  //       calculatedAmount, 
  //       newReference, // Use the new reference for payment
  //       (paymentReference) => {
  //         navigate('/paymentsuccess');
  //       },
  //       () => {
  //         console.log('Payment unsuccessful or window closed');
  //         navigate('/paymentunsuccess'); 
  //       }
  //     );
  //   })
  //   .catch((err) => {
  //     console.error('Error:', err);
  //     setErrorMessage('An error occurred while submitting the form. Please try again.');
  //   });
  // };

  // New handleSubmit function to only send form data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = {
      surname: 'Doe',                  // Sample surname
      firstNames: 'John',               // Sample first names
      gender: 'Male',                   // Sample gender
      dob: '1990-01-01',                // Sample date of birth
      birthPlace: 'Cityville',          // Sample place of birth
      nin: '1234567890',                // Sample NIN
      maritalStat: 'Single',            // Sample marital status
      occupat: 'Developer',             // Sample occupation
      email: 'rafiufahad1@gmail.com',    // Sample email
      password: 'yourPasswordHere',     // Sample password
      address: '123 Main St',           // Sample address
      stateOfRes: 'California',         // Sample state of residence
      lgaOfRes: 'Los Angeles',          // Sample LGA of residence
      nationality: 'NG',                // Sample nationality (e.g., NG for Nigeria)
      origState: 'California',          // Sample original state
      origLga: 'Los Angeles',           // Sample original LGA
      phone: '09087662613',                // Sample phone number
      passNum: 'A12345678',             // Sample passport number
      issuedOn: '2020-01-01',           // Sample passport issuance date
      expires: '2030-01-01',            // Sample passport expiry date
      destination: 'USA',               // Sample destination
      startDate: '2023-01-01',          // Sample start date for policy
      coupon: '',                       // Sample coupon
      endDate: '2024-01-01',            // Sample end date for policy
      creditBalance: 0,                 // Sample credit balance (0)
      role: 'user',                     // Sample role
      payRefId: 'TESTREF123',           // Sample payment reference ID
      premium: 50000,                   // Sample premium amount
    };
  
    console.log('Submitting data:', formDataToSend);  // Log the data being sent
  
    try {
      // Step 1: Register the user
      const registerResponse = await axios.post('http://localhost:8081/register', formDataToSend);
      const { token } = registerResponse.data; // Get the token from the response
  
      // Step 2: Create policy using the token
      const policyResponse = await axios.post('http://localhost:8081/user/createpolicy', formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        }
      });
  
      console.log('User registered and policy created:', policyResponse.data);
      alert('Registration and policy creation successful!');
      navigate('/paymentsuccess');
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setErrorMessage('Error submitting form. Please try again.');
      navigate('/paymentunsuccess');
    }
  };
  

  useEffect(() => {


    console.log('Form Data:', formData);
  }, [formData]);

  return (
    <div className='bg-gray2'>
      <Header />
      <div className="my-8 max-w-[646px] w-auto mx-4 sm:mx-auto bg-white rounded-[16px] border border-gray-300" role="form">
        <h6 className="text-base sm:text-2xl font-bold text-center my-4 mt-[25px] mb-[15px]">Application Summary</h6>

        {errorMessage && (
          <div className="bg-red-100 text-red-800 p-2 rounded-lg mt-4 text-center text-xs sm:text-sm">
            {errorMessage}
          </div>
        )}

        <div className="space-y-4 gap-4 p-4 sm:p-8">
          {Object.entries(summaryData).map(([key, value]) => (
            <div key={key} className="flex flex-col justify-between mb-4" aria-labelledby={key}>
              <span className="text-xs sm:text-sm text-gray3 font-bold" id={key}>{formatLabel(key)}</span>
              <span className="text-sm sm:text-base text-black font-medium" aria-describedby={`${key}-value`}>{value}</span>
              <hr className="border-gray-300" />
            </div>
          ))}

          <div className="bg-green-100 text-green-800 p-2 rounded-lg mt-4 text-center text-xs sm:text-sm w-full">
            <p className="p-[2px] font-medium">
              Please take note of your{' '}
              <span className="text-xs sm:text-sm font-bold">Transaction Reference</span>: {reference}. It is your payment reference and could be used to verify the status of your payment.
            </p>
          </div>

          <div className="mt-6 flex items-center space-x-2 text-xs sm:text-sm">
            <input 
              type="checkbox" 
              id="terms" 
              className="form-checkbox" 
              checked={termsAccepted} 
              onChange={() => setTermsAccepted(!termsAccepted)} 
              aria-required="true" 
            />
            <label htmlFor="terms" className="font-medium"> I agree to IGI{' '}
              <a href="/terms-and-conditions" className="text-primary underline font-bold"> Terms and Conditions</a>
            </label>
          </div>
        </div>

        <div className="mt-6 mb-10 flex justify-center gap-2">
          <button className="bg-white border border-black text-black px-4 py-2 rounded-lg">Cancel</button>
          <Link to="">
            <button 
              onClick={handleSubmit} 
              className={`bg-primary text-white px-4 py-2 rounded-lg ${!termsAccepted ? 'opacity-50 cursor-not-allowed' : ''}`} 
              disabled={!termsAccepted}
            >
              Pay Now
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AppSummary;