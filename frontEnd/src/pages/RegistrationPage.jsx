import { useNavigate, useParams } from 'react-router-dom';
import CoverDestination from '../comppnents/Registration/CoverDestination';
import NextOfKin from '../comppnents/Registration/NextOfKin';
import Others from '../comppnents/Registration/Others';
import PersonalData from '../comppnents/Registration/PersonalData';
import Header from '../comppnents/Header';
import Footer from '../comppnents/Footer';
import ProgressBar from '../comppnents/ProgressBar';
import LoginDetails from '../comppnents/Registration/LoginDetails';
import { useState } from 'react';
import AppSummary from './AppSummary';


const RegistrationPage = () => {

  const navigate = useNavigate();
  const { sectionId } = useParams();
  const [progress, setProgress] = useState(0); 


  const sectionComponents = {
      personalData: PersonalData,
      nextOfKin: NextOfKin,
      coverDestination: CoverDestination,
      loginDetails: LoginDetails,
      others: Others,
      appSummary: AppSummary, 

  };


    const sections = [ 'personalData', 'nextOfKin', 'coverDestination', 'loginDetails', 'others', 'appSummary' ];

    const currentStep = sections.indexOf(sectionId);
    const SectionComponent = sectionComponents[sectionId] || PersonalData;
    
    const handleNextSection = () => {
      const nextIndex = currentStep + 1;

      if (nextIndex < sections.length) {
        navigate(`/registration/${sections[nextIndex]}`);
        } else {
          navigate('/registration/appSummary'); 
        }
      };

      const handleProgressUpdate = (newProgress) => {
        setProgress(newProgress);
      };


  return (
    <div className='bg-gray2'>
      {/* ---- Header ---- */}
      <Header />



      <div className='flex flex-col items-center gap-2 mt-8'>
        <h1 className='text-xl sm:text-3xl font-bold'>IGI Travel Insurance</h1>
        <p className='text-sm sm:text-base'>Proposal {'('}Registration{')'} Form</p>
      </div>

      {sectionId !== 'appSummary' && (
        <div className='flex flex-col sm:flex-row items-center justify-evenly mb-20 sm:mb-48 mt-8 mx-5'>
        <ProgressBar currentStep={currentStep} />

        <SectionComponent className='' handleNextSection={handleNextSection} onProgressUpdate={handleProgressUpdate}/>
      </div>
      )}

      {/* App Summary Rendering */}
      {sectionId === 'appSummary' && (
        <div className="flex justify-center items-center mb-[96px] mt-5 sm:mt-8 sm:mb-[132px] sm:my-10">
          <AppSummary />
        </div>
      )}
      




      {/* ---- Footer ---- */}
      <Footer />
    </div>
  )
}

export default RegistrationPage